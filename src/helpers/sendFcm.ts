import admin from 'firebase-admin';

type Args = Parameters<ReturnType<typeof admin['messaging']>['sendToDevice']>;

export const sendFcm = async (...args: Args) => {
  await admin.messaging().sendToDevice(...args);
};
