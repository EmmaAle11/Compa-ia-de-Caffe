# Café Punto Medio — Architecture Contract

Read this before writing code. The full ADD lives in [`docs/`](../docs/) and is the source
of truth; this file is the short version an agent needs in context.

**Product**: a premium Mexican specialty coffee store. The storefront is the product; the
backoffice only exists to run the business. This is **not** a SaaS — the admin panel must
stay small.

## Repository shape

```
CBC/
├── backend/     NestJS · Hexagonal (Ports & Adapters) + DDD
├── frontend/    React + Vite · Feature-Sliced Design
├── docs/        Architecture Design Document + ADRs
└── package.json npm workspaces root
```

## The two dependency rules

**Backend — dependencies point inward.**

```
presentation ──► application ──► domain ◄── infrastructure
                                  ▲
                               kernel
```

- `domain/` imports nothing but `kernel/`. No NestJS, no drivers, no DTOs, no I/O.
- A use case depends on a **port** (interface + `Symbol`), never on an adapter.
- The only place a port is bound to an adapter is `<context>.module.ts`.
- Contexts talk through published contracts or domain events — never by importing each
  other's entities or repositories.

**Frontend — imports flow downward only.**

```
app ► pages ► widgets ► features ► entities ► shared
```

A layer may import from layers **below** it, never above, never sideways within the same
layer. Cross-slice imports go through the slice's public entry point (`index.ts`).

## Where things go

| You are writing | It goes in |
| --- | --- |
| A business rule / invariant | `backend/src/modules/<ctx>/domain/` |
| Orchestration of a workflow | `backend/src/modules/<ctx>/application/use-cases/` |
| A DB / Stripe / SendGrid / AI call | `backend/src/modules/<ctx>/infrastructure/` |
| An HTTP endpoint for a context | `backend/src/modules/<ctx>/presentation/` |
| A request/response shape | `backend/src/modules/<ctx>/contracts/` |
| A base class for all contexts | `backend/src/kernel/domain/` |
| Logging, events, observability | `backend/src/shared/` |
| A route-level screen | `frontend/src/pages/<slice>/ui/` |
| A user interaction with business value | `frontend/src/features/<slice>/` |
| A business noun the UI renders | `frontend/src/entities/<slice>/` |
| A button, the API client, a token | `frontend/src/shared/` |

## Non-negotiables

- **Zero Trust.** Everything authenticated, authorised, validated. Frontend validation is
  UX only — never a security control.
- **Validate twice, on purpose.** `class-validator` DTOs guard the HTTP boundary; Zod
  guards config; the aggregate re-checks its own invariants regardless. A DTO protects the
  transport, an entity protects the business rule.
- **No business logic in infrastructure.** An adapter translates; it does not decide.
- **Money and stock are transactional.** Order status, inventory and the payment ledger
  move together or not at all.
- **The domain model is fixed**: Product, Category, Order, OrderItem, Customer, Address,
  Payment, Inventory, Promotion, Contact. New entities need a discussion first.
- **An architectural change needs an ADR** in `docs/08 Decisions/` before the code.

## Commands

```bash
npm install          # workspaces: installs backend + frontend
npm run dev          # frontend  → http://localhost:5173
npm run dev:api      # backend   → http://localhost:3000/api/v1
npm run lint         # type-check both workspaces
npm test             # backend unit tests
```

## Current state

Real: order + recommendation contexts, in-memory persistence, `/api/v1` versioned REST,
helmet, throttling, validated env.

Scaffolded but empty: catalog, customer, payment, inventory, promotion, contact.
Not wired yet: Supabase, Stripe, SendGrid, Sentry, PostHog, auth/RBAC.
