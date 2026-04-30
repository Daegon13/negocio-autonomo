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
  const contact = asRecord(root.contact) ?? root;
  const lead = asRecord(root.lead);
  const conversation = asRecord(root.conversation);
  const message = asRecord(root.message);

  const displayName =
    asString(contact.displayName) ??
    asString(contact.name) ??
    asString((contact.firstName ?? "") + " " + (contact.lastName ?? "")) ??
    "Unknown";

  const phone = asString(contact.phone);
  const email = asString(contact.email);

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
      externalThreadId: asString(conversation?.externalThreadId) ?? asString(root.externalThreadId),
    },
    message: message || root.messageText || root.messageId
      ? {
          providerMessageId: asString(message?.providerMessageId) ?? asString(root.messageId),
          payloadType: asString(message?.payloadType) ?? "text",
          content: asString(message?.content) ?? asString(root.messageText),
          rawPayload: message ?? root,
        }
      : undefined,
  };
}
