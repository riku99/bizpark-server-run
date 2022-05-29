import { ForbiddenError } from 'apollo-server-express';
import { MutationResolvers } from '~/generated/graphql';

export const changeReceiveFollowPushNotification: MutationResolvers['changeReceiveFollowPushNotification'] = async (
  _,
  { input },
  { requestUser, prisma }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      receiveFollowPushNotification: input.value,
    },
  });

  return {
    ...requestUser,
    receiveFollowPushNotification: input.value,
  };
};
