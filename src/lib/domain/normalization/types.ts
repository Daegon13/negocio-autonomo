export type InboundLead = {
  externalLeadId?: string;
  serviceInterest?: string;
  summary?: string;
};

export type InboundMessage = {
  providerMessageId?: string;
  payloadType?: string;
  content?: string;
  rawPayload?: unknown;
};

export type InboundConversation = {
  externalThreadId?: string;
};

export type NormalizedInboundEvent = {
  displayName: string;
  phone?: string;
  email?: string;
  externalRefsJson?: Record<string, unknown>;
  lead?: InboundLead;
  conversation?: InboundConversation;
  message?: InboundMessage;
};
