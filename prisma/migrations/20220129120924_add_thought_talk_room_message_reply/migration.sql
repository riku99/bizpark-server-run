-- CreateTable
CREATE TABLE "ThoughtTalkRoomMessageReply" (
    "id" SERIAL NOT NULL,
    "replyBy" INTEGER NOT NULL,
    "replyTo" INTEGER NOT NULL,

    CONSTRAINT "ThoughtTalkRoomMessageReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ThoughtTalkRoomMessageReply_replyBy_idx" ON "ThoughtTalkRoomMessageReply"("replyBy");

-- CreateIndex
CREATE UNIQUE INDEX "ThoughtTalkRoomMessageReply_replyBy_key" ON "ThoughtTalkRoomMessageReply"("replyBy");

-- CreateIndex
CREATE UNIQUE INDEX "ThoughtTalkRoomMessageReply_replyTo_key" ON "ThoughtTalkRoomMessageReply"("replyTo");

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessageReply" ADD CONSTRAINT "ThoughtTalkRoomMessageReply_replyBy_fkey" FOREIGN KEY ("replyBy") REFERENCES "ThoughtTalkRoomMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtTalkRoomMessageReply" ADD CONSTRAINT "ThoughtTalkRoomMessageReply_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "ThoughtTalkRoomMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
