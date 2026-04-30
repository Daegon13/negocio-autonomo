import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Canales",
  description: "Estado de canales de captura para mensajes y leads entrantes.",
};

export default function ChannelsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Canales</h2>
        <p className="mt-2 text-slate-300">Conectá orígenes de mensajes para iniciar la captura de leads.</p>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">No hay canales conectados</h3>
        <p className="mt-2 text-slate-300">
          Al activar WhatsApp, Instagram o formularios web, veremos aquí el estado de sincronización y eventos entrantes.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/settings" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Revisar ajustes
          </Link>
          <Link href="/dashboard/leads" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-300">
            Ir a leads
          </Link>
        </div>
      </article>
    </section>
  );
}
