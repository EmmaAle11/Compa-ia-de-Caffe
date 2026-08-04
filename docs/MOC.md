# ☕ CoffeeCompany

> Architecture Design Document (ADD)
> 
> **Proyecto:** Plataforma E-Commerce para Café Punto Medio
>
> Estado: 🚧 En Diseño · implementación inicial en `frontend/` y `backend/`
>
> Arquitectura:
> - Frontend → Feature-Sliced Design (FSD)
> - Backend → Hexagonal Architecture
> - Domain → Domain Driven Design (DDD)

---

# 📖 Navegación Principal

## 🌟 Visión

- [[docs/01 Vision/01 Objetivo]]
- [[docs/01 Vision/02 Alcance]]
- [[docs/01 Vision/03 Vision del Producto]]

---

## 💼 Negocio

### Stakeholders

- [[docs/02 Business/01 Stakeholders]]

### Requerimientos

- [[docs/02 Business/02 Requerimientos]]

### Reglas de negocio

- [[docs/02 Business/03 Reglas de Negocio]]

### Casos de uso

- [[docs/02 Business/UseCases/UC-001 Comprar Cafe]]
- [[docs/02 Business/UseCases/UC-002 Administrar Productos]]

---

## 🧠 Dominio (DDD)

> El dominio representa el corazón del sistema.

- [[docs/03 Domain/README]]
- [[docs/03 Domain/Domain Model]]

### Agregados

- [[docs/03 Domain/Product]]
- [[docs/03 Domain/Category]]
- [[docs/03 Domain/Order]]
- [[docs/03 Domain/OrderItem]]
- [[docs/03 Domain/Customer]]
- [[docs/03 Domain/Payment]]
- [[docs/03 Domain/Inventory]]
- [[docs/03 Domain/Contact]]

---

## 🏗 Arquitectura

### Arquitectura General

- [[docs/04 Architecture/Architecture Overview]]

### C4

- [[docs/04 Architecture/C4 Context]]
- [[docs/04 Architecture/C4 Container]]
- [[docs/04 Architecture/C4 Component]]

### Patrones

- [[docs/04 Architecture/FSD Frontend]]
- [[docs/04 Architecture/Hexagonal Backend]]
- [[docs/04 Architecture/DDD]]

### Observabilidad

- [[docs/04 Architecture/Observability]]

---

## 🗄 Base de Datos

- [[docs/05 Database/ER Diagram]]
- [[docs/05 Database/Modelo Relacional]]
- [[docs/05 Database/Normalizacion]]
- [[docs/05 Database/Migraciones]]
- [[docs/05 Database/Indices]]

---

## 🔐 Seguridad

- [[docs/06 Security/Security Architecture]]
- [[docs/06 Security/Authentication]]
- [[docs/06 Security/Authorization]]
- [[docs/06 Security/Threat Model]]
- [[docs/06 Security/Rate Limiting]]
- [[docs/06 Security/Secure Headers]]
- [[docs/06 Security/Input Validation]]
- [[docs/06 Security/Secrets Management]]
- [[docs/06 Security/Logging]]

---

## 🌐 API

- [[docs/07 API/REST Specification]]
- [[docs/07 API/OpenAPI]]
- [[docs/07 API/Authentication]]
- [[docs/07 API/Webhooks]]

---

## 📜 Architectural Decision Records (ADR)

- [[docs/08 Decisions/ADR-001 FSD]]
- [[docs/08 Decisions/ADR-002 Hexagonal]]
- [[docs/08 Decisions/ADR-003 PostgreSQL]]
- [[docs/08 Decisions/ADR-004 Stripe]]
- [[docs/08 Decisions/ADR-005 Supabase]]
- [[docs/08 Decisions/ADR-006 NestJS Runtime]]
- [[docs/08 Decisions/ADR-007 Repository Layout]]

---

## 🚀 Deployment

- [[docs/09 Deployment/Deployment]]
- [[docs/09 Deployment/CI-CD]]
- [[docs/09 Deployment/Infrastructure]]
- [[docs/09 Deployment/Environment Variables]]
- [[docs/09 Deployment/Monitoring]]

---

## 📅 Backlog

- [[docs/10 Backlog/MVP]]
- [[docs/10 Backlog/Roadmap]]
- [[docs/10 Backlog/Ideas]]
- [[docs/10 Backlog/Technical Debt]]

---

# 📊 Estado del Proyecto

| Área | Estado |
|------|--------|
| Visión | ⬜ |
| Negocio | ⬜ |
| Dominio | ⬜ |
| Arquitectura | ⬜ |
| Base de Datos | ⬜ |
| Seguridad | ⬜ |
| API | ⬜ |
| Deployment | ⬜ |

---

# 🧭 Flujo de Diseño

```text
Visión
    ↓
Negocio
    ↓
Dominio
    ↓
Arquitectura
    ↓
Base de Datos
    ↓
API
    ↓
Seguridad
    ↓
Deployment
```

---

# 🎯 Stack Tecnológico

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- Feature-Sliced Design

## Backend

- NestJS
- Hexagonal Architecture
- DDD

## Base de Datos

- PostgreSQL
- Supabase

## Infraestructura

- Vercel
- GitHub Actions

## Observabilidad

- PostHog
- Sentry

## Correo

- SendGrid

## Pagos

- Stripe

---

# 📚 Referencias

- Arquitectura Hexagonal
- Domain Driven Design
- Feature Sliced Design
- C4 Model
- OWASP ASVS
- OWASP Top 10
- PostgreSQL
- Supabase
- Stripe