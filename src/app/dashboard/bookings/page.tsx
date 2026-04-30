import { prisma } from "@/lib/db/prisma";

export default async function BookingsPage() {
  const business = await prisma.business.findFirst({ select: { id: true, name: true } });

  if (!business) {
    return (
      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-3xl font-semibold text-white">Agenda y reservas</h2>
        <p className="text-slate-300">No hay negocio configurado todavía.</p>
      </section>
    );
  }

  const upcomingBookings = await prisma.booking.findMany({
    where: { businessId: business.id, startsAt: { gte: new Date() }, status: { not: "CANCELLED" } },
    include: { lead: true, contact: true },
    orderBy: { startsAt: "asc" },
    take: 15,
  });

  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-3xl font-semibold text-white">Agenda y reservas</h2>
      <p className="text-slate-300">Próximas reservas para {business.name}.</p>
      <div className="space-y-3">
        {upcomingBookings.length === 0 ? (
          <p className="rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-slate-300">No hay reservas próximas.</p>
        ) : (
          upcomingBookings.map((booking) => (
            <article key={booking.id} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-slate-200">
              <p className="font-medium text-white">{booking.serviceName}</p>
              <p>
                {new Date(booking.startsAt).toLocaleString()} - {new Date(booking.endsAt).toLocaleTimeString()}
              </p>
              <p className="text-slate-400">Lead: {booking.lead?.id ?? "-"} · Contacto: {booking.contact?.displayName ?? booking.contactId ?? "-"}</p>
              <p className="text-xs uppercase tracking-wide text-slate-400">{booking.status}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
