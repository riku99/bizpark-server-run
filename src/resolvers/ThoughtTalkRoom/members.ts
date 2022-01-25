import { ThoughtTalkRoomResolvers } from "~/generated/graphql";

export const members: ThoughtTalkRoomResolvers["members"] = async (
  parent,
  { first, after },
  { prisma, requestUser }
) => {
  const decodedAfter = after ? Buffer.from(after, "base64").toString() : null;

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
