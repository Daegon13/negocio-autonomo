const channels = [
  { name: "WhatsApp", status: "Conectado", health: "Sincronización al día", action: "Ver conversaciones" },
  { name: "Instagram", status: "Conectado", health: "2 mensajes sin leer", action: "Ir a bandeja" },
  { name: "Formulario web", status: "Conectado", health: "Captura activa", action: "Ver nuevos leads" },
  { name: "Google Business", status: "Pendiente", health: "Requiere autenticación", action: "Iniciar conexión" },
];

export default function ChannelsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Canales conectados</h2>
        <p className="mt-2 text-slate-300">Estado simulado de fuentes de ingreso de consultas y mensajes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {channels.map((channel) => (
          <article key={channel.name} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">{channel.name}</h3>
              <span className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200">{channel.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{channel.health}</p>
            <button
              type="button"
              className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              {channel.action}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
