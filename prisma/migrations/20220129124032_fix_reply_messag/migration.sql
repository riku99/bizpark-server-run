/*
  Warnings:

  - A unique constraint covering the columns `[replyTo]` on the table `ThoughtTalkRoomMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ThoughtTalkRoomMessage_replyTo_key" ON "ThoughtTalkRoomMessage"("replyTo");

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" ADD CONSTRAINT "ThoughtTalkRoomMessage_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "ThoughtTalkRoomMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
