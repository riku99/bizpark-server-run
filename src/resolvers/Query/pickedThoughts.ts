import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { createPagenationValues } from '~/helpers/createPagenationValues';
import { createPageInfo } from '~/helpers/createPageInfo';
import { createEdges } from '~/helpers/createEdges';
import { Prisma } from '@prisma/client';

const CURSOR_KEY = 'cursor';

export const pickedThoughts: QueryResolvers['pickedThoughts'] = async (
  _,
  args,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first,
    cursorKey: CURSOR_KEY,
  });

  const where: Prisma.ThoughtWhereInput = {
    picked: {
      some: {
        pickerId: requestUser.id,
      },
    },
  };

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
