import Link from "next/link";
import { Badge, Button, Card, CardContent, CardHeader, Sticker } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";

type Step = {
  title: string;
  hint: string;
  eta: string;
  href: string;
  status: "ready" | "pending";
};

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const store = await getOrCreateDefaultStore();

  const steps: Step[] = [
    {
      title: "Paso 1: Revisar canales conectados",
      hint: "Definí de dónde van a llegar mensajes y leads.",
      eta: "2 min",
      href: "/settings/business",
      status: "ready"
    },
    {
      title: "Paso 2: Definir operación y equipo",
      hint: "Ajustá negocio, roles y accesos del local activo.",
      eta: "3 min",
      href: "/settings/team",
      status: "ready"
    },
    {
      title: "Paso 3: Validar plataforma",
      hint: "Verificá estado interno antes de sumar funcionalidades.",
      eta: "1 min",
      href: "/admin",
      status: "ready"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600" />
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Sticker tone="amber">🧭 Operación diaria</Sticker>
                <div className="text-sm font-semibold text-slate-900">{store.name}</div>
              </div>
              <div className="mt-1 text-sm text-slate-600">Checklist corta para mantener control operativo sin ruido.</div>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Volver al inicio</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title}>
            <CardHeader>
              <div className="text-sm font-semibold text-slate-900">{step.title}</div>
              <div className="text-xs text-slate-500">Tiempo estimado: {step.eta}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{step.hint}</p>
              <div className="mt-2">{step.status === "ready" ? <Badge variant="ok">Listo</Badge> : <Badge variant="soon">Pendiente</Badge>}</div>
              <Link href={step.href} className="mt-3 inline-block w-full">
                <Button className="w-full">Abrir</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Módulos heredados</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Las pantallas de inventario/retail siguen disponibles solo como legado técnico, fuera del flujo principal del MVP.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
