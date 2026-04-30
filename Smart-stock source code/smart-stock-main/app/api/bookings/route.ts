import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withActiveStore, canMutate } from "@/lib/apiAuth";

function parseClockMinutes(value: string) {
  const [h, m] = value.split(":").map((v) => Number(v));
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
}

function isWithinBaseAvailability(dayOfWeek: number, start: Date, end: Date, rules: { startTime: string; endTime: string }[]) {
  const startMinutes = start.getUTCHours() * 60 + start.getUTCMinutes();
  const endMinutes = end.getUTCHours() * 60 + end.getUTCMinutes();
  return rules.some((rule) => {
    const ruleStart = parseClockMinutes(rule.startTime);
    const ruleEnd = parseClockMinutes(rule.endTime);
    if (ruleStart === null || ruleEnd === null) return false;
    return startMinutes >= ruleStart && endMinutes <= ruleEnd;
  });
}

export async function GET(req: Request) {
  return withActiveStore(req, async ({ storeId }) => {
    const now = new Date();
    const bookings = await prisma.booking.findMany({
      where: { storeId, startsAt: { gte: now }, status: { not: "CANCELLED" } },
      orderBy: { startsAt: "asc" },
      include: { lead: { select: { id: true, name: true, contact: true } } }
    });
    return NextResponse.json({ bookings });
  });
}

export async function POST(req: Request) {
  return withActiveStore(req, async ({ storeId, role }) => {
    if (!canMutate(role)) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

    const body = await req.json().catch(() => null);
    const leadId = typeof body?.leadId === "string" ? body.leadId : null;
    const contactId = typeof body?.contactId === "string" ? body.contactId : null;
    const startsAt = new Date(body?.startsAt);
    const endsAt = new Date(body?.endsAt);

    if (!leadId && !contactId) return NextResponse.json({ error: "leadId o contactId requerido" }, { status: 400 });
    if (!(startsAt instanceof Date) || Number.isNaN(startsAt.getTime()) || !(endsAt instanceof Date) || Number.isNaN(endsAt.getTime()) || endsAt <= startsAt) {
      return NextResponse.json({ error: "Rango de fecha inválido" }, { status: 400 });
    }

    const dayOfWeek = startsAt.getUTCDay();
    const rules = await prisma.availabilityRule.findMany({ where: { storeId, dayOfWeek, isActive: true } });
    if (!rules.length || !isWithinBaseAvailability(dayOfWeek, startsAt, endsAt, rules)) {
      return NextResponse.json({ error: "Fuera de disponibilidad base" }, { status: 409 });
    }

    const overlap = await prisma.booking.findFirst({
      where: {
        storeId,
        status: { not: "CANCELLED" },
        startsAt: { lt: endsAt },
        endsAt: { gt: startsAt }
      }
    });
    if (overlap) return NextResponse.json({ error: "Reserva solapada" }, { status: 409 });

    const created = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: { storeId, leadId, contactId, startsAt, endsAt, notes: typeof body?.notes === "string" ? body.notes : null }
      });

      if (leadId) {
        await tx.lead.update({ where: { id: leadId, storeId }, data: { status: "BOOKED", lastActivityAt: new Date() } });
        await tx.activityLog.create({
          data: {
            storeId,
            leadId,
            bookingId: booking.id,
            type: "LEAD_TO_BOOKING",
            message: "Lead convertido a reserva",
            payload: JSON.stringify({ from: "LEAD", to: "BOOKING" })
          }
        });
      }
      return booking;
    });

    return NextResponse.json({ booking: created }, { status: 201 });
  });
}
