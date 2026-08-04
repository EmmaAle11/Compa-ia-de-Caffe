/**
 * [FRONTEND - FSD LAYER: Page - Shop]
 * Coffee product catalog view with category, roast, region filtering, search, and sorting.
 */

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Coffee } from 'lucide-react';
import { CoffeeProduct } from '../../../shared/types';
import { COFFEE_PRODUCTS } from '../../../entities/product/model/mockProducts';

interface ShopPageProps {
  onSelectProduct: (product: CoffeeProduct) => void;
  onAddToCart: (product: CoffeeProduct) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.flavorNotes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesRoast = selectedRoast === 'all' || product.roastLevel.toLowerCase().includes(selectedRoast.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || product.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRoast && matchesRegion;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedRoast, selectedRegion, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. SHOP HEADER */}
      <div className="space-y-3 border-b border-[#E6DAC8] pb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-[#B87D4B]">
          CAFÉ PUNTO MEDIO
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#1F140E]">
          Colecciones de Café
        </h1>
        <p className="text-sm text-[#724C3A] max-w-2xl font-light leading-relaxed">
          Desde las altas montañas de Veracruz y Oaxaca hasta tu ritual matutino. Explora nuestra selección curada de café mexicano cultivado sustentablemente.
        </p>
      </div>

      {/* 2. MAIN LAYOUT WITH SIDEBAR & PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS */}
        <div className="lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-[#E6DAC8] h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-[#E6DAC8] pb-3">
            <h3 className="font-serif font-bold text-lg text-[#1F140E] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#B87D4B]" />
              Filtros
            </h3>
            {(selectedCategory !== 'all' || selectedRoast !== 'all' || selectedRegion !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRoast('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#B87D4B] hover:underline"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              CATEGORÍA
            </label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'Ver Todo' },
                { id: 'Whole Bean', label: 'Grano Entero' },
                { id: 'Ground Coffee', label: 'Café Molido' },
                { id: 'Wholesale Bags', label: 'Bolsas Mayoreo' },
                { id: 'Gift Sets', label: 'Kits de Regalo' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#1F140E] text-[#FAF6F0]'
                      : 'text-[#724C3A] hover:bg-[#F4ECE1]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Roast Level Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E6DAC8]">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              NIVEL DE TUESTE
            </label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'Todos los Tuestes' },
                { id: 'light', label: 'Tueste Claro (Light)' },
                { id: 'medium', label: 'Tueste Medio (Medium)' },
                { id: 'dark', label: 'Tueste Oscuro (Dark)' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoast(r.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedRoast === r.id
                      ? 'bg-[#1F140E] text-[#FAF6F0]'
                      : 'text-[#724C3A] hover:bg-[#F4ECE1]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E6DAC8]">
            <label className="text-xs uppercase tracking-wider font-bold text-[#1F140E] block">
              REGIÓN DE ORIGEN
            </label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'Todas las Regiones' },
                { id: 'Oaxaca', label: 'Oaxaca (Pluma Hidalgo)' },
                { id: 'Veracruz', label: 'Veracruz (Coatepec)' },
                { id: 'Chiapas', label: 'Chiapas (Jaltenango)' }
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedRegion === reg.id
                      ? 'bg-[#1F140E] text-[#FAF6F0]'
                      : 'text-[#724C3A] hover:bg-[#F4ECE1]'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCT GRID & TOOLBAR */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TOOLBAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E6DAC8]">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar nuestro tueste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F4ECE1]/50 border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none focus:border-[#B87D4B]"
              />
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs">
              <span className="text-gray-500">
                Mostrando <strong className="text-[#1F140E]">{filteredProducts.length}</strong> productos
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 whitespace-nowrap">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-[#F4ECE1]/60 border border-[#E6DAC8] rounded-xl px-3 py-2 text-xs text-[#1F140E] font-medium focus:outline-none"
                >
                  <option value="newest">Más Recientes</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>
          </div>

          {/* GRID */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E6DAC8] space-y-3">
              <Coffee className="w-10 h-10 text-[#B87D4B] mx-auto opacity-40" />
              <h3 className="font-serif font-bold text-lg text-[#1F140E]">No se encontraron tuestes</h3>
              <p className="text-xs text-gray-500">Intenta modificar los filtros o la búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E6DAC8] p-4 flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div>
                    <div 
                      onClick={() => onSelectProduct(product)}
                      className="relative h-52 rounded-xl overflow-hidden mb-4 cursor-pointer bg-[#F4ECE1]"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isBestSeller && (
                        <span className="absolute top-2 left-2 bg-[#1F140E] text-[#D4A373] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Más Vendido
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md text-[#1F140E] text-xs font-semibold px-2.5 py-1 rounded-md">
                        {product.weight}
                      </span>
                    </div>

                    <span className="text-[11px] text-[#B87D4B] font-semibold uppercase tracking-wider block mb-1">
                      {product.region} • {product.roastLevel}
                    </span>

                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-serif font-bold text-xl text-[#1F140E] cursor-pointer hover:text-[#B87D4B] transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#724C3A] line-clamp-2 mt-1 font-light">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {product.flavorNotes.map((note, idx) => (
                        <span key={idx} className="text-[10px] bg-[#F4ECE1] text-[#724C3A] px-2 py-0.5 rounded-full font-medium">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E6DAC8] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block">Precio unitario</span>
                      <span className="text-xl font-serif font-bold text-[#1F140E]">
                        ${product.price.toFixed(2)} USD
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3 py-2 rounded-full border border-[#E6DAC8] hover:bg-[#F4ECE1] text-xs text-[#1F140E] font-medium transition-colors"
                      >
                        Detalles
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-4 py-2 rounded-full bg-[#1F140E] hover:bg-[#B87D4B] text-white text-xs font-semibold transition-colors"
                      >
                        + Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
