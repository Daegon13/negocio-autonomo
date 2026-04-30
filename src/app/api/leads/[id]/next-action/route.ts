import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const businessId = await getDemoBusinessId();
  if (!businessId) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const { id } = await params;
  const body = (await request.json()) as { nextActionAt?: string };
  const nextActionAt = body.nextActionAt ? new Date(body.nextActionAt) : null;

  const lead = await prisma.lead.updateMany({ where: { id, businessId }, data: { nextActionAt } });
  if (!lead.count) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
