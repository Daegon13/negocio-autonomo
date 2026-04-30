import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Reservas", description: "Agenda de reservas con estados y próximos pasos de atención." };

export default async function BookingsPage() {
  const businessId = await getDemoBusinessId();
  const bookings = businessId ? await prisma.booking.findMany({ where: { businessId }, include: { contact: true }, orderBy: { startsAt: "asc" } }) : [];
  return <section className="space-y-6"><h2 className="text-3xl font-semibold text-white">Reservas ({bookings.length})</h2><ul className="space-y-3">{bookings.map((booking) => <li key={booking.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200">{booking.contact?.displayName ?? "Sin contacto"} · {booking.serviceName} · {booking.status}</li>)}</ul></section>;
}
