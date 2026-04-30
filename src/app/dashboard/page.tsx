import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resumen",
  description: "Vista general de leads, seguimiento, reservas y canales de Negocio Autónomo.",
};

const crossLinks = [
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/bookings", label: "Reservas" },
  { href: "/dashboard/follow-up", label: "Seguimiento" },
  { href: "/dashboard/channels", label: "Canales" },
  { href: "/dashboard/settings", label: "Ajustes" },
];

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-white">Resumen operativo</h2>
        <p className="mt-2 text-slate-300">Tu operación está lista. Conectá canales y empezá a capturar actividad real.</p>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-medium text-white">Sin datos todavía</h3>
        <p className="mt-2 text-slate-300">
          Aún no hay leads, seguimientos ni reservas registradas en este entorno. Cuando lleguen eventos entrantes,
          este panel mostrará métricas y actividad reciente.
        </p>
      </article>

      <div>
        <h3 className="text-lg font-medium text-white">Ir a secciones</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {crossLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
