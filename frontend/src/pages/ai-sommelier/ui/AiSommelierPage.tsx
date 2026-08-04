/**
 * [FRONTEND - FSD LAYER: Page - AI Sommelier]
 * Interactive AI-powered coffee sommelier page using Hexagonal backend endpoints.
 */

import React, { useState } from 'react';
import { Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { ActiveTab, AiRecommendationResponse, CoffeeProduct } from '../../../shared/types';
import { apiClient } from '../../../shared/api/apiClient';
import { COFFEE_PRODUCTS } from '../../../entities/product';

interface AiSommelierPageProps {
  onSelectProduct: (product: CoffeeProduct) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AiSommelierPage: React.FC<AiSommelierPageProps> = ({ onSelectProduct }) => {
  const [mood, setMood] = useState('Energía matutina enfocada');
  const [preference, setPreference] = useState('Equilibrado y sedoso');
  const [flavorNotes, setFlavorNotes] = useState('Chocolate amargo, Caramelo, Ciruela');
  const [method, setMethod] = useState('V60 Pour Over');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<AiRecommendationResponse | null>(null);

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.post<{ recommendation: AiRecommendationResponse }>(
        '/recommendation',
        { mood, preference, flavorNotes, milkType: method, temperature: 'Caliente' }
      );
      setRecommendation(data.recommendation);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos generar tu recomendación. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F140E] text-[#D4A373] text-xs font-bold tracking-wider uppercase shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4A373]" /> ASESORÍA DE TAZA PERSONALIZADA
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1F140E]">
          Encuentra Tu Café Ideal
        </h1>
        <p className="text-sm sm:text-base text-[#724C3A] font-light max-w-xl mx-auto leading-relaxed">
          Pensado desde el alma de nuestro lema <em>"Del origen a tu taza"</em>, este espacio analiza tus gustos, momentos y hábitos de preparación para sugerirte con precisión el grano artesanal perfecto para ti.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DAC8] space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              1. MOMENTO U OCASIÓN
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none"
            >
              <option value="Energía matutina enfocada">Energía matutina enfocada</option>
              <option value="Tarde de lectura y calma">Tarde de lectura y calma</option>
              <option value="Sobremesa con amigos">Sobremesa con amigos</option>
              <option value="Inspiración creativa">Inspiración creativa</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              2. PERFIL DE ACIDEZ / CUERPO
            </label>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none"
            >
              <option value="Equilibrado y sedoso">Equilibrado y sedoso (Punto Medio)</option>
              <option value="Alta acidez floral y brillante">Alta acidez floral y brillante</option>
              <option value="Cuerpo denso e intenso">Cuerpo denso e intenso</option>
              <option value="Dulzura caramelizada">Dulzura caramelizada</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              3. NOTAS DESEADAS
            </label>
            <input
              type="text"
              value={flavorNotes}
              onChange={(e) => setFlavorNotes(e.target.value)}
              placeholder="Ej. Cacao, Miel, Jazmín, Avellana"
              className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              4. MÉTODO DE PREPARACIÓN
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none"
            >
              <option value="V60 Pour Over">V60 Pour Over (Goteo)</option>
              <option value="Prensa Francesa">Prensa Francesa</option>
              <option value="Espresso">Espresso</option>
              <option value="Chemex">Chemex / Aeropress</option>
            </select>
          </div>

        </div>

        <button
          onClick={handleGetRecommendation}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-[#1F140E] hover:bg-[#B87D4B] text-white font-medium text-xs transition-all shadow-md flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4A373]" />
              <span>Buscando tu café perfecto...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Generar Recomendación Personalizada</span>
            </>
          )}
        </button>

        {error && (
          <p role="alert" className="mt-3 text-xs text-center text-[#8C2F16] font-medium">
            {error}
          </p>
        )}
      </div>

      {/* RECOMMENDATION RESULT CARD */}
      {recommendation && (
        <div className="bg-[#1F140E] text-[#FAF6F0] p-8 rounded-3xl border border-[#4A2E22] space-y-6 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#4A2E22] pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#D4A373]">
                TU ELECCIÓN PERFECTA DE ORIGEN
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                {recommendation.title}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#B87D4B]/30 border border-[#B87D4B] text-[#D4A373] text-xs font-bold">
              {recommendation.roastLevel}
            </span>
          </div>

          <p className="text-sm text-[#E6DAC8] font-light leading-relaxed">
            {recommendation.description}
          </p>

          <div className="p-4 rounded-2xl bg-[#2E1C14] border border-[#4A2E22] space-y-1">
            <span className="text-xs font-bold text-[#D4A373]">¿Por qué es para ti?</span>
            <p className="text-xs text-[#E6DAC8] leading-relaxed">{recommendation.reason}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-white block mb-2">Notas de Cata Clave:</span>
              <div className="flex flex-wrap gap-1.5">
                {recommendation.flavorNotes?.map((note: string, idx: number) => (
                  <span key={idx} className="text-[11px] bg-[#B87D4B] text-white px-2.5 py-1 rounded-full font-medium">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-white block mb-2">Maridajes Recomendados:</span>
              <div className="flex flex-wrap gap-1.5">
                {recommendation.pairings?.map((p: string, idx: number) => (
                  <span key={idx} className="text-[11px] bg-white/10 text-[#E6DAC8] px-2.5 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#4A2E22] flex justify-end">
            <button
              onClick={() => {
                const found = COFFEE_PRODUCTS.find(p => p.name.toLowerCase().includes(recommendation.title?.toLowerCase() || '')) || COFFEE_PRODUCTS[0];
                onSelectProduct(found);
              }}
              className="px-6 py-2.5 rounded-full bg-[#B87D4B] hover:bg-[#A36C3D] text-white text-xs font-bold flex items-center gap-2"
            >
              <span>Ver Producto en Tienda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
