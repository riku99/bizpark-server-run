import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const newsTalkRooms: QueryResolvers["newsTalkRooms"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new Error("aurh error");
  }

  // FIX: 自分が発言したトークルーム && 3日以内に更新されている もののみを取得するようにする
  const talkRooms = await prisma.newsTalkRoom.findMany({
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
