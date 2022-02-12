-- AlterTable
ALTER TABLE "OneOnOneTalkRoomMessage" ADD COLUMN     "replyTo" INTEGER;

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" ADD CONSTRAINT "OneOnOneTalkRoomMessage_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "OneOnOneTalkRoomMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
