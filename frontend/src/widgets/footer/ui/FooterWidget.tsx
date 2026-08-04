/**
 * [FRONTEND - FSD LAYER: Widget - Footer]
 * Global footer component with branding, navigation links, and newsletter subscription.
 */

import React from 'react';
import { Coffee } from 'lucide-react';
import { ActiveTab } from '../../../shared/types';

interface FooterWidgetProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FooterWidget: React.FC<FooterWidgetProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#1F140E] text-[#FAF6F0] border-t border-[#4A2E22] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-white">
            <Coffee className="w-5 h-5 text-[#D4A373]" /> Café Punto Medio
          </div>
          <p className="text-[#E6DAC8] font-light leading-relaxed">
            Conectando el alma del suelo mexicano con el corazón de tu ritual matutino. Granos de origen único y tueste artesanal.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-serif font-bold text-white uppercase tracking-wider text-[11px]">TIENDA</h4>
          <ul className="space-y-1 text-[#E6DAC8]">
            <li><button onClick={() => { setActiveTab('shop'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Grano Entero</button></li>
            <li><button onClick={() => { setActiveTab('shop'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Café Molido</button></li>
            <li><button onClick={() => { setActiveTab('shop'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Mayoreo</button></li>
            <li><button onClick={() => { setActiveTab('shop'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Sets de Regalo</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-serif font-bold text-white uppercase tracking-wider text-[11px]">COMPAÑÍA</h4>
          <ul className="space-y-1 text-[#E6DAC8]">
            <li><button onClick={() => { setActiveTab('story_process'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Nuestra Historia</button></li>
            <li><button onClick={() => { setActiveTab('story_process'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Proceso Técnico</button></li>
            <li><button onClick={() => { setActiveTab('contact'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Contacto</button></li>
            <li><button onClick={() => { setActiveTab('backoffice'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Portal Administrativo</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-serif font-bold text-white uppercase tracking-wider text-[11px]">CÍRCULO DE CAFÉ</h4>
          <p className="text-[#E6DAC8]">Únete a nuestra lista para ofertas exclusivas de microlotes.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("¡Gracias por suscribirte al Círculo de Café!"); }} className="flex gap-2 pt-1">
            <input 
              type="email" 
              required
              placeholder="correo@ejemplo.com" 
              className="bg-[#2E1C14] border border-[#4A2E22] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none flex-1"
            />
            <button type="submit" className="px-3 py-1.5 bg-[#B87D4B] text-white rounded-lg font-bold hover:bg-[#D4A373] transition-colors">Unirme</button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-[#4A2E22] text-center text-[11px] text-[#D4A373]">
        © 2026 Café Punto Medio. Creado con pasión por el café de especialidad mexicano.
      </div>
    </footer>
  );
};
