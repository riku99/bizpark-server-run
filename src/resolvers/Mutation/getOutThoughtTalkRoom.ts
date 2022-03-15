import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ApolloError, ForbiddenError } from "apollo-server-express";

export const getOutThoughtTalkRoom: MutationResolvers["getOutThoughtTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  try {
    await prisma.thoughtTalkRoomMember.delete({
      where: {
        talkRoomId_userId: {
          talkRoomId: input.roomId,
          userId: requestUser.id,
        },
      },
    });
  } catch (e) {
    // 仮にトークルームが既に削除されている or 自分がメンバーから消されていても特にエラーを出す必要はない
  }

  return true;
};
