/*
  Warnings:

  - The primary key for the `ThoughtTalkRoomMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ThoughtTalkRoomMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,messageId]` on the table `UserThoughtTalkRoomMessageSeen` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `messageId` on the `UserThoughtTalkRoomMessageSeen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "UserThoughtTalkRoomMessageSeen" DROP CONSTRAINT "UserThoughtTalkRoomMessageSeen_messageId_fkey";

-- AlterTable
ALTER TABLE "ThoughtTalkRoomMessage" DROP CONSTRAINT "ThoughtTalkRoomMessage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ThoughtTalkRoomMessage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserThoughtTalkRoomMessageSeen" DROP COLUMN "messageId",
ADD COLUMN     "messageId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "UserThoughtTalkRoomMessageSeen_userId_messageId_idx" ON "UserThoughtTalkRoomMessageSeen"("userId", "messageId");

-- CreateIndex
CREATE UNIQUE INDEX "UserThoughtTalkRoomMessageSeen_userId_messageId_key" ON "UserThoughtTalkRoomMessageSeen"("userId", "messageId");

-- AddForeignKey
ALTER TABLE "UserThoughtTalkRoomMessageSeen" ADD CONSTRAINT "UserThoughtTalkRoomMessageSeen_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ThoughtTalkRoomMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
