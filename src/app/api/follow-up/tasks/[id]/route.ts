import { NextResponse } from "next/server";
import { Priority, TaskStatus, TaskType } from "../../../../../../generated/prisma";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const businessId = await getDemoBusinessId();
  if (!businessId) return NextResponse.json({ error: "Business not found" }, { status: 404 });
  const { id } = await params;
  const body = (await request.json()) as { type?: TaskType; priority?: Priority; dueAt?: string | null; reason?: string; status?: TaskStatus };

  const data = {
    type: body.type,
    priority: body.priority,
    dueAt: body.dueAt === undefined ? undefined : body.dueAt ? new Date(body.dueAt) : null,
    reason: body.reason === undefined ? undefined : body.reason.trim() || null,
    status: body.status,
    completedAt: body.status === TaskStatus.DONE ? new Date() : body.status === TaskStatus.DISMISSED ? new Date() : undefined,
  };
  const existing = await prisma.followUpTask.findFirst({ where: { id, businessId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  const task = await prisma.followUpTask.update({ where: { id }, data });
  await prisma.activityLog.create({
    data: {
      businessId,
      entityType: "follow_up_task",
      entityId: task.id,
      actionType: body.status ? `FOLLOW_UP_TASK_${body.status}` : "FOLLOW_UP_TASK_UPDATED",
      actorType: "USER",
      payloadJson: { taskId: task.id, changes: body, completedAt: task.completedAt },
    },
  });
  return NextResponse.json({ task });
}
