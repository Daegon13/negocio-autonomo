import Link from "next/link";
import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { prisma } from "@/lib/db";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const activeStore = await getOrCreateDefaultStore();
  const storeDetails = await prisma.store.findUnique({
    where: { id: activeStore.id },
    select: {
      id: true,
      name: true,
      organization: { select: { name: true } }
    }
  });

  const storeName = storeDetails?.name ?? activeStore.name;
  const orgName = storeDetails?.organization?.name ?? "Sin asignar";

  const [teamMembers, activeSessions] = await Promise.all([
    prisma.storeMember.count({ where: { storeId: activeStore.id } }),
    prisma.session.count()
  ]);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600" />
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Negocio Autónomo</h1>
              <p className="mt-1 text-sm text-slate-600">
                Base operativa para captar trabajo, hacer seguimiento, reservar y medir lo esencial.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <Badge tone="slate">Tenant activo</Badge>
                <span>Local: {storeName}</span>
                <span>•</span>
                <span>Organización: {orgName}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/today">
                <Button>Ir a operación diaria</Button>
              </Link>
              <Link href="/settings/business">
                <Button variant="outline">Abrir settings</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-slate-900">Canales y eventos</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Pendiente para Patch 02. La base ya está lista para conectar entradas reales.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-slate-900">Equipo activo</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{teamMembers}</div>
            <p className="mt-1 text-sm text-slate-600">Miembros asociados al local actual.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-slate-900">Sesiones</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{activeSessions}</div>
            <p className="mt-1 text-sm text-slate-600">Sesiones registradas en la plataforma.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Roadmap de implementación habilitado</div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>✅ Core Platform lista para continuar con leads, conversaciones, bookings y seguimiento.</p>
          <p>🧩 Los módulos heredados de retail quedan aislados en la sección “Módulos heredados”.</p>
          <p>🛑 No se activó lógica de CRM/inbox/agenda real en este patch.</p>
        </CardContent>
      </Card>
    </div>
  );
}
