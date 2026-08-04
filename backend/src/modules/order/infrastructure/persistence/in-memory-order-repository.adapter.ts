/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Infrastructure Adapter]
 * In-memory repository implementation of OrderRepositoryPort.
 */

import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';

@Injectable()
export class InMemoryOrderRepositoryAdapter implements OrderRepositoryPort {
  private ledger = new Map<string, OrderEntity>();

  public async save(order: OrderEntity): Promise<OrderEntity> {
    this.ledger.set(order.id, order);
    return order;
  }

  public async findById(id: string): Promise<OrderEntity | null> {
    return this.ledger.get(id) || null;
  }

  public async findAll(): Promise<OrderEntity[]> {
    return Array.from(this.ledger.values());
  }

  public async update(order: OrderEntity): Promise<OrderEntity> {
    this.ledger.set(order.id, order);
    return order;
  }
}
