import {
  ActivityActorType,
  BookingStatus,
  ChannelProvider,
  ChannelType,
  ConnectionStatus,
  ConversationStatus,
  InboundEventStatus,
  LeadStatus,
  MessageDirection,
  Priority,
  TaskStatus,
  TaskType,
} from "../generated/prisma";
import { prisma } from "../src/lib/db/prisma";

const ids = {
  business: "demo-business-negocio-autonomo",
  channelWhatsapp: "demo-channel-whatsapp",
  channelInstagram: "demo-channel-instagram",
  contactAna: "demo-contact-ana",
  contactBruno: "demo-contact-bruno",
  contactCarla: "demo-contact-carla",
  leadAna: "demo-lead-ana",
  leadBruno: "demo-lead-bruno",
  leadCarla: "demo-lead-carla",
  convAna: "demo-conversation-ana",
  convBruno: "demo-conversation-bruno",
  convCarla: "demo-conversation-carla",
  bookingAna: "demo-booking-ana",
  bookingCarla: "demo-booking-carla",
  taskAna: "demo-task-ana",
  taskBruno: "demo-task-bruno",
  taskCarla: "demo-task-carla",
};

async function main() {
  const now = new Date();

  await prisma.business.upsert({
    where: { id: ids.business },
    update: {
      name: "Centro Bienestar Demo",
      slug: "centro-bienestar-demo",
      timezone: "America/Montevideo",
      verticalType: "salud_y_bienestar",
      contactPhone: "+59899990000",
    },
    create: {
      id: ids.business,
      name: "Centro Bienestar Demo",
      slug: "centro-bienestar-demo",
      timezone: "America/Montevideo",
      verticalType: "salud_y_bienestar",
      contactPhone: "+59899990000",
    },
  });

  await prisma.channelConnection.upsert({
    where: { id: ids.channelWhatsapp },
    update: { status: ConnectionStatus.ACTIVE },
    create: {
      id: ids.channelWhatsapp,
      businessId: ids.business,
      provider: ChannelProvider.WHATSAPP,
      channelType: ChannelType.WHATSAPP,
      status: ConnectionStatus.ACTIVE,
      externalAccountId: "wa-demo-001",
    },
  });

  await prisma.channelConnection.upsert({
    where: { id: ids.channelInstagram },
    update: { status: ConnectionStatus.PENDING },
    create: {
      id: ids.channelInstagram,
      businessId: ids.business,
      provider: ChannelProvider.INSTAGRAM,
      channelType: ChannelType.INSTAGRAM_DM,
      status: ConnectionStatus.PENDING,
      externalAccountId: "ig-demo-001",
    },
  });

  const contacts = [
    { id: ids.contactAna, displayName: "Ana Pérez", phone: "+59891110001", email: "ana@example.com" },
    { id: ids.contactBruno, displayName: "Bruno Silva", phone: "+59891110002", email: "bruno@example.com" },
    { id: ids.contactCarla, displayName: "Carla Gómez", phone: "+59891110003", email: "carla@example.com" },
  ] as const;

  for (const contact of contacts) {
    await prisma.contact.upsert({
      where: { id: contact.id },
      update: { ...contact, businessId: ids.business },
      create: { ...contact, businessId: ids.business },
    });
  }

  await prisma.lead.upsert({
    where: { id: ids.leadAna },
    update: {
      businessId: ids.business,
      contactId: ids.contactAna,
      sourceProvider: ChannelProvider.WHATSAPP,
      sourceChannel: ChannelType.WHATSAPP,
      status: LeadStatus.NEW,
      serviceInterest: "Evaluación inicial",
      priority: Priority.HIGH,
      summary: "Consulta por horarios de primera sesión.",
      nextActionAt: new Date(now.getTime() + 4 * 60 * 60 * 1000),
    },
    create: {
      id: ids.leadAna,
      businessId: ids.business,
      contactId: ids.contactAna,
      sourceProvider: ChannelProvider.WHATSAPP,
      sourceChannel: ChannelType.WHATSAPP,
      status: LeadStatus.NEW,
      serviceInterest: "Evaluación inicial",
      priority: Priority.HIGH,
      summary: "Consulta por horarios de primera sesión.",
      nextActionAt: new Date(now.getTime() + 4 * 60 * 60 * 1000),
    },
  });

  await prisma.lead.upsert({ where: { id: ids.leadBruno }, update: { businessId: ids.business, contactId: ids.contactBruno, sourceProvider: ChannelProvider.WHATSAPP, sourceChannel: ChannelType.WHATSAPP, status: LeadStatus.CONTACTED, serviceInterest: "Plan mensual", priority: Priority.MEDIUM, summary: "Pidió precios y pidió respuesta mañana.", lastContactAt: new Date(now.getTime() - 6 * 60 * 60 * 1000) }, create: { id: ids.leadBruno, businessId: ids.business, contactId: ids.contactBruno, sourceProvider: ChannelProvider.WHATSAPP, sourceChannel: ChannelType.WHATSAPP, status: LeadStatus.CONTACTED, serviceInterest: "Plan mensual", priority: Priority.MEDIUM, summary: "Pidió precios y pidió respuesta mañana.", lastContactAt: new Date(now.getTime() - 6 * 60 * 60 * 1000) } });

  await prisma.lead.upsert({ where: { id: ids.leadCarla }, update: { businessId: ids.business, contactId: ids.contactCarla, sourceProvider: ChannelProvider.INSTAGRAM, sourceChannel: ChannelType.INSTAGRAM_DM, status: LeadStatus.BOOKED, serviceInterest: "Sesión de seguimiento", priority: Priority.LOW, summary: "Ya eligió fecha tentativa para la sesión." }, create: { id: ids.leadCarla, businessId: ids.business, contactId: ids.contactCarla, sourceProvider: ChannelProvider.INSTAGRAM, sourceChannel: ChannelType.INSTAGRAM_DM, status: LeadStatus.BOOKED, serviceInterest: "Sesión de seguimiento", priority: Priority.LOW, summary: "Ya eligió fecha tentativa para la sesión." } });

  const conversations = [
    { id: ids.convAna, contactId: ids.contactAna, leadId: ids.leadAna, channelConnectionId: ids.channelWhatsapp, lastMessageAt: new Date(now.getTime() - 40 * 60 * 1000), status: ConversationStatus.OPEN },
    { id: ids.convBruno, contactId: ids.contactBruno, leadId: ids.leadBruno, channelConnectionId: ids.channelWhatsapp, lastMessageAt: new Date(now.getTime() - 3 * 60 * 60 * 1000), status: ConversationStatus.OPEN },
    { id: ids.convCarla, contactId: ids.contactCarla, leadId: ids.leadCarla, channelConnectionId: ids.channelInstagram, lastMessageAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), status: ConversationStatus.CLOSED },
  ] as const;

  for (const conversation of conversations) {
    await prisma.conversation.upsert({ where: { id: conversation.id }, update: { ...conversation, businessId: ids.business }, create: { ...conversation, businessId: ids.business } });
  }

  await prisma.messageEvent.deleteMany({ where: { conversationId: { in: conversations.map((c) => c.id) } } });
  await prisma.messageEvent.createMany({
    data: [
      { businessId: ids.business, conversationId: ids.convAna, direction: MessageDirection.INBOUND, content: "Hola, ¿tienen lugar hoy de tarde?" },
      { businessId: ids.business, conversationId: ids.convAna, direction: MessageDirection.OUTBOUND, content: "Sí, te paso opciones en un momento." },
      { businessId: ids.business, conversationId: ids.convBruno, direction: MessageDirection.INBOUND, content: "¿Cuánto cuesta el plan mensual?" },
      { businessId: ids.business, conversationId: ids.convCarla, direction: MessageDirection.INBOUND, content: "Perfecto, confirmemos para el viernes." },
    ],
  });

  await prisma.inboundEvent.upsert({
    where: { id: "demo-inbound-ana" },
    update: { businessId: ids.business, channelConnectionId: ids.channelWhatsapp, source: "whatsapp-webhook", provider: ChannelProvider.WHATSAPP, eventType: "message_received", payload: { leadRef: ids.leadAna, text: "Hola" }, status: InboundEventStatus.PROCESSED },
    create: { id: "demo-inbound-ana", businessId: ids.business, channelConnectionId: ids.channelWhatsapp, source: "whatsapp-webhook", provider: ChannelProvider.WHATSAPP, eventType: "message_received", payload: { leadRef: ids.leadAna, text: "Hola" }, status: InboundEventStatus.PROCESSED },
  });

  await prisma.followUpTask.upsert({ where: { id: ids.taskAna }, update: { businessId: ids.business, leadId: ids.leadAna, type: TaskType.FOLLOW_UP, status: TaskStatus.OPEN, priority: Priority.HIGH, reason: "Responder disponibilidad solicitada", dueAt: new Date(now.getTime() + 2 * 60 * 60 * 1000) }, create: { id: ids.taskAna, businessId: ids.business, leadId: ids.leadAna, type: TaskType.FOLLOW_UP, status: TaskStatus.OPEN, priority: Priority.HIGH, reason: "Responder disponibilidad solicitada", dueAt: new Date(now.getTime() + 2 * 60 * 60 * 1000) } });
  await prisma.followUpTask.upsert({ where: { id: ids.taskBruno }, update: { businessId: ids.business, leadId: ids.leadBruno, type: TaskType.REMINDER, status: TaskStatus.OPEN, priority: Priority.MEDIUM, reason: "Enviar precios actualizados", dueAt: new Date(now.getTime() + 18 * 60 * 60 * 1000) }, create: { id: ids.taskBruno, businessId: ids.business, leadId: ids.leadBruno, type: TaskType.REMINDER, status: TaskStatus.OPEN, priority: Priority.MEDIUM, reason: "Enviar precios actualizados", dueAt: new Date(now.getTime() + 18 * 60 * 60 * 1000) } });
  await prisma.followUpTask.upsert({ where: { id: ids.taskCarla }, update: { businessId: ids.business, leadId: ids.leadCarla, type: TaskType.CONFIRM_BOOKING, status: TaskStatus.DONE, priority: Priority.LOW, reason: "Reserva confirmada por Instagram", completedAt: new Date(now.getTime() - 60 * 60 * 1000) }, create: { id: ids.taskCarla, businessId: ids.business, leadId: ids.leadCarla, type: TaskType.CONFIRM_BOOKING, status: TaskStatus.DONE, priority: Priority.LOW, reason: "Reserva confirmada por Instagram", completedAt: new Date(now.getTime() - 60 * 60 * 1000) } });

  await prisma.booking.upsert({ where: { id: ids.bookingAna }, update: { businessId: ids.business, contactId: ids.contactAna, leadId: ids.leadAna, serviceName: "Evaluación inicial", startsAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), endsAt: new Date(now.getTime() + 25 * 60 * 60 * 1000), status: BookingStatus.PENDING }, create: { id: ids.bookingAna, businessId: ids.business, contactId: ids.contactAna, leadId: ids.leadAna, serviceName: "Evaluación inicial", startsAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), endsAt: new Date(now.getTime() + 25 * 60 * 60 * 1000), status: BookingStatus.PENDING } });
  await prisma.booking.upsert({ where: { id: ids.bookingCarla }, update: { businessId: ids.business, contactId: ids.contactCarla, leadId: ids.leadCarla, serviceName: "Sesión de seguimiento", startsAt: new Date(now.getTime() + 72 * 60 * 60 * 1000), endsAt: new Date(now.getTime() + 73 * 60 * 60 * 1000), status: BookingStatus.CONFIRMED }, create: { id: ids.bookingCarla, businessId: ids.business, contactId: ids.contactCarla, leadId: ids.leadCarla, serviceName: "Sesión de seguimiento", startsAt: new Date(now.getTime() + 72 * 60 * 60 * 1000), endsAt: new Date(now.getTime() + 73 * 60 * 60 * 1000), status: BookingStatus.CONFIRMED } });

  await prisma.activityLog.create({ data: { businessId: ids.business, entityType: "seed", entityId: ids.business, actionType: "demo_seed_executed", actorType: ActivityActorType.SYSTEM, payloadJson: { at: now.toISOString() } } });
}

main().finally(() => prisma.$disconnect());
