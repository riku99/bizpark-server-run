import { NewsTalkRoomResolvers } from "~/generated/graphql";

export const allMessageSeen: NewsTalkRoomResolvers["allMessageSeen"] = async (
  parent,
  _,
  { requestUser, prisma }
) => {
  const messages = await prisma.newsTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .messages({
      include: {
        seen: {
          where: {
            userId: requestUser?.id,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      take: 1,
    });

  let allMessageSeen = true;

  if (messages.length) {
    const lastMessage = messages[0];

    allMessageSeen =
      lastMessage.senderId === requestUser?.id || !!lastMessage.seen.length;
  }

  return allMessageSeen;
};
