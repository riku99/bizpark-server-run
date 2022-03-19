-- DropForeignKey
ALTER TABLE "NewsTalkRoomMessage" DROP CONSTRAINT "NewsTalkRoomMessage_senderId_fkey";

-- AlterTable
ALTER TABLE "NewsTalkRoomMessage" ALTER COLUMN "senderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMessage" ADD CONSTRAINT "NewsTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
