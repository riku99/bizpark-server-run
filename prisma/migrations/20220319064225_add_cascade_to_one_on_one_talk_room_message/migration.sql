-- DropForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" DROP CONSTRAINT "OneOnOneTalkRoomMessage_senderId_fkey";

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" ADD CONSTRAINT "OneOnOneTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
