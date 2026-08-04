/**
 * [FRONTEND - FSD LAYER: Page - Product Detail]
 * Rich product detail view featuring roast level explorer, brewing guides, customer reviews and add to cart controls.
 */

import React, { useState } from 'react';
import { 
  Star, 
  Check, 
  ShoppingCart, 
  Truck, 
  Plus, 
  Coffee as CoffeeIcon, 
  Filter, 
  Leaf 
} from 'lucide-react';
import { CoffeeProduct, GrindOption, ActiveTab, RoastLevelType } from '../../../shared/types';
import { COFFEE_PRODUCTS } from '../../../entities/product/model/mockProducts';

interface ProductDetailPageProps {
  product: CoffeeProduct;
  onAddToCart: (product: CoffeeProduct, grind: GrindOption, quantity: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectProduct: (product: CoffeeProduct) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  setActiveTab,
  onSelectProduct,
}) => {
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Grano Entero');
  const [quantity] = useState<number>(1);
  const [selectedRoast, setSelectedRoast] = useState<RoastLevelType>('medium');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const galleryImages = [
    product.image || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800'
  ];

  const grinds: GrindOption[] = [
    'Grano Entero',
    'Molido Medio',
    'Prensa Francesa',
    'Espresso',
    'V60 / Pour Over'
  ];

  const roastData = {
    'light': {
      title: 'Tueste Claro (Light Roast)',
      desc: 'Marrón claro, alta acidez vibrante, cuerpo sedoso tipo té. Destaca las notas florales y cítricas intrínsecas del origen.',
      label: 'TUESTE CLARO',
      color: '#C68E5A',
      attributes: { body: '3/10', acidity: '9/10', sweetness: '5/10', bitterness: '1/10', aroma: '9/10', brewing: 'V60, Chemex' },
      bars: { body: '30%', acidity: '90%', sweetness: '50%', bitterness: '10%', aroma: '90%' }
    },
    'medium': {
      title: 'Tueste Medio (Medium Roast)',
      desc: 'Dulzura acaramelada balanceada, cuerpo medio. El verdadero "Punto Medio" donde el terruño se abraza con el calor del tostado.',
      label: 'TUESTE MEDIO',
      color: '#7d562d',
      attributes: { body: '6/10', acidity: '5/10', sweetness: '8/10', bitterness: '3/10', aroma: '7/10', brewing: 'Pour Over, Cafetera de Goteo' },
      bars: { body: '60%', acidity: '50%', sweetness: '80%', bitterness: '30%', aroma: '70%' }
    },
    'medium-dark': {
      title: 'Tueste Medio-Oscuro',
      desc: 'Baja acidez, cuerpo denso, notas a cacao amargo y avellana tostada. Un perfil profundo con gran carácter.',
      label: 'MEDIO OSCURO',
      color: '#4a341a',
      attributes: { body: '8/10', acidity: '3/10', sweetness: '6/10', bitterness: '6/10', aroma: '6/10', brewing: 'Prensa Francesa, Aeropress' },
      bars: { body: '80%', acidity: '30%', sweetness: '60%', bitterness: '60%', aroma: '60%' }
    },
    'dark': {
      title: 'Tueste Oscuro (Dark Roast)',
      desc: 'Intenso, ahumado, cuerpo completo con amargor audaz. Ideal para extractos cargados y amantes del espresso clásico.',
      label: 'TUESTE OSCURO',
      color: '#271310',
      attributes: { body: '10/10', acidity: '1/10', sweetness: '3/10', bitterness: '9/10', aroma: '5/10', brewing: 'Espresso, Cafetera Italiana' },
      bars: { body: '100%', acidity: '10%', sweetness: '30%', bitterness: '90%', aroma: '50%' }
    }
  };

  const currentRoast = roastData[selectedRoast];
  const relatedProducts = COFFEE_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <main className="pt-6 sm:pt-12 pb-20 px-6 sm:px-8 max-w-7xl mx-auto space-y-16 text-[#1b1c1a] bg-[#fbf9f5]">
      
      {/* 1. PRODUCT HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#efeeea] border border-[#d3c3c0]/40 shadow-xs">
            <img 
              src={galleryImages[activeImageIndex] || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`rounded-xl overflow-hidden aspect-square bg-[#efeeea] cursor-pointer transition-all ${
                  activeImageIndex === idx
                    ? 'border-2 border-[#7d562d] shadow-sm'
                    : 'border border-[#d3c3c0]/40 opacity-80 hover:opacity-100'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <span className="font-label-md text-xs sm:text-sm text-[#7d562d] tracking-widest uppercase font-bold block mb-2">
              RESERVA DE ORIGEN ÚNICO
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#271310] leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex text-[#7d562d]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#7d562d] text-[#7d562d]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#504442]">(48 Opiniones de Catadores)</span>
          </div>

          <p className="text-sm sm:text-base text-[#504442] leading-relaxed">
            {product.description}
          </p>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 gap-6 border-y border-[#d3c3c0]/40 py-6">
            <div>
              <span className="text-xs text-[#504442] block mb-1 uppercase tracking-wider font-bold">Origen</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#271310]">{product.region}</span>
              <p className="text-xs text-[#504442] mt-0.5">{product.elevation} Altitud</p>
            </div>
            <div>
              <span className="text-xs text-[#504442] block mb-1 uppercase tracking-wider font-bold">Proceso</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#271310]">{product.process}</span>
              <p className="text-xs text-[#504442] mt-0.5">Secado al sol artesanal</p>
            </div>
            <div className="col-span-2 space-y-2">
              <span className="text-xs text-[#504442] block uppercase tracking-wider font-bold">Notas de Cata</span>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note, idx) => (
                  <span key={idx} className="bg-[#e4e2de] px-3.5 py-1 rounded-full text-xs font-bold text-[#271310]">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Grind Selector */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider font-bold text-[#271310] block">
              Tipo de Molido / Presentación
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {grinds.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrind(g)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                    selectedGrind === g
                      ? 'bg-[#271310] text-white border-[#271310] shadow-xs'
                      : 'bg-[#f5f3ef] text-[#504442] border-[#e4e2de] hover:border-[#7d562d]'
                  }`}
                >
                  <span>{g}</span>
                  {selectedGrind === g && <Check className="w-3.5 h-3.5 text-[#ffca98]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-4xl font-bold text-[#271310]">
                ${product.price.toFixed(2)} USD
              </span>
              <span className="text-xs sm:text-sm text-[#504442]">/ {product.weight}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => onAddToCart(product, selectedGrind, quantity)}
                className="flex-1 px-8 py-4 rounded-full bg-[#271310] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#7d562d] transition-all shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar a Bolsa</span>
              </button>
              
              <button 
                onClick={() => {
                  onAddToCart(product, selectedGrind, quantity);
                  setActiveTab('checkout');
                }}
                className="px-8 py-4 rounded-full border border-[#271310] text-[#271310] font-bold text-sm hover:bg-[#e4e2de] transition-all"
              >
                Comprar Ahora
              </button>
            </div>

            <div className="flex items-center gap-2 text-[#504442] text-xs pt-1">
              <Truck className="w-4 h-4 text-[#7d562d]" />
              <span>Envío gratis en compras mayores a $50.00 USD</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. ROAST EXPLORER COMPONENT */}
      <section className="border-t border-[#d3c3c0]/40 pt-16 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs text-[#7d562d] font-bold tracking-widest uppercase block mb-1">
              Guía Educativa de Tueste
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#271310]">
              Explorador de Tueste
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#504442] max-w-md">
            Comprende cómo el calor transforma el alma del grano. Selecciona un nivel de tueste para ver los cambios.
          </p>
        </div>

        <div className="bg-[#efeeea] rounded-2xl overflow-hidden border border-[#d3c3c0]/40 shadow-xs">
          {/* Roast Selector Tabs */}
          <div className="flex border-b border-[#d3c3c0]/40 overflow-x-auto bg-[#e4e2de]/50">
            {(['light', 'medium', 'medium-dark', 'dark'] as RoastLevelType[]).map((level) => {
              const data = roastData[level];
              const isActive = selectedRoast === level;
              return (
                <button
                  key={level}
                  onClick={() => setSelectedRoast(level)}
                  className={`flex-1 py-5 px-4 text-center transition-all border-b-2 min-w-[120px] ${
                    isActive 
                      ? 'border-[#7d562d] bg-white/70 shadow-xs' 
                      : 'border-transparent hover:bg-white/30'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider block mb-2 text-[#271310]">
                    {data.label}
                  </span>
                  <div 
                    className="w-5 h-5 rounded-full mx-auto shadow-xs" 
                    style={{ backgroundColor: data.color }} 
                  />
                </button>
              );
            })}
          </div>

          {/* Roast Details Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-10 items-center">
            
            {/* Left Circle Representation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 py-4">
              <div className="relative">
                <div 
                  className="w-48 h-48 lg:w-60 lg:h-60 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-500"
                  style={{ backgroundColor: currentRoast.color }}
                >
                  <CoffeeIcon className="w-24 h-24 text-white/20" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#271310] text-white px-4 py-1 rounded-full text-[11px] font-bold tracking-wider whitespace-nowrap shadow-md">
                  {currentRoast.label}
                </div>
              </div>
            </div>

            {/* Right Attributes */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#271310] mb-2">
                  {currentRoast.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#504442] leading-relaxed">
                  {currentRoast.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#271310] mb-1">
                      <span className="uppercase">Cuerpo</span>
                      <span>{currentRoast.attributes.body}</span>
                    </div>
                    <div className="h-1.5 bg-[#d3c3c0]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7d562d] transition-all duration-500" style={{ width: currentRoast.bars.body }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#271310] mb-1">
                      <span className="uppercase">Acidez</span>
                      <span>{currentRoast.attributes.acidity}</span>
                    </div>
                    <div className="h-1.5 bg-[#d3c3c0]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7d562d] transition-all duration-500" style={{ width: currentRoast.bars.acidity }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#271310] mb-1">
                      <span className="uppercase">Dulzura</span>
                      <span>{currentRoast.attributes.sweetness}</span>
                    </div>
                    <div className="h-1.5 bg-[#d3c3c0]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7d562d] transition-all duration-500" style={{ width: currentRoast.bars.sweetness }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#271310] mb-1">
                      <span className="uppercase">Amargor</span>
                      <span>{currentRoast.attributes.bitterness}</span>
                    </div>
                    <div className="h-1.5 bg-[#d3c3c0]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7d562d] transition-all duration-500" style={{ width: currentRoast.bars.bitterness }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#271310] mb-1">
                      <span className="uppercase">Aroma</span>
                      <span>{currentRoast.attributes.aroma}</span>
                    </div>
                    <div className="h-1.5 bg-[#d3c3c0]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7d562d] transition-all duration-500" style={{ width: currentRoast.bars.aroma }} />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase font-bold text-[#504442] block mb-1">Extracción Recomendada</span>
                    <p className="text-xs font-bold text-[#7d562d]">{currentRoast.attributes.brewing}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BREWING & REVIEWS & SUSTAINABILITY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-[#d3c3c0]/40 pt-16">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Brewing Recommendations */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#271310]">
              Recomendaciones de Extracción
            </h3>
            <p className="text-xs sm:text-sm text-[#504442] leading-relaxed">
              Para liberar todo el espectro organoléptico de {product.name}, sugerimos métodos de preparación que resalten su claridad y cuerpo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.brewingRecs.map((rec, idx) => (
                <div key={idx} className="bg-[#f5f3ef] p-5 rounded-2xl border border-[#e4e2de] space-y-3">
                  <div className="flex items-center gap-2">
                    <CoffeeIcon className="w-5 h-5 text-[#7d562d]" />
                    <h4 className="font-serif font-bold text-lg text-[#271310]">{rec.method}</h4>
                  </div>
                  <p className="text-xs text-[#504442] leading-relaxed">
                    Ratio {rec.ratio} • Molido {rec.grind} • Temperatura {rec.temp}.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#271310]">
              Opiniones de Clientes
            </h3>

            <div className="space-y-6">
              <div className="border-b border-[#d3c3c0]/40 pb-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-sm text-[#271310]">Mateo R.</h5>
                    <div className="flex text-[#7d562d]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#7d562d]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-[#504442]">12 de Marzo, 2026</span>
                </div>
                <p className="text-xs sm:text-sm text-[#504442] italic">
                  "El café más equilibrado que he probado en años. Las notas son muy limpias y presentes."
                </p>
              </div>

              <div className="border-b border-[#d3c3c0]/40 pb-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-sm text-[#271310]">Elena S.</h5>
                    <div className="flex text-[#7d562d]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#7d562d]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-[#504442]">28 de Febrero, 2026</span>
                </div>
                <p className="text-xs sm:text-sm text-[#504442] italic">
                  "Excelente en V60 por las mañanas. Acidez sutil sin ser agresiva. La presentación se siente muy elegante."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Info */}
        <aside className="space-y-6">
          <div className="bg-[#efeeea] p-6 rounded-2xl border border-[#d3c3c0]/40 space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#271310]">Sustentabilidad</h4>
            <p className="text-xs sm:text-sm text-[#504442] leading-relaxed">
              Trabajamos en colaboración directa con la finca de origen. Cada compra apoya fondos comunitarios para infraestructura y agricultura libre de pesticidas.
            </p>
            <div className="flex items-center gap-2 text-[#7d562d] font-bold text-xs pt-1">
              <Leaf className="w-4 h-4 text-[#7d562d]" />
              <span>Certificado 100% Orgánico</span>
            </div>
          </div>
        </aside>

      </section>

      {/* 4. YOU MAY ALSO LIKE SECTION */}
      <section className="border-t border-[#d3c3c0]/40 pt-16 space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
            También te puede gustar
          </h2>
          <button 
            onClick={() => setActiveTab('shop')}
            className="text-xs sm:text-sm font-bold text-[#7d562d] border-b border-[#7d562d] pb-0.5 hover:text-[#271310] transition-colors"
          >
            Ver Toda la Colección
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relItem) => (
            <div 
              key={relItem.id}
              onClick={() => onSelectProduct(relItem)}
              className="bg-[#f5f3ef] rounded-2xl border border-[#e4e2de] overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-60 overflow-hidden relative bg-[#eae8e4]">
                <img 
                  src={relItem.image} 
                  alt={relItem.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#271310] group-hover:text-[#7d562d] transition-colors">
                    {relItem.name}
                  </h4>
                  <p className="text-xs text-[#504442]">{relItem.subtitle}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#e4e2de]">
                  <span className="font-serif font-bold text-lg text-[#271310]">
                    ${relItem.price.toFixed(2)} USD
                  </span>
                  <div className="w-9 h-9 rounded-full border border-[#d3c3c0] flex items-center justify-center group-hover:bg-[#271310] group-hover:text-white group-hover:border-[#271310] transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </main>
  );
};
