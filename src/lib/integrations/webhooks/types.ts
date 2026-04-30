import type { ChannelProvider } from "../../../../generated/prisma";

export type ParsedWebhookEvent = {
  provider: ChannelProvider;
  externalAccountId: string | null;
  eventType: string;
  payload: unknown;
};

export type ChallengeValidation = {
  ok: boolean;
  response: string;
  status: number;
};
