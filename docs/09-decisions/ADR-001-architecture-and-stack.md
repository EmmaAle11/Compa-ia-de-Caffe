# ADR-001: Architectural Pattern & Stack Selection

- **Status**: Approved — points 2 and 4 partially superseded by [ADR-002](ADR-002-backend-runtime-and-module-layout.md)
- **Date**: 2026-07-31
- **Architect**: Technical Lead / Solution Architect

## Context
Café Punto Medio (CoffeeCompany) requires a production-grade specialty coffee e-commerce store with an integrated internal management dashboard. The store handles user catalog exploration, interactive roast education, shopping cart, Stripe payment processing, SendGrid email notifications, inventory management, and admin operations.

## Decision

1. **Frontend Architecture**: Adopt **Feature Sliced Design (FSD)** with React, TypeScript, Vite, and TailwindCSS.
   - *Rationale*: FSD prevents circular dependencies and provides clear layer segregation (`app` → `pages` → `widgets` → `features` → `entities` → `shared`), making large-scale maintenance predictable and refactoring safe.

2. **Backend Architecture**: Implement **Hexagonal Architecture (Ports and Adapters)** paired with **Domain Driven Design (DDD)** principles in Node/Express/TypeScript.
   - *Rationale*: Isolates domain business logic (Order creation rules, inventory deduction, pricing logic) from external transport mechanisms (HTTP, Stripe Webhooks, DB drivers). Allows seamless testing and future framework migration.
   - *Superseded by ADR-002*: the runtime is **NestJS** (not hand-wired Express), and the tree
     is organised per bounded context rather than per layer. The hexagon itself is unchanged.

3. **Data Access & ORM**: Select **Drizzle ORM** over Prisma/Raw SQL.
   - *Rationale*: Drizzle offers lightweight zero-overhead execution, strict type-safety directly mapped to SQL schemas, and native transaction control without bulky binaries.

4. **Security & Validation**: Apply a **Zero-Trust Validation Strategy**.
   - *Rationale*: Client validation is treated purely as UX feedback. Every request must be strictly validated on the server, with parameterized database queries, JWT rotation with HttpOnly cookies, and strict CORS/CSP header policies.
   - *Refined by ADR-002*: HTTP payloads are validated with `class-validator` DTOs; Zod is used for environment/config and non-Nest boundaries.

5. **Payment Processing**: Implement **Stripe Checkout & Idempotent Webhooks**.
   - *Rationale*: Offloads PCI-compliance concerns while using an event ledger for webhooks to handle network retries, duplicate deliveries, and atomic order transitions.

## Consequences
- Requires strict adherence to layer boundaries (Domain entities cannot import HTTP or ORM adapters).
- High maintainability, clean testability, and resilient infrastructure.
