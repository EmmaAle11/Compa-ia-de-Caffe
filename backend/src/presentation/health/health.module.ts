import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/** Cross-cutting delivery concern: belongs to no bounded context. */
@Module({ controllers: [HealthController] })
export class HealthModule {}
