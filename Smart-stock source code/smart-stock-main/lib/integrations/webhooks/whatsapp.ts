import type { ChallengeResult, ParsedWebhookEvent } from "@/lib/integrations/webhooks/types";
import { verifyMetaChallenge, verifyMetaSignature } from "@/lib/integrations/webhooks/meta";

export function verifyWhatsappChallenge(url: URL, verifyToken: string): ChallengeResult {
  return verifyMetaChallenge(url, verifyToken);
}

export function verifyWhatsappSignature(rawBody: string, signatureHeader: string | null, appSecret: string): boolean {
  return verifyMetaSignature(rawBody, signatureHeader, appSecret);
}

export function parseWhatsappEvent(payload: any): ParsedWebhookEvent[] {
  const entries = Array.isArray(payload?.entry) ? payload.entry : [];
  const out: ParsedWebhookEvent[] = [];

  for (const entry of entries) {
    const changes = Array.isArray(entry?.changes) ? entry.changes : [];
    for (const change of changes) {
      const value = change?.value ?? {};
      out.push({
        provider: "whatsapp",
        externalAccountId: value?.metadata?.phone_number_id ?? entry?.id ?? null,
        eventType: change?.field ?? "unknown",
        payload: change
      });
    }
  }

  return out;
}
