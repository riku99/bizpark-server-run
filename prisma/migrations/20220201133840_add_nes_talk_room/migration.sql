-- CreateTable
CREATE TABLE "NewsTalkRoom" (
    "id" SERIAL NOT NULL,
    "newsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsTalkRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsTalkRoomMessage" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "replyTo" INTEGER,

    CONSTRAINT "NewsTalkRoomMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsTalkRoom_newsId_key" ON "NewsTalkRoom"("newsId");

-- CreateIndex
CREATE INDEX "NewsTalkRoom_newsId_idx" ON "NewsTalkRoom"("newsId");

-- CreateIndex
CREATE INDEX "NewsTalkRoom_updatedAt_idx" ON "NewsTalkRoom"("updatedAt");

-- CreateIndex
CREATE INDEX "NewsTalkRoomMessage_roomId_idx" ON "NewsTalkRoomMessage"("roomId");

-- AddForeignKey
ALTER TABLE "NewsTalkRoom" ADD CONSTRAINT "NewsTalkRoom_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMessage" ADD CONSTRAINT "NewsTalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMessage" ADD CONSTRAINT "NewsTalkRoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "NewsTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
