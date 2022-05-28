import { ForbiddenError } from 'apollo-server-express';
import { subDays } from 'date-fns';
import { TALKROOM_DISPLAY_LIMIT_DATE } from '~/constants';
import { QueryResolvers } from '~/generated/graphql';

export const newsTalkRooms: QueryResolvers['newsTalkRooms'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('aurh error');
  }

  const talkRooms = await prisma.newsTalkRoom.findMany({
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
