import Link from "next/link";
import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { getLeadsInbox } from "@/lib/leads/service";

export default async function DashboardLeadsPage() {
  const store = await getOrCreateDefaultStore();
  const { leads, counters } = await getLeadsInbox(store.id);

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader><div className="text-lg font-semibold text-slate-900">Bandeja de leads</div></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600">Priorizá contactos entrantes y mantené el seguimiento al día.</p>
          <div className="flex flex-wrap gap-2 text-xs">{Object.entries(counters).map(([k, v]) => <Badge key={k} tone="slate">{k}: {v}</Badge>)}</div>
          <div className="flex gap-2"><Link href="/leads"><Button>Crear lead de prueba</Button></Link><Link href="/leads"><Button variant="outline">Abrir gestión completa</Button></Link></div>
        </CardContent>
      </Card>

      {leads.length === 0 ? (
        <Card><CardContent className="p-6 text-sm text-slate-600">Todavía no hay leads reales. Podés crear un lead de prueba para validar el flujo operativo.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {leads.map((lead) => (
            <Card key={lead.id}><CardContent className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-900">{lead.name}</p><p className="text-xs text-slate-500">{lead.contact} · {lead.summary || "Sin resumen"}</p></div><Badge tone="indigo">{lead.status}</Badge></div></CardContent></Card>
          ))}
        </div>
      )}
    </div>
  );
}
