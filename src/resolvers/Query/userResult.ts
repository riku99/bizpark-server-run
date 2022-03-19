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

  const blocked = await prisma.block.findFirst({
    where: {
      blockTo: requestUser.id,
      blockBy: id,
    },
  });

  if (blocked) {
    return {
      __typename: 'IsBlocked',
      blockedByUser: {
        id: user.id,
        name: user.name,
        imageUrl: user.imageUrl,
      },
    };
  }

  return {
    __typename: 'User',
    ...user,
  };
};
