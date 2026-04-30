import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/bookings", label: "Agenda" },
  { href: "/dashboard/follow-up", label: "Seguimiento" },
  { href: "/dashboard/channels", label: "Canales" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5">
          <div>
            <p className="text-sm text-cyan-300">Negocio Autónomo</p>
            <h1 className="text-xl font-semibold">Panel operativo</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
