import Link from "next/link";
import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { getLeadsInbox } from "@/lib/leads/service";

export const dynamic = "force-dynamic";

const demoActivity = [
  "Se creó un lead demo desde la web.",
  "Se movió un lead a pendiente de seguimiento.",
  "Se confirmó una reserva para mañana 10:30."
];

export default async function DashboardPage() {
  const store = await getOrCreateDefaultStore();
  const { leads, counters } = await getLeadsInbox(store.id);

  const pendingFollowUp = (counters.NEW ?? 0) + (counters.PENDING ?? 0);
  const incomingLeads = leads.length;
  const upcomingBookings = counters.BOOKED ?? 0;
  const recentItems = leads.slice(0, 4).map((lead) => `${lead.name} · ${lead.summary || "Consulta sin resumen"}`);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900">Panel operativo</h1>
          <p className="mt-1 text-sm text-slate-600">Vista rápida para decidir qué atender primero en tu negocio.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/dashboard/leads"><Button>Gestionar leads</Button></Link>
            <Link href="/dashboard/settings"><Button variant="outline">Configurar negocio</Button></Link>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Leads entrantes" value={incomingLeads} helper="Total visibles en bandeja" />
        <MetricCard title="Pendientes de seguimiento" value={pendingFollowUp} helper="Estados NEW + PENDING" />
        <MetricCard title="Reservas próximas" value={upcomingBookings} helper="Próximas a partir de hoy" />
        <MetricCard title="Actividad reciente" value={Math.max(recentItems.length, 1)} helper="Últimos movimientos registrados" />
      </section>

      <Card>
        <CardHeader><div className="text-sm font-semibold text-slate-900">Actividad reciente</div></CardHeader>
        <CardContent className="space-y-2">
          {(recentItems.length > 0 ? recentItems : demoActivity).map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{item}</div>
          ))}
          {recentItems.length === 0 ? <Badge tone="slate">Modo demo: todavía no hay actividad real.</Badge> : null}
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, helper }: { title: string; value: number; helper: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-slate-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{helper}</p>
      </CardContent>
    </Card>
  );
}
