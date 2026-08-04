/**
 * [FRONTEND - FSD LAYER: Widget - Cart Drawer]
 * Interactive slide-over shopping bag drawer with line items, quantity modifiers and checkout navigation.
 */

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, ActiveTab } from '../../../shared/types';

interface CartDrawerWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  totalAmount: number;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CartDrawerWidget: React.FC<CartDrawerWidgetProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  totalAmount,
  setActiveTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col justify-between border-l border-[#E6DAC8] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E6DAC8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B87D4B]" />
            <h2 className="font-serif font-bold text-xl text-[#1F140E]">Bolsa de Compras</h2>
            <span className="text-xs bg-[#F4ECE1] text-[#724C3A] font-bold px-2.5 py-0.5 rounded-full">
              {cart.reduce((acc, i) => acc + i.quantity, 0)} artículos
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-[#1F140E] hover:bg-[#F4ECE1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#B87D4B] mx-auto opacity-30" />
              <p className="text-sm font-serif font-bold text-[#1F140E]">Tu bolsa está vacía</p>
              <p className="text-xs text-[#724C3A]">Agrega tus tuestes favoritos desde el menú de la tienda.</p>
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('shop');
                }}
                className="px-6 py-2.5 rounded-full bg-[#1F140E] text-white text-xs font-semibold"
              >
                Ver Tienda
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.cartId} 
                className="bg-white p-4 rounded-2xl border border-[#E6DAC8] flex gap-4 items-center shadow-2xs"
              >
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-16 h-16 rounded-xl object-cover bg-[#F4ECE1]"
                />
                
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif font-bold text-sm text-[#1F140E] truncate">{item.product.name}</h4>
                  <span className="text-[11px] text-[#724C3A] block">{item.grind} • {item.product.weight}</span>
                  <span className="font-serif font-bold text-sm text-[#1F140E] block">${item.unitPrice.toFixed(2)} USD</span>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-[#E6DAC8] rounded-full bg-[#FAF6F0] px-1">
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, -1)}
                      className="w-6 h-6 text-xs font-bold text-[#1F140E]"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#1F140E]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, 1)}
                      className="w-6 h-6 text-xs font-bold text-[#1F140E]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E6DAC8] bg-white space-y-4 shadow-lg">
            <div className="space-y-1 text-xs text-[#724C3A]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#1F140E]">${totalAmount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span>Envío estimado:</span>
                <span className="font-bold text-emerald-600">{totalAmount > 50 ? 'GRATIS' : '$5.00 USD'}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#1F140E] pt-2 border-t border-[#E6DAC8]">
                <span>Total:</span>
                <span className="text-[#B87D4B]">${(totalAmount > 50 ? totalAmount : totalAmount + 5).toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setActiveTab('checkout');
              }}
              className="w-full py-3.5 rounded-full bg-[#1F140E] hover:bg-[#B87D4B] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceder al Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
