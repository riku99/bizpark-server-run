import { NewsTalkRoomMessageResolvers } from "~/generated/graphql";

export const talkRoom: NewsTalkRoomMessageResolvers["talkRoom"] = async (
  parent,
  _,
  { prisma }
) => {
  const talkRoom = await prisma.newsTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .talkRoom();

  return talkRoom;
};
