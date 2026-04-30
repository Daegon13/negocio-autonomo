const businessSettings = {
  nombre: "Negocio Autónomo Demo",
  vertical: "Servicios profesionales",
  telefono: "+54 11 5555 0199",
  zonaHoraria: "America/Argentina/Buenos_Aires",
  modoDemo: "Activo",
};

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Configuración del negocio</h2>
        <p className="mt-2 text-slate-300">Datos base para contextualizar la operación comercial.</p>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <dl className="grid gap-4 md:grid-cols-2">
          <div><dt className="text-sm text-slate-400">Nombre</dt><dd className="mt-1 text-lg text-white">{businessSettings.nombre}</dd></div>
          <div><dt className="text-sm text-slate-400">Vertical</dt><dd className="mt-1 text-lg text-white">{businessSettings.vertical}</dd></div>
          <div><dt className="text-sm text-slate-400">Teléfono</dt><dd className="mt-1 text-lg text-white">{businessSettings.telefono}</dd></div>
          <div><dt className="text-sm text-slate-400">Zona horaria</dt><dd className="mt-1 text-lg text-white">{businessSettings.zonaHoraria}</dd></div>
          <div><dt className="text-sm text-slate-400">Estado del modo demo</dt><dd className="mt-1 text-lg text-emerald-300">{businessSettings.modoDemo}</dd></div>
        </dl>
      </article>
    </section>
  );
}
