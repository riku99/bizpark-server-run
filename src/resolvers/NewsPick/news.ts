import { NewsPickResolvers } from "~/generated/graphql";

export const news: NewsPickResolvers["news"] = async (
  parent,
  _,
  { prisma }
) => {
  const news = await prisma.newsPick
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .news();

  return news;
};
