# ADR-004 — Stripe Checkout con webhooks idempotentes

- **Estado**: Aceptado — implementación parcial
- **Fecha**: 2026-07-31
- **Relacionados**: [[docs/07 API/Webhooks]], [[docs/06 Security/Input Validation]]

## Contexto

Cobrar implica manejar datos de tarjeta. Hacerlo en nuestro servidor arrastra alcance PCI
que este proyecto no quiere ni necesita. Además, los webhooks de pago **se reintentan**:
la red falla, el proceso se reinicia, Stripe reenvía. Un handler que no sea idempotente
descuenta inventario dos veces y manda dos correos por la misma compra.

## Decisión

Usar **Stripe Checkout** (la página de pago la aloja Stripe) y confirmar el pago
únicamente desde el **webhook**, nunca desde la redirección del navegador — el cliente
puede cerrar la pestaña, y la redirección no es una fuente de verdad.

Idempotencia en dos niveles:

1. **Registro de eventos**: el `eventId` de Stripe se guarda antes de actuar; un evento ya
   visto se responde con `received: true` y no ejecuta nada.
2. **Máquina de estados del agregado**: `OrderEntity.markAsInProcess()` exige que el pedido
   esté `Pendiente`. Un evento duplicado que sortee el registro choca igual contra el
   invariante del dominio.

El `orderId` viaja en la metadata de la sesión de Checkout.

## Estado de implementación

- ✅ Endpoint `POST /api/v1/webhooks/stripe`, DTO validado, caso de uso idempotente.
- ✅ Guarda de estado en el agregado (segunda línea de defensa).
- ❌ **Verificación de firma del webhook con `STRIPE_WEBHOOK_SECRET`** — pendiente, y es
  bloqueante antes de exponer el endpoint: hoy cualquiera que conozca la URL puede
  fabricar un evento de pago.
- ❌ Creación real de la sesión de Checkout (`checkoutUrl` es todavía un enlace local).
- ❌ El registro de eventos vive en memoria: se pierde al reiniciar. Debe pasar a
  PostgreSQL junto con el ledger de pagos.
