-- AlterTable
ALTER TABLE "User" ADD COLUMN     "receiveFollowPushNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "receiveOneOnOneTalkRoomMessagePushNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "receiveReplyPushNotification" BOOLEAN NOT NULL DEFAULT true;
