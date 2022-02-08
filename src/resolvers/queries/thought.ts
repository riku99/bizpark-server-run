import { QueryResolvers, CustomErrorResponseCode } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const thought: QueryResolvers["thought"] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const thought = await prisma.thought.findUnique({
    where: {
      id,
    },
  });

  if (!thought) {
    throw new ApolloError(
      "投稿が見つかりませんでした",
      CustomErrorResponseCode.NotFound
    );
  }

  return thought;
};
