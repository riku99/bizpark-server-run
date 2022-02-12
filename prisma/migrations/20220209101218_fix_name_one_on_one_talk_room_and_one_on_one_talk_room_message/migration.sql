/*
  Warnings:

  - You are about to drop the `OneOnOneMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OneOnOneRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OneOnOneMessage" DROP CONSTRAINT "OneOnOneMessage_roomId_fkey";

-- DropForeignKey
ALTER TABLE "OneOnOneMessage" DROP CONSTRAINT "OneOnOneMessage_senderId_fkey";

-- DropForeignKey
ALTER TABLE "OneOnOneRoom" DROP CONSTRAINT "OneOnOneRoom_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "OneOnOneRoom" DROP CONSTRAINT "OneOnOneRoom_senderId_fkey";

-- DropTable
DROP TABLE "OneOnOneMessage";

-- DropTable
DROP TABLE "OneOnOneRoom";

-- CreateTable
CREATE TABLE "OneOnOneTalkRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,

    CONSTRAINT "OneOnOneTalkRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneOnOneTalkRoomMessage" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "OneOnOneTalkRoomMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OneOnOneTalkRoom_senderId_idx" ON "OneOnOneTalkRoom"("senderId");

-- CreateIndex
CREATE INDEX "OneOnOneTalkRoomMessage_roomId_idx" ON "OneOnOneTalkRoomMessage"("roomId");

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoom" ADD CONSTRAINT "OneOnOneTalkRoom_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoom" ADD CONSTRAINT "OneOnOneTalkRoom_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" ADD CONSTRAINT "OneOnOneTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoomMessage" ADD CONSTRAINT "OneOnOneTalkRoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "OneOnOneTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
