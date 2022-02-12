import { OneOnOneTalkRoomResolvers } from "~/generated/graphql";
import { createPagenationValues } from "~/helpers/createPageNationValues";
import { createPageInfo } from "~/helpers/createPageInfo";
import { createEdges } from "~/helpers/createEdges";

const DEFAULT_TAKE_VALUE = 20;

const CURSOR_KEY = "id";

export const messages: OneOnOneTalkRoomResolvers["messages"] = async (
  parent,
  arges,
  { prisma, requestUser }
) => {
  const { after, take, skip, cursor } = createPagenationValues({
    after: arges.after,
    first: arges.first ?? DEFAULT_TAKE_VALUE,
    cursorKey: CURSOR_KEY,
  });

  const getMessages = prisma.oneOnOneTalkRoom
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

  const getCount = prisma.oneOnOneTalkRoomMessage.count({
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
    after,
    nodes: messages,
    cursorKey: CURSOR_KEY,
  });

  const edges = createEdges<typeof messages[number], typeof CURSOR_KEY>({
    nodes: messages,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
