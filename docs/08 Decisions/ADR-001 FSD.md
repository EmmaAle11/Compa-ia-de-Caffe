# ADR-001 — Feature-Sliced Design en el frontend

- **Estado**: Aceptado
- **Fecha**: 2026-07-31
- **Relacionados**: [[docs/08 Decisions/ADR-007 Repository Layout]], [[docs/04 Architecture/FSD Frontend]]

## Contexto

La tienda y el backoffice conviven en una sola aplicación React. Sin una regla de
importación explícita, una pantalla de administración termina importando de una de
catálogo, y a los pocos meses no existe forma de tocar una sin romper la otra.

## Decisión

Adoptar **Feature-Sliced Design** con React, TypeScript, Vite y TailwindCSS.

```
app → pages → widgets → features → entities → shared
```

Una capa puede importar de las capas **inferiores**, nunca de las superiores ni de otro
slice de su misma capa. Los cruces entre slices pasan por el punto de entrada público
(`index.ts`).

## Consecuencias

- Las dependencias circulares dejan de ser posibles por construcción, no por disciplina.
- Cada carpeta de capa lleva un `README.md` que declara qué le corresponde, para que la
  estructura se defienda sola de la deriva.
- `features/` se creó con sus slices nombrados (add-to-cart, filter-catalog,
  process-checkout, contact-form, admin-auth) pero **vacíos**: las interacciones todavía
  viven dentro de sus páginas. Se extraen cuando haya código que mover, no antes.
- Los assets viven en `shared/assets/`, no en la raíz del frontend.
