import { ForbiddenError } from 'apollo-server-express';
import { subDays } from 'date-fns';
import { TALKROOM_DISPLAY_LIMIT_DATE } from '~/constants';
import { QueryResolvers } from '~/generated/graphql';

export const oneOnOneTalkRooms: QueryResolvers['oneOnOneTalkRooms'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const talkRooms = await prisma.oneOnOneTalkRoom.findMany({
    where: {
      OR: [
        {
          senderId: requestUser.id,
        },
        {
          recipientId: requestUser.id,
        },
      ],
      messages: {
        some: {}, // 「少なくとも1つはMessageを持つ」 を表す
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
