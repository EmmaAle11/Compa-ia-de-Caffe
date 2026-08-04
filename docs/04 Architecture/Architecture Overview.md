# Café Punto Medio — Architecture Overview (ADD)

## 1. Executive Summary & Vision
Café Punto Medio is a premium Mexican specialty coffee e-commerce store with an integrated backoffice administration panel. The platform bridges small-batch Zapotec producers in Oaxaca, Chiapas, and Veracruz directly with discerning coffee enthusiasts.

- **Primary Product**: B2C E-Commerce Specialty Coffee Store
- **Secondary Tool**: Internal Admin Operations Panel (RBAC protected)

---

## 2. Architectural Blueprint

### 2.0 Repository layout

Two npm workspaces, one per runtime — see [[docs/08 Decisions/ADR-007 Repository Layout]].

```
CBC/
├── backend/     NestJS · Hexagonal (Ports & Adapters) + DDD
├── frontend/    React + Vite · Feature-Sliced Design
├── docs/        this ADD + ADRs
└── package.json workspaces root
```

### 2.1 Frontend: Feature-Sliced Design (FSD)
The web application is structured following Feature-Sliced Design principles to guarantee modularity, maintainability, and loose coupling:

```
frontend/src/
├── app/          # Application setup, providers, global styles
│   ├── App.tsx
│   └── styles/
├── pages/        # Route-level page compositions (Home, Shop, ProductDetail, Checkout, Backoffice, …)
├── widgets/      # Composite UI sections (Header, Footer, CartDrawer)
├── features/     # User interactions with business value (AddToCart, FilterCatalog, ProcessCheckout)
├── entities/     # Domain entity UI & state (Product, Order)
└── shared/       # Reusable primitives, types, assets, API clients
```

`features/` is not materialised yet: cart and checkout interactions still live inside their
pages. The slice is created when the first interaction is extracted, not before.
Every slice exposes a public entry point (`index.ts`); layers import downward only.

### 2.2 Backend: Hexagonal Architecture (Ports & Adapters) + DDD
The backend separates pure business logic from external frameworks, infrastructure, and
delivery channels. Modules are organised **per bounded context**, each carrying its own
hexagon; the NestJS module is the composition root that binds ports to adapters.

```
backend/src/
├── kernel/domain/           # Entity, ValueObject, AggregateRoot, DomainEvent, DomainError
├── modules/                 # One self-contained hexagon per bounded context
│   └── <context>/           # order, recommendation (catalog, customer, payment,
│       │                    #  inventory, promotion, contact scaffolded)
│       ├── domain/          # Framework-free core
│       │   ├── entities/    # Aggregate roots (OrderEntity)
│       │   ├── value-objects/
│       │   ├── ports/       # Interface + DI symbol (OrderRepositoryPort / ORDER_REPOSITORY)
│       │   └── events/      # OrderCreated, OrderPaid, OrderCancelled
│       ├── application/
│       │   └── use-cases/   # CreateOrder, ProcessStripeWebhook, GetCoffeeRecommendation
│       ├── contracts/       # DTOs in, response shapes out
│       ├── infrastructure/  # Driven adapters implementing the ports
│       │   ├── persistence/ # Supabase/PostgreSQL repositories (in-memory today)
│       │   ├── stripe/ mail/ ai/ auth/
│       ├── presentation/    # Driving adapter: REST controller & webhooks
│       ├── tests/unit/      # *.spec.ts
│       └── <context>.module.ts   # Composition root: provide(PORT) → useClass(Adapter)
├── presentation/health/     # Delivery concerns owned by no context
├── shared/                  # events/, logging/, observability/
├── config/                  # Zod-validated environment (fail-fast at boot)
├── app.module.ts            # Global config, throttling, one import per context
└── main.ts                  # Bootstrap: helmet, CORS, /api + URI versioning, ValidationPipe
```

**Dependency rule.** `infrastructure → application → domain`, never the reverse. The domain
imports no framework and performs no I/O. Adapters are only ever referenced by the module
that binds them; use cases depend on the port symbol via `@Inject`.

---

## 3. Core Business Flows & Idempotency Strategy

### Order & Payment Lifecycle
1. **Catalog Browsing & Stock Check**: Customer selects product variants & grind options.
2. **Order Draft Creation**: Server locks stock temporarily (`InventoryReservedEvent`).
3. **Stripe Checkout Session**: Server passes strict metadata (`order_id`, `idempotency_key`).
4. **Stripe Webhook Execution**:
   - Signature verification using webhook secret (`Zero Trust`).
   - Idempotent processing check via `payment_intents` ledger.
   - Transactional update (`ACID`): `Order.status = PAID`, `Inventory.committed -= qty`, `Mail.sendConfirmation()`.

---

## 4. Security Framework (Zero Trust)
- **Authentication**: Dual-token pattern (Short-lived JWT Access Token + HttpOnly Rotating Refresh Token).
- **Authorization**: Role-Based Access Control (`CUSTOMER`, `ADMIN`, `SUPERADMIN`).
- **Validation**: Two complementary layers — `class-validator` DTOs at the HTTP boundary
  (`whitelist` + `forbidNonWhitelisted`, so unknown fields are rejected, not ignored), and
  Zod for environment/config and any non-Nest boundary. Domain invariants are re-checked
  inside the entities regardless of what the DTO allowed. See ADR-002.
- **Headers**: CSP, HSTS, X-Frame-Options, Referrer Policy, Permissions Policy — via `helmet`
  in `main.ts`.
- **Rate Limiting**: `@nestjs/throttler` registered as a global guard (100 req/min per IP
  today); per-authenticated-user buckets once auth lands.
- **Configuration**: validated at boot by `config/env.schema.ts`; the process refuses to
  start on an invalid or missing variable rather than failing at first request.

---

## 5. Persistence & Database Strategy
- **Engine**: PostgreSQL hosted on Supabase.
- **ORM**: Drizzle ORM (Type-safe SQL queries, explicit schema definitions, automated migrations).
- **ACID Guarantees**: Multi-table transactions for checkout, stock deduction, and ledger updates.
