import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case';
import { ProcessStripeWebhookUseCase } from '../application/use-cases/process-stripe-webhook.use-case';
import { CreateOrderDto } from '../contracts/create-order.dto';
import { StripeWebhookDto } from '../contracts/stripe-webhook.dto';

@Controller()
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly processStripeWebhookUseCase: ProcessStripeWebhookUseCase
  ) {}

  @Post('orders')
  public async createOrder(@Body() dto: CreateOrderDto) {
    const result = await this.createOrderUseCase.execute(dto);
    return { success: true, ...result };
  }

  @Post('webhooks/stripe')
  public async handleStripeWebhook(
    @Headers('x-stripe-event-id') stripeEventId: string | undefined,
    @Body() dto: StripeWebhookDto
  ) {
    return this.processStripeWebhookUseCase.execute({
      eventId: stripeEventId || `evt_${Date.now()}`,
      type: dto.type,
      data: dto.data,
    });
  }
}
