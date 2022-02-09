-- AlterTable
ALTER TABLE "OneOnOneTalkRoomMessage" ADD COLUMN     "seen" BOOLEAN;

-- CreateIndex
CREATE INDEX "OneOnOneTalkRoom_recipientId_idx" ON "OneOnOneTalkRoom"("recipientId");
