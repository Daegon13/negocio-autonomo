import crypto from "node:crypto";
import type { ChallengeResult, ParsedWebhookEvent } from "@/lib/integrations/webhooks/types";

export function verifyMetaChallenge(url: URL, verifyToken: string): ChallengeResult {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return { ok: true, body: challenge };
  }

  return { ok: false, body: "Forbidden", status: 403 };
}

export function verifyMetaSignature(rawBody: string, signatureHeader: string | null, appSecret: string): boolean {
  if (!signatureHeader?.startsWith("sha256=")) return false;
  const expected = `sha256=${crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected));
}

export function parseMetaEvent(payload: any): ParsedWebhookEvent[] {
  const entries = Array.isArray(payload?.entry) ? payload.entry : [];
  return entries.map((entry: any) => ({
    provider: "meta",
    externalAccountId: entry?.id ?? null,
    eventType: entry?.changes?.[0]?.field ?? (entry?.messaging ? "messaging" : "unknown"),
    payload: entry
  }));
}
