import { ActivityActorType, InboundEventStatus } from "../../../../generated/prisma";
import { normalizeInboundPayload } from "../normalization/inboundEventNormalizer";
import { operationalRepository } from "../repositories/operationalRepository";
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
import { assertDateRange, assertRequiredString } from "../validation/operational";

export const operationalService = {
  createDemoBusiness(input: CreateBusinessInput) {
    assertRequiredString(input.name, "Business name");
    assertRequiredString(input.slug, "Business slug");
    return operationalRepository.createBusiness(input);
  },
  createContact(input: CreateContactInput) {
    assertRequiredString(input.businessId, "businessId");
    assertRequiredString(input.displayName, "displayName");
    return operationalRepository.createContact(input);
  },
  createLead(input: CreateLeadInput) {
    assertRequiredString(input.businessId, "businessId");
    return operationalRepository.createLead(input);
  },
  getLeadById(leadId: string) {
    assertRequiredString(leadId, "leadId");
    return operationalRepository.getLeadById(leadId);
  },
  listLeadsByBusiness(businessId: string, take?: number) {
    assertRequiredString(businessId, "businessId");
    return operationalRepository.listLeadsByBusiness(businessId, take);
  },
  createConversation(input: CreateConversationInput) {
    assertRequiredString(input.businessId, "businessId");
    return operationalRepository.createConversation(input);
  },
  listConversationsByLeadOrContact(filters: { businessId: string; leadId?: string; contactId?: string }) {
    assertRequiredString(filters.businessId, "businessId");
    return operationalRepository.listConversations(filters);
  },
  createBooking(input: CreateBookingInput) {
    assertRequiredString(input.businessId, "businessId");
    assertRequiredString(input.serviceName, "serviceName");
    assertDateRange(input.startsAt, input.endsAt);
    return operationalRepository.createBooking(input);
  },
  createFollowUpTask(input: CreateFollowUpTaskInput) {
    assertRequiredString(input.businessId, "businessId");
    assertRequiredString(input.leadId, "leadId");
    return operationalRepository.createFollowUpTask(input);
  },

  async receiveInboundEvent(input: CreateInboundEventInput) {
    assertRequiredString(input.businessId, "businessId");
    assertRequiredString(input.source, "source");
    assertRequiredString(input.eventType, "eventType");

    const inbound = await operationalRepository.createInboundEvent({
      businessId: input.businessId,
      source: input.source,
      eventType: input.eventType,
      payload: input.payload,
      status: input.status ?? InboundEventStatus.PENDING,
      receivedAt: input.receivedAt,
    });
    await operationalRepository.createActivityLog({
      businessId: input.businessId,
      entityType: "InboundEvent",
      entityId: inbound.id,
      actionType: "INBOUND_EVENT_RECEIVED",
      actorType: ActivityActorType.SYSTEM,
      payloadJson: { inboundEventId: inbound.id, source: input.source, eventType: input.eventType },
    });

    try {
      const normalized = normalizeInboundPayload(input.payload);
      await operationalRepository.createActivityLog({
        businessId: input.businessId,
        entityType: "InboundEvent",
        entityId: inbound.id,
        actionType: "INBOUND_EVENT_NORMALIZED",
        actorType: ActivityActorType.SYSTEM,
        payloadJson: {
          inboundEventId: inbound.id,
          hasContact: Boolean(normalized.phone || normalized.email),
          hasMessage: Boolean(normalized.message),
          externalThreadId: normalized.conversation?.externalThreadId,
          providerMessageId: normalized.message?.providerMessageId,
        },
      });
      const result = await operationalRepository.processInboundEntities({
        inboundEventId: inbound.id,
        businessId: input.businessId,
        displayName: normalized.displayName,
        phone: normalized.phone,
        email: normalized.email,
        externalRefsJson: normalized.externalRefsJson,
        externalLeadId: normalized.lead?.externalLeadId,
        serviceInterest: normalized.lead?.serviceInterest,
        summary: normalized.lead?.summary,
        externalThreadId: normalized.conversation?.externalThreadId,
        providerMessageId: normalized.message?.providerMessageId,
        payloadType: normalized.message?.payloadType,
        messageContent: normalized.message?.content,
        rawMessagePayload: normalized.message?.rawPayload,
      });

      const processed = await operationalRepository.updateInboundEventStatus(inbound.id, InboundEventStatus.PROCESSED);
      await operationalRepository.createActivityLog({
        businessId: input.businessId,
        entityType: "InboundEvent",
        entityId: inbound.id,
        actionType: "INBOUND_EVENT_PROCESSED",
        actorType: ActivityActorType.SYSTEM,
        payloadJson: {
          inboundEventId: inbound.id,
          contactId: result.contact.id,
          leadId: result.lead.id,
          conversationId: result.conversation.id,
          messageEventId: result.messageEvent?.id,
        },
      });

      return processed;
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown processing error";
      const failed = await operationalRepository.updateInboundEventFailure(inbound.id, reason, {
        reason,
        errorName: error instanceof Error ? error.name : "unknown",
      });

      await operationalRepository.createActivityLog({
        businessId: input.businessId,
        entityType: "InboundEvent",
        entityId: inbound.id,
        actionType: "INBOUND_EVENT_FAILED",
        actorType: ActivityActorType.SYSTEM,
        payloadJson: { inboundEventId: inbound.id, reason },
      });

      return failed;
    }
  },

  registerActivityLog(input: CreateActivityLogInput) {
    assertRequiredString(input.businessId, "businessId");
    assertRequiredString(input.entityType, "entityType");
    assertRequiredString(input.actionType, "actionType");
    return operationalRepository.createActivityLog(input);
  },
};
