import { ThoughtTalkRoomResolvers } from "~/generated/graphql";

export const messages: ThoughtTalkRoomResolvers["messages"] = async (
  parent,
  { first, after },
  { prisma, requestUser }
) => {
  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;

  const messages = await prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .messages({
      take: first,
      skip: decodedAfter && decodedAfter > 1 ? 1 : 0,
      cursor: decodedAfter ? { id: decodedAfter } : undefined,
      orderBy: {
        id: "asc",
      },
      include: {
        sender: true,
      },
    });

  let count: number;
  if (decodedAfter) {
    count = await prisma.thoughtTalkRoomMessage.count({
      where: {
        roomId: parent.id,
        id: {
          lt: decodedAfter,
        },
      },
    });
  } else {
    count = await prisma.thoughtTalkRoomMessage.count({
      where: {
        roomId: parent.id,
      },
    });
  }

  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (decodedAfter) {
    hasNextPage = count - first > 0;
    hasPreviousPage = true;
  } else {
    hasNextPage = count > first;
    hasPreviousPage = false;
  }

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: messages[0].id.toString(),
    endCursor: messages[messages.length - 1].id.toString(),
  };

  const edges = messages.map((message) => ({
    node: message,
    cursor: message.id.toString(),
  }));

  return {
    edges,
    pageInfo,
  };
};
