import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { Prisma } from '@prisma/client';
import { createPagenationValues } from '~/helpers/createPagenationValues';
import { createPageInfo } from '~/helpers/createPageInfo';
import { createEdges } from '~/helpers/createEdges';

const CURSOR_KEY = 'cursor';

export const userThoughts: QueryResolvers['userThoughts'] = async (
  _,
  args,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const blockingOrBlocked = await prisma.block.findFirst({
    where: {
      OR: [
        {
          blockTo: requestUser.id,
          blockBy: args.userId,
        },
        {
          blockTo: args.userId,
          blockBy: requestUser.id,
        },
      ],
    },
  });

  if (blockingOrBlocked) {
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  const where: Prisma.ThoughtWhereInput = {
    contributorId: args.userId,
  };

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first,
    cursorKey: CURSOR_KEY,
  });

  const getThoughts = prisma.thought.findMany({
    where,
    take,
    skip,
    cursor,
    orderBy: {
      cursor: 'desc',
    },
  });

  const getCount = prisma.thought.count({
    where: {
      ...where,
      cursor: {
        lt: after ?? undefined,
      },
    },
  });

  const [thoughts, count] = await Promise.all([getThoughts, getCount]);

  const pageInfo = createPageInfo({
    count,
    first: take,
    after: !!after,
    nodes: thoughts,
    cursorKey: CURSOR_KEY,
  });

  const edges = createEdges<typeof thoughts[number], typeof CURSOR_KEY>({
    nodes: thoughts,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
