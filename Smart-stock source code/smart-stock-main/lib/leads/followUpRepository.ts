import { prisma } from "@/lib/db";

export async function listOpenFollowUpTasksByStore(storeId: string) {
  return prisma.followUpTask.findMany({
    where: { storeId, status: "OPEN" },
    include: { lead: true },
    orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
    take: 100
  });
}
