import assert from "node:assert/strict";
import crypto from "node:crypto";
import { parseMetaEvent, verifyMetaChallenge, verifyMetaSignature } from "../lib/integrations/webhooks/meta";
import { parseWhatsappEvent } from "../lib/integrations/webhooks/whatsapp";

function testMetaChallenge() {
  const ok = verifyMetaChallenge(new URL("https://acme.local/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=abc&hub.challenge=42"), "abc");
  assert.equal(ok.ok, true);
  assert.equal(ok.body, "42");

  const bad = verifyMetaChallenge(new URL("https://acme.local/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=x&hub.challenge=42"), "abc");
  assert.equal(bad.ok, false);
}

function testMetaSignature() {
  const raw = JSON.stringify({ ping: "pong" });
  const secret = "shhh";
  const sig = `sha256=${crypto.createHmac("sha256", secret).update(raw).digest("hex")}`;
  assert.equal(verifyMetaSignature(raw, sig, secret), true);
  assert.equal(verifyMetaSignature(raw, sig, "wrong"), false);
}

function testParsers() {
  const meta = parseMetaEvent({ entry: [{ id: "page_1", changes: [{ field: "feed" }] }] });
  assert.equal(meta.length, 1);
  assert.equal(meta[0].externalAccountId, "page_1");

  const wa = parseWhatsappEvent({ entry: [{ changes: [{ field: "messages", value: { metadata: { phone_number_id: "phone_1" } } }] }] });
  assert.equal(wa.length, 1);
  assert.equal(wa[0].externalAccountId, "phone_1");
}

testMetaChallenge();
testMetaSignature();
testParsers();
console.log("webhooks tests: ok");
