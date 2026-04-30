const metrics = [
  { title: "Leads recibidos", value: "24", detail: "+8 desde ayer" },
  { title: "Seguimientos hoy", value: "11", detail: "4 urgentes" },
  { title: "Reservas de la semana", value: "16", detail: "12 confirmadas" },
  { title: "Canales activos", value: "4", detail: "3 conectados, 1 pendiente" },
];

const recentActivity = [
  "WhatsApp: Ana López pidió disponibilidad para manicura.",
  "Web: ingresó lead para instalación de aire acondicionado.",
  "Reserva confirmada para mañana 09:30 (servicio de plomería).",
  "Seguimiento reprogramado: Laura Díaz para hoy 18:15.",
];

const quickActions = [
  "Crear nuevo lead",
  "Registrar reserva manual",
  "Marcar seguimiento como completado",
  "Revisar estado de canales",
];

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-white">Overview operativo</h2>
        <p className="mt-2 text-slate-300">KPIs clave, actividad reciente y accesos rápidos para operar el día.</p>
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

      <div className="grid gap-4 lg:grid-cols-2">
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

        <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-medium text-white">Accesos rápidos</h3>
          <div className="mt-4 grid gap-3">
            {quickActions.map((action) => (
              <button
                key={action}
                type="button"
                className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-left text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                {action}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
