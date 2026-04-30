import type { ChallengeValidation, ParsedWebhookEvent } from "@/lib/integrations/webhooks/types";
import { validateMetaChallenge, validateMetaSignature } from "@/lib/integrations/webhooks/meta";

export function validateWhatsappChallenge(url: URL, verifyToken: string): ChallengeValidation {
  return validateMetaChallenge(url, verifyToken);
}

export function validateWhatsappSignature(body: string, signature: string | null, appSecret: string): boolean {
  return validateMetaSignature(body, signature, appSecret);
}

export function parseWhatsappEvents(payload: any): ParsedWebhookEvent[] {
  const entries = Array.isArray(payload?.entry) ? payload.entry : [];
  const events: ParsedWebhookEvent[] = [];

  for (const entry of entries) {
    const changes = Array.isArray(entry?.changes) ? entry.changes : [];
    for (const change of changes) {
      const phoneId = change?.value?.metadata?.phone_number_id ?? entry?.id ?? null;
      events.push({
        provider: "WHATSAPP_META",
        externalAccountId: phoneId,
        eventType: change?.field ?? "unknown",
        payload: change,
      });
    }
  }

  return events;
}
