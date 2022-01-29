import { ThoughtTalkRoomMessageResolvers } from "~/generated/graphql";

export const replyMessage: ThoughtTalkRoomMessageResolvers["replyMessage"] = async (
  parent,
  _,
  { prisma }
) => {
  const replyMessage = await prisma.thoughtTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .replyMessage();

  return replyMessage;
};
