import { ThoughtResolvers } from '~/generated/graphql';

export const liked: ThoughtResolvers['liked'] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    return null;
  }

  const thoughtLike = await prisma.thoughtLike.findUnique({
    where: {
      userId_thoughtId: {
        userId: requestUser.id,
        thoughtId: parent.id,
      },
    },
  });

  return !!thoughtLike;
};
