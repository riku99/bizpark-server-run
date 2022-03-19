-- DropForeignKey
ALTER TABLE "OneOnOneTalkRoom" DROP CONSTRAINT "OneOnOneTalkRoom_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "OneOnOneTalkRoom" DROP CONSTRAINT "OneOnOneTalkRoom_senderId_fkey";

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoom" ADD CONSTRAINT "OneOnOneTalkRoom_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneTalkRoom" ADD CONSTRAINT "OneOnOneTalkRoom_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
