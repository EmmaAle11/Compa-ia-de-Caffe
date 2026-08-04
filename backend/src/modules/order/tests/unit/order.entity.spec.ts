import test from 'node:test';
import assert from 'node:assert/strict';
import { InvariantViolationError } from '../../../../kernel/domain';
import { OrderEntity, OrderProps } from '../../domain/entities/order.entity';

function propsFor(status: OrderProps['status'] = 'Pendiente'): OrderProps {
  return {
    id: 'ORD-1',
    customerName: 'Ana',
    customerEmail: 'ana@example.com',
    items: [
      {
        productId: 'prod-1',
        name: 'Oaxaca Reserva',
        quantity: 1,
        unitPrice: 18,
        totalPrice: 18,
        grind: 'Whole Bean',
      },
    ],
    amount: 18,
    shippingAddress: 'Calle 123',
    date: '2026-08-04',
    status,
    paymentMethod: 'Stripe Checkout',
    createdAt: '2026-08-04T00:00:00.000Z',
  };
}

test('place() raises OrderCreated exactly once; rebuilding a stored order raises nothing', () => {
  const placed = OrderEntity.place(propsFor());
  const events = placed.pullDomainEvents();

  assert.equal(events.length, 1);
  assert.equal(events[0].eventName, 'order.created');
  assert.equal(placed.pullDomainEvents().length, 0, 'pulling must drain the buffer');

  assert.equal(new OrderEntity(propsFor()).pullDomainEvents().length, 0);
});

test('paying a pending order raises OrderPaid', () => {
  const order = new OrderEntity(propsFor());
  order.markAsInProcess();

  assert.equal(order.status, 'En Proceso');
  assert.equal(order.pullDomainEvents()[0].eventName, 'order.paid');
});

test('the status machine refuses to skip or repeat a step', () => {
  // Already paid — a duplicate webhook must not pay it twice.
  assert.throws(() => new OrderEntity(propsFor('En Proceso')).markAsInProcess(), InvariantViolationError);
  // Not shipped yet.
  assert.throws(() => new OrderEntity(propsFor('Pendiente')).markAsDelivered(), InvariantViolationError);
  // Terminal.
  assert.throws(() => new OrderEntity(propsFor('Entregado')).cancel('changed mind'), InvariantViolationError);
});

test('a paid order can still be cancelled, and says why', () => {
  const order = new OrderEntity(propsFor('En Proceso'));
  order.cancel('out of stock');

  assert.equal(order.status, 'Cancelado');
  assert.equal(order.pullDomainEvents()[0].eventName, 'order.cancelled');
});
