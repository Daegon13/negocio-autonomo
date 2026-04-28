import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Negocio Autónomo</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Capa operativa para negocios locales de servicios: desde el mensaje entrante hasta la reserva y el seguimiento.
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>• Centralizá la operación del negocio en un flujo corto y claro.</li>
          <li>• Configurá tenant, equipo y control básico sin complejidad extra.</li>
          <li>• Prepará la base para leads, conversaciones y bookings en siguientes patches.</li>
        </ul>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard"><Button>Entrar al producto</Button></Link>
          <Link href="/today"><Button variant="ghost">Ver operación diaria</Button></Link>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Base actual (Patch 00 + 01)</h2>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card><CardContent><div className="text-sm font-semibold text-slate-900">1) Rebase de identidad</div><p className="mt-2 text-sm text-slate-600">Navegación y copy alineados al nuevo producto.</p></CardContent></Card>
        <Card><CardContent><div className="text-sm font-semibold text-slate-900">2) Core Platform</div><p className="mt-2 text-sm text-slate-600">Dashboard, negocio/settings y admin interno mínimo.</p></CardContent></Card>
        <Card><CardContent><div className="text-sm font-semibold text-slate-900">3) Plataforma preparada</div><p className="mt-2 text-sm text-slate-600">Lista para avanzar a dominio real sin ruido retail.</p></CardContent></Card>
      </section>
    </main>
  );
}
