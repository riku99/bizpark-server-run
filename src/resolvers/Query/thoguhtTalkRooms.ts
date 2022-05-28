import { ForbiddenError } from 'apollo-server-express';
import { subDays } from 'date-fns';
import { TALKROOM_DISPLAY_LIMIT_DATE } from '~/constants';
import { QueryResolvers } from '~/generated/graphql';

export const thoughtTalkRooms: QueryResolvers['thoughtTalkRooms'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const talkRooms = await prisma.thoughtTalkRoom.findMany({
    where: {
      members: {
        some: {
          userId: requestUser.id,
        },
      },
      updatedAt: {
        gte: subDays(new Date(), TALKROOM_DISPLAY_LIMIT_DATE),
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return talkRooms;
};
