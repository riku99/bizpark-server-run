import { OneOnOneTalkRoomMessageResolvers } from "~/generated/graphql";

export const sender: OneOnOneTalkRoomMessageResolvers["sender"] = async (
  parent,
  _,
  { prisma }
) => {
  const sender = await prisma.oneOnOneTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .sender();

  return sender;
};
