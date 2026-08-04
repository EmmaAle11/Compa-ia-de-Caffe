# ☕ CoffeeCompany

> Architecture Design Document (ADD)
> 
> **Proyecto:** Plataforma E-Commerce para Café Punto Medio
>
> Estado: 🚧 En Diseño
>
> Arquitectura:
> - Frontend → Feature-Sliced Design (FSD)
> - Backend → Hexagonal Architecture
> - Domain → Domain Driven Design (DDD)

---

# 📖 Navegación Principal

## 🌟 Visión

- [[01 Vision/01 Objetivo]]
- [[01 Vision/02 Alcance]]
- [[01 Vision/03 Vision del Producto]]

---

## 💼 Negocio

### Stakeholders

- [[02 Business/01 Stakeholders]]

### Requerimientos

- [[02 Business/02 Requerimientos]]

### Reglas de negocio

- [[02 Business/03 Reglas de Negocio]]

### Casos de uso

- [[02 Business/UseCases/UC-001 Comprar Cafe]]
- [[02 Business/UseCases/UC-002 Administrar Productos]]

---

## 🧠 Dominio (DDD)

> El dominio representa el corazón del sistema.

- [[03 Domain/README]]

### Agregados

- [[03 Domain/Product]]
- [[03 Domain/Category]]
- [[03 Domain/Order]]
- [[03 Domain/OrderItem]]
- [[03 Domain/Customer]]
- [[03 Domain/Payment]]
- [[03 Domain/Inventory]]
- [[03 Domain/Contact]]

---

## 🏗 Arquitectura

### Arquitectura General

- [[04 Architecture/Architecture Overview]]

### C4

- [[04 Architecture/C4 Context]]
- [[04 Architecture/C4 Container]]
- [[04 Architecture/C4 Component]]

### Patrones

- [[04 Architecture/FSD Frontend]]
- [[04 Architecture/Hexagonal Backend]]
- [[04 Architecture/DDD]]

### Observabilidad

- [[04 Architecture/Observability]]

---

## 🗄 Base de Datos

- [[05 Database/ER Diagram]]
- [[05 Database/Modelo Relacional]]
- [[05 Database/Normalizacion]]
- [[05 Database/Migraciones]]
- [[05 Database/Indices]]

---

## 🔐 Seguridad

- [[06 Security/Security Architecture]]
- [[06 Security/Authentication]]
- [[06 Security/Authorization]]
- [[06 Security/Threat Model]]
- [[06 Security/Rate Limiting]]
- [[06 Security/Secure Headers]]
- [[06 Security/Input Validation]]
- [[06 Security/Secrets Management]]
- [[06 Security/Logging]]

---

## 🌐 API

- [[07 API/REST Specification]]
- [[07 API/OpenAPI]]
- [[07 API/Authentication]]
- [[07 API/Webhooks]]

---

## 📜 Architectural Decision Records (ADR)

- [[08 Decisions/ADR-001 FSD]]
- [[08 Decisions/ADR-002 Hexagonal]]
- [[08 Decisions/ADR-003 PostgreSQL]]
- [[08 Decisions/ADR-004 Stripe]]
- [[08 Decisions/ADR-005 Supabase]]

---

## 🚀 Deployment

- [[09 Deployment/Deployment]]
- [[09 Deployment/CI-CD]]
- [[09 Deployment/Infrastructure]]
- [[09 Deployment/Environment Variables]]
- [[09 Deployment/Monitoring]]

---

## 📅 Backlog

- [[10 Backlog/MVP]]
- [[10 Backlog/Roadmap]]
- [[10 Backlog/Ideas]]
- [[10 Backlog/Technical Debt]]

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