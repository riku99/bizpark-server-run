import { NewsTalkRoomResolvers } from "~/generated/graphql";
import { createPagenationValues } from "~/helpers/createPageNationValues";
import { createPageInfo } from "~/helpers/createPageInfo";
import { createEdges } from "~/helpers/createEdges";

const cursorKey = "id";

const DEFAULT_TAKE_VALUE = 20;

export const messages: NewsTalkRoomResolvers["messages"] = async (
  parent,
  arges,
  { prisma, requestUser }
) => {
  const { after, take, skip, cursor } = createPagenationValues({
    after: arges.after,
    first: arges.first ?? DEFAULT_TAKE_VALUE,
    cursorKey,
  });

  const getMessages = prisma.newsTalkRoom
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

  const getCount = prisma.newsTalkRoomMessage.count({
    where: {
      id: {
        lt: after ?? undefined,
      },
      roomId: parent.id,
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
