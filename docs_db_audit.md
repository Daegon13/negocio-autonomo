# Auditoría Prisma (2026-04-30)

## Matriz esperada: `schema.prisma` vs migraciones

| Tipo | Nombre | Esperado en schema | Estado en migraciones |
|---|---|---:|---|
| Enum | UserRole | Sí | ✅ `20260428172524_init_core` |
| Enum | ChannelProvider | Sí | ✅ `20260428172524_init_core` |
| Enum | ChannelType | Sí | ✅ `20260428172524_init_core` |
| Enum | ConnectionStatus | Sí | ✅ `20260428172524_init_core` |
| Enum | LeadStatus | Sí | ✅ `20260428172524_init_core` |
| Enum | ConversationStatus | Sí | ✅ `20260428172524_init_core` |
| Enum | MessageDirection | Sí | ✅ `20260428172524_init_core` |
| Enum | BookingStatus | Sí | ✅ `20260428172524_init_core` |
| Enum | TaskType | Sí | ✅ `20260428172524_init_core` |
| Enum | TaskStatus | Sí | ✅ `20260428172524_init_core` |
| Enum | Priority | Sí | ✅ `20260428172524_init_core` |
| Enum | ActivityActorType | Sí | ✅ `20260428172524_init_core` |
| Enum | ObjectionCategory | Sí | ✅ `20260428172524_init_core` |
| Enum | InboundEventStatus | Sí | ✅ `20260430115900_create_inbound_event` |
| Tabla | Business | Sí | ✅ `20260428172524_init_core` |
| Tabla | User | Sí | ✅ `20260428172524_init_core` |
| Tabla | ChannelConnection | Sí | ✅ `20260428172524_init_core` |
| Tabla | Contact | Sí | ✅ `20260428172524_init_core` |
| Tabla | Lead | Sí | ✅ `20260428172524_init_core` |
| Tabla | Conversation | Sí | ✅ `20260428172524_init_core` |
| Tabla | MessageEvent | Sí | ✅ `20260428172524_init_core` |
| Tabla | Booking | Sí | ✅ `20260428172524_init_core` |
| Tabla | AvailabilityRule | Sí | ✅ `20260428172524_init_core` |
| Tabla | FollowUpTask | Sí | ✅ `20260428172524_init_core` |
| Tabla | ActivityLog | Sí | ✅ `20260428172524_init_core` |
| Tabla | ObjectionSignal | Sí | ✅ `20260428172524_init_core` |
| Tabla | InboundEvent | Sí | ✅ `20260430115900_create_inbound_event` + alter en `20260430120000_inbound_event_source_internal` |

## Notas clave

- Se detectó drift: `InboundEvent` e `InboundEventStatus` existían en `schema.prisma` pero no en la migración base.
- Se agregó migración correctiva **explícita** (`20260430115900_create_inbound_event`) para crear enum/tabla/índices/FKs antes del alter posterior.
- La migración `20260430120000_inbound_event_source_internal` queda válida porque ahora opera sobre tabla preexistente creada inmediatamente antes en el historial.
- `ChannelProvider` y `ChannelType` están alineados entre schema y migración base.
