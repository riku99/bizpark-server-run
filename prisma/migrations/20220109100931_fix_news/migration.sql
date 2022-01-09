-- AlterTable
ALTER TABLE "News" ADD COLUMN     "apiSource" TEXT,
ADD COLUMN     "isPicked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "NewsPick" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickerId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "NewsPick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsPick" ADD CONSTRAINT "NewsPick_pickerId_fkey" FOREIGN KEY ("pickerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsPick" ADD CONSTRAINT "NewsPick_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
