type LeadStatus = "Nuevo" | "Contactado" | "En seguimiento" | "Reservado";

type Lead = {
  name: string;
  channel: string;
  interest: string;
  status: LeadStatus;
  priority: "Alta" | "Media" | "Baja";
  lastActivity: string;
};

const leads: Lead[] = [
  {
    name: "Sofía Ramírez",
    channel: "Instagram DM",
    interest: "Sesión estética facial",
    status: "Nuevo",
    priority: "Alta",
    lastActivity: "Hace 15 min",
  },
  {
    name: "Diego Pereira",
    channel: "WhatsApp",
    interest: "Mantenimiento de aire acondicionado",
    status: "Contactado",
    priority: "Media",
    lastActivity: "Hoy 11:20",
  },
  {
    name: "Camila Torres",
    channel: "Formulario web",
    interest: "Asesoría nutricional mensual",
    status: "En seguimiento",
    priority: "Alta",
    lastActivity: "Ayer 19:40",
  },
  {
    name: "Martín Salvatierra",
    channel: "Google Business",
    interest: "Servicio de plomería urgente",
    status: "Reservado",
    priority: "Media",
    lastActivity: "Hoy 09:05",
  },
];

export default function LeadsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Listado de leads</h2>
        <p className="mt-2 text-slate-300">Estado de oportunidades y acciones rápidas para avanzar cada contacto.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-950/70 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Canal</th>
              <th className="px-4 py-3 text-left">Interés</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Prioridad</th>
              <th className="px-4 py-3 text-left">Última actividad</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead.name} className="text-slate-200">
                <td className="px-4 py-3">{lead.name}</td>
                <td className="px-4 py-3">{lead.channel}</td>
                <td className="px-4 py-3">{lead.interest}</td>
                <td className="px-4 py-3">{lead.status}</td>
                <td className="px-4 py-3">{lead.priority}</td>
                <td className="px-4 py-3">{lead.lastActivity}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button type="button" className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:border-cyan-300">
                      Contactar
                    </button>
                    <button type="button" className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:border-cyan-300">
                      Agendar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
