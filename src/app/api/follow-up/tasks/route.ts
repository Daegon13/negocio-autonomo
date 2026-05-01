import { NextResponse } from "next/server";
import { Priority, TaskType } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";
import { getDemoBusinessId } from "@/lib/demo-data";

export async function POST(request: Request) {
  const businessId = await getDemoBusinessId();
  if (!businessId) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const body = (await request.json()) as { leadId?: string; type?: TaskType; priority?: Priority; dueAt?: string; reason?: string };
  if (!body.leadId) return NextResponse.json({ error: "leadId is required" }, { status: 400 });

  const task = await prisma.followUpTask.create({
    data: {
      businessId,
      leadId: body.leadId,
      type: body.type ?? TaskType.FOLLOW_UP,
      priority: body.priority ?? Priority.MEDIUM,
      dueAt: body.dueAt ? new Date(body.dueAt) : null,
      reason: body.reason?.trim() || null,
    },
  });
  await prisma.activityLog.create({ data: { businessId, entityType: "follow_up_task", entityId: task.id, actionType: "FOLLOW_UP_TASK_CREATED", actorType: "USER", payloadJson: { taskId: task.id, leadId: task.leadId } } });
  return NextResponse.json({ task }, { status: 201 });
}
