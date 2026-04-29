import { prisma } from "@/lib/db";

export const LEAD_STATUSES = ["NEW", "CONTACTED", "PENDING", "BOOKED", "LOST", "CLOSED"] as const;

export async function listLeadsByStore(storeId: string) {
  return prisma.lead.findMany({
    where: { storeId },
    orderBy: [{ lastActivityAt: "desc" }, { createdAt: "desc" }],
    include: { events: { orderBy: { createdAt: "desc" }, take: 1 } },
    take: 80
  });
}

export async function getLeadDetail(storeId: string, leadId: string) {
  return prisma.lead.findFirst({
    where: { id: leadId, storeId },
    include: { events: { orderBy: { createdAt: "desc" }, take: 30 } }
  });
}

export async function createLead(data: {
  storeId: string; name: string; contact: string; summary?: string; source?: string; priority?: string; nextStep?: string;
}) {
  return prisma.lead.create({
    data: {
      ...data,
      summary: data.summary?.trim() || null,
      source: data.source?.trim() || null,
      priority: data.priority || "MEDIUM",
      nextStep: data.nextStep?.trim() || null,
      events: { create: [{ storeId: data.storeId, type: "CREATED", message: "Lead creado manualmente" }] }
    }
  });
}

export async function changeLeadStatus(storeId: string, leadId: string, status: string) {
  return prisma.$transaction(async (tx) => {
    const lead = await tx.lead.update({
      where: { id: leadId },
      data: { status, lastActivityAt: new Date() }
    });
    await tx.leadEvent.create({ data: { storeId, leadId, type: "STATUS_CHANGED", message: `Estado cambiado a ${status}` } });
    return lead;
  });
}

export async function addLeadNote(storeId: string, leadId: string, note: string) {
  return prisma.$transaction(async (tx) => {
    await tx.lead.update({ where: { id: leadId }, data: { lastActivityAt: new Date() } });
    return tx.leadEvent.create({ data: { storeId, leadId, type: "NOTE_ADDED", message: note.trim() } });
  });
}
