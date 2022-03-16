import {
  MutationResolvers,
  CustomErrorResponseCode,
} from '~/generated/graphql';
import { ForbiddenError, ApolloError } from 'apollo-server-express';
import admin from 'firebase-admin';

export const deleteAccount: MutationResolvers['deleteAccount'] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: requestUser.id,
      uid: requestUser.uid,
    },
  });

  if (!user) {
    throw new ApolloError(
      'ユーザーが見つかりません',
      CustomErrorResponseCode.InvalidRequest
    );
  }

  await admin.auth().deleteUser(requestUser.uid);

  await prisma.user.delete({
    where: {
      id: requestUser.id,
      uid: requestUser.uid,
    },
  });

  return true;
};
