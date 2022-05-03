import { prisma, Prisma } from '~/lib/prisma';
import { verifyIdToken } from '~/auth/verifyIdToken';
import type { ExpressContext } from 'apollo-server-express';
import { User } from '@prisma/client';

export type Context = {
  prisma: Prisma;
  requestUser: User | null;
};

type ContextFunction = (c: ExpressContext) => Promise<Context>;

export const context: ContextFunction = async ({ req }) => {
  if (!req) {
    console.warn('not requested');
  }

  const token = req.headers.authorization?.replace(/^Bearer /, '');
  const sessoin = await verifyIdToken(token);

  let requestUser;
  if (!sessoin) {
    requestUser = null;
  } else {
    requestUser = await prisma.user.findUnique({
      where: {
        uid: sessoin.uid,
      },
    });
  }

  return {
    prisma,
    requestUser,
  };
};
