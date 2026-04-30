import Link from "next/link";

export default function FollowUpPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Seguimiento</h2>
        <p className="mt-2 text-slate-300">Priorizá próximas acciones para no perder oportunidades.</p>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Sin tareas de seguimiento</h3>
        <p className="mt-2 text-slate-300">
          A medida que ingresen leads, este espacio mostrará tareas pendientes con fecha objetivo y canal recomendado.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/leads" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Ver leads
          </Link>
          <Link href="/dashboard/bookings" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Ver reservas
          </Link>
        </div>
      </article>
    </section>
  );
}
