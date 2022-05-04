import { UserResolvers } from '~/generated/graphql';

export const blocked: UserResolvers['blocked'] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const blocked = await prisma.block.findFirst({
    where: {
      blockTo: requestUser?.id,
      blockBy: parent.id,
    },
  });

  return !!blocked;
};
