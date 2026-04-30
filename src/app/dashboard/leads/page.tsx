import Link from "next/link";

export default function LeadsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Leads</h2>
        <p className="mt-2 text-slate-300">Organizá tus oportunidades por canal, estado y prioridad.</p>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">No hay leads cargados</h3>
        <p className="mt-2 text-slate-300">
          Cuando conectes un canal o ingreses un contacto manualmente, aparecerá aquí con su historial de actividad.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/channels" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Conectar canales
          </Link>
          <Link href="/dashboard/follow-up" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Ver seguimiento
          </Link>
        </div>
      </article>
    </section>
  );
}
