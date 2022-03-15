import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const updateMe: MutationResolvers["updateMe"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const updatedMe = await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      ...input,
    },
  });

  return updatedMe;
};
