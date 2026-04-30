import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";
import { LeadDetailClient } from "@/components/leads/lead-detail-client";

export const metadata: Metadata = {
  title: "Detalle del lead",
  description: "Detalle operativo del lead con estado, interacciones y próximo paso.",
};

type Props = { params: Promise<{ id: string }> };

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const businessId = await getDemoBusinessId();
  if (!businessId) return notFound();

  const lead = await prisma.lead.findFirst({
    where: { id, businessId },
    include: {
      contact: true,
      conversations: { include: { messages: { orderBy: { createdAt: "desc" }, take: 5 } }, orderBy: { updatedAt: "desc" }, take: 1 },
    },
  });

  if (!lead) return notFound();

  const activities = await prisma.activityLog.findMany({
    where: { businessId, entityType: "lead", entityId: lead.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-white">{lead.contact?.displayName ?? "Lead sin contacto"}</h2>
      <p className="text-slate-300">{lead.summary ?? "Sin resumen"}</p>

      <LeadDetailClient leadId={lead.id} currentStatus={lead.status} currentNextActionAt={lead.nextActionAt ? new Date(lead.nextActionAt).toISOString().slice(0, 16) : ""} />

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100">
        <h3 className="mb-2 text-lg font-medium">Contacto</h3>
        <p>{lead.contact?.displayName ?? "Sin contacto"}</p>
        <p>{lead.contact?.phone ?? "Sin teléfono"}</p>
        <p>{lead.contact?.email ?? "Sin email"}</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100">
        <h3 className="mb-2 text-lg font-medium">Últimas interacciones</h3>
        <ul className="space-y-2">
          {(lead.conversations[0]?.messages ?? []).map((message) => (
            <li key={message.id} className="rounded border border-slate-700 p-2">
              <div className="text-xs text-slate-400">{message.direction} · {message.createdAt.toISOString()}</div>
              <div>{message.content ?? "(sin contenido)"}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100">
        <h3 className="mb-2 text-lg font-medium">Actividad manual</h3>
        <ul className="space-y-2">
          {activities.map((item) => (
            <li key={item.id} className="rounded border border-slate-700 p-2 text-sm">
              <div className="text-xs text-slate-400">{item.actionType} · {item.createdAt.toISOString()}</div>
              <div>{typeof item.payloadJson === "object" && item.payloadJson && "note" in item.payloadJson ? String(item.payloadJson.note) : "Sin detalle"}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
