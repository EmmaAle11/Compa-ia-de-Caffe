/**
 * [DOMAIN] Order aggregate root — Orders & Checkout bounded context.
 *
 * Every rule that decides whether an order is valid lives here. Adapters may reject
 * more (a DTO is free to be stricter), but nothing may let less through: an OrderEntity
 * that exists is an order that satisfies its invariants.
 */

import { AggregateRoot, InvariantViolationError } from '../../../../kernel/domain';
import { OrderCancelledEvent, OrderCreatedEvent, OrderPaidEvent } from '../events/order-events';

export interface OrderItemVO {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  grind?: string;
}

export type OrderStatus = 'Pendiente' | 'En Proceso' | 'Enviado' | 'Entregado' | 'Cancelado';

export interface OrderProps {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItemVO[];
  amount: number;
  shippingAddress: string;
  date: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
}

export class OrderEntity extends AggregateRoot<string> {
  private props: OrderProps;

  constructor(props: OrderProps) {
    super(props.id);

    if (!props.items || props.items.length === 0) {
      throw new InvariantViolationError('Order must contain at least one item.');
    }

    props.items.forEach((item) => {
      if (item.quantity <= 0) {
        throw new InvariantViolationError('Order item quantity must be greater than zero.');
      }

      if (item.unitPrice <= 0) {
        throw new InvariantViolationError('Order item unit price must be greater than zero.');
      }

      if (item.totalPrice < 0) {
        throw new InvariantViolationError('Order item total price cannot be negative.');
      }
    });

    if (props.amount < 0) {
      throw new InvariantViolationError('Order amount cannot be negative.');
    }

    this.props = props;
  }

  /**
   * Factory for a brand-new order. Reconstituting a stored order goes through the
   * constructor instead, so replaying history does not re-raise OrderCreated.
   */
  public static place(props: OrderProps): OrderEntity {
    const order = new OrderEntity(props);
    order.record(new OrderCreatedEvent(order.id, props.customerEmail, props.amount));
    return order;
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get status(): OrderStatus {
    return this.props.status;
  }

  public get customerEmail(): string {
    return this.props.customerEmail;
  }

  /** Payment confirmed by the gateway. Only a pending order can become paid. */
  public markAsInProcess(): void {
    if (this.props.status !== 'Pendiente') {
      throw new InvariantViolationError(
        `Only a pending order can be marked as paid (current status: ${this.props.status}).`
      );
    }
    this.props.status = 'En Proceso';
    this.record(new OrderPaidEvent(this.id, this.props.amount));
  }

  public markAsShipped(): void {
    if (this.props.status !== 'En Proceso') {
      throw new InvariantViolationError(
        `Only an in-process order can be shipped (current status: ${this.props.status}).`
      );
    }
    this.props.status = 'Enviado';
  }

  public markAsDelivered(): void {
    if (this.props.status !== 'Enviado') {
      throw new InvariantViolationError(
        `Only a shipped order can be delivered (current status: ${this.props.status}).`
      );
    }
    this.props.status = 'Entregado';
  }

  public cancel(reason: string): void {
    if (this.props.status === 'Entregado') {
      throw new InvariantViolationError('A delivered order cannot be cancelled.');
    }
    this.props.status = 'Cancelado';
    this.record(new OrderCancelledEvent(this.id, reason));
  }

  public toJSON(): OrderProps {
    return { ...this.props };
  }
}
