"use client";

import { Priority, TaskStatus, TaskType, type FollowUpTask, type Lead } from "@/generated/prisma/browser";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type TaskWithLead = FollowUpTask & { lead: Lead & { contact: { displayName: string | null } | null } };
type LeadWithContact = Lead & { contact: { displayName: string | null } | null };

export function FollowUpBoardClient({ tasks, leads }: { tasks: TaskWithLead[]; leads: LeadWithContact[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newTask, setNewTask] = useState({ leadId: leads[0]?.id ?? "", type: TaskType.FOLLOW_UP, priority: Priority.MEDIUM, dueAt: "", reason: "" });

  async function createTask() {
    if (!newTask.leadId) return;
    await fetch("/api/follow-up/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newTask) });
    startTransition(() => router.refresh());
  }

  async function patchTask(id: string, body: object) {
    await fetch(`/api/follow-up/tasks/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    startTransition(() => router.refresh());
  }

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-white">Seguimiento ({tasks.length})</h2>
      <div className="grid gap-2 rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100 md:grid-cols-5">
        <select className="rounded bg-slate-800 p-2" value={newTask.leadId} onChange={(e) => setNewTask((s) => ({ ...s, leadId: e.target.value }))}>
          {leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.contact?.displayName ?? lead.id}</option>)}
        </select>
        <select className="rounded bg-slate-800 p-2" value={newTask.type} onChange={(e) => setNewTask((s) => ({ ...s, type: e.target.value as TaskType }))}>{Object.values(TaskType).map((item) => <option key={item}>{item}</option>)}</select>
        <select className="rounded bg-slate-800 p-2" value={newTask.priority} onChange={(e) => setNewTask((s) => ({ ...s, priority: e.target.value as Priority }))}>{Object.values(Priority).map((item) => <option key={item}>{item}</option>)}</select>
        <input type="datetime-local" className="rounded bg-slate-800 p-2" value={newTask.dueAt} onChange={(e) => setNewTask((s) => ({ ...s, dueAt: e.target.value }))} />
        <button type="button" className="rounded bg-blue-600 px-3 py-2" onClick={createTask} disabled={isPending}>Crear tarea</button>
        <input className="rounded bg-slate-800 p-2 md:col-span-5" placeholder="Razón" value={newTask.reason} onChange={(e) => setNewTask((s) => ({ ...s, reason: e.target.value }))} />
      </div>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="space-y-2 rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200">
            <div className="font-medium">{task.lead.contact?.displayName ?? task.lead.id} · {task.type} · {task.status}</div>
            <div className="grid gap-2 md:grid-cols-4">
              <select className="rounded bg-slate-800 p-2" value={task.type} onChange={(e) => patchTask(task.id, { type: e.target.value })}>{Object.values(TaskType).map((item) => <option key={item}>{item}</option>)}</select>
              <select className="rounded bg-slate-800 p-2" value={task.priority} onChange={(e) => patchTask(task.id, { priority: e.target.value })}>{Object.values(Priority).map((item) => <option key={item}>{item}</option>)}</select>
              <input type="datetime-local" className="rounded bg-slate-800 p-2" defaultValue={task.dueAt ? new Date(task.dueAt).toISOString().slice(0, 16) : ""} onBlur={(e) => patchTask(task.id, { dueAt: e.target.value || null })} />
              <input className="rounded bg-slate-800 p-2" defaultValue={task.reason ?? ""} onBlur={(e) => patchTask(task.id, { reason: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded bg-emerald-600 px-3 py-2" onClick={() => patchTask(task.id, { status: TaskStatus.DONE })}>DONE</button>
              <button type="button" className="rounded bg-slate-600 px-3 py-2" onClick={() => patchTask(task.id, { status: TaskStatus.DISMISSED })}>DISMISSED</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
