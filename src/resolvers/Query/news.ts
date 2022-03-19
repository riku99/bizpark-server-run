import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { Prisma } from '@prisma/client';
import { createPagenationValues } from '~/helpers/createPagenationValues';
import { createPageInfo } from '~/helpers/createPageInfo';
import { createEdges } from '~/helpers/createEdges';

const DEFAULT_TAKE_COUNT = 20;

const CURSOR_KEY = 'id';

export const news: QueryResolvers['news'] = async (
  _,
  args,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const where: Prisma.NewsWhereInput = {
    genre: args.genre,
  };

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first ?? DEFAULT_TAKE_COUNT,
    cursorKey: CURSOR_KEY,
  });

  const getNews = prisma.news.findMany({
    where,
    take,
    skip,
    cursor,
    orderBy: {
      id: 'desc',
    },
  });

  const getCount = prisma.news.count({
    where: {
      ...where,
      id: {
        lt: after ?? undefined,
      },
    },
  });

  const [news, count] = await Promise.all([getNews, getCount]);

  const pageInfo = createPageInfo({
    count,
    first: take,
    after: !!after,
    nodes: news,
    cursorKey: CURSOR_KEY,
  });

  const edges = createEdges<typeof news[number], typeof CURSOR_KEY>({
    nodes: news,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
