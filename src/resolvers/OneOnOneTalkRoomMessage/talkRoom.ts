import { OneOnOneTalkRoomMessageResolvers } from "~/generated/graphql";

export const talkRoom: OneOnOneTalkRoomMessageResolvers["talkRoom"] = async (
  parent,
  _,
  { prisma }
) => {
  const talkRoom = await prisma.oneOnOneTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .room();

  return talkRoom;
};
