import { ThoughtLikeResolvers } from '~/generated/graphql';

export const thought: ThoughtLikeResolvers['thought'] = async (
  parent,
  _,
  { prisma }
) => {
  const thought = await prisma.thoughtLike
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .thought();

  return thought;
};
