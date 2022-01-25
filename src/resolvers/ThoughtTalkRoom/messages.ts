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

  const pageInfo = createPageInfo({
    count,
    first,
    after: !!decodedAfter,
    nodes: messages,
    cursorKey: "id",
  });

  // let hasNextPage: boolean;
  // let hasPreviousPage: boolean;

  // if (decodedAfter) {
  //   hasNextPage = count - first > 0;
  //   hasPreviousPage = true;
  // } else {
  //   hasNextPage = count > first;
  //   hasPreviousPage = false;
  // }

  // const pageInfo = {
  //   hasNextPage,
  //   hasPreviousPage,
  //   startCursor: messages.length ? messages[0].id.toString() : null,
  //   endCursor: messages.length
  //     ? messages[messages.length - 1].id.toString()
  //     : null,
  // };

  const edges = messages.map((message) => ({
    node: message,
    cursor: message.id.toString(),
  }));

  return {
    edges,
    pageInfo,
  };
};
