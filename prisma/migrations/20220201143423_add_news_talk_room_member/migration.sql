-- CreateTable
CREATE TABLE "NewsTalkRoomMember" (
    "id" SERIAL NOT NULL,
    "talkRoomId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsTalkRoomMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsTalkRoomMember_talkRoomId_idx" ON "NewsTalkRoomMember"("talkRoomId");

-- CreateIndex
CREATE INDEX "NewsTalkRoomMember_userId_idx" ON "NewsTalkRoomMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsTalkRoomMember_talkRoomId_userId_key" ON "NewsTalkRoomMember"("talkRoomId", "userId");

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMember" ADD CONSTRAINT "NewsTalkRoomMember_talkRoomId_fkey" FOREIGN KEY ("talkRoomId") REFERENCES "NewsTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMember" ADD CONSTRAINT "NewsTalkRoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
