import type {
  ActivityLog,
  Booking,
  Business,
  Contact,
  Conversation,
  FollowUpTask,
  InboundEvent,
  Lead,
  MessageEvent,
  Prisma,
} from "../../../../generated/prisma";
import { prisma } from "../../db/prisma";
import type {
  CreateActivityLogInput,
  CreateBookingInput,
  CreateBusinessInput,
  CreateContactInput,
  CreateConversationInput,
  CreateFollowUpTaskInput,
  CreateInboundEventInput,
  CreateLeadInput,
} from "../types/operational";

export const operationalRepository = {
  createBusiness(data: CreateBusinessInput): Promise<Business> {
    return prisma.business.create({ data });
  },

  createContact(data: CreateContactInput): Promise<Contact> {
    return prisma.contact.create({ data });
  },

  createLead(data: CreateLeadInput): Promise<Lead> {
    return prisma.lead.create({ data });
  },

  getLeadById(id: string): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { id },
      include: { contact: true },
    });
  },

  listLeadsByBusiness(businessId: string, take = 50): Promise<Lead[]> {
    return prisma.lead.findMany({
      where: { businessId },
      include: { contact: true },
      orderBy: { createdAt: "desc" },
      take,
    });
  },

  createConversation(data: CreateConversationInput): Promise<Conversation> {
    return prisma.conversation.create({ data });
  },

  listConversations(filters: {
    businessId: string;
    leadId?: string;
    contactId?: string;
    status?: Prisma.ConversationWhereInput["status"];
  }): Promise<Conversation[]> {
    return prisma.conversation.findMany({
      where: {
        businessId: filters.businessId,
        leadId: filters.leadId,
        contactId: filters.contactId,
        status: filters.status,
      },
      orderBy: { updatedAt: "desc" },
    });
  },

  createBooking(data: CreateBookingInput): Promise<Booking> {
    return prisma.booking.create({ data });
  },

  createFollowUpTask(data: CreateFollowUpTaskInput): Promise<FollowUpTask> {
    return prisma.followUpTask.create({ data });
  },

  createInboundEvent(data: CreateInboundEventInput): Promise<InboundEvent> {
    return prisma.inboundEvent.create({ data });
  },

  updateInboundEventStatus(id: string, status: Prisma.InboundEventUpdateInput["status"], lastError?: string | null) {
    return prisma.inboundEvent.update({
      where: { id },
      data: { status, lastError: lastError ?? null, attempts: { increment: 1 } },
    });
  },

  createActivityLog(data: CreateActivityLogInput): Promise<ActivityLog> {
    return prisma.activityLog.create({ data });
  },

  async processInboundEntities(params: {
    inboundEventId: string;
    businessId: string;
    displayName: string;
    phone?: string;
    email?: string;
    externalRefsJson?: Record<string, unknown>;
    externalLeadId?: string;
    serviceInterest?: string;
    summary?: string;
    externalThreadId?: string;
    providerMessageId?: string;
    payloadType?: string;
    messageContent?: string;
    rawMessagePayload?: unknown;
  }): Promise<{ contact: Contact; lead: Lead; conversation: Conversation; messageEvent: MessageEvent | null }> {
    return prisma.$transaction(async (tx) => {
      const contact = await tx.contact.findFirst({
        where: {
          businessId: params.businessId,
          OR: [
            params.phone ? { phone: params.phone } : undefined,
            params.email ? { email: params.email } : undefined,
            params.externalRefsJson
              ? {
                  externalRefsJson: {
                    path: ["externalContactId"],
                    equals: (params.externalRefsJson.externalContactId as string | undefined) ?? undefined,
                  },
                }
              : undefined,
          ].filter(Boolean) as Prisma.ContactWhereInput[],
        },
      });

      const nextRefs = { ...(contact?.externalRefsJson as object ?? {}), ...(params.externalRefsJson ?? {}) };
      const savedContact = contact
        ? await tx.contact.update({
            where: { id: contact.id },
            data: {
              displayName: params.displayName || contact.displayName,
              phone: params.phone ?? contact.phone,
              email: params.email ?? contact.email,
              externalRefsJson: nextRefs,
            },
          })
        : await tx.contact.create({
            data: {
              businessId: params.businessId,
              displayName: params.displayName,
              phone: params.phone,
              email: params.email,
              externalRefsJson: params.externalRefsJson,
            },
          });

      const lead = await tx.lead.findFirst({ where: { businessId: params.businessId, contactId: savedContact.id } });
      const savedLead = lead
        ? await tx.lead.update({
            where: { id: lead.id },
            data: {
              externalLeadId: params.externalLeadId ?? lead.externalLeadId,
              serviceInterest: params.serviceInterest ?? lead.serviceInterest,
              summary: params.summary ?? lead.summary,
              lastContactAt: new Date(),
            },
          })
        : await tx.lead.create({
            data: {
              businessId: params.businessId,
              contactId: savedContact.id,
              externalLeadId: params.externalLeadId,
              serviceInterest: params.serviceInterest,
              summary: params.summary,
              lastContactAt: new Date(),
            },
          });

      const conversation = await tx.conversation.findFirst({
        where: {
          businessId: params.businessId,
          OR: [
            params.externalThreadId ? { externalThreadId: params.externalThreadId } : undefined,
            { leadId: savedLead.id },
          ].filter(Boolean) as Prisma.ConversationWhereInput[],
        },
      });
      const savedConversation = conversation
        ? await tx.conversation.update({
            where: { id: conversation.id },
            data: { contactId: savedContact.id, leadId: savedLead.id, lastMessageAt: new Date() },
          })
        : await tx.conversation.create({
            data: {
              businessId: params.businessId,
              contactId: savedContact.id,
              leadId: savedLead.id,
              externalThreadId: params.externalThreadId,
              lastMessageAt: new Date(),
            },
          });

      const messageEvent = params.providerMessageId || params.messageContent
        ? await tx.messageEvent.create({
            data: {
              businessId: params.businessId,
              conversationId: savedConversation.id,
              providerMessageId: params.providerMessageId,
              direction: "INBOUND",
              payloadType: params.payloadType,
              content: params.messageContent,
              rawPayload: (params.rawMessagePayload ?? {}) as Prisma.InputJsonValue,
            },
          })
        : null;

      return { contact: savedContact, lead: savedLead, conversation: savedConversation, messageEvent };
    });
  },
};
