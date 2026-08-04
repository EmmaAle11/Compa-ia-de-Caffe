# ADR-002 — Backend runtime, module layout, and validation split

- **Status**: Accepted
- **Date**: 2026-08-03
- **Supersedes**: the Express composition implied by [[docs/08 Decisions/ADR-002 Hexagonal]]
- **Related**: [[docs/08 Decisions/ADR-001 FSD]] · [[docs/08 Decisions/ADR-002 Hexagonal]], [[docs/04 Architecture/Architecture Overview]]

## Context

The repository was scaffolded from a Google AI Studio template. Its backend was a hand-wired
Express router (`server/presentation/routes/apiRouter.ts`) that instantiated every adapter,
use case, and controller by hand, bundled with `esbuild`, and served from the same process as
Vite. The approved stack is NestJS. Three problems had to be resolved together:

1. **Hand-wired composition root.** Every new port meant editing one god-function. Ports and
   adapters were correctly separated but their binding was not, so the DI story did not hold.
2. **Decorator metadata.** NestJS resolves constructor dependencies from `design:paramtypes`,
   emitted only by `tsc` under `emitDecoratorMetadata`. `esbuild` (and therefore `tsx` and
   Vite) silently drops it. Keeping the esbuild pipeline meant a Nest app that compiles and
   then fails at runtime with unresolvable dependencies.
3. **Layer-first vs context-first.** ADR-001 sketched `server/{domain,application,
   infrastructure}` with all contexts mixed inside each layer.

## Decision

**1. NestJS CLI (`tsc`) compiles the backend; Vite only builds the frontend.**
`nest-cli.json` + `tsconfig.server.json` (CommonJS, `experimentalDecorators`,
`emitDecoratorMetadata`, `useDefineForClassFields: false`). `"type": "module"` was removed
from `package.json` so the CommonJS output runs unmodified. Frontend and API are two
processes; Vite proxies `/api` to the API in development.

**2. Context-first module layout.** `server/src/<bounded-context>/{domain,application,
infrastructure}` with a `<context>.module.ts` as the composition root. The hexagon is kept
per context instead of per layer, so a bounded context can be reasoned about, tested, and
eventually extracted without grepping three sibling trees.

Ports stay in `domain/ports/` as an interface plus a `Symbol` DI token. Adapters are bound in
the module (`{ provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepositoryAdapter }`), so
swapping in-memory persistence for Supabase is a one-line module change and no use-case edit.

**3. Driving adapters stay centralised** in `presentation/http/`. Controllers are a delivery
concern, not a domain one, and one HTTP module keeps routing, versioning, and DTO conventions
in a single place.

**4. Validation is split by boundary, not unified.** `class-validator` DTOs for HTTP
(idiomatic in Nest, integrates with `ValidationPipe`, gives per-field errors for free); Zod
for environment/config and future non-Nest boundaries. Domain entities re-validate their own
invariants — a DTO protects the transport, an entity protects the business rule, and neither
substitutes for the other.

**5. REST is URI-versioned** under `/api/v1` (global prefix + `VersioningType.URI`). Cheap
now, expensive to retrofit once external consumers exist.

## Consequences

- The `dev` script no longer starts both sides; `npm run dev` (web) and `npm run dev:api`
  are separate. This is the cost of a correct decorator pipeline.
- Deployment is two targets: static frontend on Vercel, the Nest API as a Node service.
  ADR-001's single-artifact assumption no longer holds and the deployment doc needs revising.
- `express`, `esbuild`, `dotenv`, and `autoprefixer` were dropped as direct dependencies
  (`@nestjs/platform-express`, `@nestjs/config`, and Tailwind v4 cover them).
- Zod and `class-validator` both ship. Accepted deliberately; the boundary between them is
  stated above, not left to taste.
- `GET /api/health` moved to `GET /api/v1/health`. The AI Sommelier frontend call moved to
  `/api/v1/recommendation`.

## Alternatives rejected

- **Keep esbuild, drop decorator metadata, `@Inject()` everything explicitly.** Works for
  providers but not for controllers or pipes, and turns every constructor into boilerplate.
- **SWC (`@swc/core`) instead of `tsc`.** Faster and supports decorator metadata, but adds a
  second compiler to a project whose purpose is learning the standard NestJS toolchain.
- **Layer-first tree per ADR-001.** Simpler for one context, degrades as soon as there are
  five; the domain model already names ten entities.
