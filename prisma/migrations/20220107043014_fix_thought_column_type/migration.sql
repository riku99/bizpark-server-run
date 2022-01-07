/*
  Warnings:

  - You are about to alter the column `title` on the `Thought` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `text` on the `Thought` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "Thought" ALTER COLUMN "title" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "text" SET DATA TYPE VARCHAR(500);
