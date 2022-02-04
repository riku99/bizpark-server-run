import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { createPageInfo } from "~/helpers/createPageInfo";
import { createPagenationValues } from "~/helpers/createPageNationValues";
import { createEdges } from "~/helpers/createEdges";

export const messages: ThoughtTalkRoomResolvers["messages"] = async (
  parent,
  args,
  { prisma, requestUser }
) => {
  const cursorKey = "id";

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first,
    cursorKey,
  });

  const getMessages = prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .messages({
      take,
      skip,
      cursor,
      orderBy: {
        id: "desc",
      },
    });

  const getCount = prisma.thoughtTalkRoomMessage.count({
    where: {
      roomId: parent.id,
      id: {
        lt: after ?? undefined,
      },
    },
  });

  const [messages, count] = await Promise.all([getMessages, getCount]);

  const pageInfo = createPageInfo({
    count,
    first: take,
    after: !!after,
    nodes: messages,
    cursorKey,
  });

  const edges = createEdges<typeof messages[number], typeof cursorKey>({
    nodes: messages,
    cursorKey,
  });

  return {
    edges,
    pageInfo,
  };
};
