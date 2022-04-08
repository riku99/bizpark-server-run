import {
  MutationResolvers,
  ReceiptVerificationError,
} from '~/generated/graphql';
import { ForbiddenError, ApolloError } from 'apollo-server-express';
import axios from 'axios';
import {
  RECEIPT_VERIFICATION_ENDPOINT_FOR_IOS_PROD,
  RECEIPT_VERIFICATION_ENDPOINT_FOR_IOS_SANDBOX,
} from '~/constants';

export const verifyIapReceipt: MutationResolvers['verifyIapReceipt'] = async (
  _,
  { input },
  { requestUser, prisma }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const body = {
    'receipt-data': input.receipt,
    password: process.env.IAP_SECRET,
    'exclude-old-transactions': true,
  };

  let response;

  try {
    response = await axios.post(
      RECEIPT_VERIFICATION_ENDPOINT_FOR_IOS_PROD,
      body
    );

    if (response.data && response.data.status === 21007) {
      response = await axios.post(
        RECEIPT_VERIFICATION_ENDPOINT_FOR_IOS_SANDBOX,
        body
      );
    }
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  const result = response.data;

  if (result.status !== 0) {
    console.log('Verifying reciept status is ' + result.status);
    throw new Error();
  }

  if (
    !result.receipt ||
    result.receipt.bundle_id !== process.env.APP_BUNDLE_ID
  ) {
    if (!result.receipt) {
      console.log('レシートデータが存在しません');
    } else {
      console.log('BundleId is' + result.receipt.bundle_id);
    }

    throw new Error();
  }

  // 日付を基準に降順で渡されるので最新のもの1つを取得 https://medium.com/@teruhisafukumoto/breaking-changes-appstore-receipt-sort-debda31d5870
  const latestReceipt = result.latest_receipt_info[0];
  if (!latestReceipt) {
    console.log('latestReceiptが存在しません');
    throw new Error();
  }

  const expireDate: number = Number(latestReceipt.expires_date_ms);
  const now: number = Date.now();

  // レシートが期限内であることを確認
  if (now < expireDate) {
    await prisma.subscriptionPurchase.upsert({
      where: {
        userId: requestUser.id,
      },
      create: {
        userId: requestUser.id,
        receiptId: latestReceipt.original_transaction_id,
        expireDate: new Date(expireDate),
        receipt: result.latest_receipt,
        productId: latestReceipt.product_id,
      },
      update: {
        receiptId: latestReceipt.original_transaction_id,
        expireDate: new Date(expireDate),
        receipt: result.latest_receipt,
        productId: latestReceipt.product_id,
      },
    });

    const user = await prisma.user.update({
      where: {
        id: requestUser.id,
      },
      data: {
        plan: 'Plus',
      },
    });

    return user;
  } else {
    console.log('有効期限が切れています');
    throw new ApolloError(
      'レシートの有効期限切れ',
      ReceiptVerificationError.Expiration
    );
  }
};
