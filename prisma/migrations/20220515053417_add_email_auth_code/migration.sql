-- CreateTable
CREATE TABLE "EmailAuthCode" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailAuthCode_pkey" PRIMARY KEY ("id")
);
