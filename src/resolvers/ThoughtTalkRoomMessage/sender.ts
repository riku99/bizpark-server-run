import { ThoughtTalkRoomMessageResolvers } from "~/generated/graphql";

export const sender: ThoughtTalkRoomMessageResolvers["sender"] = async (
  parent,
  _,
  { prisma }
) => {
  const sender = await prisma.thoughtTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .sender();

  return sender;
};
