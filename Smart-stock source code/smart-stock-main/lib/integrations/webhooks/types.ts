export type WebhookProvider = "meta" | "whatsapp";

export type ParsedWebhookEvent = {
  provider: WebhookProvider;
  externalAccountId: string | null;
  eventType: string | null;
  payload: unknown;
};

export type ChallengeResult = {
  ok: boolean;
  body: string;
  status?: number;
};
