import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const userResult: QueryResolvers['userResult'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return {
      __typename: 'Deleted',
      message: 'ユーザーが見つかりません',
    };
  }

  return {
    __typename: 'User',
    ...user,
  };
};
