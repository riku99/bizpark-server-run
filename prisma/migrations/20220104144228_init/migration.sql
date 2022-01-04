-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('BUSINESS', 'ECONOMY', 'POLITICS', 'SOCIETY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loggedIn" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thought" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cursor" SERIAL NOT NULL,
    "genre" "Genre" NOT NULL,

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThoughtImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "thoughtId" TEXT NOT NULL,

    CONSTRAINT "ThoughtImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalkRoom" (
    "id" TEXT NOT NULL,
    "thoughtId" TEXT,
    "newsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TalkRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalkRoomMessage" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "TalkRoomMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneOnOneRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,

    CONSTRAINT "OneOnOneRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneOnOneMessage" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "OneOnOneMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "blockBy" TEXT NOT NULL,
    "blockTo" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pick" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickerId" TEXT NOT NULL,
    "thoughtId" TEXT NOT NULL,

    CONSTRAINT "Pick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Thought_cursor_key" ON "Thought"("cursor");

-- CreateIndex
CREATE INDEX "Thought_genre_cursor_idx" ON "Thought"("genre", "cursor");

-- CreateIndex
CREATE INDEX "Thought_contributorId_cursor_idx" ON "Thought"("contributorId", "cursor");

-- CreateIndex
CREATE INDEX "ThoughtImage_thoughtId_idx" ON "ThoughtImage"("thoughtId");

-- CreateIndex
CREATE INDEX "TalkRoom_thoughtId_idx" ON "TalkRoom"("thoughtId");

-- CreateIndex
CREATE INDEX "TalkRoomMessage_roomId_idx" ON "TalkRoomMessage"("roomId");

-- CreateIndex
CREATE INDEX "OneOnOneRoom_senderId_idx" ON "OneOnOneRoom"("senderId");

-- CreateIndex
CREATE INDEX "OneOnOneMessage_roomId_idx" ON "OneOnOneMessage"("roomId");

-- CreateIndex
CREATE INDEX "Block_blockBy_blockTo_idx" ON "Block"("blockBy", "blockTo");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockBy_blockTo_key" ON "Block"("blockBy", "blockTo");

-- CreateIndex
CREATE INDEX "Pick_pickerId_idx" ON "Pick"("pickerId");

-- CreateIndex
CREATE INDEX "Pick_thoughtId_idx" ON "Pick"("thoughtId");

-- CreateIndex
CREATE UNIQUE INDEX "Pick_pickerId_thoughtId_key" ON "Pick"("pickerId", "thoughtId");

-- AddForeignKey
ALTER TABLE "Thought" ADD CONSTRAINT "Thought_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtImage" ADD CONSTRAINT "ThoughtImage_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkRoom" ADD CONSTRAINT "TalkRoom_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkRoom" ADD CONSTRAINT "TalkRoom_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkRoomMessage" ADD CONSTRAINT "TalkRoomMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkRoomMessage" ADD CONSTRAINT "TalkRoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "TalkRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneRoom" ADD CONSTRAINT "OneOnOneRoom_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneRoom" ADD CONSTRAINT "OneOnOneRoom_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneMessage" ADD CONSTRAINT "OneOnOneMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneMessage" ADD CONSTRAINT "OneOnOneMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "OneOnOneRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockBy_fkey" FOREIGN KEY ("blockBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockTo_fkey" FOREIGN KEY ("blockTo") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_pickerId_fkey" FOREIGN KEY ("pickerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;
