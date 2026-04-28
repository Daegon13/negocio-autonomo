# PATCH 00 + PATCH 01 — Notas técnicas (Negocio Autónomo)

## Qué se reutilizó directamente
- Base de autenticación (beta gate + sesión por cookie + store activo).
- Layout general con App Router (`app/(app)/layout.tsx`) y shell principal.
- Estructura multi-tenant existente (`Organization -> Franchise -> Store`).
- Settings existentes de equipo/sesiones para no duplicar lógica.

## Qué se aisló del flujo principal
- Navegación retail heredada (import/stock/proveedores/pedidos, etc.) quedó en un bloque colapsable **Módulos heredados** dentro del sidebar.
- Los módulos heredados no se eliminaron para evitar riesgos de regresión, pero dejaron de ser el camino principal del producto.

## Qué se dejó intencionalmente fuera
- Inbox/leads funcional.
- Pipeline real de conversaciones y follow-up.
- Booking/agenda operativa.
- Integraciones Meta/WhatsApp.
- IA y dashboards analíticos complejos.

## Deuda técnica detectada
- Persisten rutas y APIs con naming retail (`products`, `stock`, `orders`, etc.) que deberán migrarse por etapas.
- Algunas páginas de settings heredadas muestran datos crudos (JSON) y requieren UI final en próximos patches.
- Falta definir permisos de admin interno por rol (hoy el panel es mínimo y sin guardas específicas).
