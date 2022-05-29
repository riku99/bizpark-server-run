import { ForbiddenError } from 'apollo-server-express';
import { MutationResolvers } from '~/generated/graphql';

export const changeReceiveOneOnOneTalkRoomMessagePushNotification: MutationResolvers['changeReceiveOneOnOneTalkRoomMessagePushNotification'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      receiveOneOnOneTalkRoomMessagePushNotification: input.value,
    },
  });

  return {
    ...requestUser,
    receiveOneOnOneTalkRoomMessagePushNotification: input.value,
  };
};
