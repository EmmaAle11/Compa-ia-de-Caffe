# catalog — Catalog & Product bounded context

**Not implemented yet.** The hexagon is scaffolded so the shape is obvious; no code lives
here.

Scope: Product, Category. Price > 0, stock never negative, purchasable only when active and in stock.

To bring it to life:
1. Model the aggregate in `domain/entities/` on top of `kernel/domain`.
2. Declare what it needs from the outside in `domain/ports/` (interface + `Symbol`).
3. Orchestrate in `application/use-cases/`.
4. Implement the ports in `infrastructure/`.
5. Bind port → adapter in `catalog.module.ts` and import it from `app.module.ts`.
6. Expose it in `presentation/` with a `contracts/` DTO.

See [../README.md](../README.md) for the dependency rules.
