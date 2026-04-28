import { Card, CardContent, CardHeader } from "@/components/ui";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [users, organizations, stores] = await Promise.all([
    prisma.user.count().catch(() => 0),
    prisma.organization.count().catch(() => 0),
    prisma.store.count().catch(() => 0)
  ]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Admin interno</h1>
        <p className="mt-1 text-sm text-slate-600">Panel mínimo de control técnico para la base del producto.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-slate-900">Usuarios</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{users}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-slate-900">Organizaciones</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{organizations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-slate-900">Locales</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{stores}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Estado</div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>• Auth base y layout general reutilizados sin cambios estructurales agresivos.</p>
          <p>• Dashboard shell y admin shell activos para continuar con Patch 02/03.</p>
          <p>• Sin features de inbox, agenda o integraciones en esta fase.</p>
        </CardContent>
      </Card>
    </div>
  );
}
