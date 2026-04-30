import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Seguimiento", description: "Cola de seguimiento comercial para convertir leads en reservas." };

export default async function FollowUpPage() {
  const businessId = await getDemoBusinessId();
  const tasks = businessId ? await prisma.followUpTask.findMany({ where: { businessId }, include: { lead: { include: { contact: true } } }, orderBy: [{ status: "asc" }, { dueAt: "asc" }] }) : [];
  return <section className="space-y-6"><h2 className="text-3xl font-semibold text-white">Seguimiento ({tasks.length})</h2><ul className="space-y-3">{tasks.map((task) => <li key={task.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200">{task.lead.contact?.displayName ?? task.lead.id} · {task.type} · {task.status}</li>)}</ul></section>;
}
