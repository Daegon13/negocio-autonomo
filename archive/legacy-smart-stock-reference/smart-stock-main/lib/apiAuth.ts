import { NextResponse } from "next/server";
import { getActiveStoreFromSession } from "@/lib/auth";
import { getRoleFromRequest, type Role } from "@/lib/rbac";

function parseBoolEnv(value: string | undefined, defaultValue: boolean) {
  if (value == null) return defaultValue;
  const v = value.trim().toLowerCase();
  if (["true", "1", "yes", "y", "on"].includes(v)) return true;
  if (["false", "0", "no", "n", "off"].includes(v)) return false;
  return defaultValue;
}

/**
 * Flag principal para activar/desactivar el sistema de login.
 * - default: true
 * - si es false, el proyecto entra en modo bypass (demo) en TODOS los entornos,
 *   incluido Vercel Production, para acelerar iteración.
 */
export function isLoginSystemEnabled() {
  return parseBoolEnv(process.env.AUTH_LOGIN_ENABLED, true);
}

/**
 * Bypass de login (modo demo): cuando el sistema de login está desactivado.
 */
export function isDevLoginBypassEnabled() {
  return !isLoginSystemEnabled();
}

export function canMutate(role: Role) {
  return role === "owner" || role === "manager" || role === "staff";
}

type ActiveStoreCtx = {
  storeId: string;
  role: Role;
};

type ActiveStoreHandler = (ctx: ActiveStoreCtx) => Promise<NextResponse>;

export async function withActiveStore(req: Request, handler: ActiveStoreHandler): Promise<NextResponse>;
export async function withActiveStore(handler: ActiveStoreHandler): Promise<NextResponse>;
export async function withActiveStore(reqOrHandler: Request | ActiveStoreHandler, maybeHandler?: ActiveStoreHandler): Promise<NextResponse> {
  const req = reqOrHandler instanceof Request ? reqOrHandler : null;
  const handler = (req ? maybeHandler : reqOrHandler) as ActiveStoreHandler | undefined;

  if (!handler) {
    return NextResponse.json({ error: "Misconfigured withActiveStore usage" }, { status: 500 });
  }

  try {
    const store = await getActiveStoreFromSession();
    const role = req ? getRoleFromRequest(req) : "owner";
    return await handler({ storeId: store.id, role });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
