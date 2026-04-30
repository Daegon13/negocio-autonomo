import Link from "next/link";
import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { LEAD_STATUS_FILTERS, listOperationalLeads, type LeadStatusFilter } from "@/lib/operationalRepository";

function isLeadStatus(value?: string): value is LeadStatusFilter {
  return !!value && LEAD_STATUS_FILTERS.includes(value as LeadStatusFilter);
}

export default async function DashboardLeadsPage({
  searchParams
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const selectedStatus = isLeadStatus(params?.status) ? params?.status : undefined;

  try {
    const store = await getOrCreateDefaultStore();
    const leads = await listOperationalLeads({ businessId: store.id, status: selectedStatus });

    return (
      <div className="space-y-5">
        <Card>
          <CardHeader><div className="text-lg font-semibold text-slate-900">Bandeja de leads</div></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-600">Priorizá contactos entrantes y mantené el seguimiento al día.</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/dashboard/leads"><Badge tone={selectedStatus ? "slate" : "indigo"}>Todos</Badge></Link>
              {LEAD_STATUS_FILTERS.map((status) => (
                <Link key={status} href={`/dashboard/leads?status=${status}`}>
                  <Badge tone={selectedStatus === status ? "indigo" : "slate"}>{status}</Badge>
                </Link>
              ))}
            </div>
            <div className="flex gap-2"><Link href="/leads"><Button>Crear lead de prueba</Button></Link><Link href="/leads"><Button variant="outline">Abrir gestión completa</Button></Link></div>
          </CardContent>
        </Card>

        {leads.length === 0 ? (
          <Card><CardContent className="p-6 text-sm text-slate-600">No hay leads para mostrar{selectedStatus ? ` en estado ${selectedStatus}` : ""}.</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {leads.map((lead) => (
              <Card key={lead.id}><CardContent className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-900">{lead.name}</p><p className="text-xs text-slate-500">{lead.source || "Origen sin especificar"}</p><p className="text-xs text-slate-500">Última actividad: {new Date(lead.lastActivityAt).toLocaleString()} · Próxima acción: {lead.nextStep || "Sin próxima acción"}</p></div><div className="flex gap-2"><Badge tone="slate">{lead.priority}</Badge><Badge tone="indigo">{lead.status}</Badge></div></div></CardContent></Card>
            ))}
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-rose-700">
          No pudimos cargar los leads en este momento. Reintentá en unos segundos.
        </CardContent>
      </Card>
    );
  }
}
