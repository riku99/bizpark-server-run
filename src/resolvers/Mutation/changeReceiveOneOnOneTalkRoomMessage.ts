import { ForbiddenError } from 'apollo-server-express';
import { MutationResolvers } from '~/generated/graphql';

export const changeReceiveOneOnOneTalkRoomMessage: MutationResolvers['changeReceiveOneOnOneTalkRoomMessage'] = async (
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
      receiveOneOnOneTalkRoomMessage: input.value,
    },
  });

  return {
    ...requestUser,
    receiveOneOnOneTalkRoomMessage: input.value,
  };
};
