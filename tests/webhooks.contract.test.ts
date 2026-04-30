import assert from "node:assert/strict";
import crypto from "node:crypto";
import { parseMetaEvents, validateMetaChallenge, validateMetaSignature } from "@/lib/integrations/webhooks/meta";
import { parseWhatsappEvents } from "@/lib/integrations/webhooks/whatsapp";

const ok = validateMetaChallenge(new URL("https://example.com/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=token&hub.challenge=abc"), "token");
assert.equal(ok.ok, true);
assert.equal(ok.response, "abc");

const raw = JSON.stringify({ test: true });
const secret = "my-secret";
const signature = `sha256=${crypto.createHmac("sha256", secret).update(raw).digest("hex")}`;
assert.equal(validateMetaSignature(raw, signature, secret), true);
assert.equal(validateMetaSignature(raw, signature, "other"), false);

const meta = parseMetaEvents({ entry: [{ id: "page_1", changes: [{ field: "messages" }] }] });
assert.equal(meta[0].externalAccountId, "page_1");

const wa = parseWhatsappEvents({ entry: [{ changes: [{ field: "messages", value: { metadata: { phone_number_id: "phone_1" } } }] }] });
assert.equal(wa[0].externalAccountId, "phone_1");
