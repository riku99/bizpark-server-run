import { MutationResolvers } from "~/graphql-api/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-cloud-functions";

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
