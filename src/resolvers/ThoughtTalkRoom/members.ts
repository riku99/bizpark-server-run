import { ThoughtTalkRoomResolvers } from "~/generated/graphql";

export const members: ThoughtTalkRoomResolvers["members"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const members = await prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .members({
      where: {
        userId: {
          not: requestUser?.id,
        },
      },
      include: {
        user: true,
      },
      take: 6,
    });

  return members;
};
