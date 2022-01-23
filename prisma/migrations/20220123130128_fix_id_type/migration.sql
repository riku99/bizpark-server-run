/*
  Warnings:

  - The primary key for the `ThoughtTalkRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ThoughtTalkRoom` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[talkRoomId,userId]` on the table `ThoughtTalkRoomMember` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `talkRoomId` on the `ThoughtTalkRoomMember` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roomId` on the `ThoughtTalkRoomMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMember" DROP CONSTRAINT "ThoughtTalkRoomMember_talkRoomId_fkey";

-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" DROP CONSTRAINT "ThoughtTalkRoomMessage_roomId_fkey";

-- AlterTable
ALTER TABLE "ThoughtTalkRoom" DROP CONSTRAINT "ThoughtTalkRoom_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ThoughtTalkRoom_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ThoughtTalkRoomMember" DROP COLUMN "talkRoomId",
ADD COLUMN     "talkRoomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ThoughtTalkRoomMessage" DROP COLUMN "roomId",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "ThoughtTalkRoomMember_talkRoomId_idx" ON "ThoughtTalkRoomMember"("talkRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "ThoughtTalkRoomMember_talkRoomId_userId_key" ON "ThoughtTalkRoomMember"("talkRoomId", "userId");

-- CreateIndex
CREATE INDEX "ThoughtTalkRoomMessage_roomId_idx" ON "ThoughtTalkRoomMessage"("roomId");

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" ADD CONSTRAINT "ThoughtTalkRoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ThoughtTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMember" ADD CONSTRAINT "ThoughtTalkRoomMember_talkRoomId_fkey" FOREIGN KEY ("talkRoomId") REFERENCES "ThoughtTalkRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
