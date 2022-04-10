import { Express } from 'express';
import { prisma } from '~/lib/prisma';
import { Prisma } from '@prisma/client';

export const registerAppStoreEvent = (app: Express) => {
  app.post('/appStoreEvent', async (req, res) => {
    const { body } = req;

    console.log('😆 body is ');
    console.log(body);

    console.log('IAP_SECRET is ' + process.env.IAP_SECRET);

    if (process.env.IAP_SECRET !== body.password) {
      console.log('パスワードが違います');
      console.log('Password is ' + body.password);
      res.status(403).send('パスワードが間違っています');
    }

    const notificationType = body.notification_type;
    const recieptData = body.unified_receipt;
    const receipt = recieptData.latest_receipt;
    const latestReceipt = recieptData.latest_receipt_info[0];
    const originalTransactionId = latestReceipt.original_transaction_id;
    const expireDate = Number(latestReceipt.expires_date_ms);
    const productId = latestReceipt.product_id;

    console.log('notificationType is ' + notificationType);
    console.log(latestReceipt);

    const updateData: Prisma.SubscriptionPurchaseUpdateInput = {
      receipt,
      receiptId: originalTransactionId,
      expireDate: new Date(expireDate),
      productId,
    };

    // DID_RENEW: 自動更新の完了
    if (notificationType === 'DID_RENEW') {
      await prisma.subscriptionPurchase.update({
        where: {
          receiptId: originalTransactionId,
        },
        data: updateData,
      });

      // DID_CHANGE_RENEWAL_STATUS: 様々な更新があった場合に呼ばれる。現在はプランが一つのみでアプグレードやダウングレードは行われないので、期限切れ購読中サブスクを再度購入した場合、AppStoreからサブスクのキャンセル、Appleによる返金が想定されるイベント
    } else if (notificationType === 'DID_CHANGE_RENEWAL_STATUS') {
      await prisma.subscriptionPurchase.update({
        where: {
          receiptId: originalTransactionId,
        },
        data: updateData,
      });

      // CANCEL: アップルサポートが更新をストップし返金が行われた場合。返金が行われた時点で期限を終了させていい
    } else if (notificationType === 'CANCEL') {
      await prisma.subscriptionPurchase.update({
        where: {
          receiptId: originalTransactionId,
        },
        data: {
          expireDate: new Date(),
        },
      });

      // DID_RECOVER: 過去に自動更新が失敗した期限切れサブスクの自動更新が成功した場合
    } else if (notificationType === 'DID_RECOVER') {
      await prisma.subscriptionPurchase.update({
        where: {
          receiptId: originalTransactionId,
        },
        data: updateData,
      });
    }

    res.send();
  });
};
