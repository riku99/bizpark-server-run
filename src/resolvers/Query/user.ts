import { QueryResolvers, UserGetError } from '~/generated/graphql';
import { ForbiddenError, ApolloError } from 'apollo-server-express';

export const user: QueryResolvers['user'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  let user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApolloError('ユーザーが存在しません', UserGetError.NotFound);
  }

  const blocked = await prisma.block.findFirst({
    where: {
      blockTo: requestUser.id,
      blockBy: id,
    },
  });

  if (blocked) {
    throw new ApolloError('ブロックされています', UserGetError.Blocked);
  }

  return user;
};
