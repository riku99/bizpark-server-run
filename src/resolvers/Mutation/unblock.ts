import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const unblock: MutationResolvers["unblock"] = async (
  _,
  { blockedUserId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const isBlocking = await prisma.block.findUnique({
    where: {
      blockBy_blockTo: {
        blockBy: requestUser.id,
        blockTo: blockedUserId,
      },
    },
  });

  if (isBlocking) {
    const result = await prisma.block.delete({
      where: {
        blockBy_blockTo: {
          blockBy: requestUser.id,
          blockTo: blockedUserId,
        },
      },
      include: {
        blocked: true,
      },
    });

    return {
      ...result.blocked,
      blocking: false,
    };
  } else {
    throw new ApolloError(
      "not blocking",
      CustomErrorResponseCode.AlreadyUnBloking
    );
  }
};
