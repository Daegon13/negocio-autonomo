import crypto from "node:crypto";
import type { ChallengeValidation, ParsedWebhookEvent } from "@/lib/integrations/webhooks/types";

export function validateMetaChallenge(url: URL, verifyToken: string): ChallengeValidation {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return { ok: true, response: challenge, status: 200 };
  }

  return { ok: false, response: "forbidden", status: 403 };
}

export function validateMetaSignature(body: string, signature: string | null, appSecret: string): boolean {
  if (!signature?.startsWith("sha256=") || !appSecret) return false;
  const digest = crypto.createHmac("sha256", appSecret).update(body).digest("hex");
  const expected = `sha256=${digest}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function parseMetaEvents(payload: any): ParsedWebhookEvent[] {
  const entries = Array.isArray(payload?.entry) ? payload.entry : [];
  return entries.map((entry: any) => ({
    provider: "WHATSAPP_META",
    externalAccountId: entry?.id ?? null,
    eventType: entry?.changes?.[0]?.field ?? "unknown",
    payload: entry,
  }));
}
