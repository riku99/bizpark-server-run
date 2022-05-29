import { ForbiddenError } from 'apollo-server-express';
import { MutationResolvers } from '~/generated/graphql';

export const changeReceiveReplyPushNotification: MutationResolvers['changeReceiveReplyPushNotification'] = async (
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
      receiveReplyPushNotification: input.value,
    },
  });

  return {
    ...requestUser,
    receiveReplyPushNotification: input.value,
  };
};
