import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const createUserNewsTalkRoomMessageSeen: MutationResolvers["createUserNewsTalkRoomMessageSeen"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  try {
    await prisma.userNewsTalkRoomMessageSeen.create({
      data: {
        userId: requestUser.id,
        messageId: input.messageId,
      },
    });
  } catch (e) {}

  const talkRoom = await prisma.newsTalkRoom.findUnique({
    where: {
      id: input.talkRoomId,
    },
  });

  if (!talkRoom) {
    throw new Error();
  }

  return talkRoom;
};
