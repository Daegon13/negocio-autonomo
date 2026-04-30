import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Leads",
  description: "Gestión de leads entrantes por canal, estado y prioridad.",
};

export default async function LeadsPage() {
  const businessId = await getDemoBusinessId();
  const leads = businessId
    ? await prisma.lead.findMany({ where: { businessId }, include: { contact: true }, orderBy: { createdAt: "desc" } })
    : [];

  return <section className="space-y-6"><h2 className="text-3xl font-semibold text-white">Leads ({leads.length})</h2><ul className="space-y-3">{leads.map((lead) => <li key={lead.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200">{lead.contact?.displayName ?? "Sin contacto"} · {lead.status} · {lead.priority}</li>)}</ul></section>;
}
