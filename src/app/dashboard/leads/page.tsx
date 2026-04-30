type LeadStatus = "NEW" | "CONTACTED" | "PENDING" | "BOOKED" | "LOST" | "CLOSED";

type Lead = {
  name: string;
  channel: string;
  interest: string;
  status: LeadStatus;
  priority: "Alta" | "Media" | "Baja";
  lastActivity: string;
  nextAction: string;
};

const leads: Lead[] = [
  {
    name: "Sofía Ramírez",
    channel: "Instagram DM",
    interest: "Sesión estética facial",
    status: "NEW",
    priority: "Alta",
    lastActivity: "Hace 15 min",
    nextAction: "Responder consulta y ofrecer turnos de esta semana",
  },
  {
    name: "Diego Pereira",
    channel: "WhatsApp",
    interest: "Mantenimiento de aire acondicionado",
    status: "CONTACTED",
    priority: "Media",
    lastActivity: "Hoy 11:20",
    nextAction: "Enviar presupuesto final y confirmar visita",
  },
  {
    name: "Camila Torres",
    channel: "Formulario web",
    interest: "Asesoría nutricional mensual",
    status: "PENDING",
    priority: "Alta",
    lastActivity: "Ayer 19:40",
    nextAction: "Recordatorio de seguimiento por WhatsApp",
  },
  {
    name: "Martín Salvatierra",
    channel: "Google Business Profile",
    interest: "Servicio de plomería urgente",
    status: "BOOKED",
    priority: "Media",
    lastActivity: "Hoy 09:05",
    nextAction: "Confirmar llegada del técnico 30 min antes",
  },
];

export default function LeadsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Bandeja de leads</h2>
        <p className="mt-2 text-slate-300">Priorizá oportunidades y definí la próxima acción comercial.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-950/70 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th><th className="px-4 py-3 text-left">Canal</th><th className="px-4 py-3 text-left">Servicio / interés</th><th className="px-4 py-3 text-left">Estado</th><th className="px-4 py-3 text-left">Prioridad</th><th className="px-4 py-3 text-left">Última actividad</th><th className="px-4 py-3 text-left">Próxima acción sugerida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead.name} className="text-slate-200">
                <td className="px-4 py-3">{lead.name}</td><td className="px-4 py-3">{lead.channel}</td><td className="px-4 py-3">{lead.interest}</td><td className="px-4 py-3 font-medium">{lead.status}</td><td className="px-4 py-3">{lead.priority}</td><td className="px-4 py-3">{lead.lastActivity}</td><td className="px-4 py-3">{lead.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-slate-300">
        <h3 className="text-lg font-medium text-white">Empty state preparado</h3>
        <p className="mt-2">
          Cuando no haya leads disponibles, esta vista mostrará: “Todavía no ingresaron consultas. Conectá un canal o compartí tu landing para empezar a captar oportunidades.”
        </p>
      </article>
    </section>
  );
}
