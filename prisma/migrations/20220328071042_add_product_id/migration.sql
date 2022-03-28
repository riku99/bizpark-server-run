/*
  Warnings:

  - Added the required column `productId` to the `SubscriptionPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionPurchase" ADD COLUMN     "productId" TEXT NOT NULL;
