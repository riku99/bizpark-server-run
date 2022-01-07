import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const createPick: MutationResolvers["createPick"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const pick = await prisma.pick.create({
    data: {
      pickerId: requestUser.id,
      thoughtId: input.thoughtId,
    },
  });

  return pick;
};
