-- CreateTable
CREATE TABLE "SubscriptionPurchase" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "receiptId" TEXT NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPurchase_userId_key" ON "SubscriptionPurchase"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPurchase_receiptId_key" ON "SubscriptionPurchase"("receiptId");

-- AddForeignKey
ALTER TABLE "SubscriptionPurchase" ADD CONSTRAINT "SubscriptionPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
