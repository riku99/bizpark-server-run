import { OneOnOneTalkRoomResolvers } from "~/generated/graphql";

export const sender: OneOnOneTalkRoomResolvers["sender"] = async (
  parent,
  _,
  { prisma }
) => {
  const sender = await prisma.oneOnOneTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .sender();

  return sender;
};
