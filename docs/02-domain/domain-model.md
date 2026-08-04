# Café Punto Medio — Domain Model Specification

## 1. Bounded Contexts

```
                       ┌─────────────────────────┐
                       │  Catalog & Product BC   │
                       └────────────┬────────────┘
                                    │
                                    ▼
┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐
│  Customer & Auth BC     ├───►│  Orders & Checkout BC   ├───►│  Payments & Billing BC  │
└─────────────────────────┘    └────────────┬────────────┘    └─────────────────────────┘
                                            │
                                            ▼
                               ┌─────────────────────────┐
                               │  Inventory & Fulfillment│
                               └─────────────────────────┘
```

---

## 2. Domain Entities & Aggregates

### 2.1 Product Aggregate
- **Root**: `Product`
- **Fields**: `id`, `name`, `slug`, `description`, `price` (Money VO), `origin` (Origin VO), `process`, `elevation`, `flavorNotes` (Array), `roastLevel` (Enum), `stockQuantity`, `isActive`
- **Business Rules**:
  - Price must be greater than zero.
  - Stock quantity cannot be negative.
  - Roast level must be one of `LIGHT`, `MEDIUM`, `MEDIUM_DARK`, `DARK`.
  - Product can only be purchased if `stockQuantity > 0` and `isActive == true`.

### 2.2 Order Aggregate (Core Business Entity)
- **Root**: `Order`
- **Child Entities**: `OrderItem[]`
- **Value Objects**: `Address` (Shipping/Billing), `Money` (Total, Tax, Shipping), `OrderStatus` (`DRAFT`, `PENDING_PAYMENT`, `PAID`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`)
- **Domain Events**:
  - `OrderCreatedEvent`
  - `OrderPaidEvent`
  - `OrderCancelledEvent`
  - `InventoryDeductedEvent`
- **Business Rules**:
  - Order items must contain a valid product snapshot (price at time of purchase, selected grind option).
  - An order cannot transition to `PAID` without a verified Stripe payment confirmation token.
  - Cancelling a paid order triggers automatic inventory restoration and refund request.

### 2.3 Customer Entity
- **Fields**: `id`, `email`, `fullName`, `phone`, `role` (`CUSTOMER`, `ADMIN`), `addresses` (Address VO[])
- **Business Rules**:
  - Email must be unique and valid.
  - Password hashes must use bcrypt/argon2; plain text is forbidden in memory.

### 2.4 Inventory Entity
- **Fields**: `productId`, `availableQuantity`, `reservedQuantity`, `reorderThreshold`
- **Business Rules**:
  - Reservation duration: 15 minutes during checkout session.
  - If checkout expires without payment webhook, reserved quantity is released back to available quantity.

---

## 3. Repositories (Output Ports)
- `ProductRepository`: `findById`, `findBySlug`, `findAllActive`, `updateStock`
- `OrderRepository`: `create`, `findById`, `findByStripeSessionId`, `updateStatus`
- `CustomerRepository`: `findByEmail`, `create`, `updateProfile`
- `InventoryRepository`: `reserveStock`, `releaseStock`, `deductCommittedStock`
- `PaymentRepository`: `recordLedger`, `findLedgerByIdempotencyKey`
