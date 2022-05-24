import { Prisma } from '@prisma/client';
import { Express } from 'express';
import { prisma } from '~/lib/prisma';

// originalTransactionIdはユーザーのAppStoreアカウント(Appleアカウント)とproductId(課金アイテムを表す)の組み合わせで一意のものである。
// なので複数アカウントを持っている場合、そのアカウントたちのoriginalTransactionIdは基本的に同一である。
// updateManyで更新しているので1つのアカウントのステータスが変わったら、他のアカウントのステータスも影響を受けることになる

export const registerAppStoreEvent = (app: Express) => {
  app.post('/appStoreEvent', async (req, res) => {
    const { body } = req;

    if (process.env.IAP_SECRET !== body.password) {
      console.log('パスワードが違います');
      res.status(403).send('パスワードが間違っています');
      return;
    }

    const notificationType = body.notification_type;
    const recieptData = body.unified_receipt;
    const receipt = recieptData.latest_receipt;
    const latestReceipt = recieptData.latest_receipt_info[0];
    const originalTransactionId = latestReceipt.original_transaction_id;
    const expireDate = Number(latestReceipt.expires_date_ms);
    const productId = latestReceipt.product_id;

    const updateData: Prisma.SubscriptionPurchaseUpdateInput = {
      receipt,
      receiptId: originalTransactionId,
      expireDate: new Date(expireDate),
      productId,
    };

    // DID_RENEW: 自動更新の完了
    if (notificationType === 'DID_RENEW') {
      await prisma.subscriptionPurchase.updateMany({
        where: {
          receiptId: originalTransactionId,
        },
        data: updateData,
      });

      // DID_CHANGE_RENEWAL_STATUS: 様々な更新があった場合に呼ばれる。現在はプランが一つのみでアプグレードやダウングレードは行われないので、期限切れ購読中サブスクを再度購入した場合、AppStoreからサブスクのキャンセル、Appleによる返金が想定されるイベント
    } else if (notificationType === 'DID_CHANGE_RENEWAL_STATUS') {
      await prisma.subscriptionPurchase.updateMany({
        where: {
          receiptId: originalTransactionId,
        },
        data: updateData,
      });

      // CANCEL: アップルサポートが更新をストップし返金が行われた場合。返金が行われた時点で期限を終了させていい
    } else if (notificationType === 'CANCEL') {
      await prisma.subscriptionPurchase.updateMany({
        where: {
          receiptId: originalTransactionId,
        },
        data: {
          expireDate: new Date(),
        },
      });

      // DID_RECOVER: 過去に自動更新が失敗した期限切れサブスクの自動更新が成功した場合
    } else if (notificationType === 'DID_RECOVER') {
      await prisma.subscriptionPurchase.updateMany({
        where: {
          receiptId: originalTransactionId,
        },
        data: updateData,
      });
    }

    res.send();
  });
};
