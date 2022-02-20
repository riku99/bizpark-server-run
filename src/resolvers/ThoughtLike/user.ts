import { ThoughtLikeResolvers } from '~/generated/graphql';

export const user: ThoughtLikeResolvers['user'] = async (
  parent,
  _,
  { prisma }
) => {
  const user = await prisma.thoughtLike
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .user();

  return user;
};
