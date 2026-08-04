import { Body, Controller, Post } from '@nestjs/common';
import { GetCoffeeRecommendationUseCase } from '../application/use-cases/get-coffee-recommendation.use-case';
import { RecommendationDto } from '../contracts/recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly getRecommendationUseCase: GetCoffeeRecommendationUseCase) {}

  @Post()
  public async getRecommendation(@Body() dto: RecommendationDto) {
    const recommendation = await this.getRecommendationUseCase.execute(dto);
    return { recommendation };
  }
}
