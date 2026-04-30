-- AlterTable
ALTER TABLE "InboundEvent"
ADD COLUMN "source" TEXT NOT NULL DEFAULT 'UNKNOWN',
ALTER COLUMN "provider" DROP NOT NULL;

-- DropIndex
DROP INDEX IF EXISTS "InboundEvent_businessId_provider_status_idx";

-- CreateIndex
CREATE INDEX "InboundEvent_businessId_source_status_idx" ON "InboundEvent"("businessId", "source", "status");

-- CreateIndex
CREATE INDEX "InboundEvent_provider_idx" ON "InboundEvent"("provider");
