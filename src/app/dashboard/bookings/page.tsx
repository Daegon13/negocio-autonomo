const bookings = [
  { client: "María Paz", service: "Limpieza profunda", date: "Hoy · 17:30", status: "Confirmada" },
  { client: "Julián Ríos", service: "Reparación eléctrica", date: "Mañana · 09:00", status: "Pendiente" },
  { client: "Valentina Correa", service: "Asesoría nutricional", date: "Vie · 15:00", status: "Confirmada" },
  { client: "Tomás Roldán", service: "Mantenimiento A/C", date: "Sáb · 11:30", status: "Reprogramada" },
];

export default function BookingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Agenda y reservas</h2>
        <p className="mt-2 text-slate-300">Visualización semanal de citas, estado y próximas acciones.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {bookings.map((booking) => (
          <article key={`${booking.client}-${booking.date}`} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-cyan-300">{booking.date}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{booking.service}</h3>
            <p className="mt-1 text-slate-300">Cliente: {booking.client}</p>
            <p className="mt-2 inline-block rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200">{booking.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
