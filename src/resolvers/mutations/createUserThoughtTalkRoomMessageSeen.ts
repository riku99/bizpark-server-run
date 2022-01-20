import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const createUserThoughtTalkRoomMessageSeen: MutationResolvers["createUserThoughtTalkRoomMessageSeen"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const createSeen = prisma.userThoughtTalkRoomMessageSeen.create({
    data: {
      userId: requestUser.id,
      messageId: input.messageId,
    },
  });

  const getTalkRoom = prisma.thoughtTalkRoom.findUnique({
    where: {
      id: input.roomId,
    },
  });

  const [, talkRoom] = await Promise.all([createSeen, getTalkRoom]);

  if (!talkRoom) {
    throw new Error();
  }

  return {
    ...talkRoom,
    allMessageSeen: true,
  };
};
