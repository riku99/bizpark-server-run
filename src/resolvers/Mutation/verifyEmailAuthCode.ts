import { ApolloError } from 'apollo-server-express';
import { differenceInMinutes } from 'date-fns';
import {
  MutationResolvers,
  VerifyEmailAuthCodeError,
} from '~/generated/graphql';

export const verifyEmailAuthCode: MutationResolvers['verifyEmailAuthCode'] = async (
  _,
  { input, id },
  { prisma }
) => {
  const emailAuthCode = await prisma.emailAuthCode.findFirst({
    where: {
      id,
      email: input.email,
    },
  });

  if (!emailAuthCode) {
    throw new ApolloError('見つかりません', VerifyEmailAuthCodeError.NotFound);
  }

  const minDiff = differenceInMinutes(
    new Date(),
    new Date(emailAuthCode.createdAt)
  );

  if (minDiff > 10) {
    await prisma.emailAuthCode.delete({
      where: {
        id,
      },
    });

    throw new ApolloError(
      '有効期限が切れています',
      VerifyEmailAuthCodeError.Expired
    );
  }

  if (emailAuthCode.value === input.code) {
    await prisma.emailAuthCode.delete({
      where: {
        id,
      },
    });

    return true;
  } else {
    throw new ApolloError(
      'コードが間違っています',
      VerifyEmailAuthCodeError.Invalid
    );
  }
};
