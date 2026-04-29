import { operationalRepository } from "../repositories/operationalRepository";
import type {
  CreateActivityLogInput,
  CreateBookingInput,
  CreateBusinessInput,
  CreateContactInput,
  CreateConversationInput,
  CreateFollowUpTaskInput,
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

  listConversationsByLeadOrContact(filters: {
    businessId: string;
    leadId?: string;
    contactId?: string;
  }) {
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

  registerActivityLog(input: CreateActivityLogInput) {
    assertRequiredString(input.businessId, "businessId");
    assertRequiredString(input.entityType, "entityType");
    assertRequiredString(input.actionType, "actionType");
    return operationalRepository.createActivityLog(input);
  },
};
