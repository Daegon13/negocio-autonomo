ALTER TABLE "InboundEvent"
ADD COLUMN "errorContextJson" JSONB;

CREATE UNIQUE INDEX "MessageEvent_businessId_providerMessageId_key"
ON "MessageEvent"("businessId", "providerMessageId");
