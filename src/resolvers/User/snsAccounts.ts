import { UserResolvers, Plan } from '~/generated/graphql';

export const snsAccounts: UserResolvers['snsAccounts'] = async (
  parent,
  _,
  { prisma }
) => {
  const data = await prisma.user.findUnique({
    where: {
      id: parent.id,
    },
    select: {
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
      plan: true,
    },
  });

  if (!data) {
    return null;
  }

  if (data.plan === Plan.Plus) {
    const { plan, ...snsAccounts } = data;
    return snsAccounts;
  } else {
    return {
      facebook: null,
      twitter: null,
      instagram: null,
      linkedin: null,
    };
  }
};
