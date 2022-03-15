import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const follow: MutationResolvers["follow"] = async (
  _,
  { followeeId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const blocking = await prisma.block.findUnique({
    where: {
      blockBy_blockTo: {
        blockBy: requestUser.id,
        blockTo: followeeId,
      },
    },
  });

  if (blocking) {
    throw new ApolloError(
      "user is blocking",
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const result = await prisma.follow.create({
    data: {
      followeeId,
      followerId: requestUser.id,
    },
    include: {
      followee: true,
    },
  });

  return {
    ...result.followee,
    follow: true,
  };
};
