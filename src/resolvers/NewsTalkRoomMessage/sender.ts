import { NewsTalkRoomMessageResolvers } from "~/generated/graphql";

export const sender: NewsTalkRoomMessageResolvers["sender"] = async (
  parent,
  _,
  { prisma }
) => {
  const sender = await prisma.newsTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .sender();

  return sender;
};
