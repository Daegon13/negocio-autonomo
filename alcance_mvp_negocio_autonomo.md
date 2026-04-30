# Documento de alcance — MVP de **Negocio Autónomo**

## 1. Resumen ejecutivo

**Negocio Autónomo** es un MVP productizado para **negocios locales de servicios** que operan principalmente por **WhatsApp, consultas, reservas y seguimiento manual**.

La propuesta del producto es simple:

> Darle a un negocio chico una capa operativa inteligente para **captar consultas, ordenarlas, responder más rápido, reservar, hacer seguimiento y reducir pérdidas por caos operativo**.

Este documento define la **versión final aceptable del MVP**, su alcance funcional, técnico y comercial, y cómo se incorporan las ideas inspiradas en **MiroFish** sin desviar el proyecto hacia un sistema demasiado grande, lento o difícil de vender.

---

## 2. Decisión estratégica del proyecto

### Forma elegida del producto
Se decide construir un:

- **MVP productizado**
- con **demo comercial fuerte**
- reutilizando la base técnica, aprendizajes y componentes sanos de **Smart Stock**
- con horizonte a escalar en el futuro a plataforma más amplia

### Decisión importante
Este proyecto **no** será, en esta fase:

- un SaaS completo self-serve,
- un CRM genérico,
- un simple agendador,
- ni un simulador masivo multiagente al estilo MiroFish desde el día uno.

La lógica es:

> primero resolver un problema real, vendible y repetible;
> luego agregar capas de inteligencia, simulación y automatización avanzada.

---

## 3. Tesis del producto

### Tesis principal
Muchos negocios locales pierden ventas no porque no tengan clientes potenciales, sino porque:

- responden tarde,
- se olvidan de hacer seguimiento,
- dependen demasiado del dueño,
- tienen la agenda desordenada,
- y no convierten consultas en reservas de forma consistente.

### Tesis de solución
Negocio Autónomo debe convertirse en una **capa operativa inteligente** que ayude a esos negocios a:

- atender mejor,
- ordenar mejor,
- seguir mejor,
- medir mejor,
- y vender mejor.

---

## 4. Público objetivo del MVP

### Público primario
Negocios locales de servicios que trabajan con:

- reservas,
- consultas,
- turnos,
- seguimiento,
- y contacto frecuente por WhatsApp.

### Verticales iniciales compatibles
- veterinarias
- barberías
- estética
- técnicos / servicios a domicilio
- pequeños centros de atención con agenda

### Público excluido en esta fase
- empresas grandes
- retail complejo como foco principal
- operaciones enterprise
- negocios que requieran ERPs o múltiples flujos avanzados desde el inicio

---

## 5. Problemas que el MVP debe resolver

### Problemas comerciales
- consultas que entran y nadie responde rápido
- leads que se enfrían por falta de seguimiento
- pérdida de ventas por fricción para reservar o escribir
- baja conversión de consultas en reservas
- dependencia del dueño para cada interacción

### Problemas operativos
- agenda desordenada
- falta de visibilidad sobre qué cliente está en qué estado
- ausencia de recordatorios
- no-shows
- historial disperso o inexistente

### Problemas de gestión
- no saber cuántas consultas entran
- no saber cuántas se convierten
- no detectar oportunidades olvidadas
- no entender por qué se pierden clientes
- no tener trazabilidad mínima de la operación comercial

---

## 6. Objetivos del MVP

### Objetivo principal
Construir una versión usable y vendible que permita a un negocio local:

- captar consultas,
- ordenarlas,
- convertirlas en reservas,
- hacer seguimiento,
- y operar con menos caos.

### Objetivos de negocio
- cerrar pilotos pagos
- validar repetición del problema en varios negocios
- demostrar que la propuesta genera valor medible
- preparar la base para una evolución futura a plataforma más amplia

### Objetivos de producto
- ofrecer una experiencia simple
- reducir fricción operativa
- mostrar valor rápido
- apoyar la toma de acción con IA útil y concreta

---

## 7. Principios de alcance

1. **Resolver primero lo más vendible.**
2. **Evitar features que no impacten conversión u orden operativo.**
3. **No convertir el MVP en un SaaS completo.**
4. **No dejar que la inspiración en MiroFish rompa el foco del MVP.**
5. **Usar agentes y simulaciones solo donde aporten valor claro al flujo comercial.**
6. **Reutilizar Smart Stock como infraestructura y motor, no como narrativa cerrada.**

---

## 8. Definición del producto final aceptado para el MVP

La versión final aceptada del MVP deberá ser una plataforma web simple para negocios locales de servicios que permita:

- captar leads,
- verlos en una bandeja,
- moverlos por estados,
- asociarlos a una agenda,
- ejecutar recordatorios,
- hacer seguimiento,
- consultar historial,
- ver métricas básicas,
- y recibir apoyo de IA para responder, resumir y accionar.

Además, deberá dejar sentada la primera capa de inteligencia avanzada inspirada en MiroFish, pero **aterrizada al negocio local**.

---

# 9. Alcance funcional

## 9.1. Capa de ingestión automática de leads e inboxes

### Decisión estratégica
Esta capa pasa a ser **parte central del MVP**.

Sin esta capacidad, Negocio Autónomo corre el riesgo de ser percibido como una agenda premium más. Con esta capacidad, el producto se posiciona como una **capa operativa inteligente conectada a los canales reales por donde entran consultas**.

### Objetivo
Permitir que el sistema reciba automáticamente leads, mensajes o señales de contacto desde las bandejas de entrada y canales que el negocio ya usa, sin exigir carga manual como flujo principal.

### Alcance del MVP
El MVP no intentará soportar todos los canales desde el inicio. Se priorizarán los canales con mejor combinación de:

- posibilidad técnica real
- permiso oficial o integración viable
- frecuencia de uso por negocios locales
- valor comercial inmediato

### Prioridad recomendada de canales
1. WhatsApp Business / WhatsApp Cloud API
2. Instagram Professional / mensajes conectados por ecosistema Meta
3. Facebook Page / Messenger
4. Lead Ads de Meta
5. Email / otros canales, solo si aportan valor claro en pilotos

### Qué debe permitir esta capa
- conectar uno o más canales autorizados por el negocio
- recibir eventos entrantes en tiempo razonable
- detectar nuevos leads o mensajes relevantes
- deduplicar contactos cuando corresponda
- crear o actualizar leads automáticamente
- enlazar mensajes con clientes existentes
- registrar origen, canal y contexto
- guardar eventos para trazabilidad
- disparar reglas de seguimiento

### Qué no debe hacer todavía
- prometer soporte universal a todas las redes sociales
- depender de scraping frágil como estrategia principal
- mezclar muchos canales si eso retrasa validación del MVP
- convertir la sincronización histórica total en requisito obligatorio de la primera versión

### Resultado esperado
Cuando un negocio conecte sus canales, el sistema debe poder transformar una conversación o lead entrante en un objeto de trabajo dentro de Negocio Autónomo sin que el dueño tenga que cargarlo manualmente.

---

## 9.2. Módulo de captura de consultas

### Debe permitir
- ingreso de leads desde formulario web
- ingreso de leads desde flujo orientado a WhatsApp
- ingreso de solicitudes de reserva o turno
- registro del origen del lead
- guardado automático del contacto

### Datos mínimos por lead
- nombre
- teléfono / contacto
- canal
- servicio consultado
- mensaje inicial
- fecha y hora de ingreso
- estado inicial

### Valor que aporta
- centraliza entradas
- evita consultas perdidas
- da punto de partida al seguimiento

---

## 9.2. Bandeja de leads / consultas

### Debe mostrar
- listado de leads
- estado actual
- última actividad
- canal de entrada
- próxima acción sugerida
- urgencia o prioridad básica

### Debe permitir
- abrir ficha del lead
- cambiar estado
- agregar nota
- registrar contacto realizado
- generar seguimiento

### Valor que aporta
- da orden inmediato
- evita trabajar “a memoria”
- reduce olvidos

---

## 9.3. Pipeline de estados

### Estados mínimos
- nuevo
- contactado
- pendiente
- reservado / confirmado
- perdido / cerrado

### Debe permitir
- mover el lead entre estados
- registrar cambios
- usar los estados en métricas
- detectar cuellos de botella

### Valor que aporta
- visibilidad de avance real
- medición de conversión
- claridad comercial

---

## 9.4. Agenda y reservas

### Debe permitir
- configurar disponibilidad
- visualizar horarios libres y ocupados
- crear reserva / turno
- confirmar o cancelar
- asociar reserva a lead o cliente
- evitar doble reserva inválida

### Vista mínima
- día
- semana básica

### Datos mínimos por reserva
- cliente
- servicio
- fecha
- hora
- duración
- estado
- notas

### Valor que aporta
- orden operativo
- menor fricción para reservar
- menor riesgo de caos manual

---

## 9.5. Recordatorios y seguimiento

### Debe permitir
- recordatorio de cita
- recordatorio por falta de respuesta
- recordatorio interno al negocio
- seguimiento manual asistido

### Casos que debe detectar
- lead nuevo sin responder
- lead contactado sin cierre
- cliente que consultó pero no reservó
- reserva pendiente de confirmación

### Valor que aporta
- aumenta probabilidad de cierre
- reduce enfriamiento de leads
- baja la carga mental del dueño

---

## 9.6. Ficha del cliente

### Debe contener
- datos básicos
- historial de consultas
- historial de reservas
- notas
- estado actual
- última actividad
- próxima acción

### Valor que aporta
- continuidad
- contexto
- seguimiento consistente

---

## 9.7. Historial de actividad

### Debe registrar
- creación de lead
- cambios de estado
- creación / confirmación / cancelación de reservas
- notas
- recordatorios ejecutados
- sugerencias o acciones realizadas

### Valor que aporta
- trazabilidad
- soporte a métricas
- inspección operativa

---

## 9.8. Dashboard de métricas

### Métricas mínimas
- consultas ingresadas
- leads pendientes
- reservas confirmadas
- tasa básica de conversión
- tiempo estimado de respuesta
- cancelaciones / no-shows si aplica

### El dashboard debe responder
- cuántas oportunidades entraron
- cuántas siguen vivas
- cuántas se convierten
- dónde se pierde valor

### Valor que aporta
- visibilidad de gestión
- sensación de control
- justificación comercial del producto

---

# 10. Capa de IA del MVP

## 10.1. IA mínima obligatoria del MVP

La IA del MVP debe ser **útil, concreta y accionable**.

### Debe hacer
- resumir una consulta
- sugerir una respuesta inicial
- sugerir próximo paso
- detectar leads olvidados
- proponer seguimiento

### No debe hacer todavía
- reemplazar toda la operación humana
- actuar sin control humano en flujos sensibles
- generar campañas autónomas completas
- ejecutar simulaciones masivas como núcleo del MVP

---

## 10.2. Incorporación de ideas inspiradas en MiroFish

Las ideas tomadas de MiroFish **sí se retoman**, pero adaptadas al problema correcto.

La inspiración no será “simular el mundo entero”, sino usar una lógica de **agentes sintéticos y simulación aplicada al negocio local**.

### Se incorporan como tres líneas de inteligencia del producto:

#### A. Agente de Objeciones
Un agente que analice consultas, respuestas y cierres/perdidas para detectar:

- objeciones frecuentes
- dudas repetidas
- fricción comercial
- mensajes que no convierten
- momentos donde el lead se enfría

##### Salidas esperadas
- resumen de objeciones frecuentes
- sugerencias de mejora del guion de atención
- respuestas sugeridas ante objeciones
- advertencias sobre puntos débiles del flujo comercial

##### Alcance en el MVP
**Versión inicial incluida** como capa analítica ligera.
No requiere simulación compleja multiagente todavía.

---

#### B. Agente de Seguimiento
Un agente que priorice leads y sugiera la siguiente acción.

##### Debe considerar
- antigüedad del lead
- estado
- tiempo sin respuesta
- interés aparente
- historial previo

##### Salidas esperadas
- lista priorizada de leads a atender
- sugerencia de mensaje
- recomendación de contacto o re-contacto
- alertas sobre oportunidades en riesgo

##### Alcance en el MVP
**Incluido como parte central del MVP.**
Esta es la idea MiroFish más útil y comercialmente fuerte para la primera versión.

---

#### C. Simulación de marketing y objeciones sintéticas
Una capa que use perfiles sintéticos o agentes limitados para simular:

- cómo reaccionarían distintos tipos de clientes ante un mensaje
- qué objeciones podría generar una promoción
- qué preguntas aparecerían en una campaña
- qué mensajes parecen más claros o más confusos

##### Valor potencial
- mejorar copy
- mejorar campañas
- reducir lanzamiento “a ciegas”
- dar feedback antes de publicar una promoción

##### Alcance en el MVP
**No entra como funcionalidad completa obligatoria del MVP.**

Sí entra como:
- línea de diseño futura del producto
- posible prototipo interno
- módulo fase 2

Motivo:
si se incluye completo desde el inicio, aumenta demasiado el alcance y puede desviar el proyecto del problema principal.

---

# 11. Decisión formal de alcance sobre agentes y simulación

## Incluido en el MVP final aceptado
- agente de seguimiento
- sugerencia de respuestas
- detección de leads olvidados
- análisis ligero de objeciones a partir de datos reales del negocio

## Incluido parcialmente / versión inicial
- agente de objeciones con lectura analítica simple
- recomendaciones de copy/respuesta

## Post-MVP / fase siguiente
- simulador de campañas
- testeo de mensajes con clientes sintéticos
- simulación comparativa de estrategias de seguimiento
- simulación de marketing tipo sandbox
- multiagente más complejo inspirado directamente en MiroFish

---

# 12. Alcance técnico

## 12.1. Reutilización de Smart Stock

Se reutilizará lo que aporte velocidad, estabilidad y valor estructural.

### Reutilización esperada
- shell de dashboard
- autenticación base
- modelo multi-tenant básico
- panel administrativo
- event logging / auditoría
- estructura de métricas
- assistant/copilot base
- sistema de flags y entorno demo
- patrones de configuración por negocio
- infraestructura general de app moderna

### Lo que no debe arrastrarse como centro narrativo
- lenguaje centrado en stock
- flujos puramente retail
- pantallas que desvíen el foco comercial del nuevo wedge
- complejidad innecesaria para el vertical de servicios

---

## 12.2. Requisitos técnicos mínimos del MVP

## 12.2.A. Arquitectura mínima de integración e ingestión

### Nueva capa técnica obligatoria
El MVP deberá incluir una capa técnica específica de **integración, ingestión y normalización de eventos entrantes**.

### Responsabilidades de esta capa
- autenticación y conexión del canal
- recepción de webhooks o polling controlado cuando corresponda
- validación de firma / seguridad del proveedor
- normalización de eventos a un modelo interno común
- creación o actualización de lead / conversación / cliente
- deduplicación básica
- manejo de errores y reintentos
- registro de auditoría
- desacople entre proveedor externo y lógica del producto

### Modelo interno recomendado
Todos los canales deberán transformarse a entidades internas similares a:
- ChannelConnection
- Conversation
- Contact
- Lead
- MessageEvent
- BookingIntent
- FollowUpTask

### Principio de arquitectura
Las integraciones externas no deben tocar directamente la lógica del producto. Deben entrar primero a una **capa de normalización**.

### Motivo
Esto permite:
- reutilizar lógica de negocio
- agregar nuevos canales en el futuro
- evitar dependencia excesiva de una sola API externa
- preservar trazabilidad y consistencia

### Prioridad técnica de implementación
1. webhook receiver seguro
2. normalización de eventos
3. creación automática de lead/contacto
4. vínculo con bandeja y pipeline
5. reglas de seguimiento y priorización
6. sincronización o backfill histórico limitado si aporta valor real

### Riesgos reconocidos
- permisos y revisiones de plataformas
- restricciones de cuentas personales vs cuentas business/professional
- diferencias entre canales
- limitaciones de envío fuera de ventanas permitidas
- complejidad de soporte si se intenta abarcar demasiado al inicio

### Decisión de alcance
El MVP aceptado deberá resolver bien 1 o 2 canales principales antes de abrir soporte amplio.

---

### Aplicación
- web app estable
- persistencia real
- modo demo
- entorno de producción para pilotos
- entorno staging

### Datos
- base de datos real
- multi-tenant básico
- configuración por negocio
- almacenamiento de leads, clientes, reservas y actividad

### Operación
- cron/jobs para recordatorios
- manejo razonable de errores
- auditoría básica
- seeds/demo data
- administración interna

### IA
- capa de inferencia para sugerencias
- lógica de priorización de seguimiento
- lectura básica de patrones de objeciones

---

# 13. Alcance de diseño y experiencia

## Principios
- claridad antes que espectacularidad
- velocidad antes que complejidad
- foco en tareas antes que dashboards gigantes
- diseño entendible por dueños no técnicos

## La UX final del MVP debe priorizar
- bandeja de trabajo clara
- agenda simple
- acciones rápidas
- poco texto innecesario
- estados visibles
- sensación de control

## El diseño debe transmitir
- orden
- rapidez
- ayuda real
- menos caos
- negocio mejor atendido

---

# 14. Fuera de alcance del MVP

## No entra en esta versión
- SaaS self-serve completo
- billing y suscripciones automáticas complejas
- multi-sucursal avanzada
- permisos ultra detallados
- omnicanal completo
- CRM enterprise
- campañas automáticas masivas
- módulos avanzados de stock como foco principal
- predicción compleja de demanda
- simulador multiagente completo estilo MiroFish
- marketplace de integraciones
- onboarding totalmente autónomo

---

# 15. Criterios de aceptación del MVP final

## 15.A. Criterios de aceptación de la capa de ingestión

El MVP no se considerará estratégicamente completo si no cumple un flujo mínimo de captura automática.

### Debe cumplirse que
- un negocio pueda conectar al menos un canal real soportado
- el sistema reciba un evento entrante real o de prueba
- el evento se normalice correctamente
- se cree o actualice un lead automáticamente
- el lead aparezca en la bandeja sin carga manual
- el origen del lead quede registrado
- la actividad quede trazada en historial
- el sistema pueda sugerir siguiente acción sobre ese lead

### Criterio comercial
Durante una demo o piloto, debe ser posible mostrar que el sistema toma una consulta real de un canal conectado y la convierte en trabajo operativo dentro de la plataforma.

---

El MVP se considerará terminado cuando:

## Flujo base
- un lead puede entrar correctamente
- se guarda en el sistema
- aparece en bandeja
- puede cambiar de estado
- puede tener seguimiento
- puede vincularse a una reserva
- impacta en métricas

## Agenda
- existe disponibilidad configurable
- puede reservarse un turno
- no permite solapamientos inválidos
- puede confirmarse o cancelarse
- puede generar recordatorios

## IA
- resume consultas
- sugiere respuestas
- sugiere siguiente acción
- detecta leads olvidados
- entrega una primera lectura de objeciones frecuentes

## Experiencia
- un dueño no técnico puede entenderlo
- se puede demoear sin romperse
- se puede usar con pilotos reales
- no se siente experimental ni confuso

## Valor comercial
- demuestra un antes/después claro
- tiene suficiente valor para vender implementación y mensualidad
- permite validar uso real

---

# 16. Roadmap de fases

## Fase 1 — MVP aceptado
**Objetivo:** resolver orden, seguimiento y reservas con IA útil.

Incluye:
- captura de leads
- bandeja
- pipeline
- agenda
- recordatorios
- ficha del cliente
- dashboard básico
- agente de seguimiento
- IA de respuesta y resumen
- lectura básica de objeciones

## Fase 2 — Inteligencia comercial
**Objetivo:** mejorar conversión y mensajes.

Posibles módulos:
- agente de objeciones ampliado
- recomendaciones de copy
- análisis de cierre/pérdida por patrón
- playbooks por vertical

## Fase 3 — Simulación y laboratorio
**Objetivo:** incorporar la inspiración más fuerte de MiroFish.

Posibles módulos:
- campañas simuladas con perfiles sintéticos
- objeciones sintéticas por segmento
- pruebas de mensajes antes de lanzar
- sandbox de seguimiento y marketing

---

# 17. Definición final del alcance

> La versión final aceptada del MVP de Negocio Autónomo será una plataforma simple y usable para negocios locales de servicios que capture consultas, las ordene, las convierta en reservas y permita hacer seguimiento con apoyo de IA, mientras incorpora una primera capa de inteligencia inspirada en MiroFish mediante agentes de seguimiento y análisis ligero de objeciones, dejando la simulación comercial avanzada como fase posterior.

---

# 18. Decisión de producto cerrada

### Sí al MVP
- usable
- vendible
- reutilizando Smart Stock
- con IA práctica
- con agentes donde realmente aportan

### No al alcance inflado
- no intentaremos resolver toda la operación de todas las pymes en la primera versión
- no intentaremos construir un simulador total desde el día uno
- no mezclaremos features de SaaS completo con MVP si no ayudan a cerrar y validar

---

# 19. Próximo documento recomendado

A partir de este alcance, el siguiente documento a crear debería ser:

## **Plan de producto y ejecución**
con estas secciones:
- módulos
- prioridades
- dependencias
- reutilización de Smart Stock por componente
- arquitectura mínima viable
- plan de desarrollo por fases
- definición de demo vs pilotos
- criterios de corte de alcance

---

# 20. Decisión técnica inicial para la capa de ingestión

## 20.1. Objetivo de la primera ola técnica

La primera versión técnica de ingestión debe demostrar que Negocio Autónomo puede recibir leads o mensajes desde un canal real, normalizarlos y convertirlos en trabajo operativo dentro del sistema.

### Objetivo concreto de la primera ola
Resolver bien el flujo:

**canal conectado → evento entrante → normalización → lead/conversación → bandeja → sugerencia de acción**

No se intentará resolver omnicanal total en la primera implementación.

---

## 20.2. Canal inicial recomendado

### Canal 1 — Meta Lead Ads

#### Por qué entra primero
- menor complejidad que mensajería bidireccional completa
- muy útil para demos comerciales y pilotos
- valor inmediato para campañas
- permite probar ingestión real de leads sin tener que resolver toda la conversación primero

#### Qué valida
- conexión con Meta
- recepción por webhook
- normalización de lead
- creación automática de lead interno
- deduplicación
- disparo de seguimiento

### Canal 2 — Instagram Professional / Facebook Page Messaging

#### Por qué entra segundo
- más alineado con el uso real de negocios locales
- mete al producto en el flujo real de consultas por inbox
- fortalece el wedge diferencial

#### Qué valida
- conexión a inbox real
- recepción de mensajes entrantes
- creación de conversación y lead
- sugerencia de respuesta y seguimiento

### Canal 3 — WhatsApp Business / Cloud API

#### Por qué no necesariamente entra primero
- es muy valioso, pero puede agregar fricción operativa, plantillas, ventanas y más complejidad de envío/recepción
- conviene después de validar bien el modelo interno y la capa de normalización

#### Cuándo entra
- cuando la arquitectura interna ya esté estable
- cuando la bandeja, seguimiento y deduplicación ya funcionen bien

---

## 20.3. Decisión de alcance por etapas

### Etapa A
- Lead Ads
- ingestión de leads
- creación automática de lead
- seguimiento sugerido

### Etapa B
- Instagram / Facebook messaging
- creación de conversación
- asociación a contacto/lead
- sugerencia de respuesta
- detección de objeciones básicas

### Etapa C
- WhatsApp Business
- mensajes entrantes
- integración con seguimiento
- reglas operativas y recordatorios por canal

---

## 20.4. Arquitectura mínima recomendada

### Capa 1 — Conexión de canal
Responsable de:
- guardar credenciales o tokens válidos
- asociar el canal a un negocio
- manejar estado de conexión
- permitir reconexión o revocación

### Capa 2 — Recepción de eventos
Responsable de:
- exponer webhook endpoints
- verificar firmas o challenge de proveedor
- recibir eventos entrantes
- desacoplar la recepción del procesamiento interno

### Capa 3 — Normalización
Responsable de convertir eventos externos a objetos internos comunes.

#### Entidades recomendadas
- ChannelConnection
- Conversation
- Contact
- Lead
- MessageEvent
- BookingIntent
- FollowUpTask
- ObjectionSignal

### Capa 4 — Motor de negocio
Responsable de:
- crear o actualizar leads
- unir contactos repetidos
- enviar a bandeja
- actualizar pipeline
- asociar agenda si aplica
- disparar reglas y seguimiento

### Capa 5 — Capa de inteligencia
Responsable de:
- priorizar leads
- sugerir próxima acción
- resumir mensajes
- detectar objeciones
- alimentar el dashboard operativo

---

## 20.5. Principio clave de arquitectura

Las integraciones externas no deben tocar directamente la lógica del producto.

### Regla
Todo evento externo debe pasar primero por una capa de normalización interna.

### Motivo
- permite agregar canales nuevos sin reescribir todo
- evita acoplamiento fuerte a una sola API externa
- facilita pruebas
- mejora trazabilidad
- protege la lógica del producto contra cambios del proveedor

---

## 20.6. Flujo técnico mínimo esperado

### Lead Ads
1. el negocio conecta Meta
2. Meta envía evento al webhook
3. el receptor valida y almacena evento crudo
4. normalizador crea objeto Lead normalizado
5. motor interno crea o actualiza lead/contacto
6. bandeja muestra nuevo lead
7. agente de seguimiento sugiere próxima acción

### Inbox / Messaging
1. el negocio conecta cuenta profesional
2. llega mensaje entrante
3. webhook recibe evento
4. normalizador genera MessageEvent y Conversation
5. sistema intenta matchear contacto existente
6. crea o actualiza lead
7. bandeja muestra conversación
8. IA resume y sugiere respuesta

---

## 20.7. Datos mínimos por canal

### ChannelConnection
- id
- businessId
- provider
- channelType
- externalAccountId
- connectionStatus
- scopes / permissions
- createdAt
- updatedAt

### Lead
- id
- businessId
- sourceProvider
- sourceChannel
- externalLeadId opcional
- contactId
- status
- serviceInterest
- rawPayloadRef
- createdAt
- updatedAt

### Conversation
- id
- businessId
- channelConnectionId
- contactId
- externalThreadId
- lastMessageAt
- status

### MessageEvent
- id
- conversationId
- direction
- providerMessageId
- content
- timestamp
- rawPayloadRef

### FollowUpTask
- id
- businessId
- leadId
- type
- priority
- dueAt
- suggestedAction
- status

---

## 20.8. Reutilización recomendada de Smart Stock

### Reutilizar directamente
- shell del dashboard
- autenticación base
- modo demo y flags
- panel administrativo
- sistema de tenants o negocios
- logging / auditoría
- componentes de métricas
- assistant/copilot base si ya existe estructura útil
- layout general y navegación administrativa

### Reutilizar con adaptación
- event system
- modelos de actividad
- motor de sugerencias
- tablas de configuración
- componentes de historial
- servicios de insights

### No arrastrar como centro del nuevo producto
- naming centrado en inventario
- modelos donde stock sea la entidad dominante
- pantallas retail que no aporten al flujo de leads / agenda / seguimiento
- complejidad de compras/proveedores si no aporta al MVP

---

## 20.9. Decisión de implementación del backend

### Recomendación
Implementar la ingestión como módulo separado dentro del mismo producto, no como microservicio independiente en la primera fase.

### Motivo
- menos complejidad operativa
- más velocidad
- más fácil de testear en MVP
- suficiente para validar pilotos

### Condición
Debe quedar modularizado como si en el futuro pudiera separarse.

---

## 20.10. Riesgos técnicos reconocidos

- permisos y revisiones de plataformas
- diferencias entre cuentas personales y business/professional
- fragilidad si se intenta cubrir demasiados canales muy pronto
- problemas de deduplicación si no se define bien el contacto único
- mezcla confusa entre lead y conversación si el modelo interno no se separa bien
- riesgo de sobreprometer sincronización histórica completa

---

## 20.11. Criterio de aceptación técnico de esta capa

Se considerará aceptada esta primera decisión técnica cuando el sistema pueda demostrar al menos uno de estos flujos en entorno de prueba o piloto:

### Flujo A
- Lead Ads conectado
- webhook recibido
- lead creado automáticamente
- lead visible en bandeja
- seguimiento sugerido generado

### Flujo B
- inbox de Meta conectado
- mensaje entrante recibido
- conversación creada
- lead/contacto generado o actualizado
- resumen y sugerencia de respuesta visibles

---

## 20.12. Conclusión técnica

La capa de ingestión no es un accesorio del MVP.

Es la pieza que convierte a Negocio Autónomo de una agenda mejorada en una plataforma operativa comercial conectada a los canales reales del negocio.

La estrategia recomendada es:
- empezar con un ecosistema único fuerte
- normalizar eventos a un modelo interno propio
- construir seguimiento y objeciones sobre esos datos
- y recién después expandir canales y simulación avanzada

---

# 21. Plan técnico de ejecución del MVP

## 21.1. Objetivo del plan

Transformar el alcance del MVP en un plan de implementación incremental que permita:

- reutilizar Smart Stock con criterio
- construir primero el wedge real del producto
- mantener el alcance controlado
- llegar rápido a una demo usable y luego a pilotos

---

## 21.2. Principios de ejecución

1. **Primero infraestructura reutilizable, después features vistosas.**
2. **Primero ingestión y normalización, después simulaciones.**
3. **Primero un flujo completo usable, después cobertura amplia de casos.**
4. **Primero un canal bien integrado, después expansión.**
5. **Todo lo nuevo debe justificarse por valor comercial o por habilitar el siguiente módulo.**

---

## 21.3. Módulos del sistema

### Módulo A — Core Platform
Incluye:
- negocio / tenant
- usuarios
- autenticación
- configuración base
- permisos mínimos
- layout y navegación
- modo demo
- panel admin interno

### Módulo B — Integraciones e ingestión
Incluye:
- ChannelConnection
- endpoints webhook
- validación de eventos
- almacenamiento de payloads crudos
- normalización
- mapeo a entidades internas

### Módulo C — Leads y conversaciones
Incluye:
- Lead
- Contact
- Conversation
- MessageEvent
- pipeline de estados
- bandeja de trabajo

### Módulo D — Agenda y reservas
Incluye:
- disponibilidad
- reservas
- estados de cita
- prevención de solapamientos
- recordatorios base

### Módulo E — Seguimiento y tareas
Incluye:
- FollowUpTask
- reglas básicas
- priorización
- alertas
- próximos pasos

### Módulo F — IA operativa
Incluye:
- resumen de conversación/lead
- sugerencia de respuesta
- sugerencia de siguiente acción
- detección de lead olvidado
- lectura básica de objeciones

### Módulo G — Métricas y visibilidad
Incluye:
- dashboard básico
- contadores
- conversiones básicas
- tiempos estimados
- actividad reciente

---

## 21.4. Matriz de reutilización de Smart Stock

### Reutilizar sin discutir demasiado
- estructura Next.js / TypeScript
- shell del dashboard
- auth base
- tenant/business model base
- panel administrativo
- logging / auditoría
- flags y entorno demo
- componentes generales de tabla, cards, layout y navegación
- patrones de configuración por cuenta

### Reutilizar con refactor selectivo
- sistema de eventos
- assistant/copilot
- componentes de métricas
- historial de actividad
- servicios de insights
- jobs / cron si ya existen patrones sanos

### Congelar o aislar
- entidades puramente retail
- compras/proveedores
- terminología de inventario
- vistas donde el stock sea el eje principal

### Eliminar del flujo principal del nuevo producto
- cualquier pantalla o copy que haga pensar que el producto es un sistema de depósito
- cualquier feature no relacionada con leads, atención, agenda, seguimiento o métricas operativas

---

## 21.5. Modelo de datos mínimo viable

### Business
- id
- name
- slug
- verticalType
- timezone
- contactPhone
- createdAt
- updatedAt

### User
- id
- businessId
- name
- email
- role

### ChannelConnection
- id
- businessId
- provider
- channelType
- externalAccountId
- status
- scopesJson
- metadataJson
- createdAt
- updatedAt

### Contact
- id
- businessId
- displayName
- phone
- email
- externalRefsJson
- createdAt
- updatedAt

### Lead
- id
- businessId
- contactId
- sourceProvider
- sourceChannel
- externalLeadId
- status
- serviceInterest
- summary
- priority
- rawPayloadRef
- createdAt
- updatedAt

### Conversation
- id
- businessId
- channelConnectionId
- contactId
- leadId
- externalThreadId
- status
- lastMessageAt
- createdAt
- updatedAt

### MessageEvent
- id
- businessId
- conversationId
- providerMessageId
- direction
- content
- payloadType
- rawPayloadRef
- createdAt

### Booking
- id
- businessId
- contactId
- leadId
- serviceName
- startsAt
- endsAt
- status
- notes
- createdAt
- updatedAt

### AvailabilityRule
- id
- businessId
- dayOfWeek
- startTime
- endTime
- slotDurationMin
- isActive

### FollowUpTask
- id
- businessId
- leadId
- type
- status
- priority
- dueAt
- suggestedAction
- reason
- createdAt
- updatedAt

### ActivityLog
- id
- businessId
- entityType
- entityId
- actionType
- actorType
- actorId
- payloadJson
- createdAt

### ObjectionSignal
- id
- businessId
- leadId
- conversationId
- category
- confidence
- evidenceText
- createdAt

---

## 21.6. Orden recomendado de implementación

## Patch 00 — Rebase estratégico sobre Smart Stock

### Objetivo
Preparar la base sin arrastrar la narrativa equivocada.

### Incluye
- duplicar o ramificar base elegida
- renombrado conceptual inicial
- limpieza de navegación
- esconder o aislar módulos retail
- definir feature flags del nuevo producto
- crear estructura de módulos nueva

### Resultado esperado
Base lista para construir Negocio Autónomo sin contaminación fuerte de inventario.

---

## Patch 01 — Core Platform

### Objetivo
Tener base funcional del producto.

### Incluye
- Business / User / auth base
- layout general
- dashboard shell limpio
- panel admin interno básico
- settings base del negocio
- entorno demo

### Dependencias
Patch 00

### Aceptación
- se puede entrar al sistema
- existe negocio demo
- navegación nueva estable
- panel admin visible y usable

---

## Patch 02 — Modelo de datos operativo

### Objetivo
Instalar el nuevo lenguaje de negocio.

### Incluye
- Contact
- Lead
- Conversation
- MessageEvent
- FollowUpTask
- ActivityLog
- Booking
- AvailabilityRule
- ChannelConnection
- ObjectionSignal

### Dependencias
Patch 01

### Aceptación
- migraciones corren bien
- seeds demo crean datos coherentes
- entidades nuevas disponibles para desarrollo

---

## Patch 03 — Bandeja y pipeline de leads

### Objetivo
Tener un flujo manual usable aunque todavía no entren eventos reales.

### Incluye
- listado de leads
- detalle del lead
- cambio de estado
- notas
- historial
- vista de próximos pasos

### Dependencias
Patch 02

### Aceptación
- se puede crear lead manual de prueba
- aparece en bandeja
- cambia de estado
- queda registrado en actividad

---

## Patch 04 — Agenda y reservas

### Objetivo
Resolver el flujo operativo base.

### Incluye
- reglas de disponibilidad
- creación de reservas
- control de solapamientos
- asociación lead ↔ booking
- vista simple de agenda

### Dependencias
Patch 03

### Aceptación
- se puede reservar cita
- se ve en agenda
- no permite doble reserva inválida
- impacta en historial del lead

---

## Patch 05 — Capa de ingestión v1

### Objetivo
Instalar la arquitectura de conexión y webhook antes de la integración completa.

### Incluye
- tabla ChannelConnection
- webhook receiver base
- verificación básica
- almacenamiento de raw events
- normalizador interno inicial
- pruebas con eventos mock y fixtures

### Dependencias
Patch 02

### Aceptación
- el sistema recibe evento mock
- lo persiste
- lo normaliza a objeto interno
- no rompe la app

---

## Patch 06 — Integración real Canal 1

### Objetivo
Conectar el primer canal real priorizado.

### Recomendación
Meta Lead Ads como primera integración real.

### Incluye
- flujo de conexión básico del canal
- recepción real de webhook
- creación automática de lead
- deduplicación básica
- registro del origen

### Dependencias
Patch 05

### Aceptación
- llega evento real o de prueba integrado
- se crea lead automáticamente
- aparece en bandeja
- queda trazabilidad completa

---

## Patch 07 — Seguimiento y tareas

### Objetivo
Transformar leads en trabajo operativo claro.

### Incluye
- generación de FollowUpTask
- lista priorizada de pendientes
- reglas simples de seguimiento
- próximos pasos visibles
- alertas de lead olvidado

### Dependencias
Patch 03 y Patch 06

### Aceptación
- el sistema sugiere qué lead atender
- genera seguimiento para casos sin respuesta
- el usuario ve prioridades claras

---

## Patch 08 — IA operativa v1

### Objetivo
Incorporar IA útil y demostrable.

### Incluye
- resumen automático del lead o conversación
- sugerencia de respuesta
- sugerencia de siguiente acción
- señal básica de objeción

### Dependencias
Patch 07

### Aceptación
- al abrir un lead el sistema muestra resumen
- existe al menos una respuesta sugerida
- existe próxima acción sugerida
- objeciones simples se detectan o marcan

---

## Patch 09 — Dashboard operativo

### Objetivo
Dar visibilidad al dueño.

### Incluye
- consultas ingresadas
- pendientes
- reservas
- conversiones básicas
- actividad reciente
- leads en riesgo

### Dependencias
Patch 07

### Aceptación
- el dashboard refleja datos reales del sistema
- permite entender estado operativo de un vistazo

---

## Patch 10 — Integración real Canal 2

### Objetivo
Meter al producto en inbox real.

### Recomendación
Instagram Professional / Facebook Messaging.

### Incluye
- conexión del canal
- mensajes entrantes a Conversation
- asociación a Contact / Lead
- resumen y sugerencia de respuesta

### Dependencias
Patch 05, 07 y 08

### Aceptación
- un mensaje entrante crea o actualiza conversación y lead
- el sistema resume y propone siguiente acción

---

## Patch 11 — Pulido de demo + readiness para pilotos

### Objetivo
Dejar el MVP listo para demostración seria y uso inicial.

### Incluye
- demo data impecable
- textos comerciales dentro de la app
- estados vacíos bien diseñados
- manejo básico de errores
- panel admin suficiente para operar pilotos
- checklist de entorno demo / piloto

### Dependencias
Todos los patches anteriores mínimos

### Aceptación
- se puede hacer demo en vivo sin romperse
- se puede provisionar negocio piloto
- el flujo central es claro para usuario no técnico

---

## 21.7. Qué puede recortarse si el alcance aprieta

### Se puede recortar antes de tocar el núcleo
- dashboard avanzado
- objeciones con demasiada sofisticación
- múltiples verticales visuales
- canal 3 en la primera salida
- automatizaciones complejas de recordatorios

### No debería recortarse
- modelo lead/contact/conversation
- bandeja operativa
- seguimiento priorizado
- una integración real al menos
- agenda básica
- resumen y próxima acción sugerida

---

## 21.8. Definición de terminado del MVP

El MVP estará estratégicamente terminado cuando pueda demostrarse este flujo completo:

1. un negocio conecta al menos un canal real soportado
2. entra un lead o mensaje automáticamente
3. el sistema crea o actualiza lead y contacto
4. el lead aparece en bandeja con estado
5. el sistema sugiere próxima acción
6. el usuario puede convertirlo en reserva o seguimiento
7. la actividad impacta en métricas y dashboard

Si este flujo no existe, el producto todavía no está terminado aunque tenga muchas pantallas.

---

## 21.9. Decisión ejecutiva final

### Prioridad absoluta
Construir el flujo completo:
**ingestión real → lead → seguimiento → agenda → visibilidad**

### Prioridad secundaria
Agregar inteligencia útil y objeciones

### Prioridad posterior
Simulación comercial estilo MiroFish ampliada

---

## 21.10. Siguiente entregable recomendado

A partir de este plan, el siguiente documento ideal sería:

# **PATCH_NOTES.md**

Con:
- prompts para Codex por patch
- criterios de revisión
- orden de PRs
- checkpoints de demo
- y lista exacta de archivos/módulos a tocar en la base de Smart Stock

