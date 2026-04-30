import { NextRequest, NextResponse } from "next/server";
import { markInboundFailed, markInboundProcessed, receiveInboundEvent } from "@/lib/integrations/webhooks/service";
import { parseWhatsappEvents, validateWhatsappChallenge, validateWhatsappSignature } from "@/lib/integrations/webhooks/whatsapp";

export async function GET(request: NextRequest) {
  const result = validateWhatsappChallenge(request.nextUrl, process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ?? process.env.META_WEBHOOK_VERIFY_TOKEN ?? "");
  return new NextResponse(result.response, { status: result.status });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!validateWhatsappSignature(rawBody, request.headers.get("x-hub-signature-256"), process.env.WHATSAPP_APP_SECRET ?? process.env.META_APP_SECRET ?? "")) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  const events = parseWhatsappEvents(JSON.parse(rawBody));
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
