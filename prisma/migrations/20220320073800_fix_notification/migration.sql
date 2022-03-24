-- CreateEnum
CREATE TYPE "TalkRoomType" AS ENUM ('THOUGHT', 'NEWS', 'ONEONONE');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "talkRoomId" INTEGER,
ADD COLUMN     "talkRoomType" "TalkRoomType";
