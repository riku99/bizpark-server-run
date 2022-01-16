/*
  Warnings:

  - A unique constraint covering the columns `[thoughtId]` on the table `ThoughtTalkRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ThoughtTalkRoom_thoughtId_key" ON "ThoughtTalkRoom"("thoughtId");
