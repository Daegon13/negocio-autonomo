const metrics = [
  { title: "Leads entrantes", value: "18", detail: "6 nuevos en las últimas 24h" },
  { title: "Pendientes de seguimiento", value: "9", detail: "3 con prioridad alta" },
  { title: "Reservas próximas", value: "7", detail: "4 confirmadas para mañana" },
  { title: "Canales conectados", value: "3", detail: "WhatsApp, Instagram y Web" },
];

const recentActivity = [
  "Lucía Gómez respondió por WhatsApp y pidió propuesta.",
  "Reserva confirmada: limpieza profunda para viernes 10:30.",
  "Nuevo lead desde landing: Mateo Ruiz (instalación).",
  "Seguimiento pendiente de Carla Méndez programado para hoy 18:00.",
];

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-white">Resumen operativo</h2>
        <p className="mt-2 text-slate-300">Vista rápida del estado comercial y de reservas del negocio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.title} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{metric.title}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-300">{metric.detail}</p>
          </article>
        ))}
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Actividad reciente</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          {recentActivity.map((item) => (
            <li key={item} className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
