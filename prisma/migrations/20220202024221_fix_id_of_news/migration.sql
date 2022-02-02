/*
  Warnings:

  - The primary key for the `News` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `News` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[newsId]` on the table `NewsTalkRoom` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `newsId` on the `NewsPick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newsId` on the `NewsTalkRoom` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "NewsPick" DROP CONSTRAINT "NewsPick_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsTalkRoom" DROP CONSTRAINT "NewsTalkRoom_newsId_fkey";

-- AlterTable
ALTER TABLE "News" DROP CONSTRAINT "News_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "News_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NewsPick" DROP COLUMN "newsId",
ADD COLUMN     "newsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NewsTalkRoom" DROP COLUMN "newsId",
ADD COLUMN     "newsId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsTalkRoom_newsId_key" ON "NewsTalkRoom"("newsId");

-- CreateIndex
CREATE INDEX "NewsTalkRoom_newsId_idx" ON "NewsTalkRoom"("newsId");

-- AddForeignKey
ALTER TABLE "NewsTalkRoom" ADD CONSTRAINT "NewsTalkRoom_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsPick" ADD CONSTRAINT "NewsPick_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
