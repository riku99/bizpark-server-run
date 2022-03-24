import { MutationResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const likeThought: MutationResolvers['likeThought'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const { thought } = await prisma.thoughtLike.upsert({
    where: {
      userId_thoughtId: {
        userId: requestUser.id,
        thoughtId: input.thoughtId,
      },
    },
    create: {
      userId: requestUser.id,
      thoughtId: input.thoughtId,
    },
    update: {},
    select: {
      thought: {
        include: {
          contributor: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (thought.contributor) {
    await prisma.notification.create({
      data: {
        userId: thought.contributor.id,
        performerId: requestUser.id,
        type: 'LIKE',
        thoughtId: input.thoughtId,
      },
    });
  }

  return thought;
};
