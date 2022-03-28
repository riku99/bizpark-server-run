/*
  Warnings:

  - Added the required column `receipt` to the `SubscriptionPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionPurchase" ADD COLUMN     "receipt" TEXT NOT NULL;
