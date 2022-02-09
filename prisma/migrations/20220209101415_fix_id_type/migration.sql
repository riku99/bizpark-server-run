/*
  Warnings:

  - The primary key for the `OneOnOneTalkRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OneOnOneTalkRoom` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OneOnOneTalkRoomMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OneOnOneTalkRoomMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `roomId` on the `OneOnOneTalkRoomMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" DROP CONSTRAINT "OneOnOneTalkRoomMessage_roomId_fkey";

-- AlterTable
ALTER TABLE "OneOnOneTalkRoom" DROP CONSTRAINT "OneOnOneTalkRoom_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OneOnOneTalkRoom_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OneOnOneTalkRoomMessage" DROP CONSTRAINT "OneOnOneTalkRoomMessage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "roomId",
ADD COLUMN     "roomId" INTEGER NOT NULL,
ADD CONSTRAINT "OneOnOneTalkRoomMessage_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "OneOnOneTalkRoomMessage_roomId_idx" ON "OneOnOneTalkRoomMessage"("roomId");

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" ADD CONSTRAINT "OneOnOneTalkRoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "OneOnOneTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
