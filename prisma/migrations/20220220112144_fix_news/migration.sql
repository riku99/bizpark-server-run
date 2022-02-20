/*
  Warnings:

  - You are about to drop the column `cursor` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `isPicked` on the `News` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "News_cursor_key";

-- DropIndex
DROP INDEX "News_genre_cursor_idx";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "cursor",
DROP COLUMN "isPicked";

-- CreateIndex
CREATE INDEX "News_genre_idx" ON "News"("genre");
