import type {
  ActivityActorType,
  BookingStatus,
  InboundEventStatus,
  LeadStatus,
  Priority,
  TaskStatus,
  TaskType,
} from "@/generated/prisma/client";

export type CreateBusinessInput = {
  name: string;
  slug: string;
  verticalType?: string;
  timezone?: string;
  contactPhone?: string;
};

export type CreateContactInput = {
  businessId: string;
  displayName: string;
  phone?: string;
  email?: string;
  notes?: string;
};

export type CreateLeadInput = {
  businessId: string;
  contactId?: string;
  status?: LeadStatus;
  serviceInterest?: string;
  summary?: string;
  priority?: Priority;
  notes?: string;
};

export type CreateConversationInput = {
  businessId: string;
  contactId?: string;
  leadId?: string;
  channelConnectionId?: string;
  externalThreadId?: string;
};

export type CreateBookingInput = {
  businessId: string;
  serviceName: string;
  startsAt: Date;
  endsAt: Date;
  contactId?: string;
  leadId?: string;
  status?: BookingStatus;
  notes?: string;
};

export type CreateFollowUpTaskInput = {
  businessId: string;
  leadId: string;
  type?: TaskType;
  status?: TaskStatus;
  priority?: Priority;
  dueAt?: Date;
  suggestedAction?: string;
  reason?: string;
};

export type CreateActivityLogInput = {
  businessId: string;
  entityType: string;
  entityId?: string;
  actionType: string;
  actorType?: ActivityActorType;
  actorId?: string;
  payloadJson?: unknown;
};


export type CreateInboundEventInput = {
  businessId: string;
  source: string;
  eventType: string;
  payload: unknown;
  status?: InboundEventStatus;
  receivedAt?: Date;
  errorContextJson?: unknown;
};
