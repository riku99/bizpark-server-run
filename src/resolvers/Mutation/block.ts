import { ApolloError, ForbiddenError } from 'apollo-server-express';
import { BlockError, MutationResolvers } from '~/generated/graphql';

export const block: MutationResolvers['block'] = async (
  _,
  { blockTo },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const alreadyBlocked = await prisma.block.findUnique({
    where: {
      blockBy_blockTo: {
        blockBy: requestUser.id,
        blockTo,
      },
    },
  });

  if (alreadyBlocked) {
    throw new ApolloError('既にブロックしています', BlockError.AlreadyBlocked);
  }

  const result = await prisma.block.create({
    data: {
      blockBy: requestUser.id,
      blockTo,
    },
    include: {
      blocked: true,
    },
  });

  const isFollowing = await prisma.follow.findUnique({
    where: {
      followerId_followeeId: {
        followerId: requestUser.id,
        followeeId: blockTo,
      },
    },
  });

  if (isFollowing) {
    await prisma.follow.delete({
      where: {
        followerId_followeeId: {
          followerId: requestUser.id,
          followeeId: blockTo,
        },
      },
    });
  }

  return {
    ...result.blocked,
    blocking: true,
    follow: false,
  };
};
