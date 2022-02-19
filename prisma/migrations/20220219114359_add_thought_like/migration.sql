-- CreateTable
CREATE TABLE "ThoughtLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "thoughtId" TEXT NOT NULL,

    CONSTRAINT "ThoughtLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ThoughtLike_userId_thoughtId_key" ON "ThoughtLike"("userId", "thoughtId");

-- AddForeignKey
ALTER TABLE "ThoughtLike" ADD CONSTRAINT "ThoughtLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtLike" ADD CONSTRAINT "ThoughtLike_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;
