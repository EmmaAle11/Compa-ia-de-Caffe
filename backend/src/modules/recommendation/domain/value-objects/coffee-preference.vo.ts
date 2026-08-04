/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Domain Value Object]
 * Customer preferences value object for AI Sommelier matching.
 */

export interface CoffeePreferenceVO {
  preference?: string;
  mood?: string;
  flavorNotes?: string;
  milkType?: string;
  temperature?: string;
}

export interface CoffeeRecommendationResultVO {
  title: string;
  description: string;
  reason: string;
  flavorNotes: string[];
  pairings: string[];
  roastLevel: string;
}
