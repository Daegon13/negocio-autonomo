import { NextRequest, NextResponse } from "next/server";
import { operationalService } from "@/lib/domain/services/operationalService";

type TestInboundEventPayload = {
  businessId: string;
  source: string;
  eventType: string;
  payload: unknown;
};

function isAuthorized(request: NextRequest) {
  const expectedToken = process.env.INTERNAL_INGESTION_TOKEN;
  if (!expectedToken) return false;

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;

  const token = authHeader.slice(7).trim();
  return token === expectedToken;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: TestInboundEventPayload;
  try {
    body = (await request.json()) as TestInboundEventPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.businessId || !body.source || !body.eventType || body.payload === undefined) {
    return NextResponse.json(
      { error: "invalid_payload", required: ["businessId", "source", "eventType", "payload"] },
      { status: 400 },
    );
  }

  const inbound = await operationalService.receiveInboundEvent({
    businessId: body.businessId,
    source: body.source,
    eventType: body.eventType,
    payload: body.payload,
  });

  return NextResponse.json(
    {
      ok: true,
      inboundEventId: inbound.id,
      status: inbound.status,
      receivedAt: inbound.receivedAt,
    },
    { status: 202 },
  );
}
