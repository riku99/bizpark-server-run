import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const thoughtTalkRooms: QueryResolvers["thoughtTalkRooms"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  // 自分が発言したトークルーム && 3日以内に更新されている もののみを取得するようにする
  const talkRooms = await prisma.thoughtTalkRoom.findMany({
    where: {
      members: {
        some: {
          userId: requestUser.id,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return talkRooms;
};
