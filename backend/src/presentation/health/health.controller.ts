import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  public check() {
    return {
      status: "ok",
      architecture: "Hexagonal + DDD",
      service: "Café Punto Medio API",
      timestamp: new Date().toISOString()
    };
  }
}
