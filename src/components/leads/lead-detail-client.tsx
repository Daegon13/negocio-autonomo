"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LeadStatus } from "@prisma/client";

type Props = {
  leadId: string;
  currentStatus: LeadStatus;
  currentNextActionAt: string;
};

export function LeadDetailClient({ leadId, currentStatus, currentNextActionAt }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus);
  const [nextActionAt, setNextActionAt] = useState(currentNextActionAt);
  const [note, setNote] = useState("");

  async function updateStatus(value: LeadStatus) {
    setStatus(value);
    await fetch(`/api/leads/${leadId}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: value }) });
    startTransition(() => router.refresh());
  }

  async function saveNextAction() {
    await fetch(`/api/leads/${leadId}/next-action`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nextActionAt }) });
    startTransition(() => router.refresh());
  }

  async function addActivity() {
    if (!note.trim()) return;
    await fetch(`/api/leads/${leadId}/activity`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ note }) });
    setNote("");
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100">
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm">Estado</label>
        <select className="rounded bg-slate-800 p-2" disabled={isPending} value={status} onChange={(e) => updateStatus(e.target.value as LeadStatus)}>
          {Object.values(LeadStatus).map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <label className="text-sm">Próximo paso</label>
        <input type="datetime-local" value={nextActionAt} onChange={(e) => setNextActionAt(e.target.value)} className="rounded bg-slate-800 p-2" />
        <button type="button" onClick={saveNextAction} className="rounded bg-blue-600 px-3 py-2" disabled={isPending}>Guardar</button>
      </div>

      <div className="space-y-2">
        <label className="text-sm">Registrar nota/actividad</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded bg-slate-800 p-2" rows={3} />
        <button type="button" onClick={addActivity} className="rounded bg-emerald-600 px-3 py-2" disabled={isPending}>Agregar actividad</button>
      </div>
    </div>
  );
}
