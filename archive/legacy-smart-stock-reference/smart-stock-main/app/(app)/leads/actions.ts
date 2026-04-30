"use server";

import { revalidatePath } from "next/cache";
import { createManualLead, moveLeadStatus, appendLeadNote } from "@/lib/leads/service";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";

export async function createLeadAction(formData: FormData) {
  const store = await getOrCreateDefaultStore();
  await createManualLead({
    storeId: store.id,
    name: String(formData.get("name") || "").trim(),
    contact: String(formData.get("contact") || "").trim(),
    summary: String(formData.get("summary") || ""),
    source: String(formData.get("source") || ""),
    priority: String(formData.get("priority") || "MEDIUM"),
    nextStep: String(formData.get("nextStep") || "")
  });
  revalidatePath("/leads");
}

export async function updateLeadStatusAction(formData: FormData) {
  const store = await getOrCreateDefaultStore();
  const leadId = String(formData.get("leadId") || "");
  const status = String(formData.get("status") || "");
  await moveLeadStatus({ storeId: store.id, leadId, status });
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);
}

export async function addLeadNoteAction(formData: FormData) {
  const store = await getOrCreateDefaultStore();
  const leadId = String(formData.get("leadId") || "");
  const note = String(formData.get("note") || "");
  await appendLeadNote({ storeId: store.id, leadId, note });
  revalidatePath(`/leads/${leadId}`);
  revalidatePath("/leads");
}
