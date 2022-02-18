import {
  MutationResolvers,
  CustomErrorResponseCode,
  PushNotificationMessage,
  PushNotificationDataKind,
} from '~/generated/graphql';
import { ForbiddenError, ApolloError } from 'apollo-server-express';
import { NOT_TALKROOM_FOUND } from '~/constants';
import { sendFcm } from '~/helpers/sendFcm';
import { getDeviceTokens } from '~/helpers/getDeviceTokens';

export const createThoughtTalkRoomMessage: MutationResolvers['createThoughtTalkRoomMessage'] = async (
  _,
  { input },
  { prisma, requestUser, pubsub }
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
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
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

  pubsub.publish('THOUGHT_TALK_ROOM_MESSAGE_CREATED', {
    thoughtTalkRoomMessageCreated: {
      ...message,
      contributorId: talkRoom.thought.contributorId,
    },
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

    if (replyMessageUser && replyMessageUser.loggedIn) {
      const isReplyMessageUserIncludedMember = talkRoom.members.some(
        (member) => member.userId === replyMessageUser.id
      );

      if (isReplyMessageUserIncludedMember) {
        const tokens = await getDeviceTokens(replyMessageUser.id);

        if (tokens.length) {
          const notificationData: PushNotificationMessage = {
            type: PushNotificationDataKind.ThoughtTalkRoomMessage,
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
