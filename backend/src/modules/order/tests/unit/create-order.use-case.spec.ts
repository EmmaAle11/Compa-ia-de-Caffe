import test from 'node:test';
import assert from 'node:assert/strict';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { InMemoryOrderRepositoryAdapter } from '../../infrastructure/persistence/in-memory-order-repository.adapter';

test('CreateOrderUseCase creates an order with a derived total and checkout URL', async () => {
  const repo = new InMemoryOrderRepositoryAdapter();
  const useCase = new CreateOrderUseCase(repo);

  const result = await useCase.execute({
    items: [
      {
        productId: 'prod-1',
        name: 'Oaxaca Reserva',
        quantity: 2,
        unitPrice: 18,
        totalPrice: 36,
        grind: 'Whole Bean'
      }
    ],
    customer: { name: 'Ana', email: 'ana@example.com' },
    shippingAddress: 'Calle 123',
    paymentMethod: 'Stripe Checkout'
  });

  assert.equal(result.checkoutUrl.startsWith('/checkout?orderId='), true);
  assert.equal(result.order.amount, 36);
  assert.equal(result.order.customerEmail, 'ana@example.com');
});

test('OrderEntity rejects non-positive quantities', () => {
  assert.throws(() => {
    new OrderEntity({
      id: 'ord-1',
      customerName: 'Ana',
      customerEmail: 'ana@example.com',
      items: [
        {
          productId: 'prod-1',
          name: 'Oaxaca Reserva',
          quantity: 0,
          unitPrice: 18,
          totalPrice: 0,
          grind: 'Whole Bean'
        }
      ],
      amount: 0,
      shippingAddress: 'Calle 123',
      date: '2026-08-03',
      status: 'Pendiente',
      paymentMethod: 'Stripe Checkout',
      createdAt: '2026-08-03T00:00:00.000Z'
    });
  }, /quantity/i);
});
