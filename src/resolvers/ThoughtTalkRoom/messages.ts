import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { createPageInfo } from "~/helpers/createPageInfo";

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
        id: "desc",
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

  const pageInfo = createPageInfo({
    count,
    first,
    after: !!decodedAfter,
    nodes: messages,
    cursorKey: "id",
  });

  const edges = messages.map((message) => ({
    node: message,
    cursor: message.id.toString(),
  }));

  return {
    edges,
    pageInfo,
  };
};
