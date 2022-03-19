-- DropForeignKey
ALTER TABLE "NewsTalkRoomMember" DROP CONSTRAINT "NewsTalkRoomMember_userId_fkey";

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMember" ADD CONSTRAINT "NewsTalkRoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
