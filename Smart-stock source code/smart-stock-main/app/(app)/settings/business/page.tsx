import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BusinessSettingsPage() {
  const activeStore = await getOrCreateDefaultStore();
  const storeDetails = await prisma.store.findUnique({
    where: { id: activeStore.id },
    select: {
      id: true,
      name: true,
      organizationId: true,
      franchiseId: true,
      organization: { select: { name: true } },
      franchise: { select: { name: true } }
    }
  });

  const store = {
    id: storeDetails?.id ?? activeStore.id,
    name: storeDetails?.name ?? activeStore.name,
    organizationId: storeDetails?.organizationId ?? null,
    franchiseId: storeDetails?.franchiseId ?? null,
    organizationName: storeDetails?.organization?.name ?? "Sin asignar",
    franchiseName: storeDetails?.franchise?.name ?? "Sin asignar"
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Settings del negocio</h1>
        <p className="mt-1 text-sm text-slate-600">Modelo tenant visible para operar el producto por organización, franquicia y local.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Contexto activo</div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p><span className="font-medium">Organización:</span> {store.organizationName}</p>
          <p><span className="font-medium">Franquicia:</span> {store.franchiseName}</p>
          <p><span className="font-medium">Local:</span> {store.name}</p>
          {process.env.NODE_ENV !== "production" ? (
            <p className="text-xs text-slate-500">IDs debug: org={store.organizationId ?? "-"} · franchise={store.franchiseId ?? "-"} · store={store.id}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Ajustes básicos habilitados</div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>• Selección de local activo y aislamiento por tenant listos.</p>
          <p>• Gestión de equipo y sesiones disponibles en settings existentes.</p>
          <div className="pt-1 text-sm">
            <Link href="/settings/team" className="text-indigo-700 underline underline-offset-2">Ir a equipo</Link>
            <span className="px-2">·</span>
            <Link href="/settings/sessions" className="text-indigo-700 underline underline-offset-2">Ir a sesiones</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
