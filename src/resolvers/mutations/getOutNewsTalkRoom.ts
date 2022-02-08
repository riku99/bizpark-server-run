import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const getOutNewsTalkRoom: MutationResolvers["getOutNewsTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  try {
    await prisma.newsTalkRoomMember.delete({
      where: {
        talkRoomId_userId: {
          talkRoomId: input.talkRoomId,
          userId: requestUser.id,
        },
      },
    });
  } catch (e) {
    // 仮にトークルームが既に削除されている or 自分がメンバーから消されていても特にエラーを出す必要はない
  }

  return true;
};
