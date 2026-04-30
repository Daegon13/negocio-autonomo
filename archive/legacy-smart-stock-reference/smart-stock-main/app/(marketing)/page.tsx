import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-indigo-700">MVP operativo para negocios locales</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Negocio Autónomo</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Captá consultas, ordená leads, hacé seguimiento y convertí reservas desde una sola capa operativa.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button>Ir al dashboard</Button>
          </Link>
          <Link href="/dashboard/leads">
            <Button variant="outline">Ver bandeja de leads</Button>
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Card><CardContent><div className="text-sm font-semibold text-slate-900">Entrada centralizada</div><p className="mt-2 text-sm text-slate-600">Leads entrantes con contexto del contacto y próximo paso.</p></CardContent></Card>
        <Card><CardContent><div className="text-sm font-semibold text-slate-900">Seguimiento claro</div><p className="mt-2 text-sm text-slate-600">Priorización simple para no perder oportunidades por falta de orden.</p></CardContent></Card>
        <Card><CardContent><div className="text-sm font-semibold text-slate-900">Reservas más predecibles</div><p className="mt-2 text-sm text-slate-600">Base lista para conectar agenda, canales y automatizaciones en próximos patches.</p></CardContent></Card>
      </section>
    </main>
  );
}
