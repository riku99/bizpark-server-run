import { NewsTalkRoomMessageResolvers } from "~/generated/graphql";

export const replyMessage: NewsTalkRoomMessageResolvers["replyMessage"] = async (
  parent,
  _,
  { prisma }
) => {
  const replyMessage = await prisma.newsTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .replyMessage();

  return replyMessage;
};
