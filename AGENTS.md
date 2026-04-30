# AGENTS.md — Negocio Autónomo

## Proyecto activo

- **Proyecto activo:** raíz de este repositorio (Negocio Autónomo).
- Verificación rápida de contexto antes de cambios:

```bash
pwd
git rev-parse --show-toplevel
node -p "require('./package.json').name"
rg --files src/app
```

## Regla crítica sobre Smart Stock

- **Smart Stock es legacy y de solo lectura** en este repositorio.
- No tratar Smart Stock como producto activo.
- Si un archivo/carpeta menciona Smart Stock, asumir contexto de referencia histórica, salvo instrucción explícita del usuario.

## Alcance del producto (MVP)

Negocio Autónomo se enfoca en:

- captura de leads/mensajes entrantes
- organización de leads
- seguimiento (follow-up)
- reservas (bookings)
- métricas operativas simples

Flujo objetivo:

`channel connected → inbound event → normalization → lead/conversation → follow-up → booking → metrics`

## Rutas visibles requeridas (App Router)

- `src/app/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/layout.tsx`
- `src/app/dashboard/leads/page.tsx`
- `src/app/dashboard/settings/page.tsx`
- `src/app/dashboard/bookings/page.tsx`
- `src/app/dashboard/follow-up/page.tsx`
- `src/app/dashboard/channels/page.tsx`

## Prioridades MVP

1. UI y navegación visibles
2. plataforma/core de negocio
3. leads y contactos
4. conversaciones
5. bookings
6. tareas de seguimiento
7. ingesta de canales
8. resúmenes IA y next actions
9. métricas

## Fuente de verdad

- `ARCHITECTURE.md`
- `PATCH_NOTES.md`
- `prisma/schema.prisma`

Ante conflicto con referencias de Smart Stock, priorizar documentos de Negocio Autónomo.

## Comandos de desarrollo

Usar **pnpm**:

- `pnpm dev`
- `pnpm exec prisma format`
- `pnpm exec prisma validate`
- `pnpm exec prisma migrate dev`
- `pnpm exec prisma generate`

## Implementación

- Next.js App Router + TypeScript.
- Cambios pequeños y revisables.
- No crear rutas fuera de `src/app`.
- No dejar template default de Next.js en la app.
- Evitar terminología de inventario/stock en navegación y copy principal.

## Nota sobre AGENTS.override.md

No se crea `AGENTS.override.md` por ahora porque no agrega guardrails concretos adicionales a este contexto.
