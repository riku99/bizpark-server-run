import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const block: MutationResolvers["block"] = async (
  _,
  { blockTo },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const result = await prisma.block.create({
    data: {
      blockBy: requestUser.id,
      blockTo,
    },
    include: {
      blocked: true,
    },
  });

  const isFollowing = await prisma.follow.findUnique({
    where: {
      followerId_followeeId: {
        followerId: requestUser.id,
        followeeId: blockTo,
      },
    },
  });

  if (isFollowing) {
    await prisma.follow.delete({
      where: {
        followerId_followeeId: {
          followerId: requestUser.id,
          followeeId: blockTo,
        },
      },
    });
  }

  return {
    ...result.blocked,
    blocking: true,
    follow: false,
  };
};
