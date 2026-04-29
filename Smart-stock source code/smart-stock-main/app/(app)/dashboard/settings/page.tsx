import { Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";

export default async function DashboardSettingsPage() {
  const store = await getOrCreateDefaultStore();

  const profile = {
    name: store.name,
    vertical: "Servicios locales",
    phone: "+54 11 0000-0000",
    timezone: "America/Argentina/Buenos_Aires"
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
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-medium text-slate-900">{value}</p></div>;
}
