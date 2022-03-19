import { QueryResolvers, CustomErrorResponseCode } from '~/generated/graphql';
import { ForbiddenError, ApolloError } from 'apollo-server-express';

export const newsTalkRoom: QueryResolvers['newsTalkRoom'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const newsTalkRoom = await prisma.newsTalkRoom.findUnique({
    where: {
      id,
    },
  });

  if (!newsTalkRoom) {
    throw new ApolloError(
      'トークルームが見つかりません',
      CustomErrorResponseCode.NotFound
    );
  }

  return newsTalkRoom;
};
