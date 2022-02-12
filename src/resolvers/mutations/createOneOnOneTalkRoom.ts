import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const createOneOnOneTalkRoom: MutationResolvers["createOneOnOneTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
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
      "トークルームを作成できませんでした",
      CustomErrorResponseCode.InvalidRequest
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
