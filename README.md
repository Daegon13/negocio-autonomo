# Negocio Autónomo (MVP)

MVP para negocios de servicios locales. El producto ayuda a capturar mensajes/leads entrantes, dar seguimiento, convertir en reservas y tener visibilidad operativa básica.

## Pre-check obligatorio

Antes de cualquier cambio, ejecutar:

```bash
pwd
git rev-parse --show-toplevel
node -p "require('./package.json').name"
rg --files src/app
```

## Flujo principal

`channel connected → inbound event → normalization → lead/conversation → follow-up → booking → metrics`

## Rutas visibles (Next.js App Router)

- `/` → `src/app/page.tsx`
- `/dashboard` → `src/app/dashboard/page.tsx`
- `/dashboard/leads` → `src/app/dashboard/leads/page.tsx`
- `/dashboard/bookings` → `src/app/dashboard/bookings/page.tsx`
- `/dashboard/follow-up` → `src/app/dashboard/follow-up/page.tsx`
- `/dashboard/channels` → `src/app/dashboard/channels/page.tsx`
- `/dashboard/settings` → `src/app/dashboard/settings/page.tsx`

## Comandos (pnpm)

```bash
pnpm install
pnpm dev
pnpm exec prisma format
pnpm exec prisma validate
pnpm exec prisma generate
```

## Alcance MVP

- Captura y gestión de leads entrantes.
- Seguimiento comercial (follow-up).
- Gestión de reservas (bookings).
- Métricas operativas simples.

## No alcance (por ahora)

- Gestión de inventario/stock.
- Automatizaciones omnicanal avanzadas.
- Simulaciones complejas.
- Funcionalidades enterprise fuera de MVP.

## Contexto legacy

Smart Stock se conserva **solo como referencia histórica de solo lectura** y no forma parte del producto activo Negocio Autónomo.


## Estrategia para assets legacy

- `Smart-stock source code/` está fuera del alcance activo y se mantiene ignorada por git.
- `archive/legacy-smart-stock-reference/` se conserva como referencia histórica **solo lectura**.
- Cualquier trabajo de producto debe hacerse en la raíz activa de Negocio Autónomo.
