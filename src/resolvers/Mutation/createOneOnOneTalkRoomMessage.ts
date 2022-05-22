import { OneOnOneTalkRoomMessage } from '@prisma/client';
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
      'トークルームが見つかりません',
      MessageSendError.NotFound
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
      'ブロックしているか、ブロックされています',
      MessageSendError.BlockingOrBlocked
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

  const memberIds = [sendToUserId];

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

  if (targetUser?.loggedIn) {
    const deviceTokens = await getDeviceTokens(sendToUserId);

    const notificationData: PushNotificationMessageData = {
      type: PushNotificationMessageDataType.OneOnOneTalkRoomMessage,
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
