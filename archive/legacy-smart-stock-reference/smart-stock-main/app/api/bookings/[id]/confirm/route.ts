import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withActiveStore, canMutate } from "@/lib/apiAuth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return withActiveStore(req, async ({ storeId, role }) => {
    if (!canMutate(role)) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

    const { id } = await params;
    const booking = await prisma.booking.findFirst({ where: { id, storeId } });
    if (!booking) return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "CONFIRMED", confirmedAt: new Date() }
    });

    return NextResponse.json({ booking: updated });
  });
}
