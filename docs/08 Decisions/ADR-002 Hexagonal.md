# ADR-002 — Arquitectura Hexagonal + DDD en el backend

- **Estado**: Aceptado — refinado por [[docs/08 Decisions/ADR-006 NestJS Runtime]] y [[docs/08 Decisions/ADR-007 Repository Layout]]
- **Fecha**: 2026-07-31
- **Relacionados**: [[docs/04 Architecture/Hexagonal Backend]], [[docs/04 Architecture/DDD]]

## Contexto

El núcleo del negocio —reglas de creación de pedidos, descuento de inventario, precios—
no puede depender de cómo llega una petición (HTTP, webhook de Stripe, cron) ni de dónde
se guarda (Supabase hoy, otra cosa mañana). Si el dominio importa el framework, el
dominio se vuelve intestable y la migración se vuelve imposible.

## Decisión

**Puertos y Adaptadores** con DDD, SOLID, Repository Pattern e inyección de dependencias.

- El **dominio** declara qué necesita del exterior como un **puerto**: una interfaz más
  un `Symbol` de DI, en `domain/ports/`.
- Los **casos de uso** dependen del puerto, jamás del adaptador.
- La **infraestructura** implementa los puertos. Traduce; no decide.
- El único lugar donde un puerto se enlaza a un adaptador es el módulo del contexto.

Las dependencias apuntan hacia adentro:

```
presentation ──► application ──► domain ◄── infrastructure
                                   ▲
                                kernel
```

Un `kernel/domain/` compartido aporta `Entity`, `ValueObject`, `AggregateRoot`,
`DomainEvent` y `DomainError` — las formas con las que se expresan las reglas, nunca las
reglas mismas.

## Consecuencias

- Cambiar de persistencia en memoria a Supabase es cambiar un `useClass` en el módulo;
  ni el dominio ni la aplicación se enteran.
- Los agregados registran eventos de dominio y la capa de aplicación los drena **después**
  de que la persistencia tuvo éxito, de modo que una transacción revertida no puede
  filtrar un evento que nunca ocurrió.
- Exige disciplina real: una entidad de dominio que importe NestJS o un driver rompe todo
  el beneficio. Las reglas viven en `.claude/Architecture.md`.
