import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Panel comercial para captar leads, dar seguimiento y cerrar reservas en negocios de servicios.",
};

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
            Centralizá tus mensajes entrantes, organizá tus leads y llevá seguimiento hasta convertir en reservas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Ir al dashboard
          </Link>
          <Link
            href="/dashboard/leads"
            className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Ver leads
          </Link>
        </div>
      </section>
    </main>
  );
}
