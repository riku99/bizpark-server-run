import { UserResolvers } from '~/generated/graphql';
import { createPageInfo } from '~/helpers/createPageInfo';
import { createEdges } from '~/helpers/createEdges';
import { createPagenationValues } from '~/helpers/createPagenationValues';

const CURSOR_KEY = 'id';
const DEFAULT_PICK_COUNT = 20;

export const pickedNews: UserResolvers['pickedNews'] = async (
  user,
  args,
  { prisma }
) => {
  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first ?? DEFAULT_PICK_COUNT,
    cursorKey: CURSOR_KEY,
  });

  const getPickedNews = prisma.user
    .findUnique({
      where: {
        id: user.id,
      },
    })
    .newsPicks({
      take,
      skip,
      cursor,
      orderBy: {
        id: 'desc',
      },
    });

  const getCount = prisma.newsPick.count({
    where: {
      pickerId: user.id,
      id: {
        lt: after ?? undefined,
      },
    },
  });

  const [newsPick, count] = await Promise.all([getPickedNews, getCount]);

  const pageInfo = createPageInfo({
    count,
    first: take,
    after: !!after,
    nodes: newsPick,
    cursorKey: CURSOR_KEY,
  });

  const edges = createEdges<typeof newsPick[number], typeof CURSOR_KEY>({
    nodes: newsPick,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
