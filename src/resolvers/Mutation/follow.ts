import { ApolloError, ForbiddenError } from 'apollo-server-express';
import {
  FollowError,
  MutationResolvers,
  PushNotificationFollowData,
  PushNotificationFollowDataType,
} from '~/generated/graphql';
import { getDeviceTokens } from '~/helpers/getDeviceTokens';
import { sendFcm } from '~/helpers/sendFcm';

export const follow: MutationResolvers['follow'] = async (
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
    throw new ApolloError('ユーザーが存在しません', FollowError.NotFound);
  }

  const [blocking, blocked] = await Promise.all([
    prisma.block.findUnique({
      where: {
        blockBy_blockTo: {
          blockBy: requestUser.id,
          blockTo: followeeId,
        },
      },
    }),
    prisma.block.findUnique({
      where: {
        blockBy_blockTo: {
          blockBy: targetUser.id,
          blockTo: requestUser.id,
        },
      },
    }),
  ]);

  if (blocking) {
    throw new ApolloError('ブロックしています', FollowError.Blocking);
  }

  if (blocked) {
    throw new ApolloError('ブロックされています', FollowError.Blokced);
  }

  const result = await prisma.follow.create({
    data: {
      followeeId,
      followerId: requestUser.id,
    },
    include: {
      followee: true,
    },
  });

  await prisma.notification.create({
    data: {
      userId: followeeId,
      performerId: requestUser.id,
      type: 'FOLLOW',
    },
  });

  if (targetUser.loggedIn && targetUser.receiveFollowPushNotification) {
    const tokens = await getDeviceTokens(targetUser.id);
    const notificationData: PushNotificationFollowData = {
      type: PushNotificationFollowDataType.Follow,
      userId: targetUser.id,
    };

    if (tokens.length) {
      await sendFcm(tokens, {
        notification: {
          title: 'フォローされました',
          sound: 'default',
        },
        data: notificationData,
      });
    }
  }

  return {
    ...result.followee,
    follow: true,
  };
};
