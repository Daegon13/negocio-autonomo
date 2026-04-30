import { prisma } from "@/lib/db";

const HOURS_NEW_NO_RESPONSE = 24;
const HOURS_CONTACTED_NO_PROGRESS = 48;

function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

async function createFollowUpTaskIfMissing(input: {
  leadId: string;
  storeId: string;
  taskType: string;
  priority: string;
  dueAt: Date;
}) {
  const existing = await prisma.followUpTask.findFirst({
    where: { leadId: input.leadId, taskType: input.taskType, status: "OPEN" },
    select: { id: true }
  });

  if (existing) return null;

  const task = await prisma.followUpTask.create({
    data: {
      leadId: input.leadId,
      storeId: input.storeId,
      taskType: input.taskType,
      priority: input.priority,
      dueAt: input.dueAt,
      status: "OPEN"
    }
  });

  await prisma.auditLog.create({
    data: {
      storeId: input.storeId,
      role: "SYSTEM",
      action: "FOLLOW_UP_TASK_CREATED",
      entity: "FollowUpTask",
      entityId: task.id,
      payload: JSON.stringify({ leadId: input.leadId, taskType: input.taskType })
    }
  });

  return task;
}

export async function runFollowUpRules(storeId: string) {
  const [newLeads, contactedLeads] = await Promise.all([
    prisma.lead.findMany({ where: { storeId, status: "NEW", lastActivityAt: { lte: hoursAgo(HOURS_NEW_NO_RESPONSE) } } }),
    prisma.lead.findMany({ where: { storeId, status: "CONTACTED", lastActivityAt: { lte: hoursAgo(HOURS_CONTACTED_NO_PROGRESS) } } })
  ]);

  const created = [];
  for (const lead of newLeads) {
    const task = await createFollowUpTaskIfMissing({
      leadId: lead.id,
      storeId,
      taskType: "NO_RESPONSE_NEW",
      priority: "HIGH",
      dueAt: new Date()
    });
    if (task) created.push(task);
  }

  for (const lead of contactedLeads) {
    const task = await createFollowUpTaskIfMissing({
      leadId: lead.id,
      storeId,
      taskType: "NO_PROGRESS_CONTACTED",
      priority: "MEDIUM",
      dueAt: new Date()
    });
    if (task) created.push(task);
  }

  return created;
}

export async function closeFollowUpTask(taskId: string, storeId: string) {
  const task = await prisma.followUpTask.update({
    where: { id: taskId },
    data: { status: "CLOSED", closedAt: new Date() }
  });

  await prisma.auditLog.create({
    data: {
      storeId,
      role: "SYSTEM",
      action: "FOLLOW_UP_TASK_CLOSED",
      entity: "FollowUpTask",
      entityId: task.id,
      payload: JSON.stringify({ leadId: task.leadId, taskType: task.taskType })
    }
  });

  return task;
}
