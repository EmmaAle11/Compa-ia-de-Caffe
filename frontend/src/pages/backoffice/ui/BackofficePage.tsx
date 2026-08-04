/**
 * [FRONTEND - FSD LAYER: Page - Backoffice]
 * Administrative management portal for Café Punto Medio (Spanish).
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ExternalLink
} from 'lucide-react';
import { BACKOFFICE_ORDERS } from '../../../entities/order';
import { OrderRecord, ActiveTab } from '../../../shared/types';

interface BackofficePageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const BackofficePage: React.FC<BackofficePageProps> = ({ setActiveTab }) => {
  const [orders] = useState<OrderRecord[]>(BACKOFFICE_ORDERS);

  return (
    <div className="bg-[#FAF6F0] min-h-screen">
      
      {/* Subdomain Notice Banner */}
      <div className="bg-[#2E1C14] text-[#D4A373] text-[11px] py-1.5 px-6 flex items-center justify-between border-b border-[#4A2E22]">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SUBDOMINIO: <strong className="text-white">admin.puntomedio.mx</strong> (Portal Privado de Administración)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-[#E6DAC8]">
          <span>Dominio Público: <strong>puntomedio.mx</strong></span>
          <span>Entorno: <strong>Producción SSL</strong></span>
        </div>
      </div>

      {/* Backoffice Header Bar */}
      <div className="bg-[#1F140E] text-[#FAF6F0] px-6 py-4 flex items-center justify-between border-b border-[#4A2E22]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#B87D4B] flex items-center justify-center font-bold text-white text-xs">
            CPM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-base text-white">Café Punto Medio</h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#B87D4B]/30 text-[#D4A373] border border-[#B87D4B]/40 font-mono">admin.puntomedio.mx</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4A373]">PORTAL DE ADMINISTRACIÓN</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('shop')}
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] border border-white/20 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ver Tienda en Vivo</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] shadow-xs space-y-1">
            <span className="text-xs text-gray-500 font-medium block">Pedidos de Hoy</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-[#1F140E]">42</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] shadow-xs space-y-1">
            <span className="text-xs text-gray-500 font-medium block">Ingresos Totales</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-[#1F140E]">$2,450 USD</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+25%</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] shadow-xs space-y-1">
            <span className="text-xs text-gray-500 font-medium block">Alertas de Inventario</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-[#1F140E]">3</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Stock Bajo</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] shadow-xs space-y-1">
            <span className="text-xs text-gray-500 font-medium block">Tasa de Conversión</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-[#1F140E]">4.8%</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+1.2%</span>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* RECENT ORDERS TABLE (2 COLUMNS) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E6DAC8] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E6DAC8] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1F140E]">Pedidos Recientes</h3>
              <span className="text-xs font-semibold text-[#B87D4B] cursor-pointer hover:underline">Ver Todos →</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6DAC8] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">ID Pedido</th>
                    <th className="py-2.5 px-3">Cliente</th>
                    <th className="py-2.5 px-3">Producto</th>
                    <th className="py-2.5 px-3">Monto</th>
                    <th className="py-2.5 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4ECE1]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                      <td className="py-3 px-3 font-serif font-bold text-[#1F140E]">{order.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#1F140E] block">{order.customerName}</span>
                        <span className="text-[10px] text-gray-400 block">{order.customerEmail}</span>
                      </td>
                      <td className="py-3 px-3 text-[#724C3A]">
                        {order.items[0]?.productName}
                      </td>
                      <td className="py-3 px-3 font-serif font-bold text-[#1F140E]">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Entregado' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'En Proceso'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LOW STOCK & BACKOFFICE NOTES (1 COLUMN) */}
          <div className="space-y-6">
            
            {/* Low Stock Alerts */}
            <div className="bg-white rounded-3xl border border-[#E6DAC8] p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#E6DAC8] pb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif font-bold text-lg text-[#1F140E]">Alertas de Stock Bajo</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E6DAC8]">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#1F140E]">Oaxaca Gold 1kg</h4>
                    <span className="text-[10px] text-red-600 font-semibold">Solo quedan 2 bolsas</span>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#1F140E] text-white text-[10px] font-semibold">
                    Reabastecer
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E6DAC8]">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#1F140E]">Filtros de Papel V60</h4>
                    <span className="text-[10px] text-red-600 font-semibold">Solo quedan 5 paquetes</span>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#1F140E] text-white text-[10px] font-semibold">
                    Reabastecer
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E6DAC8]">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#1F140E]">Molino Manual Pro</h4>
                    <span className="text-[10px] text-amber-600 font-semibold">1 unidad restante</span>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#1F140E] text-white text-[10px] font-semibold">
                    Reabastecer
                  </button>
                </div>
              </div>
            </div>

            {/* Backoffice Note */}
            <div className="bg-[#1F140E] text-[#FAF6F0] p-6 rounded-3xl border border-[#4A2E22] space-y-2">
              <h4 className="font-serif font-bold text-base text-[#D4A373]">Nota de Administración</h4>
              <p className="text-xs text-[#E6DAC8] font-light leading-relaxed">
                El reabastecimiento semanal de la cooperativa de Veracruz llega mañana a las 10:00 AM. Por favor aseguren el espacio en bodega.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
