import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class StripeWebhookDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsObject()
  data!: Record<string, unknown>;
}
