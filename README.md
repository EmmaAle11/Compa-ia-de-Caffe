# Café Punto Medio

Premium Mexican specialty coffee e-commerce store plus a lightweight internal backoffice.
The store is the product; the backoffice only exists to run the business.

The Architecture Design Document lives in [`docs/`](docs/) — an Obsidian vault, start at [`docs/MOC.md`](docs/MOC.md) — and is the source of truth.
Code and documentation evolve together — an architectural change needs an ADR first
([`docs/08 Decisions/`](docs/08%20Decisions/)). The short version for day-to-day work is
[`.claude/Architecture.md`](.claude/Architecture.md).

## Layout

Two npm workspaces, one per runtime.

| Workspace   | Style                                          | Dev server                     |
| ----------- | ---------------------------------------------- | ------------------------------ |
| `frontend/` | Feature-Sliced Design — React, Vite, Tailwind  | `http://localhost:5173`        |
| `backend/`  | Hexagonal (Ports & Adapters) + DDD — NestJS    | `http://localhost:3000/api/v1` |

```
frontend/src/                 # FSD layers, top to bottom
├── app/                      # root component, providers, global styles
├── pages/                    # route-level compositions
├── widgets/                  # composite sections (header, footer, cart drawer)
├── features/                 # interactions with business value
├── entities/                 # business nouns as the UI knows them
└── shared/                   # API client, UI kit, types, assets

backend/src/
├── kernel/domain/            # Entity, ValueObject, AggregateRoot, DomainEvent, DomainError
├── modules/<context>/        # one self-contained hexagon per bounded context
│   ├── domain/               # entities, value-objects, ports, events ← no framework, no I/O
│   ├── application/          # use cases orchestrating the domain
│   ├── contracts/            # DTOs in, response shapes out
│   ├── infrastructure/       # driven adapters implementing the ports
│   ├── presentation/         # driving adapter: controller + NestJS module
│   └── tests/unit/
├── presentation/health/      # delivery concerns owned by no context
├── shared/                   # events, logging, observability
└── config/                   # Zod-validated environment
```

Every layer folder carries a `README.md` saying what belongs in it. Dependencies point
**inward** on the backend (`presentation → application → domain ← infrastructure`) and
**downward** on the frontend (`app → pages → widgets → features → entities → shared`).

## Run locally

Prerequisites: Node.js 20+.

```bash
npm install                              # workspaces: installs both sides
cp backend/.env.example backend/.env     # the API validates it at boot and refuses bad config
npm run dev                              # frontend (proxies /api to the backend)
npm run dev:api                          # backend
```

| Script            | Does                                          |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Vite dev server                               |
| `npm run dev:api` | NestJS in watch mode                          |
| `npm run build`   | Build both workspaces                         |
| `npm test`        | Backend unit tests (`node:test`)              |
| `npm run lint`    | Type-check both workspaces                    |

`API_PORT` overrides the backend port (and the Vite proxy target).

## API

REST under `/api/v1`, URI-versioned:

| Method | Route                     |
| ------ | ------------------------- |
| GET    | `/api/v1/health`          |
| POST   | `/api/v1/orders`          |
| POST   | `/api/v1/webhooks/stripe` |
| POST   | `/api/v1/recommendation`  |

Request bodies are validated by `class-validator` DTOs with `whitelist` +
`forbidNonWhitelisted`, so unknown fields are rejected rather than ignored. Domain
invariants are re-checked inside the aggregates regardless. Frontend validation is UX
only and is never trusted. `helmet` sets CSP/HSTS; `@nestjs/throttler` rate-limits globally.

## Tooling

[graphify](https://github.com/Graphify-Labs/graphify) is installed as a **project-scoped**
Claude Code skill in [`.claude/skills/graphify/`](.claude/skills/graphify/) — nothing global
was modified. Run `/graphify .` in Claude Code to build a knowledge graph of this repo
(code + `docs/`) into `graphify-out/` (git-ignored). On first run it installs its Python
package (`pip install graphifyy`); Python 3.10+ required.
