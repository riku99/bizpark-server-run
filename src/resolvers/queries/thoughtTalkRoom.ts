import { QueryResolvers, CustomErrorResponseCode } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const thoughtTalkRoom: QueryResolvers["thoughtTalkRoom"] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const talkRoom = await prisma.thoughtTalkRoom.findUnique({
    where: {
      id,
    },
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!talkRoom) {
    throw new ApolloError("not found", CustomErrorResponseCode.NotFound);
  }

  return talkRoom;
};
