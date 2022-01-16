/*
  Warnings:

  - You are about to drop the `TalkRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TalkRoomMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TalkRoom" DROP CONSTRAINT "TalkRoom_thoughtId_fkey";

-- DropForeignKey
ALTER TABLE "TalkRoomMessage" DROP CONSTRAINT "TalkRoomMessage_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TalkRoomMessage" DROP CONSTRAINT "TalkRoomMessage_senderId_fkey";

-- DropTable
DROP TABLE "TalkRoom";

-- DropTable
DROP TABLE "TalkRoomMessage";

-- CreateTable
CREATE TABLE "ThoughtTalkRoom" (
    "id" TEXT NOT NULL,
    "thoughtId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThoughtTalkRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThoughtTalkRoomMessage" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "ThoughtTalkRoomMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThoughtTalkRoomMember" (
    "id" TEXT NOT NULL,
    "talkRoomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThoughtTalkRoomMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ThoughtTalkRoom_thoughtId_idx" ON "ThoughtTalkRoom"("thoughtId");

-- CreateIndex
CREATE INDEX "ThoughtTalkRoomMessage_roomId_idx" ON "ThoughtTalkRoomMessage"("roomId");

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoom" ADD CONSTRAINT "ThoughtTalkRoom_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" ADD CONSTRAINT "ThoughtTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessage" ADD CONSTRAINT "ThoughtTalkRoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ThoughtTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMember" ADD CONSTRAINT "ThoughtTalkRoomMember_talkRoomId_fkey" FOREIGN KEY ("talkRoomId") REFERENCES "ThoughtTalkRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMember" ADD CONSTRAINT "ThoughtTalkRoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
