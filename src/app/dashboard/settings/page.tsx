const preferences = [
  { label: "Nombre comercial", value: "Negocio Autónomo Demo" },
  { label: "Zona horaria", value: "America/Argentina/Buenos_Aires" },
  { label: "Idioma de atención", value: "Español" },
  { label: "Horario operativo", value: "Lun a Sáb · 08:00 a 20:00" },
];

const toggles = [
  { name: "Recordatorios automáticos", enabled: true },
  { name: "Alertas de leads prioritarios", enabled: true },
  { name: "Resumen diario por email", enabled: false },
];

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Preferencias visibles</h2>
        <p className="mt-2 text-slate-300">Configuración de interfaz para la operación (sin persistencia backend).</p>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Datos del negocio</h3>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {preferences.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-slate-400">{item.label}</dt>
              <dd className="mt-1 text-slate-100">{item.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Preferencias operativas</h3>
        <ul className="mt-4 space-y-3">
          {toggles.map((toggle) => (
            <li key={toggle.name} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
              <span className="text-slate-200">{toggle.name}</span>
              <span className="text-sm text-slate-300">{toggle.enabled ? "Activado" : "Desactivado"}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
