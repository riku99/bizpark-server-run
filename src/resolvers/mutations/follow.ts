import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const follow: MutationResolvers["follow"] = async (
  _,
  { followeeId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  await prisma.follow.create({
    data: {
      followeeId,
      followerId: requestUser.id,
    },
  });

  return requestUser;
};
