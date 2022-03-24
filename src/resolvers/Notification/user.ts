import { NotificationResolvers } from '~/generated/graphql';

export const user: NotificationResolvers['user'] = async (
  parent,
  _,
  { prisma }
) => {
  const user = await prisma.notification
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .user();

  return user;
};
