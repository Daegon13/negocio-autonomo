import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/bookings", label: "Reservas" },
  { href: "/dashboard/follow-up", label: "Seguimiento" },
  { href: "/dashboard/channels", label: "Canales" },
  { href: "/dashboard/settings", label: "Preferencias" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Negocio Autónomo</p>
          <h1 className="mt-2 text-xl font-semibold text-white">Panel comercial</h1>
          <p className="mt-1 text-sm text-slate-300">Leads, seguimiento y reservas en una sola vista.</p>

          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          <header className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-300">Operación diaria</p>
                <p className="text-lg font-medium text-white">Vista ejecutiva del negocio</p>
              </div>
              <Link
                href="/"
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Volver al inicio
              </Link>
            </div>
          </header>

          <main className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
