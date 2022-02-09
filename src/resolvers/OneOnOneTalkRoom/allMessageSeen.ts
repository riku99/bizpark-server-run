import { OneOnOneTalkRoomResolvers } from "~/generated/graphql";

export const allMessageSeen: OneOnOneTalkRoomResolvers["allMessageSeen"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const messages = await prisma.oneOnOneTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .messages({
      orderBy: {
        id: "desc",
      },
      take: 1,
    });

  let allMessageSeen = true;

  if (messages.length) {
    const lastMessage = messages[0];

    allMessageSeen =
      lastMessage.senderId === requestUser?.id || !!lastMessage.seen;
  }

  return allMessageSeen;
};
