-- CreateTable
CREATE TABLE "UserNewsTalkRoomMessageSeen" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNewsTalkRoomMessageSeen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserNewsTalkRoomMessageSeen_userId_messageId_idx" ON "UserNewsTalkRoomMessageSeen"("userId", "messageId");

-- AddForeignKey
ALTER TABLE "UserNewsTalkRoomMessageSeen" ADD CONSTRAINT "UserNewsTalkRoomMessageSeen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNewsTalkRoomMessageSeen" ADD CONSTRAINT "UserNewsTalkRoomMessageSeen_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "NewsTalkRoomMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
