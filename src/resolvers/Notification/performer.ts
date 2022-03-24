import { NotificationResolvers } from '~/generated/graphql';

export const performer: NotificationResolvers['performer'] = async (
  parent,
  _,
  { prisma }
) => {
  const performer = await prisma.notification
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .performer();

  return performer;
};
