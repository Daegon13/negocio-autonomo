import { Card, CardContent, CardHeader } from "@/components/ui";
import { prisma } from "@/lib/db";
import { getOrCreateDefaultStore } from "@/lib/defaultStore";

export default async function DashboardBookingsPage() {
  const store = await getOrCreateDefaultStore();
  const upcomingBookings = await prisma.booking.findMany({
    where: { storeId: store.id, startsAt: { gte: new Date() }, status: { not: "CANCELLED" } },
    orderBy: { startsAt: "asc" },
    take: 10,
    include: { lead: { select: { name: true, contact: true } } }
  });

  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold text-slate-900">Agenda / Reservas próximas</div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {upcomingBookings.length === 0 ? (
          <p className="text-slate-600">No hay reservas próximas.</p>
        ) : (
          upcomingBookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border p-3">
              <div className="font-medium text-slate-900">{booking.lead?.name || booking.contactId || "Reserva"}</div>
              <div className="text-slate-600">{new Date(booking.startsAt).toLocaleString()} - {new Date(booking.endsAt).toLocaleTimeString()}</div>
              <div className="text-xs uppercase text-slate-500">{booking.status}</div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
