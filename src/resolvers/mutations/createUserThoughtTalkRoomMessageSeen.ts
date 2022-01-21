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

  // 同じメッセージデータが送られてくることもあるが、エラー出したくないのでハンドリング
  try {
    await prisma.userThoughtTalkRoomMessageSeen.create({
      data: {
        userId: requestUser.id,
        messageId: input.messageId,
      },
    });
  } catch (e) {}

  const talkRoom = await prisma.thoughtTalkRoom.findUnique({
    where: {
      id: input.roomId,
    },
  });

  if (!talkRoom) {
    throw new Error();
  }

  return {
    ...talkRoom,
    allMessageSeen: true,
  };
};
