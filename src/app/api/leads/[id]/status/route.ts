import { NextResponse } from "next/server";
import { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const businessId = await getDemoBusinessId();
  if (!businessId) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const { id } = await params;
  const body = (await request.json()) as { status?: LeadStatus };
  if (!body.status || !Object.values(LeadStatus).includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const lead = await prisma.lead.updateMany({ where: { id, businessId }, data: { status: body.status } });
  if (!lead.count) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
