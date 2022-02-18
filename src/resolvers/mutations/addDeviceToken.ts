import { MutationResolvers } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const addDeviceToken: MutationResolvers['addDeviceToken'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  if (input.oldToken) {
    await prisma.deviceToken.upsert({
      where: {
        token: input.oldToken,
      },
      update: {
        token: input.newToken,
      },
      create: {
        token: input.newToken,
        userId: requestUser.id,
      },
    });
  } else {
    try {
      await prisma.deviceToken.create({
        data: {
          token: input.newToken,
          userId: requestUser.id,
        },
      });
    } catch (e) {
      // 仮にユニークエラー出ても知らせなくていい
    }
  }

  return true;
};
