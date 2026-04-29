import { notFound } from "next/navigation";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { getLeadOrNull } from "@/lib/leads/service";
import { addLeadNoteAction, updateLeadStatusAction } from "../actions";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = await getOrCreateDefaultStore();
  const lead = await getLeadOrNull(store.id, id);
  if (!lead) notFound();

  return <div className="space-y-6">
    <Card><CardHeader><div className="text-lg font-semibold">{lead.name}</div><div className="text-sm text-slate-500">{lead.contact} · {lead.source || "Origen no informado"}</div></CardHeader>
    <CardContent className="space-y-2"><div className="text-sm text-slate-700">{lead.summary || "Sin resumen."}</div><Badge variant="neutral">Estado actual: {lead.status}</Badge><div className="text-xs text-slate-500">Próximo paso: {lead.nextStep || "No definido"}</div></CardContent></Card>

    <Card><CardHeader><div className="text-sm font-semibold">Acciones rápidas</div></CardHeader><CardContent className="space-y-3">
      <form action={updateLeadStatusAction} className="flex flex-wrap gap-2"><input type="hidden" name="leadId" value={lead.id} /><select name="status" defaultValue={lead.status} className="rounded-lg border px-2 py-1 text-sm"><option>NEW</option><option>CONTACTED</option><option>PENDING</option><option>BOOKED</option><option>LOST</option><option>CLOSED</option></select><button className="rounded-lg bg-slate-900 px-3 py-1 text-sm text-white">Actualizar estado</button></form>
      <form action={addLeadNoteAction} className="space-y-2"><input type="hidden" name="leadId" value={lead.id} /><textarea name="note" required placeholder="Nota interna..." className="min-h-24 w-full rounded-xl border px-3 py-2 text-sm" /><button className="rounded-lg border px-3 py-1 text-sm">Agregar nota</button></form>
    </CardContent></Card>

    <Card><CardHeader><div className="text-sm font-semibold">Historial</div></CardHeader><CardContent>
      <div className="space-y-2">{lead.events.map((event) => <div key={event.id} className="rounded-xl border p-3 text-sm"><div className="font-medium text-slate-800">{event.type}</div><div className="text-slate-600">{event.message}</div><div className="text-xs text-slate-400">{new Date(event.createdAt).toLocaleString()}</div></div>)}</div>
    </CardContent></Card>
  </div>;
}
