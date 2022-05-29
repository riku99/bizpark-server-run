import { ApolloError, ForbiddenError } from 'apollo-server-express';
import { getFirestore } from 'firebase-admin/firestore';
import {
  MessageSendError,
  MutationResolvers,
  PushNotificationMessageData,
  PushNotificationMessageDataType,
} from '~/generated/graphql';
import { getDeviceTokens } from '~/helpers/getDeviceTokens';
import { sendFcm } from '~/helpers/sendFcm';

export const createThoughtTalkRoomMessage: MutationResolvers['createThoughtTalkRoomMessage'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const findTalkRoom = prisma.thoughtTalkRoom.findFirst({
    where: {
      id: input.roomId,
    },
    select: {
      id: true,
      thought: {
        select: {
          contributorId: true,
        },
      },
      members: {
        select: {
          userId: true,
        },
      },
    },
  });

  const findMemberMe = prisma.thoughtTalkRoomMember.findFirst({
    where: {
      talkRoomId: input.roomId,
      userId: requestUser.id,
    },
  });

  const [talkRoom, memberMe] = await Promise.all([findTalkRoom, findMemberMe]);

  if (!talkRoom || !memberMe) {
    throw new ApolloError(
      'トークルームが見つかりません',
      MessageSendError.NotFound
    );
  }

  const message = await prisma.thoughtTalkRoomMessage.create({
    data: {
      text: input.text,
      roomId: input.roomId,
      senderId: requestUser.id,
      replyTo: input.replyTo,
    },
    include: {
      sender: true,
    },
  });

  await prisma.thoughtTalkRoom.update({
    where: {
      id: input.roomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  const firestore = getFirestore();

  const memberIds = talkRoom.members
    .map((member) => member.userId)
    .filter((memberId) => memberId !== requestUser.id);

  const messageRef = firestore
    .collection('thoughtTalkRoomMessages')
    .doc(message.id.toString());

  await messageRef.set({
    talkRoomId: input.roomId,
    members: memberIds,
    createdAt: message.createdAt,
  });

  if (input.replyTo) {
    const replyMessageUser = await prisma.thoughtTalkRoomMessage
      .findUnique({
        where: {
          id: input.replyTo,
        },
        select: {
          id: true,
        },
      })
      .sender();

    if (replyMessageUser) {
      await prisma.notification.create({
        data: {
          userId: replyMessageUser.id,
          performerId: requestUser.id,
          type: 'REPLY',
          talkRoomId: input.roomId,
          talkRoomType: 'THOUGHT',
        },
      });
    }

    if (
      replyMessageUser &&
      replyMessageUser.loggedIn &&
      replyMessageUser.receiveReplyPushNotification
    ) {
      const isReplyMessageUserIncludedMember = talkRoom.members.some(
        (member) => member.userId === replyMessageUser.id
      );

      if (isReplyMessageUserIncludedMember) {
        const tokens = await getDeviceTokens(replyMessageUser.id);

        if (tokens.length) {
          const notificationData: PushNotificationMessageData = {
            type: PushNotificationMessageDataType.ThoughtTalkRoomMessage,
            id: JSON.stringify(message.id),
            roomId: JSON.stringify(message.roomId),
          };

          await sendFcm(
            tokens,
            {
              notification: {
                title: '返信が届きました',
                sound: 'default',
              },
              data: notificationData,
            },
            {
              contentAvailable: true,
              priority: 'high',
            }
          );
        }
      }
    }
  }

  return message;
};
