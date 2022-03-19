/*
  Warnings:

  - Made the column `senderId` on table `ThoughtTalkRoomMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" DROP CONSTRAINT "ThoughtTalkRoomMessage_senderId_fkey";

-- AlterTable
ALTER TABLE "ThoughtTalkRoomMessage" ALTER COLUMN "senderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" ADD CONSTRAINT "ThoughtTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
