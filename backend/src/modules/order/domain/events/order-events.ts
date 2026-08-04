import { DomainEvent } from '../../../../kernel/domain';

export class OrderCreatedEvent extends DomainEvent {
  constructor(
    orderId: string,
    public readonly customerEmail: string,
    public readonly amount: number
  ) {
    super(orderId);
  }

  public get eventName(): string {
    return 'order.created';
  }
}

export class OrderPaidEvent extends DomainEvent {
  constructor(
    orderId: string,
    public readonly amount: number
  ) {
    super(orderId);
  }

  public get eventName(): string {
    return 'order.paid';
  }
}

export class OrderCancelledEvent extends DomainEvent {
  constructor(
    orderId: string,
    public readonly reason: string
  ) {
    super(orderId);
  }

  public get eventName(): string {
    return 'order.cancelled';
  }
}
