/*
  Warnings:

  - A unique constraint covering the columns `[talkRoomId,userId]` on the table `ThoughtTalkRoomMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ThoughtTalkRoomMember_talkRoomId_userId_key" ON "ThoughtTalkRoomMember"("talkRoomId", "userId");
