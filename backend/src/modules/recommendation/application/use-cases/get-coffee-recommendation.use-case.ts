/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Application Use Case]
 * Orchestrates AI coffee recommendation queries using the outbound AiRecommendationPort.
 */

import { Inject, Injectable } from '@nestjs/common';
import { CoffeePreferenceVO } from '../../domain/value-objects/coffee-preference.vo';
import { AI_RECOMMENDATION, AiRecommendationPort } from '../../domain/ports/ai-recommendation.port';

@Injectable()
export class GetCoffeeRecommendationUseCase {
  constructor(
    @Inject(AI_RECOMMENDATION)
    private readonly aiAdapter: AiRecommendationPort
  ) {}

  public async execute(pref: CoffeePreferenceVO) {
    return await this.aiAdapter.generateRecommendation(pref);
  }
}
