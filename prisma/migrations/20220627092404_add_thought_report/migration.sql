-- CreateTable
CREATE TABLE "ThoughtReport" (
    "id" SERIAL NOT NULL,
    "reporterId" TEXT NOT NULL,
    "thoughtId" TEXT NOT NULL,

    CONSTRAINT "ThoughtReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ThoughtReport_reporterId_thoughtId_key" ON "ThoughtReport"("reporterId", "thoughtId");

-- AddForeignKey
ALTER TABLE "ThoughtReport" ADD CONSTRAINT "ThoughtReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtReport" ADD CONSTRAINT "ThoughtReport_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;
