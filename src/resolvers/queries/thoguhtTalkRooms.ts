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

  // 「自分が発言したトークルーム」のみを取得
  const talkRooms = await prisma.thoughtTalkRoom.findMany({
    where: {
      members: {
        some: {
          userId: requestUser.id,
        },
      },
      messages: {
        some: {
          senderId: requestUser.id,
        },
      },
    },
    include: {
      thought: true,
      members: {
        where: {
          userId: {
            not: requestUser.id,
          },
        },
        include: {
          user: true,
        },
        take: 6,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return talkRooms;
};
