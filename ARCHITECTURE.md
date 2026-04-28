# ARCHITECTURE.md — Negocio Autónomo MVP

## 1. Objetivo

Esta arquitectura soporta el MVP de **Negocio Autónomo** sin perder el foco del producto:

**canal conectado → evento entrante → normalización → lead/conversación → seguimiento → reserva → métricas**

La prioridad es reutilizar la base sana de Smart Stock, soportar ingestión automática desde canales reales y quedar listos para demos y pilotos.

## 2. Principios

- Las integraciones externas no deben definir el dominio.
- Todo evento externo pasa primero por una capa de normalización.
- Reutilizar infraestructura sí; arrastrar narrativa retail no.
- Modularidad dentro de una sola app primero; microservicios no.
- IA como capa encima del flujo operativo, no como reemplazo del sistema.

## 3. Capas del sistema

1. **App Shell / Core Platform**
2. **Business Domain**
3. **Integrations & Ingestion Layer**
4. **Normalization Layer**
5. **Operational Modules**
6. **AI Layer**
7. **Analytics & Visibility Layer**
8. **Admin & Demo Layer**

## 4. Módulos

### 4.1. Core Platform
Responsable de:
- autenticación
- usuarios
- negocio/tenant
- roles mínimos
- configuración base
- layout y navegación
- feature flags
- demo mode

### 4.2. Integrations & Ingestion Layer
Responsable de:
- `ChannelConnection`
- OAuth / tokens / metadata
- webhook receivers
- verificación de firmas/challenge
- almacenamiento de payloads crudos
- manejo básico de errores y reintentos

### 4.3. Normalization Layer
Responsable de convertir payloads externos a eventos internos estables, por ejemplo:
- `LeadCreatedFromChannel`
- `InboundMessageCaptured`
- `ConversationUpdated`
- `BookingIntentDetected`
- `ContactMatched`

### 4.4. Leads & Conversations Domain
Entidades principales:
- `Contact`
- `Lead`
- `Conversation`
- `MessageEvent`
- `ObjectionSignal`

Reglas:
- un `Contact` representa a la persona
- un `Lead` representa una oportunidad
- una `Conversation` representa un hilo por canal
- un `MessageEvent` es cada interacción atómica

### 4.5. Booking Domain
Entidades:
- `Booking`
- `AvailabilityRule`

Reglas:
- un booking puede originarse en un lead
- el sistema debe evitar solapamientos inválidos

### 4.6. Follow-up Domain
Entidad principal:
- `FollowUpTask`

Casos:
- lead nuevo sin respuesta
- lead tibio sin cierre
- reserva pendiente de confirmación
- seguimiento sugerido por IA

### 4.7. AI Layer
Incluye:
- resumen de lead/conversación
- sugerencia de respuesta
- sugerencia de siguiente acción
- detección ligera de objeciones
- priorización de seguimiento

### 4.8. Analytics & Visibility Layer
Incluye:
- consultas ingresadas
- leads pendientes
- reservas confirmadas
- actividad reciente
- leads en riesgo
- conversión básica lead → booking

### 4.9. Admin & Demo Layer
Incluye:
- gestión de negocios demo
- reset de datos demo
- inspección de conexiones
- revisión de activity logs
- provisionamiento manual de pilotos

## 5. Boundaries

- **Integrations → Normalization**: los proveedores entregan payloads; la normalización los traduce.
- **Normalization → Domain**: el dominio nunca consume payload crudo de Meta/WhatsApp.
- **Domain → AI**: IA consume contexto estructurado y devuelve sugerencias.
- **Domain → Analytics**: las métricas salen del dominio real, no de capas paralelas inventadas.

## 6. Modelo conceptual

### Núcleo de negocio
- `Business`
- `User`
- `ChannelConnection`

### Núcleo comercial
- `Contact`
- `Lead`
- `Conversation`
- `MessageEvent`
- `ObjectionSignal`
- `FollowUpTask`

### Núcleo operativo
- `Booking`
- `AvailabilityRule`
- `ActivityLog`

## 7. Relaciones clave

- Todo cuelga de `businessId`.
- Un `Contact` puede tener múltiples conversaciones y leads.
- Un `Lead` es una oportunidad activa o rastreable.
- Una `Conversation` agrupa mensajes por canal.
- Un `Booking` materializa una cita.
- `ActivityLog` registra trazabilidad de todo el sistema.

## 8. Flujo principal

1. El negocio conecta un canal.
2. El proveedor envía un evento.
3. El webhook receiver lo valida.
4. Se guarda el payload crudo.
5. El normalizador lo transforma.
6. Se crea o actualiza `Contact`.
7. Se crea o actualiza `Lead` / `Conversation`.
8. El caso aparece en bandeja.
9. Se genera o actualiza `FollowUpTask`.
10. La IA resume y sugiere próximo paso.
11. El usuario responde, sigue o agenda.
12. El dashboard refleja actividad y conversión.

## 9. Estructura de carpetas recomendada

```text
src/
  app/
    (auth)/
    (dashboard)/
      inbox/
      leads/
      bookings/
      follow-up/
      analytics/
      settings/
      channels/
    api/
      webhooks/
        meta/
        instagram/
        whatsapp/
      admin/
      leads/
      bookings/
      ai/

  modules/
    core/
      auth/
      business/
      users/
      flags/
      config/

    integrations/
      shared/
      meta/
      instagram/
      whatsapp/
      lead-ads/

    normalization/
      events/
      mappers/
      matchers/
      dedup/

    crm/
      contacts/
      leads/
      conversations/
      messages/
      objections/

    bookings/
      availability/
      reservations/

    follow-up/
      tasks/
      rules/
      prioritization/

    ai/
      summaries/
      reply-suggestions/
      next-actions/
      objection-signals/

    analytics/
      metrics/
      dashboards/

    admin/
      demo/
      provisioning/
      inspections/

  lib/
    db/
    env/
    logger/
    utils/
    validations/
    permissions/

  components/
    ui/
    dashboard/
    leads/
    bookings/
    channels/
    analytics/

  server/
    services/
    repositories/
    workflows/
    jobs/

  prisma/
    schema.prisma
    migrations/
    seeds/
```

## 10. Repositories, services y workflows

### Repositories
- `leadRepository`
- `contactRepository`
- `conversationRepository`
- `bookingRepository`

### Services
- `leadService`
- `followUpService`
- `bookingService`
- `channelConnectionService`

### Workflows
- `ingestInboundLeadWorkflow`
- `ingestInboundMessageWorkflow`
- `convertLeadToBookingWorkflow`
- `generateFollowUpTasksWorkflow`

### Jobs
- recordatorios
- detección de leads dormidos
- recomputación de métricas ligeras

## 11. API routes / handlers

### Públicas / externas
- `/api/webhooks/meta`
- `/api/webhooks/instagram`
- `/api/webhooks/whatsapp`

### Internas
- `/api/leads`
- `/api/leads/:id`
- `/api/bookings`
- `/api/channels/connect`
- `/api/ai/summarize-lead`

Regla: el handler valida y delega; no concentra toda la lógica.

## 12. Persistencia

- Base principal: PostgreSQL con Prisma.
- Payloads crudos: tabla JSON o storage con referencia.
- `ActivityLog` debe existir desde temprano para auditoría, debugging y métricas.

## 13. Matching y deduplicación

Prioridades del MVP:
1. external account/thread id
2. phone
3. email
4. nombre + heurística simple

Objetivo: evitar duplicados obvios sin montar un motor complejo de identidad.

## 14. Estrategia de IA

### Inputs
- datos del lead
- últimos mensajes
- estado del pipeline
- historial reciente
- tareas pendientes

### Outputs
- resumen corto
- respuesta sugerida
- siguiente acción sugerida
- señal de objeción
- prioridad sugerida

Regla: la IA no muta datos críticos automáticamente en el MVP.

## 15. Estrategia de métricas

- leads entrantes
- leads pendientes
- reservas confirmadas
- leads sin respuesta
- actividad reciente
- conversión básica lead → booking

Fuente de verdad: dominio transaccional real.

## 16. Flags y entornos

### Flags
- `AUTH_LOGIN_ENABLED`
- `DEMO_MODE_ENABLED`
- `NEGOCIO_AUTONOMO_ENABLED`
- `CHANNELS_META_ENABLED`
- `CHANNELS_INSTAGRAM_ENABLED`
- `CHANNELS_WHATSAPP_ENABLED`
- `AI_SUMMARIES_ENABLED`
- `AI_REPLY_SUGGESTIONS_ENABLED`

### Entornos
- local
- preview/staging
- production

## 17. Seguridad mínima

- verificación de firmas/webhooks
- separación por `businessId`
- permisos mínimos por usuario
- secretos por entorno
- logs sin exponer datos sensibles innecesarios

## 18. Demo y pilotos

### Demo mode
- negocio demo
- datos demo coherentes
- reset fácil
- fixtures de canales

### Pilotos
- provisionar negocio real
- conectar al menos un canal
- revisar activity logs
- operar sin carga manual completa

## 19. Riesgos a evitar

- acoplar Meta directo al dominio
- confundir contacto con lead
- confundir conversación con oportunidad
- hacer agenda demasiado compleja
- meter IA antes de tener buen flujo base
- preservar demasiado legado retail
- intentar omnicanal completo demasiado temprano

## 20. Definición técnica de éxito

La arquitectura será correcta si permite sin rehacer todo este flujo:

1. conectar un canal
2. recibir lead o mensaje automáticamente
3. normalizarlo
4. crear/actualizar contacto, lead y conversación
5. mostrarlo en bandeja
6. generar seguimiento
7. permitir reservar
8. mostrar métricas básicas
9. agregar IA útil encima
