import { prisma } from '~/lib/prisma';

export const getDeviceTokens = async (userId: string) => {
  return prisma.deviceToken
    .findMany({
      where: {
        userId,
      },
      select: {
        token: true,
      },
    })
    .then((tokens) => tokens.map(({ token }) => token));
};
