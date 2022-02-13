import { MutationResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const addDeviceToken: MutationResolvers['addDeviceToken'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  await prisma.deviceToken.upsert({
    where: {
      token: input.oldToken ?? undefined,
    },
    update: {
      token: input.newToken,
    },
    create: {
      token: input.newToken,
      userId: requestUser.id,
    },
  });

  return true;
};
