# kernel/

Shared **domain** vocabulary: the base classes every bounded context builds on
(`Entity`, `ValueObject`, `AggregateRoot`, `DomainEvent`, `DomainError`).

Rules:
- Nothing here may import NestJS, a driver, or any module under `modules/`.
- Nothing here encodes a business rule. Coffee, orders and prices do not belong in the
  kernel — only the shapes that rules are expressed *with*.
- Adding something here means every context inherits it. Prefer duplicating twice over
  promoting too early.
