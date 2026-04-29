# Dominio operativo base (Patch 02)

Relaciones clave del dominio:

- `Contact` representa una persona/cuenta identificable para un `Business`.
- `Lead` representa una oportunidad comercial y puede vincularse opcionalmente a un `Contact`.
- `Conversation` representa un hilo de mensajes y puede vincularse a `Contact`, `Lead` o ambos.
- `Booking` representa una reserva operativa y puede quedar vinculada a `Contact` y/o `Lead`.
- `FollowUpTask` siempre depende de un `Lead`.
- `ActivityLog` funciona como auditoría transversal por negocio/entidad.

Principio de separación:

1. **Contacto**: identidad y datos de perfil.
2. **Lead**: estado comercial y contexto de oportunidad.
3. **Conversación**: canal/hilo de interacción.

La capa de servicio (`operationalService`) aplica validaciones mínimas y delega persistencia a `operationalRepository`.
