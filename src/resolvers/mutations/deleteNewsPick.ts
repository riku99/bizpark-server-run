import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const deleteNewsPick: MutationResolvers["deleteNewsPick"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth errpr");
  }

  const newsPick = await prisma.newsPick.findFirst({
    where: {
      newsId: input.newsId,
      pickerId: requestUser.id,
    },
  });

  if (!newsPick) {
    throw new Error();
  }

  await prisma.newsPick.delete({
    where: {
      id: newsPick.id,
    },
  });

  return newsPick;
};
