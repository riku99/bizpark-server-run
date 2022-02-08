import { NewsTalkRoomResolvers } from "~/generated/graphql";

export const news: NewsTalkRoomResolvers["news"] = async (
  parent,
  _,
  { prisma }
) => {
  const news = await prisma.newsTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .news();

  return news;
};
