import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const newsTalkRoomMessage: QueryResolvers['newsTalkRoomMessage'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  const newsTalkRoomMessage = await prisma.newsTalkRoomMessage.findUnique({
    where: {
      id,
    },
  });

  return newsTalkRoomMessage;
};
