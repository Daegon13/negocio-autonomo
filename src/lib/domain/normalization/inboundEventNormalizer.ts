import type { NormalizedInboundEvent } from "./types";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function normalizeInboundPayload(payload: unknown): NormalizedInboundEvent {
  const root = asRecord(payload) ?? {};
  const entry = Array.isArray(root.entry) ? asRecord(root.entry[0]) : null;
  const change = entry && Array.isArray(entry.changes) ? asRecord(entry.changes[0]) : null;
  const value = asRecord(change?.value);
  const firstMessage = value && Array.isArray(value.messages) ? asRecord(value.messages[0]) : null;
  const firstContact = value && Array.isArray(value.contacts) ? asRecord(value.contacts[0]) : null;

  const contact = asRecord(root.contact) ?? root;
  const lead = asRecord(root.lead);
  const conversation = asRecord(root.conversation);
  const message = asRecord(root.message);

  const displayName =
    asString(contact.displayName) ??
    asString(contact.name) ??
    asString((contact.firstName ?? "") + " " + (contact.lastName ?? "")) ??
    "Unknown";

  const phone = asString(contact.phone) ?? asString(firstContact?.wa_id) ?? asString(value?.from);
  const email = asString(contact.email);
  const messageText = asString(firstMessage?.text && asRecord(firstMessage.text)?.body) ?? asString(root.messageText);

  return {
    displayName,
    phone,
    email,
    externalRefsJson: {
      externalContactId: asString(contact.externalContactId) ?? asString(root.externalContactId),
      externalLeadId: asString(lead?.externalLeadId) ?? asString(root.externalLeadId),
      externalThreadId: asString(conversation?.externalThreadId) ?? asString(root.externalThreadId),
      providerContactRef: asString(contact.providerContactRef),
    },
    lead: {
      externalLeadId: asString(lead?.externalLeadId) ?? asString(root.externalLeadId),
      serviceInterest: asString(lead?.serviceInterest) ?? asString(root.serviceInterest),
      summary: asString(lead?.summary) ?? asString(root.summary),
    },
    conversation: {
      externalThreadId:
        asString(conversation?.externalThreadId) ?? asString(root.externalThreadId) ?? asString(value?.metadata && asRecord(value.metadata)?.phone_number_id),
    },
    message: message || messageText || root.messageId || firstMessage
      ? {
          providerMessageId: asString(message?.providerMessageId) ?? asString(root.messageId) ?? asString(firstMessage?.id),
          payloadType: asString(message?.payloadType) ?? asString(firstMessage?.type) ?? "text",
          content: asString(message?.content) ?? messageText,
          rawPayload: message ?? firstMessage ?? root,
        }
      : undefined,
  };
}
