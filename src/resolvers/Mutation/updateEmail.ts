import { ForbiddenError } from 'apollo-server-express';
import { MutationResolvers } from '~/generated/graphql';

export const updateEmail: MutationResolvers['updateEmail'] = async (
  _,
  { input },
  { requestUser, prisma }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      email: input.email,
    },
  });

  return true;
};
