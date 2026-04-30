import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

function parseClockToMinutes(clock: string): number | null {
  const [hours, minutes] = clock.split(":").map(Number);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId")?.trim();
  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 });
  }

  const bookings = await prisma.booking.findMany({
    where: { businessId, startsAt: { gte: new Date() }, status: { not: "CANCELLED" } },
    include: { lead: true, contact: true },
    orderBy: { startsAt: "asc" },
    take: 50,
  });

  return NextResponse.json({ bookings });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        businessId?: string;
        leadId?: string;
        contactId?: string;
        startsAt?: string;
        endsAt?: string;
        serviceName?: string;
        notes?: string;
      }
    | null;

  if (!body?.businessId) return NextResponse.json({ error: "businessId is required" }, { status: 400 });
  if (!body.leadId && !body.contactId) {
    return NextResponse.json({ error: "leadId or contactId is required" }, { status: 400 });
  }

  const startsAt = new Date(body.startsAt ?? "");
  const endsAt = new Date(body.endsAt ?? "");
  if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime()) || startsAt >= endsAt) {
    return NextResponse.json({ error: "Invalid startsAt/endsAt range" }, { status: 400 });
  }

  const dayOfWeek = startsAt.getUTCDay();
  const startMin = startsAt.getUTCHours() * 60 + startsAt.getUTCMinutes();
  const endMin = endsAt.getUTCHours() * 60 + endsAt.getUTCMinutes();

  const activeRules = await prisma.availabilityRule.findMany({
    where: { businessId: body.businessId, dayOfWeek, isActive: true },
    orderBy: { startTime: "asc" },
  });

  const available = activeRules.some((rule) => {
    const ruleStart = parseClockToMinutes(rule.startTime);
    const ruleEnd = parseClockToMinutes(rule.endTime);
    if (ruleStart === null || ruleEnd === null) return false;
    return startMin >= ruleStart && endMin <= ruleEnd;
  });

  if (!available) {
    return NextResponse.json({ error: "Booking outside base availability" }, { status: 409 });
  }

  const overlapping = await prisma.booking.findFirst({
    where: {
      businessId: body.businessId,
      status: { in: ["PENDING", "CONFIRMED", "COMPLETED"] },
      startsAt: { lt: endsAt },
      endsAt: { gt: startsAt },
    },
  });

  if (overlapping) {
    return NextResponse.json({ error: "Booking overlap detected" }, { status: 409 });
  }

  const booking = await prisma.$transaction(async (tx) => {
    const created = await tx.booking.create({
      data: {
        businessId: body.businessId!,
        leadId: body.leadId ?? null,
        contactId: body.contactId ?? null,
        startsAt,
        endsAt,
        serviceName: body.serviceName?.trim() || "Servicio",
        notes: body.notes ?? null,
      },
    });

    if (body.leadId) {
      await tx.lead.update({
        where: { id: body.leadId },
        data: { status: "BOOKED" },
      });

      await tx.activityLog.create({
        data: {
          businessId: body.businessId!,
          entityType: "LEAD",
          entityId: body.leadId,
          actionType: "LEAD_TO_BOOKING",
          actorType: "SYSTEM",
          payloadJson: {
            bookingId: created.id,
            fromStatus: "PENDING",
            toStatus: "BOOKED",
          },
        },
      });
    }

    return created;
  });

  return NextResponse.json({ booking }, { status: 201 });
}
