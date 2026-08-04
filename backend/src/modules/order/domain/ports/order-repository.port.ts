/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Domain Port]
 * Outbound Port interface defining data access operations for Order Aggregate.
 */

import { OrderEntity } from '../entities/order.entity';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface OrderRepositoryPort {
  save(order: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  findAll(): Promise<OrderEntity[]>;
  update(order: OrderEntity): Promise<OrderEntity>;
}
