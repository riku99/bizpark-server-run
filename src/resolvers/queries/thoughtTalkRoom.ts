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
  });

  if (!talkRoom) {
    throw new ApolloError("not found", CustomErrorResponseCode.NotFound);
  }

  return talkRoom;
};
