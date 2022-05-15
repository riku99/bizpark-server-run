import { MutationResolvers } from '~/generated/graphql';
import { sendMail } from '~/mailer';
import { create4digitNumber } from '~/utils';

export const createEmailAuthCode: MutationResolvers['createEmailAuthCode'] = async (
  _,
  { input },
  { prisma }
) => {
  const value = create4digitNumber();

  const emailAuthCode = await prisma.emailAuthCode.create({
    data: {
      value,
    },
  });

  await sendMail({
    address: input.email,
    text: `認証コードは ${emailAuthCode.value} です。\n有効期限は10分です。\n\nBizpark運営`,
  });

  return emailAuthCode.id;
};
