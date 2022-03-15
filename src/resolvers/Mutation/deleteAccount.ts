import { MutationResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const deleteAccount: MutationResolvers['deleteAccount'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  await prisma.user.delete({
    where: {
      id: requestUser.id,
      uid: requestUser.uid,
    },
  });

  // firebase側のアカウントも削除

  return true;
};
