/*
  Warnings:

  - You are about to drop the column `facebook` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Socials" AS ENUM ('FACEBOOK', 'TWITTER', 'LINKEDIN', 'INSTAGRAM');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "twitter";

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "Socials" NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
