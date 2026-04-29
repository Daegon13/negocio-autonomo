import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { prisma } from "@/lib/db";

export default async function DashboardSettingsPage() {
  const activeStore = await getOrCreateDefaultStore();
  const store = await prisma.store.findUnique({
    where: { id: activeStore.id },
    select: {
      name: true,
      organization: { select: { name: true } },
      franchise: { select: { name: true } }
    }
  });

  const profile = {
    name: store?.name ?? activeStore.name,
    vertical: store?.franchise?.name ?? store?.organization?.name ?? "Servicios locales",
    phone: "No configurado",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Configuración del negocio</h1>
        <p className="text-sm text-slate-600">Pantalla base lista para conectar edición completa en Patch 04.</p>
      </div>
      <Card>
        <CardHeader><div className="text-sm font-semibold text-slate-900">Datos principales</div></CardHeader>
        <CardContent className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <Field label="Nombre" value={profile.name} />
          <Field label="Vertical" value={profile.vertical} />
          <Field label="Teléfono" value={profile.phone} />
          <Field label="Zona horaria" value={profile.timezone} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-sm text-slate-600">
          Esta vista es de solo lectura por ahora. Podés continuar en <Link className="text-indigo-700 underline" href="/settings/business">Settings del negocio</Link> para ver contexto tenant actual.
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-medium text-slate-900">{value}</p></div>;
}
