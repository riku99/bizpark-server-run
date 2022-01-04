import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-cloud-functions";

export const deletePick: MutationResolvers["deletePick"] = async (
  _,
  { thoughtId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const pick = await prisma.pick.findFirst({
    where: {
      thoughtId,
      pickerId: requestUser.id,
    },
  });

  if (!pick) {
    throw new Error();
  }

  await prisma.pick.delete({
    where: {
      id: pick.id,
    },
  });

  return pick;
};
