import { OneOnOneTalkRoomMessageResolvers } from "~/generated/graphql";

export const replyMessage: OneOnOneTalkRoomMessageResolvers["replyMessage"] = async (
  parent,
  _,
  { prisma }
) => {
  const replyMessage = await prisma.oneOnOneTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .replyMessage();

  return replyMessage;
};
