import { QueryResolvers, Plan } from '~/generated/graphql';
import { ForbiddenError } from 'apollo-server-express';

export const me: QueryResolvers['me'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  if (!requestUser.loggedIn) {
    await prisma.user.update({
      where: {
        id: requestUser.id,
      },
      data: {
        loggedIn: true,
      },
    });
  }

  const subscriptionPurchace = await prisma.subscriptionPurchase.findUnique({
    where: {
      userId: requestUser.id,
    },
  });

  let plan = requestUser.plan;

  if (subscriptionPurchace && subscriptionPurchace.expireDate > new Date()) {
    if (requestUser.plan !== 'Plus') {
      await prisma.user.update({
        where: {
          id: requestUser.id,
        },
        data: {
          plan: 'Plus',
        },
      });

      plan = 'Plus';
    }
  } else {
    if (requestUser.plan === 'Plus') {
      await prisma.user.update({
        where: {
          id: requestUser.id,
        },
        data: {
          plan: 'Normal',
        },
      });

      plan = 'Normal';
    }
  }

  if (plan !== Plan.Plus) {
    requestUser.instagram = null;
    requestUser.linkedin = null;
    requestUser.facebook = null;
    requestUser.twitter = null;
  }

  return {
    ...requestUser,
    plan,
  };
};
