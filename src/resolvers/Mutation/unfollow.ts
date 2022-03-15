import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const unfollow: MutationResolvers["unfollow"] = async (
  _,
  { followeeId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const result = await prisma.follow.delete({
    where: {
      followerId_followeeId: {
        followerId: requestUser.id,
        followeeId,
      },
    },
    include: {
      followee: true,
    },
  });

  return {
    ...result.followee,
    follow: false,
  };
};
