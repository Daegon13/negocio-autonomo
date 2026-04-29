import { LEAD_STATUSES, addLeadNote, changeLeadStatus, createLead, getLeadDetail, listLeadsByStore } from "@/lib/leads/repository";

export async function getLeadsInbox(storeId: string) {
  const leads = await listLeadsByStore(storeId);
  const counters = LEAD_STATUSES.reduce<Record<string, number>>((acc, s) => ({ ...acc, [s]: 0 }), {});
  for (const lead of leads) counters[lead.status] = (counters[lead.status] || 0) + 1;
  return { leads, counters };
}

export async function getLeadOrNull(storeId: string, leadId: string) {
  return getLeadDetail(storeId, leadId);
}

export async function createManualLead(input: { storeId: string; name: string; contact: string; summary?: string; source?: string; priority?: string; nextStep?: string; }) {
  return createLead(input);
}

export async function moveLeadStatus(input: { storeId: string; leadId: string; status: string }) {
  if (!LEAD_STATUSES.includes(input.status as (typeof LEAD_STATUSES)[number])) {
    throw new Error("Estado inválido");
  }
  const lead = await getLeadDetail(input.storeId, input.leadId);
  if (!lead) throw new Error("Lead inexistente");
  return changeLeadStatus(input.storeId, input.leadId, input.status);
}

export async function appendLeadNote(input: { storeId: string; leadId: string; note: string }) {
  if (!input.note.trim()) throw new Error("Nota vacía");
  const lead = await getLeadDetail(input.storeId, input.leadId);
  if (!lead) throw new Error("Lead inexistente");
  return addLeadNote(input.storeId, input.leadId, input.note);
}
