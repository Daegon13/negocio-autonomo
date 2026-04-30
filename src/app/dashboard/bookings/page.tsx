import Link from "next/link";

export default function BookingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Reservas</h2>
        <p className="mt-2 text-slate-300">Visualizá citas confirmadas, pendientes y reprogramaciones.</p>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Todavía no hay reservas</h3>
        <p className="mt-2 text-slate-300">
          Cuando un lead confirme fecha y horario, vas a ver la reserva aquí junto con su estado.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/leads" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Revisar leads
          </Link>
          <Link href="/dashboard/follow-up" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Ir a seguimiento
          </Link>
        </div>
      </article>
    </section>
  );
}
