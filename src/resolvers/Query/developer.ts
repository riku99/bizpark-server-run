import { ForbiddenError } from 'apollo-server-express';
import { QueryResolvers } from '~/generated/graphql';

export const developer: QueryResolvers['developer'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  const developer = await prisma.user.findFirst({
    where: {
      admin: true,
    },
  });

  return developer;
};
