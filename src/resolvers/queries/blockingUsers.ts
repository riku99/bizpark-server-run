import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const blockingUsers: QueryResolvers["blockingUsers"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const users = await prisma.user.findMany({
    where: {
      blocked: {
        some: {
          blockBy: requestUser.id,
        },
      },
    },
  });

  const convertedUsers = users.map((u) => ({
    ...u,
    follow: false,
  }));

  return convertedUsers;
};
