-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" DROP CONSTRAINT "ThoughtTalkRoomMessage_senderId_fkey";

-- AlterTable
ALTER TABLE "ThoughtTalkRoomMessage" ALTER COLUMN "senderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" ADD CONSTRAINT "ThoughtTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
