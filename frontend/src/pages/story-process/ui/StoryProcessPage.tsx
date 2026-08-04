/**
 * [FRONTEND - FSD LAYER: Page - Story & Process]
 * Artisanal narrative detailing coffee farms, technical harvesting, roasting precision, and community heritage.
 */

import React from 'react';
import { ActiveTab } from '../../../shared/types';
import { 
  Sprout, 
  Droplets, 
  Package, 
  Flame, 
  Coffee, 
  ShieldCheck, 
  Leaf, 
  Handshake, 
  ArrowRight
} from 'lucide-react';

interface StoryProcessPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const StoryProcessPage: React.FC<StoryProcessPageProps> = ({ setActiveTab }) => {
  const technicalPhases = [
    {
      icon: Sprout,
      title: 'Del Campo al Grano',
      subtitle: 'Cultivo y Cosecha',
      description: 'Cultivado a una altitud óptima de 1200m, donde el estrés térmico favorece la concentración de azúcares. Cosecha manual selectiva solo de cerezas color rojo intenso.'
    },
    {
      icon: Droplets,
      title: 'El Beneficiado',
      subtitle: 'Despulpado y Fermentación',
      description: 'Proceso por vía húmeda (lavado) con una fermentación controlada de 12-24 horas. Este paso resalta la acidez brillante y las notas florales características.'
    },
    {
      icon: Package,
      title: 'Secado y Reposo',
      subtitle: 'Estabilización',
      description: 'Secado hasta alcanzar una humedad del 11-12%. Reposo posterior de 30 a 60 días en sacos de yute para la estabilización de los precursores de aroma.'
    },
    {
      icon: Flame,
      title: 'El Tueste Artesanal',
      subtitle: 'Micro-lotes',
      description: 'Tueste en pequeños lotes de 15kg. Perfil de tueste medio-claro (205-210°C) diseñado para preservar las notas de origen sin amargores excesivos.'
    },
    {
      icon: Coffee,
      title: 'Del Molido a la Taza',
      subtitle: 'Paso de Precisión',
      description: 'El paso final donde la granulometría se ajusta perfectamente al método de extracción, asegurando que la complejidad del campo llegue intacta a tu paladar.'
    }
  ];

  const coffeeFarms = [
    {
      name: 'Finca El Santuario',
      region: 'Veracruz | 1,400m',
      description: 'Reconocida por su suelo volcánico y bruma matutina, produciendo granos con profundas notas de cacao.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Alturas de Las Nubes',
      region: 'Chiapas | 1,850m',
      description: 'Donde las nubes rozan las cerezas. Alta acidez y complejidad floral definen esta región.',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Valle Escondido',
      region: 'Oaxaca | 1,600m',
      description: 'Cultivado bajo la sombra de doseles nativos, resultando en una dulzura equilibrada procesada en honey.',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const craftsmanshipSteps = [
    {
      number: '01',
      title: 'Cosecha Selectiva',
      description: 'Solo las cerezas más maduras "sangre de toro" son cosechadas a mano. Esta labor intensiva asegura una dulzura y complejidad uniformes que la cosecha mecánica jamás lograría.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
    },
    {
      number: '02',
      title: 'Secado al Sol y Fermentación',
      description: 'Utilizamos camas africanas elevadas y patios tradicionales. La fermentación controlada de hasta 36 horas desarrolla los perfiles de sabor únicos de Café Punto Medio.',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800'
    },
    {
      number: '03',
      title: 'El Tueste Artesanal',
      description: 'Nuestros maestros tostadores tratan cada lote como un perfil individual. Tostamos en incrementos pequeños para resaltar el "punto medio", donde el origen se equilibra con el tueste.',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const teamMembers = [
    {
      name: 'Mateo Ruiz',
      role: 'Director de Origen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Elena Soto',
      role: 'Maestra Tostadora',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Sofía Méndez',
      role: 'Directora de Operaciones',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Carlos Vega',
      role: 'Enlace Comunitario',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-sans space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <header className="pt-12 sm:pt-20 pb-10 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#271310] tracking-tight leading-tight">
          Nuestra Historia Nace <br />en el Punto Medio
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#504442] italic font-serif">
          Conectando el alma del suelo mexicano con la precisión de la taza artesanal.
        </p>
      </header>

      {/* 2. MISSION & VISION SECTION (ORGANIC LAYOUT) */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="md:col-span-7">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-[#d3c3c0]/40">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Finca de café al amanecer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
            Nuestra Misión
          </h2>
          <p className="text-sm sm:text-base text-[#504442] leading-relaxed">
            Existimos en el "punto medio". Nuestra misión es cerrar la brecha entre los dedicados productores de la Sierra Madre y el apasionado del café. Priorizamos la transparencia radical, el cuidado ambiental y la preservación de técnicas tradicionales de cosecha en México.
          </p>
          <div className="flex items-center gap-2 text-[#7d562d] font-bold text-sm">
            <Leaf className="w-5 h-5 text-[#7d562d]" />
            <span>Prácticas 100% Sustentables</span>
          </div>
        </div>
      </section>

      {/* 3. PROCESO TÉCNICO SECTION */}
      <section className="py-16 bg-[#efeeea] px-6 sm:px-8 border-y border-[#d3c3c0]/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
              Proceso Técnico
            </h2>
            <p className="text-sm text-[#504442]">
              La precisión artesanal detrás de cada grano, garantizando una calidad de exportación superior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalPhases.map((phase, idx) => {
              const IconComp = phase.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#fbf9f5] p-6 rounded-2xl border border-[#d3c3c0]/50 hover:border-[#7d562d] transition-all duration-300 group shadow-xs space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#271310]/5 flex items-center justify-center text-[#271310] group-hover:bg-[#7d562d]/10 group-hover:text-[#7d562d] transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#271310]">{phase.title}</h3>
                    <span className="text-xs text-[#7d562d] font-bold block mt-0.5">{phase.subtitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#504442] leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              );
            })}

            {/* Quality Badge Card */}
            <div className="bg-[#ffca98]/20 p-6 rounded-2xl border-2 border-dashed border-[#7d562d]/40 flex flex-col items-center justify-center text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-[#7d562d]" />
              <h3 className="font-serif text-xl font-bold text-[#271310]">Certificado de Puntaje</h3>
              <p className="text-xs text-[#7d562d] font-bold">Café de Especialidad</p>
              <div className="px-4 py-1.5 bg-white rounded-full text-[#271310] font-bold text-sm shadow-xs border border-[#d3c3c0]/40">
                Puntaje SCA: 85+
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR COFFEE FARMS SECTION */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
            Nuestras Fincas Aliadas
          </h2>
          <p className="text-sm text-[#504442]">
            Granos excepcionales nacidos en diversos microclimas de México.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coffeeFarms.map((farm, idx) => (
            <div 
              key={idx}
              className="bg-[#fbf9f5] p-3 rounded-2xl border border-[#d3c3c0]/40 hover:shadow-xl transition-shadow duration-500 group flex flex-col justify-between"
            >
              <div className="rounded-xl overflow-hidden aspect-square bg-[#eae8e4] mb-4">
                <img 
                  src={farm.image} 
                  alt={farm.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-3 space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#271310]">{farm.name}</h3>
                <span className="text-xs font-bold text-[#7d562d] block">{farm.region}</span>
                <p className="text-xs sm:text-sm text-[#504442] leading-relaxed">
                  {farm.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP IN EVERY GRAIN */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="max-w-xl space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
            Artesanía en Cada Grano
          </h2>
          <p className="text-sm text-[#504442]">
            Nuestro "Proceso de Precisión" honra el esfuerzo de los caficultores en cada tueste.
          </p>
        </div>

        <div className="space-y-16">
          {craftsmanshipSteps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2 space-y-4 relative">
                <span className="font-serif text-7xl sm:text-8xl font-bold text-[#e4e2de] select-none block leading-none">
                  {step.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#271310]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#504442] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden h-72 sm:h-80 shadow-lg bg-[#eae8e4] border border-[#d3c3c0]/40">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THE PEOPLE BEHIND THE CUP SECTION */}
      <section className="py-16 bg-[#efeeea] px-6 sm:px-8 border-y border-[#d3c3c0]/30">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
            El Equipo Detrás de la Taza
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group space-y-3">
                <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-[#fbf9f5] transition-transform duration-500 group-hover:scale-105 bg-[#eae8e4]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#271310]">{member.name}</h4>
                  <p className="text-xs text-[#7d562d] font-bold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="px-6 sm:px-8 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#7d562d]/10 text-[#7d562d] flex items-center justify-center mx-auto">
          <Handshake className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
          Un Futuro Arraigado en la Tradición
        </h2>
        <p className="text-sm sm:text-base text-[#504442] leading-relaxed max-w-2xl mx-auto">
          Al elegir Café Punto Medio, participas activamente en un ciclo de desarrollo sustentable. Reinvertimos un porcentaje en capacitación para caficultores de la región.
        </p>
        <div className="pt-2">
          <button 
            onClick={() => setActiveTab('shop')}
            className="px-8 py-4 rounded-full bg-[#7d562d] hover:bg-[#271310] text-white font-bold text-sm transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2"
          >
            <span>Explorar Tienda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
