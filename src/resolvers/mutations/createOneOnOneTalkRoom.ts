import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const createOneOnOneTalkRoom: MutationResolvers["createOneOnOneTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
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
