/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Application Use Case]
 * Handles idempotent processing of incoming payment webhooks.
 */

import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY, OrderRepositoryPort } from '../../domain/ports/order-repository.port';

export interface WebhookEventDTO {
  eventId: string;
  type: string;
  data: any;
}

@Injectable()
export class ProcessStripeWebhookUseCase {
  private processedEvents = new Set<string>();

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepositoryPort
  ) {}

  public async execute(dto: WebhookEventDTO) {
    if (this.processedEvents.has(dto.eventId)) {
      return { received: true, note: "Duplicate event ignored (idempotent)" };
    }

    if (dto.type === "checkout.session.completed") {
      const orderId = dto.data?.object?.metadata?.orderId;
      if (orderId) {
        const order = await this.orderRepo.findById(orderId);
        if (order) {
          order.markAsInProcess();
          await this.orderRepo.update(order);
        }
      }
    }

    this.processedEvents.add(dto.eventId);
    return { received: true, eventId: dto.eventId, status: "processed" };
  }
}
