import { NewsResolvers } from "~/generated/graphql";

export const picked: NewsResolvers["picked"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const picks = await prisma.news
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .picked({
      where: {
        pickerId: requestUser?.id,
      },
    });

  return !!picks.length;
};
