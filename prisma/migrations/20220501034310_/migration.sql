-- CreateTable
CREATE TABLE "NewsEndpointAccessToken" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsEndpointAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsEndpointAccessToken_value_key" ON "NewsEndpointAccessToken"("value");
