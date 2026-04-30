@'
# AGENTS.md — Negocio Autónomo

## Project identity

This repository root is the active project.

The active product is:

**Negocio Autónomo**

Negocio Autónomo is an MVP for local service businesses. It helps businesses capture incoming leads/messages, organize leads, follow up, schedule bookings, and understand basic operational metrics.

## Critical instruction

Do NOT treat Smart Stock as the active project.

Smart Stock is only legacy/reference context. It may have inspired parts of the architecture, but it is not the product being implemented in this repository.

If a folder, document, branch, file, or module mentions Smart Stock, treat it as legacy unless the user explicitly says otherwise.

## Active repository root

The active repository root is the directory containing:

- package.json
- prisma/schema.prisma
- prisma.config.ts
- src/app
- src/modules
- ARCHITECTURE.md
- PATCH_NOTES.md

Before making changes, verify:

```powershell
Get-Location
git rev-parse --show-toplevel
Get-ChildItem src/app

Do not edit a nested Smart Stock project by mistake.

Active routes

The visible Next.js App Router routes must live under:

src/app/page.tsx
src/app/dashboard/page.tsx
src/app/dashboard/layout.tsx
src/app/dashboard/leads/page.tsx
src/app/dashboard/settings/page.tsx
src/app/dashboard/bookings/page.tsx
src/app/dashboard/follow-up/page.tsx
src/app/dashboard/channels/page.tsx

If a task involves visible UI, always verify that these routes exist and render.

Product thesis

Negocio Autónomo is not:

an inventory app
a stock management app
a generic CRM
a premium agenda only
a renamed Smart Stock

Negocio Autónomo is:

a commercial operating layer for local service businesses
focused on incoming leads/messages
focused on follow-up
focused on bookings
focused on visibility and simple operational metrics

Core future flow:

channel connected → inbound event → normalization → lead/conversation → follow-up → booking → metrics

MVP priorities

Build in this order:

visible UI and navigation
business/core platform
leads and contacts
conversations
bookings
follow-up tasks
channel ingestion
AI summaries and next actions
metrics

Do not jump to advanced AI, simulations, or omnichannel automation before the visible product and core flows exist.

Source of truth

Use these files as project guidance:

ARCHITECTURE.md
PATCH_NOTES.md
prisma/schema.prisma

If there is a conflict between old Smart Stock references and these documents, follow the Negocio Autónomo documents.

Development commands

Use pnpm.

Common commands:

pnpm dev
pnpm exec prisma format
pnpm exec prisma validate
pnpm exec prisma migrate dev
pnpm exec prisma generate

Implementation rules
Use Next.js App Router.
Use TypeScript.
Keep changes small and reviewable.
Do not create routes outside src/app.
Do not leave the app rendering the default Next.js template.
Do not create placeholder-only architecture without visible routes when UI is requested.
Do not introduce stock/inventory terminology into the main navigation or product copy.
If a route is requested, create the actual page.tsx file.
If data is unavailable, use safe demo data or a useful empty state.
Required final check for every PR

Before reporting done, verify:

pnpm dev

