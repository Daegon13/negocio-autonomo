import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";
import { runFollowUpRules } from "@/lib/domain/services/followUpRules";
import { listOpenFollowUpTasksByStore } from "@/lib/leads/followUpRepository";

export default async function DashboardFollowUpPage() {
  const store = await getOrCreateDefaultStore();
  await runFollowUpRules(store.id);
  const tasks = await listOpenFollowUpTasksByStore(store.id);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><div className="text-lg font-semibold text-slate-900">Seguimiento</div></CardHeader>
        <CardContent className="text-sm text-slate-600">Tareas abiertas de seguimiento comercial.</CardContent>
      </Card>

      {tasks.length === 0 ? (
        <Card><CardContent className="p-6 text-sm text-slate-600">No hay tareas abiertas.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{task.lead.name}</p>
                  <p className="text-xs text-slate-500">{task.taskType} · vence {new Date(task.dueAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge tone="slate">{task.priority}</Badge>
                  <Badge tone="indigo">{task.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
