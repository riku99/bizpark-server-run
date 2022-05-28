import { ApolloError, ForbiddenError } from 'apollo-server-express';
import {
  MutationResolvers,
  OneOnOneTalkRoomCreationError,
} from '~/generated/graphql';

export const createOneOnOneTalkRoom: MutationResolvers['createOneOnOneTalkRoom'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const targetUser = await prisma.user.findUnique({
    where: {
      id: input.recipientId,
    },
  });

  if (!targetUser) {
    throw new ApolloError(
      'ユーザーが見つかりません',
      OneOnOneTalkRoomCreationError.UserNotFound
    );
  }

  if (!targetUser.receiveOneOnOneTalkRoomMessage) {
    throw new ApolloError(
      'メッセージの受け取りを許可していません',
      OneOnOneTalkRoomCreationError.Rejection
    );
  }

  const blockingOrBlocked = await prisma.block.findFirst({
    where: {
      OR: [
        {
          blockTo: requestUser.id,
          blockBy: input.recipientId,
        },
        {
          blockTo: input.recipientId,
          blockBy: requestUser.id,
        },
      ],
    },
  });

  if (blockingOrBlocked) {
    throw new ApolloError(
      'トークルームを作成できませんでした',
      OneOnOneTalkRoomCreationError.BlockingOrBlocked
    );
  }

  const existingTalkRoom = await prisma.oneOnOneTalkRoom.findFirst({
    where: {
      OR: [
        {
          senderId: requestUser.id,
          recipientId: input.recipientId,
        },
        {
          senderId: input.recipientId,
          recipientId: requestUser.id,
        },
      ],
    },
  });

  if (existingTalkRoom) {
    return existingTalkRoom;
  }

  const newTalkRoom = await prisma.oneOnOneTalkRoom.create({
    data: {
      senderId: requestUser.id,
      recipientId: input.recipientId,
    },
  });

  return newTalkRoom;
};
