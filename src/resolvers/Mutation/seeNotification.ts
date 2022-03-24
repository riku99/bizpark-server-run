import { MutationResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const seeNotification: MutationResolvers['seeNotification'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const notification = await prisma.notification.update({
    where: {
      id,
    },
    data: {
      seen: true,
    },
  });

  return notification;
};
