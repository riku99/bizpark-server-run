import {
  MutationResolvers,
  CustomErrorResponseCode,
  PushNotificationMessage,
  PushNotificationDataKind,
} from '~/generated/graphql';
import { ForbiddenError, ApolloError } from 'apollo-server-express';
import { NOT_TALKROOM_FOUND } from '~/constants';
import { OneOnOneTalkRoomMessage } from '@prisma/client';
import { getDeviceTokens } from '~/helpers/getDeviceTokens';
import { sendFcm } from '~/helpers/sendFcm';
import { getFirestore } from 'firebase-admin/firestore';

export type PublishOneOnOneMessagePayload = {
  oneOnOneTalkRoomMessageCreated: OneOnOneTalkRoomMessage & {
    messageRecipientId: string;
  };
};

export const createOneOnOneTalkRoomMessage: MutationResolvers['createOneOnOneTalkRoomMessage'] = async (
  _,
  { input },
  { requestUser, prisma }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const talkRoom = await prisma.oneOnOneTalkRoom.findUnique({
    where: {
      id: input.talkRoomId,
    },
  });

  if (!talkRoom) {
    throw new ApolloError(
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const sendToUserId =
    requestUser.id === talkRoom.senderId
      ? talkRoom.recipientId
      : talkRoom.senderId;

  const blockedOrBlocking = await prisma.block.findFirst({
    where: {
      OR: [
        {
          blockTo: requestUser.id,
          blockBy: sendToUserId,
        },
        {
          blockTo: sendToUserId,
          blockBy: requestUser.id,
        },
      ],
    },
  });

  if (blockedOrBlocking) {
    throw new ApolloError(
      'メッセージを送信することができませんでした',
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const message = await prisma.oneOnOneTalkRoomMessage.create({
    data: {
      roomId: input.talkRoomId,
      text: input.text,
      senderId: requestUser.id,
      replyTo: input.replyTo,
    },
  });

  await prisma.oneOnOneTalkRoom.update({
    where: {
      id: input.talkRoomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  const firestore = getFirestore();

  const memberIds = [sendToUserId, requestUser.id];

  const messageRef = firestore
    .collection('oneOnOneTalkRoomMessages')
    .doc(message.id.toString());

  await messageRef.set({
    talkRoomId: input.talkRoomId,
    members: memberIds,
    createdAt: message.createdAt,
  });

  const targetUser = await prisma.user.findUnique({
    where: {
      id: sendToUserId,
    },
    select: {
      loggedIn: true,
      id: true,
    },
  });

  if (targetUser) {
    await prisma.notification.create({
      data: {
        userId: targetUser.id,
        performerId: requestUser.id,
        type: 'REPLY',
        talkRoomType: 'ONEONONE',
        talkRoomId: input.talkRoomId,
      },
    });
  }

  if (targetUser?.loggedIn) {
    const deviceTokens = await getDeviceTokens(sendToUserId);

    const notificationData: PushNotificationMessage = {
      type: PushNotificationDataKind.OneOnOneTalkRoomMessage,
      id: JSON.stringify(message.id),
      roomId: JSON.stringify(message.roomId),
    };

    if (deviceTokens.length) {
      await sendFcm(
        deviceTokens,
        {
          notification: {
            title: 'メッセージが届きました',
            sound: 'default',
          },
          data: notificationData,
        },
        { contentAvailable: true, priority: 'high' }
      );
    }
  }

  return message;
};
