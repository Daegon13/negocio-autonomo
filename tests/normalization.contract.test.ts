import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { normalizeInboundPayload } from "@/lib/domain/normalization/inboundEventNormalizer";

function loadFixture(fileName: string) {
  const fixturePath = path.join(process.cwd(), "tests", "fixtures", "inbound-events", "v1", fileName);
  return JSON.parse(fs.readFileSync(fixturePath, "utf8"));
}

const whatsappFixture = loadFixture("whatsapp-message.json");
const normalizedWhatsapp = normalizeInboundPayload(whatsappFixture);
assert.equal(normalizedWhatsapp.phone, "59811112222");
assert.equal(normalizedWhatsapp.message?.providerMessageId, "wamid-001");
assert.equal(normalizedWhatsapp.message?.content, "Hola, quiero reservar");

const internalFixture = loadFixture("internal-ingestion-lead.json");
const normalizedInternal = normalizeInboundPayload(internalFixture);
assert.equal(normalizedInternal.displayName, "Carlos Gómez");
assert.equal(normalizedInternal.lead?.externalLeadId, "lead_123");
assert.equal(normalizedInternal.conversation?.externalThreadId, "thread_123");
