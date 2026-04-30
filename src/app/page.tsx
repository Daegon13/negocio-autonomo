import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24 md:py-28">
        <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-sm text-cyan-300">
          MVP para negocios locales de servicios
        </span>

        <div className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Negocio Autónomo</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Convertí mensajes entrantes en reservas: capturá leads, ordená seguimientos y mantené visibilidad del día a
            día comercial desde un mismo panel.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Entrar al dashboard
          </Link>
          <span className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300">
            Sin configuración compleja: foco en operación visible y accionable
          </span>
        </div>
      </section>
    </main>
  );
}
