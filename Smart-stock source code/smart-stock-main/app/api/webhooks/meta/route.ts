import { NextRequest, NextResponse } from "next/server";
import { markInboundFailed, markInboundProcessed, persistInboundEvent } from "@/lib/integrations/webhooks/service";
import { parseMetaEvent, verifyMetaChallenge, verifyMetaSignature } from "@/lib/integrations/webhooks/meta";

export async function GET(request: NextRequest) {
  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || "";
  const result = verifyMetaChallenge(request.nextUrl, verifyToken);
  return new NextResponse(result.body, { status: result.ok ? 200 : (result.status ?? 403) });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const valid = verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"), process.env.META_APP_SECRET || "");
  if (!valid) return NextResponse.json({ error: "invalid signature" }, { status: 401 });

  const payload = JSON.parse(rawBody);
  const events = parseMetaEvent(payload);

  for (const event of events) {
    const inbound = await persistInboundEvent(event);
    try {
      await markInboundProcessed(inbound.id);
    } catch (error) {
      await markInboundFailed(inbound.id, error);
    }
  }

  return NextResponse.json({ ok: true });
}
