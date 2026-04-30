import Link from "next/link";

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Ajustes</h2>
        <p className="mt-2 text-slate-300">Configurá identidad comercial y preferencias operativas.</p>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Configuración inicial pendiente</h3>
        <p className="mt-2 text-slate-300">
          Este entorno no tiene datos guardados todavía. Definí zona horaria, canales y reglas de notificación para empezar.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/channels" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Configurar canales
          </Link>
          <Link href="/dashboard" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Volver al resumen
          </Link>
        </div>
      </article>
    </section>
  );
}
