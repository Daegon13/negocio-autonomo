import { prisma } from "@/lib/db/prisma";

export const DEMO_SLUG = "centro-bienestar-demo";

export async function getDemoBusinessId() {
  const business = await prisma.business.findUnique({
    where: { slug: DEMO_SLUG },
    select: { id: true },
  });

  return business?.id;
}
