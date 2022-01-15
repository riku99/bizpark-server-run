import { QueryResolvers, CustomErrorResponseCode } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const user: QueryResolvers["user"] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      follower: {
        where: {
          followerId: requestUser.id,
        },
      },
      blocked: {
        where: {
          blockBy: requestUser.id,
        },
      },
    },
  });

  if (!user) {
    throw new ApolloError(
      "not found",
      CustomErrorResponseCode["InvalidRequest"]
    );
  }

  const follow = !!user.follower.length;
  const blocking = !!user.blocked.length;
  const { follower, ...userData } = user;

  return {
    ...userData,
    follow,
    blocking,
  };
};
