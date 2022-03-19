-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMember" DROP CONSTRAINT "ThoughtTalkRoomMember_userId_fkey";

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMember" ADD CONSTRAINT "ThoughtTalkRoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
