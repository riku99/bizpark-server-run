import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { Prisma } from '@prisma/client';
import { createPagenationValues } from '~/helpers/createPagenationValues';
import { createPageInfo } from '~/helpers/createPageInfo';
import { createEdges } from '~/helpers/createEdges';

const CURSOR_KEY = 'id';

export const pickedNews: QueryResolvers['pickedNews'] = async (
  _,
  args,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const where: Prisma.NewsPickWhereInput = {
    pickerId: requestUser.id,
  };

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first,
    cursorKey: CURSOR_KEY,
  });

  const getNews = prisma.newsPick.findMany({
    where,
    take,
    skip,
    cursor,
    orderBy: {
      id: 'desc',
    },
  });

  const getCount = prisma.newsPick.count({
    where: {
      ...where,
      id: {
        lt: after ?? undefined,
      },
    },
  });

  const [newsPick, count] = await Promise.all([getNews, getCount]);

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
