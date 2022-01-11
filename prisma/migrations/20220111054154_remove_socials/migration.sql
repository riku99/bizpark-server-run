/*
  Warnings:

  - You are about to drop the `Social` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- DropTable
DROP TABLE "Social";

-- DropEnum
DROP TYPE "Socials";
