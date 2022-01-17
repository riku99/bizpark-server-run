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

  // where一旦なしで全部取得
  const talkRooms = await prisma.thoughtTalkRoom.findMany({
    include: {
      thought: true,
      members: {
        include: {
          user: true,
        },
        take: 7,
      },
      messages: {
        include: {
          sender: true,
        },
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return talkRooms;
};
