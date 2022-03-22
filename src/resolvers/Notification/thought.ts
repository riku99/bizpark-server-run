import { NotificationResolvers } from '~/generated/graphql';

export const thought: NotificationResolvers['thought'] = async (
  parent,
  _,
  { prisma }
) => {
  const thought = await prisma.notification
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .thought();

  return thought;
};
