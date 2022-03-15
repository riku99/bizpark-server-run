import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

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
    throw new ApolloError(
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
    );
  }

  return {
    ...talkRoom,
    allMessageSeen: true,
  };
};
