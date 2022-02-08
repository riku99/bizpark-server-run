-- CreateTable
CREATE TABLE "NewsTalkRoomMemberDeleteRequest" (
    "id" SERIAL NOT NULL,
    "talkRoomId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "requestUserId" TEXT NOT NULL,

    CONSTRAINT "NewsTalkRoomMemberDeleteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsTalkRoomMemberDeleteRequest_memberId_requestUserId_key" ON "NewsTalkRoomMemberDeleteRequest"("memberId", "requestUserId");

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMemberDeleteRequest" ADD CONSTRAINT "NewsTalkRoomMemberDeleteRequest_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "NewsTalkRoomMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMemberDeleteRequest" ADD CONSTRAINT "NewsTalkRoomMemberDeleteRequest_talkRoomId_fkey" FOREIGN KEY ("talkRoomId") REFERENCES "NewsTalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTalkRoomMemberDeleteRequest" ADD CONSTRAINT "NewsTalkRoomMemberDeleteRequest_requestUserId_fkey" FOREIGN KEY ("requestUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
