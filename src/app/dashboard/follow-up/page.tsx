const followUpQueue = [
  { lead: "Carla Méndez", channel: "WhatsApp", priority: "Alta", status: "Vence hoy", action: "Enviar propuesta final" },
  { lead: "Nicolás Vega", channel: "Instagram", priority: "Media", status: "En curso", action: "Pedir confirmación de horario" },
  { lead: "Sabrina Luna", channel: "Web", priority: "Alta", status: "Atrasado", action: "Llamar y reagendar" },
  { lead: "Matías Costa", channel: "Google", priority: "Baja", status: "Programado", action: "Enviar recordatorio mañana" },
];

export default function FollowUpPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Cola de seguimiento</h2>
        <p className="mt-2 text-slate-300">Ordená tareas por prioridad y estado para no perder oportunidades.</p>
      </div>

      <div className="space-y-3">
        {followUpQueue.map((item) => (
          <article key={item.lead} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-medium text-white">{item.lead}</h3>
              <div className="flex gap-2 text-xs">
                <span className="rounded-md border border-slate-700 px-2 py-1 text-slate-200">{item.priority}</span>
                <span className="rounded-md border border-slate-700 px-2 py-1 text-slate-200">{item.status}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-300">Canal: {item.channel}</p>
            <p className="mt-1 text-slate-200">Acción sugerida: {item.action}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
