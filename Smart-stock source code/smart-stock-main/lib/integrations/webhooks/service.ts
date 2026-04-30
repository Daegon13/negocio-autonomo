import { prisma } from "@/lib/db";
import type { ParsedWebhookEvent, WebhookProvider } from "@/lib/integrations/webhooks/types";

const MAX_ERROR_LEN = 1000;

async function resolveConnection(provider: WebhookProvider, externalAccountId: string | null) {
  if (!externalAccountId) return null;
  return prisma.channelConnection.findUnique({
    where: { provider_externalAccountId: { provider, externalAccountId } }
  });
}

export async function persistInboundEvent(event: ParsedWebhookEvent) {
  const connection = await resolveConnection(event.provider, event.externalAccountId);
  const fallbackStore = connection ? null : await prisma.store.findFirst({ orderBy: { createdAt: "asc" } });

  if (!connection && !fallbackStore) {
    throw new Error("No se pudo resolver Store para webhook entrante");
  }

  const storeId = connection?.storeId ?? fallbackStore!.id;

  const inbound = await prisma.inboundEvent.create({
    data: {
      storeId,
      channelConnectionId: connection?.id ?? null,
      provider: event.provider,
      eventType: event.eventType,
      payload: JSON.stringify(event.payload),
      status: "PENDING"
    }
  });

  await prisma.auditLog.create({
    data: {
      storeId,
      role: "SYSTEM",
      action: "WEBHOOK_RECEIVED",
      entity: "InboundEvent",
      entityId: inbound.id,
      payload: JSON.stringify({ provider: event.provider, eventType: event.eventType })
    }
  });

  return inbound;
}

export async function markInboundProcessed(inboundEventId: string) {
  const inbound = await prisma.inboundEvent.update({
    where: { id: inboundEventId },
    data: {
      status: "PROCESSED",
      attempts: { increment: 1 },
      lastError: null
    }
  });

  await prisma.auditLog.create({
    data: {
      storeId: inbound.storeId,
      role: "SYSTEM",
      action: "WEBHOOK_PROCESSED",
      entity: "InboundEvent",
      entityId: inboundEventId
    }
  });
}

export async function markInboundFailed(inboundEventId: string, error: unknown) {
  const lastError = error instanceof Error ? error.message : "Unknown webhook processing error";

  const inbound = await prisma.inboundEvent.update({
    where: { id: inboundEventId },
    data: {
      status: "FAILED",
      attempts: { increment: 1 },
      lastError: lastError.slice(0, MAX_ERROR_LEN)
    }
  });

  await prisma.auditLog.create({
    data: {
      storeId: inbound.storeId,
      role: "SYSTEM",
      action: "WEBHOOK_FAILED",
      entity: "InboundEvent",
      entityId: inboundEventId,
      payload: JSON.stringify({ lastError: inbound.lastError })
    }
  });
}
