/*
  Warnings:

  - Added the required column `genre` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NewsGenre" AS ENUM ('BUSINESS', 'ECONOMY', 'POLITICS', 'TECHNOLOGY');

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "articleCreatedAt" TIMESTAMP(3),
ADD COLUMN     "genre" "NewsGenre" NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
