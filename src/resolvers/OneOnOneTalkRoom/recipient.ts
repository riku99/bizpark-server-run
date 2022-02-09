import { OneOnOneTalkRoomResolvers } from "~/generated/graphql";

export const recipient: OneOnOneTalkRoomResolvers["recipient"] = async (
  parent,
  _,
  { prisma }
) => {
  const recipient = await prisma.oneOnOneTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .recipient();

  return recipient;
};
