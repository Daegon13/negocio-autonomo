import type { Metadata } from "next";
import Link from "next/link";
import { LeadStatus, Priority } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Leads",
  description: "Gestión de leads entrantes por canal, estado y prioridad.",
};

type LeadsPageProps = {
  searchParams?: Promise<{ status?: string; priority?: string; from?: string; to?: string }>;
};

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = (await searchParams) ?? {};
  const businessId = await getDemoBusinessId();

  const status = Object.values(LeadStatus).includes(params.status as LeadStatus) ? (params.status as LeadStatus) : undefined;
  const priority = Object.values(Priority).includes(params.priority as Priority) ? (params.priority as Priority) : undefined;
  const from = params.from ? new Date(`${params.from}T00:00:00.000Z`) : undefined;
  const to = params.to ? new Date(`${params.to}T23:59:59.999Z`) : undefined;

  const leads = businessId
    ? await prisma.lead.findMany({
        where: {
          businessId,
          status,
          priority,
          createdAt: from || to ? { gte: from, lte: to } : undefined,
        },
        include: { contact: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-white">Leads ({leads.length})</h2>

      <form className="grid gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100 md:grid-cols-4" method="get">
        <select name="status" defaultValue={status ?? ""} className="rounded bg-slate-800 p-2">
          <option value="">Estado (todos)</option>
          {Object.values(LeadStatus).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select name="priority" defaultValue={priority ?? ""} className="rounded bg-slate-800 p-2">
          <option value="">Prioridad (todas)</option>
          {Object.values(Priority).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <input name="from" type="date" defaultValue={params.from ?? ""} className="rounded bg-slate-800 p-2" />
        <input name="to" type="date" defaultValue={params.to ?? ""} className="rounded bg-slate-800 p-2" />
        <button type="submit" className="rounded bg-blue-600 px-3 py-2 font-medium md:col-span-4">Aplicar filtros</button>
      </form>

      <ul className="space-y-3">
        {leads.map((lead) => (
          <li key={lead.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200">
            <Link href={`/dashboard/leads/${lead.id}`} className="block hover:text-white">
              <div className="font-medium">{lead.contact?.displayName ?? "Sin contacto"}</div>
              <div>{lead.status} · {lead.priority}</div>
              <div className="text-xs text-slate-400">Creado: {lead.createdAt.toISOString().slice(0, 10)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
