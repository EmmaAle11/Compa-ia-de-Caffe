/**
 * [FRONTEND - FSD LAYER: Entity - Order Mock Data]
 * Centralized mock data for backoffice order management in Spanish.
 */

import { OrderRecord } from '../../../shared/types';

export const BACKOFFICE_ORDERS: OrderRecord[] = [
  {
    id: 'CPM-8921',
    customerName: 'María Elena Garza',
    customerEmail: 'maria.garza@ejemplo.mx',
    items: [{ productName: 'Oaxaca Reserva (500g)', qty: 2, total: 56.00 }],
    amount: 56.00,
    date: '2026-03-30',
    status: 'En Proceso',
    paymentMethod: 'Tarjeta de Crédito'
  },
  {
    id: 'CPM-8920',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos.m@ejemplo.mx',
    items: [{ productName: 'Chiapas Orgánico (1kg)', qty: 1, total: 42.00 }],
    amount: 42.00,
    date: '2026-03-30',
    status: 'Entregado',
    paymentMethod: 'PayPal'
  },
  {
    id: 'CPM-8919',
    customerName: 'Sofía Morales',
    customerEmail: 'sofia.morales@ejemplo.mx',
    items: [{ productName: 'Veracruz Miel Honey (340g)', qty: 3, total: 72.00 }],
    amount: 72.00,
    date: '2026-03-29',
    status: 'Enviado',
    paymentMethod: 'Tarjeta de Débito'
  },
  {
    id: 'CPM-8918',
    customerName: 'Alejandro Ríos',
    customerEmail: 'a.rios@ejemplo.mx',
    items: [{ productName: 'Kit de Inicio V60 Cerámico', qty: 1, total: 45.00 }],
    amount: 45.00,
    date: '2026-03-29',
    status: 'Entregado',
    paymentMethod: 'Tarjeta de Crédito'
  },
  {
    id: 'CPM-8917',
    customerName: 'Lucía Fernández',
    customerEmail: 'l.fernandez@ejemplo.mx',
    items: [{ productName: 'Mezcla de la Casa (1kg)', qty: 2, total: 68.00 }],
    amount: 68.00,
    date: '2026-03-28',
    status: 'Entregado',
    paymentMethod: 'PayPal'
  }
];
