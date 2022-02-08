-- AddForeignKey
ALTER TABLE "NewsTalkRoomMessage" ADD CONSTRAINT "NewsTalkRoomMessage_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "NewsTalkRoomMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
