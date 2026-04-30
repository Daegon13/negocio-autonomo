import { NextRequest, NextResponse } from "next/server";
import { markInboundFailed, markInboundProcessed, receiveInboundEvent } from "@/lib/integrations/webhooks/service";
import { parseMetaEvents, validateMetaChallenge, validateMetaSignature } from "@/lib/integrations/webhooks/meta";

export async function GET(request: NextRequest) {
  const result = validateMetaChallenge(request.nextUrl, process.env.META_WEBHOOK_VERIFY_TOKEN ?? "");
  return new NextResponse(result.response, { status: result.status });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!validateMetaSignature(rawBody, request.headers.get("x-hub-signature-256"), process.env.META_APP_SECRET ?? "")) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  const events = parseMetaEvents(JSON.parse(rawBody));
  for (const event of events) {
    const inbound = await receiveInboundEvent(event);
    try {
      await markInboundProcessed(inbound.id);
    } catch (error) {
      await markInboundFailed(inbound.id, error);
    }
  }

  return NextResponse.json({ ok: true });
}
