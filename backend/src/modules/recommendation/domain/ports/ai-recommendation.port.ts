/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Domain Port]
 * Outbound Port interface for AI Recommendation Engine.
 */

import { CoffeePreferenceVO, CoffeeRecommendationResultVO } from '../value-objects/coffee-preference.vo';

export const AI_RECOMMENDATION = Symbol('AI_RECOMMENDATION');

export interface AiRecommendationPort {
  generateRecommendation(pref: CoffeePreferenceVO): Promise<CoffeeRecommendationResultVO>;
}
