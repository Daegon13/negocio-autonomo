import { prisma } from "@/lib/db";

export const LEAD_STATUS_FILTERS = ["NEW", "CONTACTED", "PENDING", "BOOKED", "LOST", "CLOSED"] as const;

export type LeadStatusFilter = (typeof LEAD_STATUS_FILTERS)[number];

export async function listOperationalLeads(input: { businessId: string; status?: LeadStatusFilter }) {
  return prisma.lead.findMany({
    where: {
      storeId: input.businessId,
      ...(input.status ? { status: input.status } : {})
    },
    orderBy: [{ lastActivityAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      source: true,
      status: true,
      priority: true,
      lastActivityAt: true,
      nextStep: true
    },
    take: 80
  });
}
