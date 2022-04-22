import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const oneOnOneTalkRoomMessage: QueryResolvers['oneOnOneTalkRoomMessage'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  const oneOnOneTalkRoomMessage = await prisma.oneOnOneTalkRoomMessage.findUnique(
    {
      where: {
        id,
      },
    }
  );

  return oneOnOneTalkRoomMessage;
};
