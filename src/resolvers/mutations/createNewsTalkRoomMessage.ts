import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const createNewsTalkRoomMessage: MutationResolvers["createNewsTalkRoomMessage"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
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

  return message;
};
