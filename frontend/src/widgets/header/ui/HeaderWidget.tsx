/**
 * [FRONTEND - FSD LAYER: Widget - Header]
 * Top navigation bar widget with desktop/mobile links, cart badge & AI Sommelier access.
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Coffee, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from '../../../shared/types';

interface HeaderWidgetProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const HeaderWidget: React.FC<HeaderWidgetProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'shop', label: 'Tienda' },
    { id: 'story_process', label: 'Origen & Proceso' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0] border-b border-[#E6DAC8] shadow-xs">
      {/* Announcement Bar */}
      <div className="bg-[#1F140E] text-[#FAF6F0] text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#D4A373] animate-pulse" />
        <span className="font-medium text-[#FAF6F0]">
          Café de Especialidad Mexicano — Envíos gratis en pedidos superiores a $50.00 USD
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1F140E] flex items-center justify-center text-[#D4A373] shadow-sm group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-[#1F140E] tracking-tight group-hover:text-[#B87D4B] transition-colors leading-none">
                Café Punto Medio
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-[#724C3A] font-semibold block mt-1">
                E-COMMERCE ARTESANAL
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Standard & Normalized */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1.5 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'text-[#1F140E] font-bold border-b-2 border-[#B87D4B]'
                    : 'text-[#724C3A] hover:text-[#1F140E]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Recommendation feature button */}
            <button
              onClick={() => setActiveTab('ai_sommelier')}
              className="hidden sm:flex items-center gap-2 bg-[#1F140E] hover:bg-[#2E1C14] text-[#FAF6F0] px-4 py-2 rounded-full text-xs font-semibold border border-[#4A2E22] transition-all shadow-xs group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373] group-hover:rotate-12 transition-transform" />
              <span>Descubre Tu Café Ideal</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#1F140E] hover:bg-[#2E1C14] text-[#FAF6F0] transition-transform active:scale-95 shadow-sm"
              aria-label="Ver Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B87D4B] text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF6F0]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1F140E] hover:bg-[#F4ECE1]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-b border-[#E6DAC8] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#1F140E] text-[#FAF6F0]'
                  : 'text-[#724C3A] hover:bg-[#F4ECE1]'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          ))}
          <button
            onClick={() => {
              setActiveTab('ai_sommelier');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-medium text-sm bg-[#1F140E] text-[#FAF6F0] flex items-center justify-between mt-2 border border-[#4A2E22]"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A373]" /> Descubre Tu Café Ideal
            </span>
            <ChevronRight className="w-4 h-4 text-[#D4A373]" />
          </button>
        </div>
      )}
    </header>
  );
};
