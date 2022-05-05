import { MutationResolvers, UnFollowError } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { ApolloError } from 'apollo-server-express';

export const unfollow: MutationResolvers['unfollow'] = async (
  _,
  { followeeId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const targetUser = await prisma.user.findUnique({
    where: {
      id: followeeId,
    },
  });

  if (!targetUser) {
    throw new ApolloError('ユーザーが見つかりません', UnFollowError.NotFound);
  }

  const result = await prisma.follow.delete({
    where: {
      followerId_followeeId: {
        followerId: requestUser.id,
        followeeId,
      },
    },
    include: {
      followee: true,
    },
  });

  return {
    ...result.followee,
    follow: false,
  };
};
