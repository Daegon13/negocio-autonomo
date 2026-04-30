import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-24 md:py-32">
        <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-sm text-slate-300">
          Plataforma operativa para negocios de servicios
        </span>

        <div className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Negocio Autónomo
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Captá consultas, ordená leads, hacé seguimiento y convertí reservas desde una sola capa operativa.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Ir al dashboard
          </Link>
          <span className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300">
            Primera versión enfocada en visibilidad y operación diaria
          </span>
        </div>

        <article className="mt-6 max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">¿Qué resuelve hoy?</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Negocio Autónomo centraliza el flujo comercial: recepción de contactos, priorización de oportunidades,
            seguimiento activo y confirmación de reservas. Esta base permite ordenar la operación aunque todavía no
            haya integraciones externas ni automatizaciones avanzadas.
          </p>
        </article>
      </section>
    </main>
  );
}
