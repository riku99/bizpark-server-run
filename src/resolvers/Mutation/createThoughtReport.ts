import { ForbiddenError } from 'apollo-server-express';
import { MutationResolvers } from '~/generated/graphql';
import { sendMail } from '~/mailer';

export const createThoughtReport: MutationResolvers['createThoughtReport'] = async (
  _,
  { thoughtId },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('Auth error');
  }

  try {
    await prisma.thoughtReport.create({
      data: {
        reporterId: requestUser.id,
        thoughtId,
      },
    });

    await sendMail({
      address: 'bizpark.app@gmail.com',
      text: `投稿の報告があります。\n報告者ID: ${requestUser.id}\n投稿ID: ${thoughtId}`,
    });
  } catch (e) {}

  return true;
};
