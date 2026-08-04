# modules/

One folder per **bounded context**, each a self-contained hexagon:

```
<context>/
├── domain/            entities, value-objects, ports, events  ← no framework, no I/O
├── application/       use cases orchestrating the domain
├── contracts/         DTOs in, response shapes out (the module's public wire format)
├── infrastructure/    driven adapters implementing the domain's ports
├── presentation/      driving adapters: controller + the NestJS module
└── tests/unit/        *.spec.ts
```

Rules:
- Dependencies point **inward**: `presentation → application → domain`, and
  `infrastructure → domain`. Never the reverse.
- A context talks to another context through its **published contract or a domain
  event**, never by importing its entities or repositories directly.
- `<context>.module.ts` is the only place a port is bound to an adapter.
