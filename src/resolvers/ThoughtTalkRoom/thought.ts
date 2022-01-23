import { ThoughtTalkRoomResolvers } from "~/generated/graphql";

export const thought: ThoughtTalkRoomResolvers["thought"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const thought = await prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .thought();

  return thought;
};
