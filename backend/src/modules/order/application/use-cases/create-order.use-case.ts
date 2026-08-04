/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Application Use Case]
 * Orchestrates order creation business logic and persists via OrderRepositoryPort.
 */

import { Inject, Injectable } from '@nestjs/common';
import { OrderEntity, OrderItemVO } from '../../domain/entities/order.entity';
import { ORDER_REPOSITORY, OrderRepositoryPort } from '../../domain/ports/order-repository.port';

export interface CreateOrderDTO {
  customer?: { name?: string; email?: string };
  items: OrderItemVO[];
  shippingAddress?: string;
  paymentMethod?: string;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepositoryPort
  ) {}

  public async execute(dto: CreateOrderDTO) {
    // Item-level rules are the aggregate's job; the use case only orchestrates.
    const items = dto.items ?? []; // empty is rejected by the aggregate, as a DomainError
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const totalAmount = items.reduce(
      (acc, item) => acc + (item.totalPrice || item.unitPrice * item.quantity),
      0
    );

    const order = OrderEntity.place({
      id: orderId,
      customerName: dto.customer?.name || "Cliente Punto Medio",
      customerEmail: dto.customer?.email || "cliente@puntomedio.mx",
      items,
      amount: totalAmount,
      shippingAddress: dto.shippingAddress || "Av. Reforma 123, CDMX",
      date: new Date().toISOString().split("T")[0],
      status: "Pendiente",
      paymentMethod: dto.paymentMethod || "Stripe Checkout",
      createdAt: new Date().toISOString()
    });

    const savedOrder = await this.orderRepo.save(order);
    return {
      order: savedOrder.toJSON(),
      checkoutUrl: `/checkout?orderId=${savedOrder.id}`
    };
  }
}
