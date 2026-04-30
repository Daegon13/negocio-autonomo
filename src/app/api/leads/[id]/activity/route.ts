import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const businessId = await getDemoBusinessId();
  if (!businessId) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const { id } = await params;
  const body = (await request.json()) as { note?: string };
  if (!body.note?.trim()) return NextResponse.json({ error: "Note is required" }, { status: 400 });

  const lead = await prisma.lead.findFirst({ where: { id, businessId }, select: { id: true } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  await prisma.activityLog.create({
    data: {
      businessId,
      entityType: "lead",
      entityId: id,
      actionType: "MANUAL_NOTE_ADDED",
      actorType: "USER",
      payloadJson: { note: body.note.trim() },
    },
  });

  return NextResponse.json({ ok: true });
}
