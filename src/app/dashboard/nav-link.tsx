"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-lg border px-3 py-2 text-sm transition ${
        isActive
          ? "border-cyan-300 bg-cyan-400/10 text-cyan-200"
          : "border-slate-700 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"
      }`}
    >
      {children}
    </Link>
  );
}
