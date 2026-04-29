import type {
  ActivityLog,
  Booking,
  Business,
  Contact,
  Conversation,
  FollowUpTask,
  Lead,
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

  createActivityLog(data: CreateActivityLogInput): Promise<ActivityLog> {
    return prisma.activityLog.create({ data });
  },
};
