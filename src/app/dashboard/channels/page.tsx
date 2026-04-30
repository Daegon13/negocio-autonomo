import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Canales", description: "Estado de canales de captura para mensajes y leads entrantes." };

export default async function ChannelsPage() {
  const businessId = await getDemoBusinessId();
  const channels = businessId ? await prisma.channelConnection.findMany({ where: { businessId }, orderBy: { createdAt: "asc" } }) : [];
  return <section className="space-y-6"><h2 className="text-3xl font-semibold text-white">Canales ({channels.length})</h2><ul className="space-y-3">{channels.map((channel) => <li key={channel.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-200">{channel.provider} / {channel.channelType} · {channel.status}</li>)}</ul></section>;
}
