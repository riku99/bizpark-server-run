import { QueryResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const thoughtTalkRoomMessage: QueryResolvers['thoughtTalkRoomMessage'] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  const thoughtTalkRoomMessage = await prisma.thoughtTalkRoomMessage.findUnique(
    {
      where: {
        id,
      },
    }
  );

  return thoughtTalkRoomMessage;
};
