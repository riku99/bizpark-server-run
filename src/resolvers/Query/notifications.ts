import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { Prisma } from '@prisma/client';
import { createPagenationValues } from '~/helpers/createPagenationValues';
import { createEdges } from '~/helpers/createEdges';
import { createPageInfo } from '~/helpers/createPageInfo';

const DEFAULT_TALE_COUNT = 20;

const CURSOR_KEY = 'id';

export const notifications: QueryResolvers['notifications'] = async (
  _,
  args,
  { requestUser, prisma }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first ?? DEFAULT_TALE_COUNT,
    cursorKey: CURSOR_KEY,
  });

  // ここで日付絞る(?)
  const where: Prisma.NotificationWhereInput = {
    userId: requestUser.id,
  };

  const getNotifications = prisma.notification.findMany({
    where,
    take,
    skip,
    cursor,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const getCount = prisma.notification.count({
    where: {
      ...where,
      id: {
        lt: after ?? undefined,
      },
    },
  });

  const [notifications, count] = await Promise.all([
    getNotifications,
    getCount,
  ]);

  const edges = createEdges<typeof notifications[number], typeof CURSOR_KEY>({
    nodes: notifications,
    cursorKey: CURSOR_KEY,
  });

  const pageInfo = createPageInfo({
    count,
    first: take,
    after,
    nodes: notifications,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
