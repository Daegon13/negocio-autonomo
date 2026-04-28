"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Badge, Button, Sticker } from "@/components/ui";

type NavItem = { href: string; label: string; icon: string; hint?: string };

const CORE_NAV: NavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: "🏠", hint: "Resumen operativo" },
  { href: "/today", label: "Operación diaria", icon: "🧭", hint: "Siguiente paso" },
  { href: "/settings/business", label: "Negocio", icon: "🏢", hint: "Tenant y ajustes" },
  { href: "/settings/team", label: "Equipo", icon: "👥", hint: "Roles y accesos" }
];

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Admin interno", icon: "🛠️", hint: "Estado de plataforma" }
];

const LEGACY_NAV: NavItem[] = [
  { href: "/import", label: "Importaciones (legacy)", icon: "⬆️" },
  { href: "/products", label: "Productos (legacy)", icon: "📦" },
  { href: "/suppliers", label: "Proveedores (legacy)", icon: "🏭" },
  { href: "/categories", label: "Categorías (legacy)", icon: "🏷️" },
  { href: "/stock", label: "Stock (legacy)", icon: "📉" },
  { href: "/orders", label: "Pedidos (legacy)", icon: "🧾" },
  { href: "/movements", label: "Movimientos (legacy)", icon: "🔄" },
  { href: "/reconcile", label: "Conciliación (legacy)", icon: "🔎" },
  { href: "/aliases", label: "Aliases (legacy)", icon: "🔁" },
  { href: "/assistant", label: "Asistente (legacy)", icon: "🤖" }
];

const LS = {
  senior: "ss_ui_senior",
  simple: "ss_ui_simple"
};

function readBool(key: string, fallback: boolean) {
  if (typeof window === "undefined") return fallback;
  const v = window.localStorage.getItem(key);
  if (v === null) return fallback;
  return v === "true";
}

function writeBool(key: string, value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value ? "true" : "false");
}

function useUiPrefs() {
  const [senior, setSenior] = React.useState(false);
  const [simple, setSimple] = React.useState(false);

  React.useEffect(() => {
    setSenior(readBool(LS.senior, false));
    setSimple(readBool(LS.simple, false));
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("ss-senior", senior);
    writeBool(LS.senior, senior);
  }, [senior]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("ss-simple", simple);
    writeBool(LS.simple, simple);
  }, [simple]);

  return { senior, setSenior, simple, setSimple };
}

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={
        "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition " +
        (active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100")
      }
    >
      <span className="flex min-w-0 items-center gap-2">
        <span aria-hidden className="shrink-0">
          {item.icon}
        </span>
        <span className="truncate">{item.label}</span>
      </span>
      {item.hint ? <span className={"ml-2 hidden text-xs md:inline " + (active ? "text-white/80" : "text-slate-400")}>{item.hint}</span> : null}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [legacyOpen, setLegacyOpen] = React.useState(false);
  const { senior, setSenior, simple, setSimple } = useUiPrefs();

  const showDevBanners =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_DEV_BANNERS === "true";

  React.useEffect(() => {
    setMobileOpen(false);
    if (!LEGACY_NAV.some((n) => pathname === n.href || pathname.startsWith(n.href + "/"))) {
      setLegacyOpen(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setMobileOpen((v) => !v)}>
            ☰
          </Button>
          <span className="text-sm font-bold text-slate-900">Negocio Autónomo</span>
          {showDevBanners ? (
            <Badge tone="slate" className="ml-1">
              Dev
            </Badge>
          ) : null}
        </div>
        <Link href="/dashboard" className="text-xs text-slate-500">
          Ir al inicio
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[280px_1fr]">
        <aside
          className={
            "border-r border-slate-200 bg-white md:sticky md:top-0 md:h-screen " +
            (mobileOpen ? "block" : "hidden md:block")
          }
        >
          <div className="flex h-full flex-col p-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Sticker tone="purple">✨</Sticker>
                <div>
                  <div className="text-sm font-bold text-slate-900">Negocio Autónomo</div>
                  <div className="text-xs text-slate-500">Capa operativa local</div>
                </div>
              </Link>
              {showDevBanners ? <Badge tone="slate">MVP</Badge> : null}
            </div>

            <div className="mt-4 space-y-1" aria-label="Navegación">
              {CORE_NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return <NavLink key={item.href} item={item} active={active} onClick={() => setMobileOpen(false)} />;
              })}
            </div>

            <div className="mt-4 space-y-1" aria-label="Admin">
              {ADMIN_NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return <NavLink key={item.href} item={item} active={active} onClick={() => setMobileOpen(false)} />;
              })}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className={
                  "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition " +
                  (legacyOpen ? "border-slate-300 bg-slate-50 text-slate-900" : "border-slate-200 text-slate-700 hover:bg-slate-50")
                }
                onClick={() => setLegacyOpen((v) => !v)}
                aria-expanded={legacyOpen}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>🗃️</span>
                  Módulos heredados
                </span>
                <span aria-hidden className="text-xs">
                  {legacyOpen ? "▲" : "▼"}
                </span>
              </button>
              {legacyOpen ? (
                <div className="mt-2 space-y-1">
                  {LEGACY_NAV.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return <NavLink key={item.href} item={item} active={active} onClick={() => setMobileOpen(false)} />;
                  })}
                </div>
              ) : null}
            </div>

            <div className="mt-auto pt-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 ss-card">
                <div className="text-xs font-semibold text-slate-700">Accesibilidad</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button
                    variant={senior ? "soft" : "outline"}
                    onClick={() => setSenior((v) => !v)}
                    aria-pressed={senior}
                  >
                    {senior ? "✓ " : ""}Texto grande
                  </Button>
                  <Button
                    variant={simple ? "soft" : "outline"}
                    onClick={() => setSimple((v) => !v)}
                    aria-pressed={simple}
                  >
                    {simple ? "✓ " : ""}Modo simple
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="p-4 md:p-6 ss-section">{children}</main>
      </div>
    </div>
  );
}
