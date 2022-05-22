import { ApolloError, ForbiddenError } from 'apollo-server-express';
import { getFirestore } from 'firebase-admin/firestore';
import { NOT_TALKROOM_FOUND } from '~/constants';
import {
  CustomErrorResponseCode,
  MutationResolvers,
  PushNotificationMessageData,
  PushNotificationMessageDataType,
} from '~/generated/graphql';
import { getDeviceTokens } from '~/helpers/getDeviceTokens';
import { sendFcm } from '~/helpers/sendFcm';

export const createNewsTalkRoomMessage: MutationResolvers['createNewsTalkRoomMessage'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const firestore = getFirestore();

  const findTalkRoom = prisma.newsTalkRoom.findUnique({
    where: {
      id: input.talkRoomId,
    },
    select: {
      id: true,
      members: {
        select: {
          userId: true,
        },
      },
    },
  });

  const findMemberMe = prisma.newsTalkRoomMember.findUnique({
    where: {
      talkRoomId_userId: {
        talkRoomId: input.talkRoomId,
        userId: requestUser.id,
      },
    },
  });

  const [talkRoom, memberMe] = await Promise.all([findTalkRoom, findMemberMe]);

  if (!talkRoom || !memberMe) {
    throw new ApolloError(
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const message = await prisma.newsTalkRoomMessage.create({
    data: {
      roomId: input.talkRoomId,
      text: input.text,
      replyTo: input.replyTo,
      senderId: requestUser.id,
    },
  });

  await prisma.newsTalkRoom.update({
    where: {
      id: input.talkRoomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  const memberIds = talkRoom.members
    .map((member) => member.userId)
    .filter((memberId) => memberId !== requestUser.id);

  const messageRef = firestore
    .collection('newsTalkRoomMessages')
    .doc(message.id.toString());

  await messageRef.set({
    talkRoomId: input.talkRoomId,
    members: memberIds,
    createdAt: message.createdAt,
  });

  if (input.replyTo) {
    const replyMessageUser = await prisma.newsTalkRoomMessage
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
          talkRoomId: input.talkRoomId,
          talkRoomType: 'NEWS',
        },
      });
    }

    if (replyMessageUser && replyMessageUser.loggedIn) {
      const isReplyMessageUserIncluded = talkRoom.members.some(
        (member) => member.userId === replyMessageUser.id
      );

      if (isReplyMessageUserIncluded) {
        const tokens = await getDeviceTokens(replyMessageUser.id);

        if (tokens.length) {
          const notificationData: PushNotificationMessageData = {
            type: PushNotificationMessageDataType.NewsTalkRoomMessage,
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
            { contentAvailable: true, priority: 'high' }
          );
        }
      }
    }
  }

  return message;
};
