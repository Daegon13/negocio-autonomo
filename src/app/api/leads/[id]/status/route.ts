import { NextResponse } from "next/server";
import { LeadStatus, Priority, TaskType } from "../../../../../../generated/prisma";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const businessId = await getDemoBusinessId();
  if (!businessId) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const { id } = await params;
  const body = (await request.json()) as { status?: LeadStatus };
  if (!body.status || !Object.values(LeadStatus).includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const lead = await tx.lead.findFirst({ where: { id, businessId }, select: { id: true, status: true } });
    if (!lead) return { notFound: true as const };
    await tx.lead.update({ where: { id }, data: { status: body.status } });
    await tx.activityLog.create({
      data: {
        businessId,
        entityType: "lead",
        entityId: id,
        actionType: "LEAD_STATUS_CHANGED",
        actorType: "USER",
        payloadJson: { previousStatus: lead.status, nextStatus: body.status },
      },
    });

    const rules: Partial<Record<LeadStatus, { type: TaskType; priority: Priority; reason: string; dueHours: number }>> = {
      CONTACTED: { type: TaskType.FOLLOW_UP, priority: Priority.MEDIUM, reason: "Verificar respuesta posterior a contacto inicial", dueHours: 24 },
      PENDING: { type: TaskType.REMINDER, priority: Priority.HIGH, reason: "Retomar lead en estado pendiente", dueHours: 24 },
      LOST: { type: TaskType.REACTIVATE_LEAD, priority: Priority.LOW, reason: "Intentar reactivar lead perdido", dueHours: 24 * 7 },
    };
    const rule = rules[body.status];
    if (!rule) return { notFound: false as const, autoTask: false };

    const idempotencyKey = `AUTO_RULE:LEAD_STATUS:${body.status}`;
    const existingOpen = await tx.followUpTask.findFirst({
      where: { businessId, leadId: id, status: "OPEN", type: rule.type, suggestedAction: idempotencyKey },
      select: { id: true },
    });
    if (existingOpen) {
      await tx.activityLog.create({ data: { businessId, entityType: "follow_up_task", entityId: existingOpen.id, actionType: "FOLLOW_UP_TASK_AUTO_SKIPPED_DUPLICATE", actorType: "SYSTEM", payloadJson: { idempotencyKey, leadId: id } } });
      return { notFound: false as const, autoTask: false };
    }

    const task = await tx.followUpTask.create({
      data: { businessId, leadId: id, type: rule.type, priority: rule.priority, dueAt: new Date(Date.now() + rule.dueHours * 60 * 60 * 1000), reason: rule.reason, suggestedAction: idempotencyKey },
    });
    await tx.activityLog.create({ data: { businessId, entityType: "follow_up_task", entityId: task.id, actionType: "FOLLOW_UP_TASK_AUTO_CREATED", actorType: "SYSTEM", payloadJson: { idempotencyKey, leadId: id, status: body.status } } });
    return { notFound: false as const, autoTask: true };
  });
  if (result.notFound) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
