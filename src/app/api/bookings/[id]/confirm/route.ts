import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId")?.trim();
  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 });
  }

  const { id } = await context.params;
  const booking = await prisma.booking.findFirst({ where: { id, businessId } });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const updated = await prisma.booking.update({ where: { id }, data: { status: "CONFIRMED" } });
  return NextResponse.json({ booking: updated });
}
