/**
 * [BACKEND - HEXAGONAL ARCHITECTURE LAYER: Infrastructure Adapter]
 * Google GenAI SDK Adapter implementing AiRecommendationPort using Gemini 2.5 Flash.
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from "@google/genai";
import type { Env } from "../../../../config/env.schema";
import { AiRecommendationPort } from "../../domain/ports/ai-recommendation.port";
import { CoffeePreferenceVO, CoffeeRecommendationResultVO } from "../../domain/value-objects/coffee-preference.vo";

@Injectable()
export class GeminiAiRecommendationAdapter implements AiRecommendationPort {
  private aiClient: GoogleGenAI | null = null;

  constructor(config: ConfigService<Env, true>) {
    const apiKey = config.get('GEMINI_API_KEY', { infer: true });
    if (apiKey) {
      this.aiClient = new GoogleGenAI({ apiKey });
    }
  }

  public async generateRecommendation(pref: CoffeePreferenceVO): Promise<CoffeeRecommendationResultVO> {
    if (!this.aiClient) {
      // Graceful fallback if GEMINI_API_KEY is not configured
      return {
        title: "Flat White de Origen Huila & Veracruz",
        description: "Un espresso doble cremoso con microespuma sedosa y matices de avellana tostada y chocolate amargo.",
        reason: "Basado en tu preferencia por bebidas equilibradas y notas tostadas de tueste medio.",
        flavorNotes: ["Chocolate amargo", "Avellana", "Seda caramelizada"],
        pairings: ["Croissant de Almendras", "Tarta de Limón"],
        roastLevel: "Tueste Medio"
      };
    }

    const prompt = `Eres el Sommelier IA y Maestro Tostador de 'Café Punto Medio', una boutique e-commerce de café de especialidad mexicano.
El cliente busca una recomendación personalizada de tueste y origen con las siguientes preferencias:
- Estado de ánimo / Ocasión: ${pref.mood || 'Cualquiera'}
- Gusto general: ${pref.preference || 'Equilibrado'}
- Notas de sabor deseadas: ${pref.flavorNotes || 'Chocolate amargo, Caramelo, Cítricos, Avellana'}
- Método de preparación preferido: ${pref.milkType || 'Filtro / Pour Over V60 o Espresso'}
- Temperatura: ${pref.temperature || 'Caliente'}

Genera una respuesta en formato JSON estricto con las siguientes claves:
{
  "title": "Nombre del tueste o blend ideal de Café Punto Medio (ej. Oaxaca Sierra Norte, Ciclo Veracruzano, Noche de Chiapas)",
  "description": "Descripción apetitosa del grano y su perfil organoléptico en 2 oraciones",
  "reason": "Explicación de por qué es el 'punto medio' idóneo para sus gustos",
  "flavorNotes": ["3 notas de cata clave"],
  "pairings": ["2 maridajes o acompañamientos recomendados"],
  "roastLevel": "Nivel de tueste recomendado (Tueste Claro, Tueste Medio, Tueste Medio-Oscuro o Tueste Oscuro)"
}`;

    const response = await this.aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as CoffeeRecommendationResultVO;
  }
}
