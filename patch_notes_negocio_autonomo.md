# PATCH_NOTES.md — Negocio Autónomo MVP

## 0. Propósito del archivo

Este archivo existe para convertir la visión de **Negocio Autónomo** en una secuencia ejecutable de cambios.

Su función es:
- ordenar el desarrollo por patches
- evitar desvíos de alcance
- guiar a Codex con prompts claros
- definir qué se acepta en cada etapa
- separar lo esencial del MVP de lo que debe esperar

---

## 1. Reglas de ejecución

### Regla 1 — No romper la tesis del producto
Este proyecto **no** es una agenda premium, ni un CRM genérico, ni una copia de Smart Stock con otro nombre.

La tesis del MVP es:

> conectar canales reales de entrada, convertir mensajes/leads en trabajo operativo y ayudar al negocio a responder, seguir y reservar sin caos.

### Regla 2 — Reutilizar Smart Stock sin heredar su narrativa
Se reutiliza:
- infraestructura
- auth
- dashboard shell
- tenants
- panel admin
- logging
- métricas base
- flags demo

No se arrastra como eje:
- inventario
- compras
- proveedores
- copy retail
- navegación orientada a stock

### Regla 3 — Todo patch debe dejar algo usable
Cada patch debe cerrar un paso comprensible y testeable.

### Regla 4 — Primero flujo real, después inteligencia ambiciosa
Orden obligatorio de valor:
1. ingestión
2. lead
3. seguimiento
4. agenda
5. métricas
6. IA útil
7. simulación futura

### Regla 5 — No inflar el alcance
Si una feature no ayuda a:
- captar
- ordenar
- seguir
- reservar
- o medir

entonces probablemente no entra al MVP.

---

## 2. Arquitectura mínima que debe preservarse

### Capas
1. **Core Platform**
2. **Integraciones / Ingestión**
3. **Normalización**
4. **Leads / Conversations / Contacts**
5. **Agenda / Bookings**
6. **Seguimiento / Tasks**
7. **IA operativa**
8. **Dashboard / Métricas**

### Regla crítica
Las APIs externas **no deben tocar directamente la lógica de negocio**.
Todo evento entra por una capa de normalización.

---

## 3. Lista de patches

---

# PATCH 00 — Rebase estratégico sobre Smart Stock

## Objetivo
Tomar la base más sana de Smart Stock y preparar una rama/proyecto limpio para Negocio Autónomo, eliminando contaminación conceptual de inventario.

## Qué entra
- duplicar base o crear rama clara de trabajo
- renombrar branding y navegación principal
- ocultar o aislar módulos retail
- definir estructura inicial de módulos del nuevo producto
- crear flags del producto (`NEGOCIO_AUTONOMO_ENABLED`, `DEMO_MODE`, etc.)
- dejar claro el vertical del sistema en la UI base

## Qué no entra
- migraciones grandes
- integraciones reales
- agenda
- IA

## Criterios de aceptación
- la app corre con branding base del nuevo producto
- la navegación principal ya no comunica “stock/inventario”
- módulos retail quedan fuera del flujo principal
- existe una estructura clara para continuar con el MVP

## Riesgos
- hacer cambios cosméticos sin limpiar la tesis
- romper rutas o dependencias por renombrado agresivo

## Prompt base para Codex
```text
Quiero que tomes la base actual del proyecto y la rebases estratégicamente para un nuevo producto llamado “Negocio Autónomo”.

Objetivo:
- reutilizar infraestructura y shell general
- eliminar del flujo principal toda narrativa o navegación centrada en inventario/stock
- dejar una base lista para construir un MVP de captación, seguimiento, agenda e ingestión de leads

Instrucciones:
1. Mantén la arquitectura útil existente.
2. Oculta o aísla módulos retail para que no aparezcan en la navegación principal.
3. Cambia branding, labels y estructura visual base hacia el nuevo producto.
4. No implementes todavía funcionalidades nuevas; enfócate en preparar una base limpia.
5. Deja comentarios claros sobre qué piezas se están reutilizando y cuáles se dejaron aisladas.

Entregables:
- cambios en navegación/layout
- branding base nuevo
- estructura de módulos preparada
- resumen técnico de qué se reutilizó y qué se aisló
```

---

# PATCH 01 — Core Platform

## Objetivo
Tener una base funcional del producto con negocio, usuario, auth, settings y panel admin mínimo.

## Qué entra
- entidad base de negocio/tenant
- estructura de usuario/rol mínimo
- auth funcional
- layout principal limpio
- settings iniciales del negocio
- panel admin interno mínimo
- modo demo básico

## Qué no entra
- leads reales
- agenda
- integraciones

## Criterios de aceptación
- se puede iniciar sesión
- existe al menos un negocio demo
- settings básicos del negocio son editables
- panel admin interno existe y funciona

## Riesgos
- meter permisos demasiado complejos
- intentar hacer multi-tenant enterprise demasiado temprano

## Prompt base para Codex
```text
Implementa el Core Platform para Negocio Autónomo sobre la base ya rebased.

Objetivo:
crear la base funcional del producto con negocio, usuarios, auth, settings y panel admin mínimo.

Debe incluir:
- entidad Business/Tenant
- modelo de usuario con rol mínimo
- auth funcional
- settings básicos del negocio
- layout principal limpio
- panel admin interno mínimo
- modo demo básico

No implementar todavía:
- leads
- agenda
- integraciones externas
- IA

Criterios:
- el sistema debe ser navegable
- debe poder accederse a un negocio demo
- el panel admin debe permitir al menos ver/editar datos básicos del negocio
```

---

# PATCH 02 — Modelo de datos operativo

## Objetivo
Instalar el lenguaje real del nuevo producto en base de datos y dominio.

## Entidades mínimas
- Business
- User
- ChannelConnection
- Contact
- Lead
- Conversation
- MessageEvent
- Booking
- AvailabilityRule
- FollowUpTask
- ActivityLog
- ObjectionSignal

## Qué entra
- schema/modelos
- migraciones
- seeds demo coherentes
- tipos/DTOs/utilidades base

## Qué no entra
- UI avanzada
- integraciones reales

## Criterios de aceptación
- migraciones corren sin errores
- seeds crean datos consistentes
- entidades están listas para consumo desde frontend/backend

## Riesgos
- diseñar entidades ambiguas
- mezclar lead con contacto o conversación sin límites claros

## Prompt base para Codex
```text
Implementa el modelo de datos operativo para Negocio Autónomo.

Objetivo:
definir el dominio base del producto alrededor de leads, conversaciones, reservas, seguimiento e ingestión.

Entidades mínimas a crear:
- Business
- User
- ChannelConnection
- Contact
- Lead
- Conversation
- MessageEvent
- Booking
- AvailabilityRule
- FollowUpTask
- ActivityLog
- ObjectionSignal

Requisitos:
- separar claramente contacto, lead y conversación
- permitir ingestión multicanal futura
- dejar trazabilidad para actividad y señales de objeción
- incluir seeds demo útiles

Entregables:
- schema/modelos
- migraciones
- seeds
- breve explicación de relaciones clave
```

---

# PATCH 03 — Bandeja y pipeline de leads

## Objetivo
Construir el primer flujo operativo usable aun sin integración real.

## Qué entra
- listado de leads
- detalle de lead
- estados del pipeline
- cambio de estado
- notas internas
- historial básico
- próximos pasos visibles
- creación manual de lead de prueba

## Estados mínimos
- nuevo
- contactado
- pendiente
- reservado/confirmado
- perdido/cerrado

## Qué no entra
- automatización compleja
- resumen IA
- integración real

## Criterios de aceptación
- un lead manual puede crearse
- aparece en bandeja
- puede moverse de estado
- notas e historial quedan registrados

## Riesgos
- hacer una UI de CRM pesada
- perder foco en el flujo diario del negocio

## Prompt base para Codex
```text
Implementa la bandeja y pipeline de leads para Negocio Autónomo.

Objetivo:
crear el primer flujo operativo usable del producto, incluso antes de conectar canales reales.

Debe incluir:
- listado de leads
- vista de detalle
- pipeline de estados
- cambio de estado
- notas internas
- historial básico
- próximos pasos visibles
- creación manual de lead de prueba

Condiciones:
- UX simple y clara
- diseñada para dueño no técnico
- no convertir esto en un CRM complejo

Criterio principal:
que una persona pueda abrir la app y entender qué leads entraron y qué tiene que hacer con cada uno.
```

---

# PATCH 04 — Agenda y reservas

## Objetivo
Resolver el flujo operativo base que conecta lead con cita/reserva.

## Qué entra
- reglas de disponibilidad
- creación de reserva
- vista simple de agenda
- asociación lead ↔ booking
- control de solapamientos
- estados básicos de reserva

## Qué no entra
- sincronización con calendarios externos
- recordatorios avanzados multicanal

## Criterios de aceptación
- se puede configurar disponibilidad básica
- se puede crear una reserva
- no se permiten reservas inválidas por solapamiento
- el lead refleja la reserva asociada

## Riesgos
- construir agenda demasiado compleja
- parecer un calendario genérico

## Prompt base para Codex
```text
Implementa el módulo de agenda y reservas para Negocio Autónomo.

Objetivo:
permitir que un lead se convierta en una reserva/cita dentro del sistema.

Debe incluir:
- reglas básicas de disponibilidad
- creación de reservas
- vista simple de agenda
- asociación lead ↔ booking
- control de solapamientos
- estados básicos de reserva

No incluir aún:
- integraciones externas con calendarios
- automatizaciones complejas

Prioridad UX:
claridad absoluta y flujo corto.
```

---

# PATCH 05 — Capa de ingestión v1

## Objetivo
Instalar la arquitectura de conexión, recepción y normalización antes de conectar un canal real.

## Qué entra
- modelo `ChannelConnection`
- endpoints de webhook base
- verificación/challenge base
- almacenamiento de raw payloads
- normalizador interno inicial
- fixtures y eventos mock

## Qué no entra
- canal real productivo completo
- lógica de envío bidireccional

## Criterios de aceptación
- el sistema recibe un evento mock
- se almacena raw payload
- se transforma a una entidad interna comprensible
- no rompe el flujo actual

## Riesgos
- acoplar la app demasiado a un proveedor específico
- saltarse la normalización y mapear directo a leads

## Prompt base para Codex
```text
Implementa la capa de ingestión v1 para Negocio Autónomo.

Objetivo:
crear la base técnica para recibir eventos externos y transformarlos en objetos internos del sistema.

Debe incluir:
- modelo ChannelConnection
- webhook receiver base
- validación/challenge inicial
- almacenamiento de raw payloads
- normalizador interno inicial
- soporte para fixtures/mock events

Condición obligatoria:
las integraciones externas no deben tocar directamente la lógica de negocio; todo debe pasar por una capa de normalización.

No conectar todavía un canal real completo.
```

---

# PATCH 06 — Integración real Canal 1

## Canal recomendado
**Meta Lead Ads**

## Objetivo
Demostrar ingestión real automática con valor comercial inmediato.

## Qué entra
- flujo de conexión del canal
- recepción real del webhook
- creación automática de lead
- deduplicación básica
- registro de origen/canal
- trazabilidad en actividad

## Qué no entra
- mensajería completa
- sincronización histórica ambiciosa

## Criterios de aceptación
- un lead real o de prueba del canal entra automáticamente
- aparece en bandeja
- queda identificado el origen
- el sistema lo deja listo para seguimiento

## Riesgos
- permisos/revisión del proveedor
- diseñar conexión demasiado rígida

## Prompt base para Codex
```text
Implementa la primera integración real de ingestión para Negocio Autónomo.

Canal inicial recomendado: Meta Lead Ads.

Objetivo:
demostrar que el sistema puede recibir un lead automáticamente desde un canal real y convertirlo en trabajo operativo dentro de la app.

Debe incluir:
- flujo base de conexión del canal
- recepción real del webhook
- creación automática de lead
- deduplicación básica
- origen/canal visibles
- trazabilidad en activity log

No incluir todavía:
- mensajería completa
- automatizaciones avanzadas

El resultado debe poder demoearse de forma clara.
```

---

# PATCH 07 — Seguimiento y tareas

## Objetivo
Convertir leads en trabajo concreto priorizado.

## Qué entra
- `FollowUpTask`
- reglas básicas de generación de seguimiento
- lista de pendientes priorizados
- alertas de leads olvidados
- próximos pasos sugeridos sin IA compleja todavía

## Qué no entra
- motor avanzado de scoring
- simulación de estrategias

## Criterios de aceptación
- el sistema detecta leads que requieren atención
- genera tareas o pendientes visibles
- el usuario entiende a quién debe atender primero

## Riesgos
- crear demasiado ruido visual
- generar tareas irrelevantes que quiten confianza

## Prompt base para Codex
```text
Implementa el módulo de seguimiento y tareas para Negocio Autónomo.

Objetivo:
que los leads no se queden quietos y que el sistema ayude a priorizar la atención.

Debe incluir:
- entidad FollowUpTask funcional
- reglas básicas para generar seguimiento
- lista de pendientes priorizados
- alertas de leads olvidados
- próximos pasos sugeridos visibles

No convertirlo aún en un motor complejo de scoring.
La prioridad es que sea útil y entendible.
```

---

# PATCH 08 — IA operativa v1

## Objetivo
Agregar inteligencia demostrable, útil y comercialmente comprensible.

## Qué entra
- resumen automático de lead o conversación
- sugerencia de respuesta
- sugerencia de siguiente acción
- detección básica de objeción o fricción

## Qué no entra
- agente autónomo total
- simulación de campañas
- multiagente avanzado tipo MiroFish completo

## Criterios de aceptación
- abrir un lead muestra un resumen útil
- existe una respuesta sugerida coherente
- existe siguiente acción sugerida
- se marca al menos una objeción simple cuando aplica

## Riesgos
- meter IA decorativa
- introducir latencia o coste sin valor real

## Prompt base para Codex
```text
Implementa la IA operativa v1 para Negocio Autónomo.

Objetivo:
agregar una capa de IA útil, simple y demostrable sobre leads y conversaciones.

Debe incluir:
- resumen automático del lead o conversación
- sugerencia de respuesta
- sugerencia de siguiente acción
- detección básica de objeción o fricción

Importante:
esto no debe convertirse en un agente autónomo total ni en una simulación compleja.
Tiene que ser IA accionable y fácil de explicar comercialmente.
```

---

# PATCH 09 — Dashboard operativo

## Objetivo
Dar visibilidad rápida al dueño del negocio.

## Qué entra
- consultas ingresadas
- leads pendientes
- reservas confirmadas
- conversiones básicas
- actividad reciente
- leads en riesgo

## Qué no entra
- analytics pesados
- cohortes complejas
- atribución de marketing avanzada

## Criterios de aceptación
- el dashboard permite entender el estado operativo de un vistazo
- las métricas se alimentan de datos reales del sistema

## Riesgos
- convertir esto en BI prematuro
- saturar la pantalla con números sin acción

## Prompt base para Codex
```text
Implementa el dashboard operativo para Negocio Autónomo.

Objetivo:
dar al dueño una vista clara y rápida del estado comercial/operativo del negocio dentro del sistema.

Debe incluir:
- consultas ingresadas
- leads pendientes
- reservas confirmadas
- conversiones básicas
- actividad reciente
- leads en riesgo

Condición:
las métricas deben derivarse del uso real de leads, reservas y seguimiento, no de mocks vacíos.
```

---

# PATCH 10 — Integración real Canal 2

## Canal recomendado
**Instagram Professional / Facebook Messaging**

## Objetivo
Llevar el producto a inbox real y reforzar el wedge diferencial.

## Qué entra
- conexión del canal
- recepción de mensajes entrantes
- creación/actualización de `Conversation`
- asociación a `Contact` / `Lead`
- resumen y sugerencia sobre mensaje real

## Qué no entra
- automatización outbound compleja
- omnicanal completo

## Criterios de aceptación
- un mensaje entrante crea o actualiza conversación y lead
- el sistema resume el caso
- propone siguiente acción o respuesta

## Riesgos
- permisos/API review
- mezclar hilo de conversación con lead de manera confusa

## Prompt base para Codex
```text
Implementa la segunda integración real del MVP para Negocio Autónomo.

Canal recomendado: Instagram Professional o Facebook Messaging.

Objetivo:
permitir que mensajes entrantes desde inbox real se conviertan automáticamente en conversación + lead operable dentro del sistema.

Debe incluir:
- conexión del canal
- recepción de mensajes entrantes
- creación/actualización de Conversation
- asociación a Contact/Lead
- resumen del caso
- siguiente acción o respuesta sugerida

No intentar todavía omnicanal completo ni outbound complejo.
```

---

# PATCH 11 — Pulido demo + readiness para pilotos

## Objetivo
Dejar el producto listo para demo seria y 1–3 pilotos iniciales.

## Qué entra
- demo data impecable
- empty states buenos
- textos comerciales dentro del producto
- manejo básico de errores
- panel admin suficiente para operar pilotos
- checklist de conexión/canal/demo
- limpieza visual del flujo principal

## Qué no entra
- soporte self-serve total
- billing avanzado
- help center completo

## Criterios de aceptación
- la demo puede hacerse en vivo sin romperse
- el flujo central se entiende rápido
- se puede provisionar un piloto sin caos técnico

## Riesgos
- subestimar la importancia del pulido
- dejar una UI funcional pero poco vendible

## Prompt base para Codex
```text
Realiza el patch final de pulido del MVP de Negocio Autónomo para dejarlo listo para demo seria y pilotos.

Objetivo:
que el sistema se vea y se sienta como un producto usable, claro y vendible.

Debe incluir:
- demo data impecable
- empty states y loading states correctos
- textos comerciales dentro del producto
- manejo básico de errores
- panel admin suficiente para operar pilotos
- checklist o ayudas mínimas para conexión/canal/demo
- limpieza visual del flujo principal

No agregar nuevas features grandes.
Prioridad: claridad, estabilidad, demoabilidad.
```

---

## 4. Orden de PRs recomendado

### PR 1
- Patch 00
- Patch 01

### PR 2
- Patch 02
- Patch 03

### PR 3
- Patch 04
- Patch 05

### PR 4
- Patch 06
- Patch 07

### PR 5
- Patch 08
- Patch 09

### PR 6
- Patch 10
- Patch 11

### Regla
No abrir demasiados frentes paralelos si todavía no existe el flujo central completo.

---

## 5. Checklist de revisión por patch

Cada patch debe revisarse contra estas preguntas:

### Producto
- ¿esto acerca o aleja al sistema de su tesis?
- ¿parece más una capa operativa o una agenda genérica?
- ¿agrega valor real o solo complejidad?

### UX
- ¿un dueño no técnico lo entiende?
- ¿la pantalla dice claramente qué hacer?
- ¿hay fricción innecesaria?

### Técnica
- ¿esto quedó modular?
- ¿se acopló indebidamente a un proveedor?
- ¿preserva el flujo futuro multicanal?

### Comercial
- ¿esto ayuda a demoear mejor?
- ¿esto hace más fácil cobrar por implementación/piloto?
- ¿esto refuerza el diferencial?

---

## 6. Criterio de corte de alcance

Si el desarrollo empieza a inflarse, se recorta en este orden:

### Primero recortar
- dashboard avanzado
- objeciones sofisticadas
- canal 3
- automatizaciones complejas
- visuales por vertical extra

### No recortar salvo crisis real
- ingestión real de al menos un canal
- bandeja/pipeline
- seguimiento priorizado
- agenda básica
- resumen y próxima acción sugerida

---

## 7. Definición final de MVP terminado

El MVP se considera realmente terminado cuando puede demostrarse este flujo:

1. el negocio conecta un canal real soportado
2. entra un lead o mensaje automáticamente
3. el sistema crea/actualiza lead y contacto
4. el caso aparece en la bandeja
5. el sistema sugiere siguiente acción
6. el usuario puede hacer seguimiento o reservar
7. la actividad impacta en métricas

Si eso no ocurre, el MVP todavía no está terminado.

---

## 8. Próximo paso después de este archivo

Una vez aceptado este documento, el siguiente paso recomendable es crear:

### `ARCHITECTURE.md`
con:
- módulos y boundaries exactos
- rutas/api handlers
- esquema de datos definitivo
- servicios compartidos
- estructura de carpetas
- estrategia de flags y entornos

Y después de eso:

### primer prompt maestro para Codex
para ejecutar **Patch 00 + Patch 01** sin fricción.


---

## PATCH 06 — Endpoint interno de eventos normalizados (testing)

### Nuevo endpoint
- **Ruta:** `POST /api/ingestion/events`
- **Uso:** recepción interna de eventos normalizados de prueba.
- **Auth:** header `Authorization: Bearer <INTERNAL_INGESTION_TOKEN>`

### Contrato JSON
```json
{
  "businessId": "cm123business",
  "source": "manual_test",
  "eventType": "lead.created",
  "payload": {
    "leadExternalId": "lead_001",
    "contact": {
      "name": "Ana Pérez",
      "phone": "+59899111222"
    },
    "message": "Quiero reservar para mañana"
  }
}
```

### Respuesta esperada (202)
```json
{
  "ok": true,
  "inboundEventId": "cm123event",
  "status": "PENDING",
  "receivedAt": "2026-04-30T12:00:00.000Z"
}
```

### Errores
- `401 unauthorized`: token ausente o inválido.
- `400 invalid_json`: body no parseable.
- `400 invalid_payload`: faltan `businessId`, `source`, `eventType` o `payload`.
