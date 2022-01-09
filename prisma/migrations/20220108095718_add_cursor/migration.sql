/*
  Warnings:

  - A unique constraint covering the columns `[cursor]` on the table `News` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "cursor" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_cursor_key" ON "News"("cursor");
