import Link from "next/link";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { getLeadsInbox } from "@/lib/leads/service";
import { createLeadAction, updateLeadStatusAction } from "./actions";

export default async function LeadsPage() {
  const store = await getOrCreateDefaultStore();
  const { leads, counters } = await getLeadsInbox(store.id);

  return <div className="space-y-6">
    <Card><CardHeader><div className="text-lg font-semibold">Bandeja de leads</div><div className="text-sm text-slate-500">Vista simple para priorizar y mover oportunidades.</div></CardHeader>
    <CardContent><div className="flex flex-wrap gap-2 text-xs">{Object.entries(counters).map(([k,v]) => <Badge key={k} variant="neutral">{k}: {v}</Badge>)}</div></CardContent></Card>

    <Card><CardHeader><div className="text-sm font-semibold">Crear lead manual</div></CardHeader><CardContent>
      <form action={createLeadAction} className="grid gap-2 md:grid-cols-2">
        <input name="name" required placeholder="Nombre" className="rounded-xl border px-3 py-2 text-sm" />
        <input name="contact" required placeholder="WhatsApp o email" className="rounded-xl border px-3 py-2 text-sm" />
        <input name="summary" placeholder="Qué busca" className="rounded-xl border px-3 py-2 text-sm md:col-span-2" />
        <input name="source" placeholder="Origen (IG, referido, web...)" className="rounded-xl border px-3 py-2 text-sm" />
        <input name="nextStep" placeholder="Próximo paso" className="rounded-xl border px-3 py-2 text-sm" />
        <select name="priority" className="rounded-xl border px-3 py-2 text-sm"><option>HIGH</option><option selected>MEDIUM</option><option>LOW</option></select>
        <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">Guardar lead</button>
      </form>
    </CardContent></Card>

    <div className="space-y-2">{leads.length===0 ? <Card><CardContent className="p-5 text-sm text-slate-600">No hay leads todavía. Creá uno manual para empezar.</CardContent></Card> : leads.map((lead)=> (
      <Card key={lead.id}><CardContent className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0">
        <Link href={`/leads/${lead.id}`} className="text-sm font-semibold text-slate-900 hover:underline">{lead.name}</Link>
        <div className="text-xs text-slate-500">{lead.contact} · {lead.summary || "Sin resumen"}</div>
        <div className="mt-1 text-xs text-slate-500">{lead.source || "Origen no informado"} · Última actividad: {new Date(lead.lastActivityAt).toLocaleString()}</div>
      </div>
      <div className="shrink-0 space-y-2"><Badge variant="info">{lead.priority}</Badge>
      <form action={updateLeadStatusAction} className="flex gap-2"><input type="hidden" name="leadId" value={lead.id} /><select name="status" defaultValue={lead.status} className="rounded-lg border px-2 py-1 text-xs"> <option>NEW</option><option>CONTACTED</option><option>PENDING</option><option>BOOKED</option><option>LOST</option><option>CLOSED</option></select><button className="rounded-lg border px-2 py-1 text-xs">Mover</button></form></div></div></CardContent></Card>
    ))}</div>
  </div>;
}
