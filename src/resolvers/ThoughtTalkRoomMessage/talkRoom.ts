import { ThoughtTalkRoomMessageResolvers } from "~/generated/graphql";

export const talkRoom: ThoughtTalkRoomMessageResolvers["talkRoom"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const talkRoom = await prisma.thoughtTalkRoomMessage
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .talkRoom({
      include: {
        thought: {
          include: {
            contributor: true,
          },
        },
      },
    });

  return talkRoom;
};
