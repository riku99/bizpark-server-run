import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const deleteThought: MutationResolvers["deleteThought"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("aurh error");
  }

  const result = await prisma.thought.deleteMany({
    where: {
      id: input.id,
      contributorId: requestUser.id,
    },
  });

  if (result.count === 0) {
    throw new ApolloError(
      "not found",
      CustomErrorResponseCode["InvalidRequest"]
    );
  }

  return {
    id: input.id,
  };
};
