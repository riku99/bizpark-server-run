import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const createNewsPick: MutationResolvers["createNewsPick"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const newsPick = await prisma.newsPick.create({
    data: {
      pickerId: requestUser.id,
      newsId: input.newsId,
    },
  });

  return newsPick;
};
