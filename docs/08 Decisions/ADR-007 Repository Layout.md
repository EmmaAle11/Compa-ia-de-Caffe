# ADR-003 — Repository layout: workspace split and module-owned presentation

- **Status**: Accepted
- **Date**: 2026-08-04
- **Amends**: [[docs/08 Decisions/ADR-006 NestJS Runtime]] §3
- **Related**: [[docs/08 Decisions/ADR-001 FSD]] · [[docs/08 Decisions/ADR-002 Hexagonal]], [[docs/04 Architecture/Architecture Overview]]

## Context

After ADR-002 the code was architecturally correct but physically misleading. Reading the
repository root, you saw `src/` (which was the frontend) next to `server/` (the backend),
one `package.json` mixing React and NestJS dependencies, one `tsconfig.json` that had to
serve two incompatible compilers, and 61 `.gitkeep` files marking empty folders whose
purpose nobody could tell from the tree.

Three specific problems:

1. **The two sides were not visibly two sides.** `src/` reads as *the* source of the
   project. A newcomer had to open files to learn that the backend was the sibling.
2. **One dependency graph for two runtimes.** `npm install` for a frontend-only change
   pulled the whole NestJS toolchain; nothing prevented a React component from importing
   a domain entity.
3. **Empty folders taught nothing.** `.gitkeep` preserves a directory but does not say
   what belongs in it, so the structure could not defend itself against drift.

## Decision

**1. Two workspace roots: `backend/` and `frontend/`.** Each owns its `package.json`,
`tsconfig.json`, build tooling, and dependency set. The repository root becomes an npm
workspaces manifest with delegating scripts. Cross-side imports are now impossible by
construction rather than by discipline.

**2. Presentation moves inside each bounded context.** ADR-002 centralised controllers in
`presentation/http/`. That was wrong: a context that cannot be read — or deleted — in one
folder is not really bounded. Each module now owns
`{domain, application, contracts, infrastructure, presentation, tests}`, and
`<context>.module.ts` is its composition root.

Only genuinely context-free delivery concerns stay in `backend/src/presentation/` (health
today; the global exception filter and auth guards later). The test: *would this endpoint
disappear if the context disappeared?* If yes, it belongs to the context.

**3. DTOs are `contracts/`, not `dto/`.** The folder holds both inbound DTOs and outbound
response shapes — the module's published wire format. `contracts/` names the role;
`dto/` names one direction of it.

**4. A `kernel/domain/` shared kernel.** `Entity`, `ValueObject`, `AggregateRoot`,
`DomainEvent`, `DomainError`. It is deliberately empty of business meaning: it supplies the
shapes rules are expressed with, never the rules.

`OrderEntity` was migrated onto it rather than left as a parallel implementation, which
surfaced two real defects the old anaemic version allowed:

- `markAsInProcess()` had no guard, so a duplicated Stripe webhook could re-pay an order
  and (once events exist) re-trigger the confirmation email. The status machine now
  refuses to skip or repeat a step.
- Order state changes raised no domain events at all, so there was nowhere for
  "send confirmation email" or "deduct inventory" to hang without coupling the use case
  to those adapters. Events are recorded on the aggregate and pulled by the application
  layer after persistence succeeds — a rolled-back transaction cannot leak an event.

**5. `README.md` per layer instead of `.gitkeep`.** Every structural folder carries a short
file stating what belongs in it and what does not. It keeps the directory in the tree
(same as `.gitkeep`) *and* answers the question the folder raises.

## Consequences

- Deployment maps cleanly onto the tree: `frontend/` → Vercel static, `backend/` → Node
  service. ADR-002 already split the artefacts; the layout now matches them.
- `npm install` at the root still installs both — workspaces, one lockfile.
- Test files moved to `<context>/tests/unit/*.spec.ts` and are excluded from the build via
  `tsconfig.build.json`.
- Scaffolded-but-empty contexts (catalog, customer, payment, inventory, promotion,
  contact) carry the full hexagon shape. This is deliberate scaffolding requested for
  learning the structure; it is **not** a claim that those contexts exist yet.
- `.claude/Architecture.md` now carries the dependency rules in a form an agent reads
  before editing.

## Alternatives rejected

- **Keep one root, rename `src/` → `frontend/` and `server/` → `backend/`.** Cheaper, but
  leaves the shared `package.json` and the single `tsconfig.json` — the two problems that
  actually bite.
- **Independent installs per side (no workspaces).** Matches the reference project but
  gives two lockfiles and two install steps for no benefit at this size.
- **Keep centralised presentation.** Defensible for a small API, but it means every new
  context edits a shared module file, and no context can be read in one place.
