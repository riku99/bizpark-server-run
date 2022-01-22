import { ThoughtTalkRoomResolvers } from "~/generated/graphql";

export const messages: ThoughtTalkRoomResolvers["messages"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const messages = await prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .messages({
      include: {
        sender: true,
      },
    });

  return messages;
};
