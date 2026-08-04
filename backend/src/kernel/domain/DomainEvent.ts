/**
 * Something that happened in the domain, stated in the past tense (OrderPaid,
 * InventoryDeducted). Raised by an aggregate, dispatched after the transaction commits.
 */
export abstract class DomainEvent {
  public readonly occurredAt: Date;

  protected constructor(
    public readonly aggregateId: string,
    occurredAt?: Date
  ) {
    this.occurredAt = occurredAt ?? new Date();
  }

  /** Stable name used for routing and logging, e.g. `order.paid`. */
  public abstract get eventName(): string;
}
