-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMember" DROP CONSTRAINT "ThoughtTalkRoomMember_talkRoomId_fkey";

-- DropIndex
DROP INDEX "ThoughtTalkRoomMessage_roomId_idx";

-- CreateIndex
CREATE INDEX "ThoughtTalkRoom_updatedAt_idx" ON "ThoughtTalkRoom"("updatedAt");

-- CreateIndex
CREATE INDEX "ThoughtTalkRoomMessage_roomId_createdAt_idx" ON "ThoughtTalkRoomMessage"("roomId", "createdAt");

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMember" ADD CONSTRAINT "ThoughtTalkRoomMember_talkRoomId_fkey" FOREIGN KEY ("talkRoomId") REFERENCES "ThoughtTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
