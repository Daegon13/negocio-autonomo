import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";
import { FollowUpBoardClient } from "@/components/follow-up/follow-up-board-client";

export const metadata: Metadata = { title: "Seguimiento", description: "Cola de seguimiento comercial para convertir leads en reservas." };

export default async function FollowUpPage() {
  const businessId = await getDemoBusinessId();
  const [tasks, leads] = businessId
    ? await Promise.all([
        prisma.followUpTask.findMany({
          where: { businessId, status: "OPEN" },
          include: { lead: { include: { contact: true } } },
          orderBy: [{ priority: "desc" }, { dueAt: "asc" }, { createdAt: "asc" }],
        }),
        prisma.lead.findMany({ where: { businessId }, include: { contact: true }, orderBy: { createdAt: "desc" }, take: 100 }),
      ])
    : [[], []];

  return <FollowUpBoardClient tasks={tasks} leads={leads} />;
}
