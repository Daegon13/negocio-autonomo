import { ActivityActorType, InboundEventStatus } from "../../../../generated/prisma";
import { prisma } from "@/lib/db/prisma";
import type { ParsedWebhookEvent } from "@/lib/integrations/webhooks/types";

export async function resolveChannelConnection(provider: string, externalAccountId: string | null) {
  if (!externalAccountId) return null;
  return prisma.channelConnection.findFirst({ where: { provider: provider as any, externalAccountId } });
}

export async function receiveInboundEvent(event: ParsedWebhookEvent) {
  const connection = await resolveChannelConnection(event.provider, event.externalAccountId);
  if (!connection) throw new Error("ChannelConnection not found for externalAccountId");

  const inbound = await prisma.inboundEvent.create({
    data: {
      businessId: connection.businessId,
      channelConnectionId: connection.id,
      source: event.provider,
      provider: event.provider,
      eventType: event.eventType,
      payload: event.payload as any,
      status: InboundEventStatus.PENDING,
    },
  });

  await prisma.activityLog.create({
    data: {
      businessId: connection.businessId,
      entityType: "InboundEvent",
      entityId: inbound.id,
      actionType: "WEBHOOK_RECEIVED",
      actorType: ActivityActorType.SYSTEM,
      payloadJson: { provider: event.provider, eventType: event.eventType },
    },
  });

  return inbound;
}

export async function markInboundProcessed(eventId: string) {
  const updated = await prisma.inboundEvent.update({
    where: { id: eventId },
    data: { status: InboundEventStatus.PROCESSED, attempts: { increment: 1 }, lastError: null },
  });

  await prisma.activityLog.create({
    data: {
      businessId: updated.businessId,
      entityType: "InboundEvent",
      entityId: updated.id,
      actionType: "WEBHOOK_PROCESSED",
      actorType: ActivityActorType.SYSTEM,
    },
  });
}

export async function markInboundFailed(eventId: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  const updated = await prisma.inboundEvent.update({
    where: { id: eventId },
    data: {
      status: InboundEventStatus.FAILED,
      attempts: { increment: 1 },
      lastError: message.slice(0, 1000),
    },
  });

  await prisma.activityLog.create({
    data: {
      businessId: updated.businessId,
      entityType: "InboundEvent",
      entityId: updated.id,
      actionType: "WEBHOOK_FAILED",
      actorType: ActivityActorType.SYSTEM,
      payloadJson: { error: updated.lastError },
    },
  });
}
