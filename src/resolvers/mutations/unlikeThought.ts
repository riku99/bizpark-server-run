import { MutationResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const unlikeThought: MutationResolvers['unlikeThought'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  try {
    const { thought } = await prisma.thoughtLike.delete({
      where: {
        userId_thoughtId: {
          userId: requestUser.id,
          thoughtId: input?.thoughtId,
        },
      },
      select: {
        thought: true,
      },
    });

    return thought;
  } catch (e) {
    return null;
  }
};
