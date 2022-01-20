-- CreateTable
CREATE TABLE "UserThoughtTalkRoomMessageSeen" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserThoughtTalkRoomMessageSeen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserThoughtTalkRoomMessageSeen_userId_messageId_idx" ON "UserThoughtTalkRoomMessageSeen"("userId", "messageId");

-- CreateIndex
CREATE UNIQUE INDEX "UserThoughtTalkRoomMessageSeen_userId_messageId_key" ON "UserThoughtTalkRoomMessageSeen"("userId", "messageId");

-- AddForeignKey
ALTER TABLE "UserThoughtTalkRoomMessageSeen" ADD CONSTRAINT "UserThoughtTalkRoomMessageSeen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserThoughtTalkRoomMessageSeen" ADD CONSTRAINT "UserThoughtTalkRoomMessageSeen_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ThoughtTalkRoomMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
