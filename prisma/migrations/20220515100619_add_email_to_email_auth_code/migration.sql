/*
  Warnings:

  - Added the required column `email` to the `EmailAuthCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailAuthCode" ADD COLUMN     "email" TEXT NOT NULL;
