import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Resumen", description: "Vista general de leads, seguimiento, reservas y canales de Negocio Autónomo." };

export default async function DashboardPage() {
  const businessId = await getDemoBusinessId();
  const [leads, conversations, tasksOpen, bookings] = businessId
    ? await Promise.all([
        prisma.lead.count({ where: { businessId } }),
        prisma.conversation.count({ where: { businessId } }),
        prisma.followUpTask.count({ where: { businessId, status: "OPEN" } }),
        prisma.booking.count({ where: { businessId } }),
      ])
    : [0, 0, 0, 0];

  return <section className="space-y-6"><h2 className="text-3xl font-semibold text-white">Resumen operativo</h2><div className="grid gap-3 md:grid-cols-2">{[["Leads", leads],["Conversaciones", conversations],["Seguimientos abiertos", tasksOpen],["Reservas", bookings]].map(([k,v]) => <article key={String(k)} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200"><p>{k}</p><p className="text-2xl text-white">{v}</p></article>)}</div></section>;
}
