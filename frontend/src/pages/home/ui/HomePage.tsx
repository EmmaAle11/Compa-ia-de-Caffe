/**
 * [FRONTEND - FSD LAYER: Page - Home]
 * Primary landing page featuring artisanal coffee origin narrative, 12-step 'Del Origen a tu Taza' process,
 * curated seasonal roasts, craftmanship overview, community reviews, and 'Momentos en Veracruz' gallery.
 */

import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  Heart, 
  Instagram,
  Coffee,
  Droplets,
  Flame,
  Award
} from 'lucide-react';
import { CoffeeProduct, ActiveTab } from '../../../shared/types';
import { COFFEE_PRODUCTS } from '../../../entities/product/model/mockProducts';

// Local Assets
import veracruzPastureImg from '../../../shared/assets/images/veracruz_coffee_pasture_1785530261706.jpg';
import coffeeCherriesTownImg from '../../../shared/assets/images/coffee_cherries_town_1785530272803.jpg';
import veracruzChurchImg from '../../../shared/assets/images/veracruz_night_church_1785530250243.jpg';
import icedCoffeeMuralImg from '../../../shared/assets/images/iced_coffee_mural_1785530284552.jpg';
import veracruzImg from '../../../shared/assets/images/veracruz.jpeg';

// 12 Process Step Images
import floracionImg from '../../../shared/assets/images/Floracion_de_cafe.jpeg';
import cafeCerezaImg from '../../../shared/assets/images/Cafe_cereza.jpeg';
import frutoVerdeImg from '../../../shared/assets/images/Fruto_verde_inmaduro.jpeg';
import frutoSobremaduroImg from '../../../shared/assets/images/Fruto_sobremaduro_seco.jpeg';
import corteImg from '../../../shared/assets/images/Corte_de_cafe.jpeg';
import despulpadoImg from '../../../shared/assets/images/Despulpado.jpeg';
import fermentacionImg from '../../../shared/assets/images/Fermentacion.jpeg';
import lavadoImg from '../../../shared/assets/images/Lavado.jpeg';
import secadoImg from '../../../shared/assets/images/Secado_Natural.jpeg';
import seleccionImg from '../../../shared/assets/images/Seleccion_de_cafe.jpeg';
import morteadoImg from '../../../shared/assets/images/Proceso_de_mortero.jpeg';
import tostadoImg from '../../../shared/assets/images/Tostado.jpeg';

interface HomePageProps {
  onSelectProduct: (product: CoffeeProduct) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onAddToCart: (product: CoffeeProduct) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  setActiveTab,
  onAddToCart,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Mouse drag scrolling state for process carousel
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeftState(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    timelineRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const featuredProducts = COFFEE_PRODUCTS.slice(0, 3);

  // 12 Steps for "Del Origen a tu Taza"
  const processSteps = [
    {
      num: '01',
      emoji: '🌸',
      title: 'Floración',
      desc: 'El ciclo comienza con flores blancas y efímeras de aroma a jazmín. Cada evento de floración dicta una futura curva de desarrollo del fruto.',
      image: floracionImg
    },
    {
      num: '02',
      emoji: '🍒',
      title: 'Café Cereza',
      desc: 'Los frutos alcanzan su plena madurez tornándose de un rojo vibrante, llegando a su punto óptimo de calidad y concentración de azúcar.',
      image: cafeCerezaImg
    },
    {
      num: '03',
      emoji: '🟢',
      title: 'Fruto Verde',
      desc: 'Los frutos inmaduros no se recolectan, ya que en taza resultarían astringentes, amargos y poco aromáticos.',
      image: frutoVerdeImg
    },
    {
      num: '04',
      emoji: '🟤',
      title: 'Sobremaduro',
      desc: 'Identificamos y descartamos frutos que han pasado su punto, evitando notas vinagradas o fermentadas que arruinarían el perfil.',
      image: frutoSobremaduroImg
    },
    {
      num: '05',
      emoji: '✂️',
      title: 'Corte',
      desc: 'Recolección manual selectiva. Solo los granos perfectos se eligen para asegurar las cualidades olfativas superiores de Punto Medio.',
      image: corteImg
    },
    {
      num: '06',
      emoji: '⚙️',
      title: 'Despulpado',
      desc: 'Se retira la pulpa de la cereza mediante presión mecánica controlada inmediatamente después de la cosecha.',
      image: despulpadoImg
    },
    {
      num: '07',
      emoji: '🧪',
      title: 'Fermentación',
      desc: 'Proceso biológico donde microorganismos modifican proteínas y azúcares, revelando perfiles de sabor complejos y únicos.',
      image: fermentacionImg
    },
    {
      num: '08',
      emoji: '💧',
      title: 'Lavado',
      desc: 'Con abundante agua limpia, retiramos totalmente el mucílago fermentado, dejando el grano puro y listo para secar.',
      image: lavadoImg
    },
    {
      num: '09',
      emoji: '☀️',
      title: 'Secado Natural',
      desc: 'Reducción gradual de la humedad del 55% al rango ideal de 10.5-11.5% bajo el sol de Veracruz.',
      image: secadoImg
    },
    {
      num: '10',
      emoji: '🫘',
      title: 'Selección',
      desc: 'Clasificación rigurosa por tamaño y forma. Solo los granos de mayor calidad avanzan a la fase final.',
      image: seleccionImg
    },
    {
      num: '11',
      emoji: '⚙️',
      title: 'Morteado',
      desc: 'Eliminación de la cascarilla o pergamino sin quebrar ni calentar el grano, revelando el café verde.',
      image: morteadoImg
    },
    {
      num: '12',
      emoji: '🔥',
      title: 'Tostado',
      desc: 'El grano verde se transforma en café aromático. El calor libera el cuerpo, la acidez y el sabor definitivo.',
      image: tostadoImg
    }
  ];

  // Moments in Veracruz Images Grid
  const veracruzMoments = [
    {
      title: 'Pastizales y Fincas de Veracruz',
      image: veracruzPastureImg,
      location: 'Coatepec, Veracruz'
    },
    {
      title: 'Cosecha de Cerezas de Café',
      image: coffeeCherriesTownImg,
      location: 'Pueblo de Alta Montaña'
    },
    {
      title: 'Atardecer y Parroquia Histórica',
      image: veracruzChurchImg,
      location: 'Centro Histórico, Veracruz'
    },
    {
      title: 'Murales y Café Frío Artesanal',
      image: icedCoffeeMuralImg,
      location: 'Barra de Especialidad'
    }
  ];

  return (
    <div className="space-y-24 pb-20 bg-[#FAF6F0] text-[#1F140E]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1F140E] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 scale-105 transition-transform duration-[10000ms]"
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdN5MyAkm9mPqCJPkH_AVpnGqd84Uyw-2P7dIGGMcPfGmakGe2RRZTlz80atPPxoDRMbrCRNVuYelDwLNw3neR4wmfGPQEZ3jWN9butIn7lRaFnbVNMPIN4TcHaINPBVsxYdaWj0qoODJ-DgS67ySv2Eo9tkB1zZhzUIjk3RZZ70Mgt_tMVL4JqDXi4TlApi8sZNkPwtEDbDBbWC7CYe9MTIRFjjbbguaGmA0dGdcGrtXlRgIXRcnd')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F140E] via-[#1F140E]/40 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-6">
          <span className="font-label-md text-xs sm:text-sm text-[#D4A373] tracking-[0.25em] uppercase block font-bold">
            EL VIAJE ARTESANAL
          </span>
          <h1 className="font-display-lg text-4xl sm:text-6xl lg:text-7xl text-white font-bold leading-tight font-serif">
            Calidad que perdura del origen a tu taza.
          </h1>
          <p className="text-sm sm:text-base text-[#E6DAC8] max-w-2xl mx-auto font-light leading-relaxed">
            Cultivado con esmero en laderas volcánicas de Veracruz, Oaxaca y Chiapas. Tostado en lotes pequeños para resaltar cada matiz sensorial único.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => setActiveTab('shop')}
              className="bg-[#B87D4B] text-white px-8 py-4 rounded-full font-label-md text-xs uppercase tracking-wider font-bold hover:bg-[#A36C3D] transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <span>Comprar Colección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('ai_sommelier')}
              className="bg-white/10 backdrop-blur-md text-[#FAF6F0] border border-white/20 px-8 py-4 rounded-full font-label-md text-xs uppercase tracking-wider font-bold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Descubre Tu Café Ideal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. ORIGIN STORY SECTION */}
      <section className="py-8 px-6 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl border border-[#E6DAC8] bg-[#E6DAC8]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCurYl02iWt2RbuEtz3y9h1aSIYfyeKZp0VnBoOWaqxukICgI4VJWFcWKir0xepbYCBljH7vtYTicnh-qZY-m_da6Q-nThX3hPd3FWBDpvKtM8Hi88z2m8cYQB1uhyYz5_oYafmT_3F4UCsfM3-JlM_aE5vnLOssZgX7cSOVYhZjclQ6vNIwiU1W6R1jLA2eb8ruNydPOaRqtyQtY7zqrolgIDmfK07Fqr_8uC2_jACI53OL_RDxkV3" 
              alt="Manos de agricultor cosechando cerezas de café" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#D4A373]/20 backdrop-blur-xl rounded-full -z-10 animate-pulse"></div>
        </div>

        <div className="space-y-6">
          <span className="font-label-md text-xs uppercase tracking-widest text-[#B87D4B] font-bold">
            EL PUNTO MEDIO
          </span>
          <h2 className="font-display-lg text-3xl sm:text-5xl font-bold text-[#1F140E] leading-snug font-serif">
            El equilibrio entre la naturaleza y la artesanía.
          </h2>
          <p className="font-body-lg text-sm sm:text-base text-[#724C3A] leading-relaxed">
            En Café Punto Medio creemos en el "punto justo": esa intersección perfecta donde la riqueza volcánica del suelo mexicano se encuentra con la meticulosa precisión del tueste artesanal.
          </p>
          <p className="font-body-lg text-sm sm:text-base text-[#724C3A] leading-relaxed">
            Nuestra travesía comenzó en fincas familiares de Veracruz, presenciando la dedicación requerida para producir un grano verdaderamente excepcional. Hoy colaboramos directamente con productores locales para garantizar que cada taza honre la tierra y a quienes la cultivan.
          </p>
          <button 
            onClick={() => setActiveTab('story_process')}
            className="inline-flex items-center gap-2 font-label-md text-xs uppercase tracking-wider font-bold text-[#1F140E] border-b-2 border-[#B87D4B] pb-1 hover:text-[#B87D4B] transition-colors group"
          >
            <span>Leer nuestra historia completa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 3. DEL ORIGEN A TU TAZA (TIMELINE SECTION WITH DRAG SCROLL) */}
      <section className="py-16 bg-[#1F140E] text-[#FAF6F0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="border-b border-[#4A2E22] pb-6">
            <h2 className="font-display-lg text-3xl sm:text-5xl font-bold font-serif text-white">
              Del origen a tu taza
            </h2>
          </div>

          {/* Drag-scrollable Timeline Cards Horizontal Carousel */}
          <div 
            ref={timelineRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex overflow-x-auto gap-6 pb-6 hide-scrollbar select-none cursor-grab active:cursor-grabbing ${
              isDragging ? 'scroll-auto' : 'scroll-smooth'
            }`}
          >
            {processSteps.map((step) => (
              <div 
                key={step.num}
                className="min-w-[280px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 bg-[#2E1C14] rounded-3xl overflow-hidden border border-[#4A2E22] flex flex-col justify-between group hover:border-[#B87D4B] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1F140E]">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 pointer-events-none"
                  />
                  <div className="absolute top-4 left-4 bg-[#1F140E]/90 text-[#D4A373] border border-[#B87D4B]/40 font-bold text-xs w-9 h-9 rounded-full flex items-center justify-center shadow-md">
                    {step.num}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{step.emoji}</span>
                      <h3 className="font-serif font-bold text-xl text-white">{step.title}</h3>
                    </div>
                    <p className="text-xs text-[#E6DAC8] leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setActiveTab('story_process')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B87D4B] hover:bg-[#A36C3D] text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Explorar los 12 pasos a detalle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (TUESTES SELECCIONADOS) */}
      <section className="py-8 px-6 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#E6DAC8] pb-6">
          <div className="max-w-xl space-y-2">
            <span className="font-label-md text-xs uppercase tracking-widest text-[#B87D4B] font-bold">
              COSECHA ESPECIAL
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#1F140E] font-serif">
              Tuestes Seleccionados
            </h2>
            <p className="font-body-lg text-sm text-[#724C3A]">
              Cuidadosamente seleccionados de los suelos más fértiles de México. Tostados bajo demanda para conservar su fresca expresión aromática.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('shop')}
            className="font-label-md text-xs font-bold uppercase tracking-wider text-[#1F140E] border-b-2 border-[#B87D4B] pb-1 hover:text-[#B87D4B] transition-colors"
          >
            Ver catálogo completo →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-3xl p-6 border border-[#E6DAC8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#FAF6F0]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1F140E] text-[#D4A373] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.roastLevel}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#1F140E] font-serif text-sm font-bold px-3 py-1.5 rounded-xl shadow-xs">
                    ${product.price.toFixed(2)} USD
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#B87D4B] uppercase tracking-wider block">
                    {product.region} • {product.elevation}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1F140E] mt-1 group-hover:text-[#B87D4B] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.flavorNotes.map((note, i) => (
                      <span key={i} className="text-[10px] bg-[#FAF6F0] text-[#724C3A] px-2 py-0.5 rounded-md border border-[#E6DAC8]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#FAF6F0] flex items-center justify-between mt-4">
                <div className="flex gap-1 text-[#B87D4B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B87D4B]" />
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="px-4 py-2 rounded-full bg-[#1F140E] text-white text-xs font-bold hover:bg-[#B87D4B] transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP / UN PROCESO SIN ATAJOS */}
      <section className="py-12 bg-[#F4ECE1] border-y border-[#E6DAC8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B87D4B]">
              GARANTÍA DE ESPECIALIDAD
            </span>
            <h2 className="font-display-lg text-3xl sm:text-5xl font-bold font-serif text-[#1F140E]">
              Un Proceso Sin Atajos.
            </h2>
            <div className="h-1 w-20 bg-[#B87D4B] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-[#E6DAC8] text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#1F140E] text-[#D4A373] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Coffee className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F140E]">Cultivo de Altura</h3>
              <p className="text-xs text-[#724C3A] leading-relaxed">
                Recolectado a mano en su punto óptimo de maduración en laderas de alta montaña.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E6DAC8] text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#1F140E] text-[#D4A373] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Droplets className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F140E]">Beneficiado Limpio</h3>
              <p className="text-xs text-[#724C3A] leading-relaxed">
                Lavado triple con agua limpia de manantial para garantizar pureza y brillo de sabor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E6DAC8] text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#1F140E] text-[#D4A373] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F140E]">Tueste en Lote Pequeño</h3>
              <p className="text-xs text-[#724C3A] leading-relaxed">
                Tostado por aire en tambores de 5kg para un control térmico impecable y cero defectos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E6DAC8] text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#1F140E] text-[#D4A373] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F140E]">La Taza en Tu Hogar</h3>
              <p className="text-xs text-[#724C3A] leading-relaxed">
                Empacado al vacío con válvula desgasificadora y entregado fresco hasta tu puerta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MOMENTOS EN VERACRUZ (IMAGE GALLERY FROM src/assets/images) */}
      <section className="py-8 px-6 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E6DAC8] pb-4">
          <div>
            <span className="text-xs font-bold text-[#B87D4B] uppercase tracking-widest block">
              GALERÍA FOTOGRÁFICA DE ORIGEN
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1F140E]">
              Momentos en Veracruz
            </h2>
          </div>
          <span className="text-xs font-mono text-[#724C3A] font-semibold flex items-center gap-1">
            <Instagram className="w-4 h-4 text-[#B87D4B]" /> @cafepuntomedio.mx
          </span>
        </div>

        {/* 4 Image Grid displaying assets from src/assets/images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {veracruzMoments.map((item, index) => (
            <div 
              key={index} 
              className="group relative rounded-3xl overflow-hidden bg-[#E6DAC8] shadow-xs border border-[#E6DAC8] aspect-[4/5]"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F140E]/80 via-[#1F140E]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] font-mono text-[#D4A373] uppercase tracking-wider font-bold">
                  {item.location}
                </span>
                <h3 className="font-serif font-bold text-base text-white mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. COMMUNITY TESTIMONIALS */}
      <section className="py-16 bg-[#1F140E] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">
              RESEÑAS VERIFICADAS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Historias de Nuestra Comunidad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#2E1C14] border border-[#4A2E22] space-y-4">
              <div className="flex text-[#D4A373] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A373]" />
                ))}
              </div>
              <p className="font-serif text-base text-[#E6DAC8] italic leading-relaxed">
                "La profundidad de sabor del tueste Oaxaca Reserva es insuperable. Se ha convertido en nuestro ritual sagrado cada mañana antes de iniciar la jornada."
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B87D4B] flex items-center justify-center font-bold text-white text-xs">
                  ER
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Elena Rodríguez</h4>
                  <span className="text-[10px] text-[#D4A373]">Apasionada del Método V60</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#2E1C14] border border-[#4A2E22] space-y-4">
              <div className="flex text-[#D4A373] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A373]" />
                ))}
              </div>
              <p className="font-serif text-base text-[#E6DAC8] italic leading-relaxed">
                "Servimos Café Punto Medio en nuestra repostería. Los clientes frecuentemente destacan la acidez equilibrada y el aroma único a cacao y miel."
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B87D4B] flex items-center justify-center font-bold text-white text-xs">
                  MC
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Carlos Mendoza</h4>
                  <span className="text-[10px] text-[#D4A373]">Dueño de Panadería de Especialidad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIBE */}
      <section className="py-16 bg-[#F4ECE1] border-y border-[#E6DAC8]">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F140E]">
            Únete a nuestro círculo de café
          </h2>
          <p className="text-sm text-[#724C3A]">
            Suscríbete para recibir actualizaciones sobre cosechas de edición limitada, guías de preparación e invitaciones a catas privadas.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> ¡Suscripción confirmada! Te enviaremos novedades pronto.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico" 
                className="flex-1 bg-white border border-[#E6DAC8] rounded-full px-6 py-3.5 text-xs text-[#1F140E] outline-none shadow-2xs focus:ring-2 focus:ring-[#B87D4B]"
              />
              <button 
                type="submit" 
                className="bg-[#1F140E] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#B87D4B] transition-all shadow-md"
              >
                Suscribirme
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

