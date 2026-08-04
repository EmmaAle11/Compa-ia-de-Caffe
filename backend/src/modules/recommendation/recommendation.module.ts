import { Module } from '@nestjs/common';
import { GetCoffeeRecommendationUseCase } from './application/use-cases/get-coffee-recommendation.use-case';
import { AI_RECOMMENDATION } from './domain/ports/ai-recommendation.port';
import { GeminiAiRecommendationAdapter } from './infrastructure/ai/gemini-ai-recommendation.adapter';
import { RecommendationController } from './presentation/recommendation.controller';

/** Composition root for the AI Sommelier bounded context. */
@Module({
  controllers: [RecommendationController],
  providers: [
    GetCoffeeRecommendationUseCase,
    {
      provide: AI_RECOMMENDATION,
      useClass: GeminiAiRecommendationAdapter,
    },
  ],
  exports: [GetCoffeeRecommendationUseCase],
})
export class RecommendationModule {}
