/*
  Warnings:

  - You are about to drop the `ThoughtTalkRoomMessageReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMessageReply" DROP CONSTRAINT "ThoughtTalkRoomMessageReply_replyBy_fkey";

-- DropForeignKey
ALTER TABLE "ThoughtTalkRoomMessageReply" DROP CONSTRAINT "ThoughtTalkRoomMessageReply_replyTo_fkey";

-- AlterTable
ALTER TABLE "ThoughtTalkRoomMessage" ADD COLUMN     "replyTo" INTEGER;

-- DropTable
DROP TABLE "ThoughtTalkRoomMessageReply";
