import { UserResolvers } from '~/generated/graphql';
import { createPageInfo } from '~/helpers/createPageInfo';
import { createEdges } from '~/helpers/createEdges';
import { createPagenationValues } from '~/helpers/createPagenationValues';

const DEFAULT_TAKE_COUNT = 20;
const CURSOR_KEY = 'id';

export const likedThoughts: UserResolvers['likedThoughts'] = async (
  parent,
  args,
  { prisma }
) => {
  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first ?? DEFAULT_TAKE_COUNT,
    cursorKey: CURSOR_KEY,
  });

  const getLikedThoughts = prisma.user
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .thoughtLikes({
      take,
      skip,
      cursor,
      orderBy: {
        id: 'desc',
      },
    });

  const getCount = prisma.thoughtLike.count({
    where: {
      userId: parent.id,
      id: {
        lt: after ?? undefined,
      },
    },
  });

  const [likedThoughts, count] = await Promise.all([
    getLikedThoughts,
    getCount,
  ]);

  const pageInfo = createPageInfo({
    count,
    first: take,
    after,
    nodes: likedThoughts,
    cursorKey: CURSOR_KEY,
  });

  const edges = createEdges<typeof likedThoughts[number], typeof CURSOR_KEY>({
    nodes: likedThoughts,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
