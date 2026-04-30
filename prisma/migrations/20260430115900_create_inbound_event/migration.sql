-- CreateEnum (idempotent for partially-migrated environments)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InboundEventStatus') THEN
    CREATE TYPE "InboundEventStatus" AS ENUM ('PENDING', 'PROCESSED', 'FAILED');
  END IF;
END
$$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "InboundEvent" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "channelConnectionId" TEXT,
    "provider" "ChannelProvider" NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "InboundEventStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InboundEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "InboundEvent_businessId_provider_status_idx" ON "InboundEvent"("businessId", "provider", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "InboundEvent_channelConnectionId_idx" ON "InboundEvent"("channelConnectionId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "InboundEvent_receivedAt_idx" ON "InboundEvent"("receivedAt");

-- AddForeignKey (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'InboundEvent_businessId_fkey') THEN
    ALTER TABLE "InboundEvent"
      ADD CONSTRAINT "InboundEvent_businessId_fkey"
      FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END
$$;

-- AddForeignKey (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'InboundEvent_channelConnectionId_fkey') THEN
    ALTER TABLE "InboundEvent"
      ADD CONSTRAINT "InboundEvent_channelConnectionId_fkey"
      FOREIGN KEY ("channelConnectionId") REFERENCES "ChannelConnection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END
$$;
