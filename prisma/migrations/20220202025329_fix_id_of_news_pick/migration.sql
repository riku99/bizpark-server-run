/*
  Warnings:

  - The primary key for the `NewsPick` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `NewsPick` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "NewsPick" DROP CONSTRAINT "NewsPick_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "NewsPick_pkey" PRIMARY KEY ("id");
