import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { ProcessStripeWebhookUseCase } from './application/use-cases/process-stripe-webhook.use-case';
import { ORDER_REPOSITORY } from './domain/ports/order-repository.port';
import { InMemoryOrderRepositoryAdapter } from './infrastructure/persistence/in-memory-order-repository.adapter';
import { OrderController } from './presentation/order.controller';

/**
 * Composition root for the Orders & Checkout bounded context.
 * Swapping persistence means changing the `useClass` below — nothing in domain/ or
 * application/ knows which adapter is bound.
 */
@Module({
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    ProcessStripeWebhookUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepositoryAdapter,
    },
  ],
  exports: [CreateOrderUseCase, ProcessStripeWebhookUseCase],
})
export class OrderModule {}
