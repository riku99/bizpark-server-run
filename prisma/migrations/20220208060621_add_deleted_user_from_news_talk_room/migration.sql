-- CreateTable
CREATE TABLE "DeletedUserFromNewsTalkRoom" (
    "id" SERIAL NOT NULL,
    "talkRoomId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DeletedUserFromNewsTalkRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeletedUserFromNewsTalkRoom_talkRoomId_userId_idx" ON "DeletedUserFromNewsTalkRoom"("talkRoomId", "userId");

-- AddForeignKey
ALTER TABLE "DeletedUserFromNewsTalkRoom" ADD CONSTRAINT "DeletedUserFromNewsTalkRoom_talkRoomId_fkey" FOREIGN KEY ("talkRoomId") REFERENCES "NewsTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeletedUserFromNewsTalkRoom" ADD CONSTRAINT "DeletedUserFromNewsTalkRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
