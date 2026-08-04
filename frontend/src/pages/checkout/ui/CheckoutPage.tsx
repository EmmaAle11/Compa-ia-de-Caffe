/**
 * [FRONTEND - FSD LAYER: Page - Checkout]
 * Full e-commerce checkout page with address details, promo discount, shipping calculator, and payment gateway in Spanish.
 */

import React, { useState } from 'react';
import { 
  Lock, 
  Truck, 
  X, 
  Plus, 
  Minus, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Leaf, 
  ChevronDown, 
  Tag 
} from 'lucide-react';
import { CartItem, ActiveTab } from '../../../shared/types';

interface CheckoutPageProps {
  cart: CartItem[];
  totalAmount: number;
  onClearCart: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  onClearCart,
  setActiveTab
}) => {
  const [completed, setCompleted] = useState(false);
  const [promoCode, setPromoCode] = useState('PUNTOMEDIO10');
  const [discountApplied, setDiscountApplied] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [showShippingCalc, setShowShippingCalc] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('México');
  const [zipCodeCalc, setZipCodeCalc] = useState('06700');

  // Form Fields State
  const [fullName, setFullName] = useState('Elena Rodríguez');
  const [email, setEmail] = useState('elena.rod@example.com');
  const [streetAddress, setStreetAddress] = useState('Calle de la Reforma 123');
  const [city, setCity] = useState('Ciudad de México');
  const [postalCode, setPostalCode] = useState('06700');

  // Display cart items fallback matching Page 4 mockup
  const displayCart = 
    cart.length > 0 
      ? cart.map(item => ({
          id: item.cartId,
          name: item.product.name,
          variant: `${item.grind} • ${item.product.weight || '340g'}`,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        }))
      : [
          {
            id: 'item-1',
            name: 'Oaxaca Reserva',
            variant: 'Grano Entero • 500g',
            price: 28.00,
            quantity: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaSAPmWRtmklEUwB1vmgZ0iTSwJSy2SxMeVaWpXOPZ5FmavYCKOJMTH9uIACUbYWbaIP3FEz08cFyx5mC7jmjp1GZavlUAh-DIrXdRQ3GXoF7xsQaynFIRhsGrBBO_asfN7Ct6x8XRfD65crRUuXArwAfzK1kdE-EdaPMfiB0xXrVzxQapMJf69_XmlzJqr-zBBx_saeLKp-pQKQnNtra3h4uHrZ2s16jluUj3PGqWgG7OaLV1-rzE'
          },
          {
            id: 'item-2',
            name: 'Kit de Inicio V60 Cerámico',
            variant: 'Acabado en Arenisca',
            price: 45.00,
            quantity: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsMHXC2y_q6kheZ1ARXM7xYWFiX74BOwGH6V3Lal2DHDv1iJjuj-hceS_6Xr7MjxlrkgbZCEUznB7F6MvRkauKTVtiEbofnQ1CBp94HFvBRE1Et-UGYJFWouRG-WCeEUFTtZzMjOzvdrhZd3IzJDkQ90hJ3PPkesgWqbrobfFxky4rTOeg5M6EQnzKn16vyY84w6kFa7iNCZ9MVAFVdCFtgIS_umEA8iUMvIlp2SO4bVbSVzT52zPw'
          }
        ];

  const subtotal = displayCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 8.50;
  const estimatedTax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + shippingFee + estimatedTax);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PUNTOMEDIO10') {
      setDiscountApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
    onClearCart();
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold text-[#7d562d]">
          PEDIDO #CPM-5291 CONFIRMADO
        </span>
        <h1 className="font-serif text-4xl font-bold text-[#271310]">
          ¡Gracias por tu compra en Café Punto Medio!
        </h1>
        <p className="text-sm text-[#504442] leading-relaxed">
          Hemos recibido tu pedido. Tu café será tostado en lote pequeño y preparado especialmente para ti. Te enviaremos el número de guía a <strong>{email}</strong>.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('shop')}
            className="px-8 py-4 rounded-full bg-[#271310] hover:bg-[#7d562d] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] min-h-screen pt-4 pb-20 px-6 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[#d3c3c0]/40 pb-4">
        <button
          onClick={() => setActiveTab('shop')}
          className="flex items-center gap-2 text-xs font-bold text-[#7d562d] hover:text-[#271310] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la Tienda
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-[#7d562d] uppercase tracking-widest">
          <Lock className="w-4 h-4 text-[#7d562d]" />
          <span>Pago Seguro</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Cart & Shipping Form (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Cart Selection */}
          <section className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#271310]">
              Tu Selección
            </h1>
            <div className="space-y-3">
              {displayCart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-4 bg-[#f5f3ef] rounded-2xl border border-[#e4e2de] items-center justify-between group"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#e4e2de]">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between h-full pl-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#271310]">{item.name}</h3>
                        <p className="text-xs text-[#504442]">{item.variant}</p>
                      </div>
                      <button className="text-[#504442] hover:text-red-600 transition-colors p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-[#d3c3c0] rounded-full px-2 py-0.5 bg-white">
                        <button className="w-6 h-6 flex items-center justify-center text-[#271310] hover:text-[#7d562d] font-bold text-xs">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#271310]">
                          {item.quantity}
                        </span>
                        <button className="w-6 h-6 flex items-center justify-center text-[#271310] hover:text-[#7d562d] font-bold text-xs">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-serif font-bold text-base text-[#271310]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Details & Payment Form */}
          <section className="space-y-8 pt-6 border-t border-[#d3c3c0]/40">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              
              {/* Shipping Info Section */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#271310]">
                  Información de Envío
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-2 text-sm text-[#1b1c1a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan@ejemplo.com"
                      className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-2 text-sm text-[#1b1c1a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                      Dirección de Calle
                    </label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Calle de la Reforma 123"
                      className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-2 text-sm text-[#1b1c1a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad de México"
                      className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-2 text-sm text-[#1b1c1a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="06700"
                      className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-2 text-sm text-[#1b1c1a] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="space-y-4 pt-4">
                <h2 className="font-serif text-2xl font-bold text-[#271310]">
                  Método de Pago
                </h2>

                <div className="space-y-3">
                  <label 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-[#271310] bg-[#271310]/5 shadow-xs' 
                        : 'border-[#d3c3c0]/60 hover:border-[#7d562d]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#271310] bg-[#271310]' : 'border-[#d3c3c0]'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-bold text-[#271310]">Tarjeta de Crédito o Débito</span>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#271310]" />
                  </label>

                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-[#f5f3ef] rounded-2xl space-y-4 border border-[#e4e2de]">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                          Número de Tarjeta
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="•••• •••• •••• 4242"
                          className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-1.5 text-sm text-[#1b1c1a] focus:outline-none font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                            Expiración
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue="MM/AA"
                            className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-1.5 text-sm text-[#1b1c1a] focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-[#504442] uppercase tracking-wider">
                            Código CVC
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue="123"
                            className="border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-1.5 text-sm text-[#1b1c1a] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <label 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === 'paypal' 
                        ? 'border-[#271310] bg-[#271310]/5 shadow-xs' 
                        : 'border-[#d3c3c0]/60 hover:border-[#7d562d]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'paypal' ? 'border-[#271310] bg-[#271310]' : 'border-[#d3c3c0]'
                      }`}>
                        {paymentMethod === 'paypal' && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-bold text-[#504442]">PayPal / Checkout Rápido</span>
                    </div>
                    <Wallet className="w-5 h-5 text-[#504442]" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#271310] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#7d562d] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#ffca98]" />
                <span>Realizar Pedido • ${total.toFixed(2)} USD</span>
              </button>
            </form>
          </section>

        </div>

        {/* Right Column: Unified Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-[#f5f3ef] p-6 sm:p-8 rounded-3xl border border-[#e4e2de] shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#271310]">
                Resumen del Pedido
              </h2>

              <div className="space-y-4">
                {/* Shipping Estimator Collapsible */}
                <div className="pb-3 border-b border-[#d3c3c0]/40">
                  <button 
                    type="button"
                    onClick={() => setShowShippingCalc(!showShippingCalc)}
                    className="flex items-center justify-between w-full text-xs font-bold text-[#7d562d] uppercase tracking-wider group"
                  >
                    <span>Calcular Envío</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showShippingCalc ? 'rotate-180' : ''}`} />
                  </button>

                  {showShippingCalc && (
                    <div className="mt-3 space-y-3 pt-2">
                      <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full border-b-2 border-[#d3c3c0] bg-transparent py-1.5 text-xs text-[#1b1c1a] focus:outline-none"
                      >
                        <option value="México">México</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Canadá">Canadá</option>
                      </select>
                      <input 
                        type="text"
                        value={zipCodeCalc}
                        onChange={(e) => setZipCodeCalc(e.target.value)}
                        placeholder="Código Postal"
                        className="w-full border-b-2 border-[#d3c3c0] bg-transparent py-1.5 text-xs text-[#1b1c1a] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="pb-3 border-b border-[#d3c3c0]/40">
                  <label className="text-[11px] font-bold text-[#504442] uppercase tracking-wider block mb-1">
                    Código Promocional
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="PUNTOMEDIO10"
                      className="flex-1 border-b-2 border-[#d3c3c0] focus:border-[#7d562d] bg-transparent py-1 text-xs uppercase font-mono text-[#271310] focus:outline-none"
                    />
                    <button 
                      type="button"
                      onClick={handleApplyPromo}
                      className="text-xs font-bold text-[#271310] hover:text-[#7d562d] transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {discountApplied && (
                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1.5">
                      <Tag className="w-3 h-3" />
                      <span>10% de descuento aplicado (PUNTOMEDIO10)</span>
                    </div>
                  )}
                </div>

                {/* Calculations Breakdown */}
                <div className="space-y-2 pt-2 text-xs text-[#504442]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#271310]">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Descuento Promocional</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="font-bold text-[#271310]">
                      {shippingFee === 0 ? 'GRATIS' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Impuestos Estimados</span>
                    <span className="font-bold text-[#271310]">${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-serif font-bold pt-4 border-t border-[#d3c3c0]/40 text-[#271310]">
                    <span>Total</span>
                    <span className="text-xl text-[#271310]">${total.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Encrypted Notice */}
                <div className="pt-2 text-center text-xs text-[#504442]/80 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#7d562d]" />
                  <span>Pagos Encriptados y 100% Seguros</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-8 py-2 text-[#7d562d]/70">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <ShieldCheck className="w-5 h-5 text-[#7d562d]" />
                <span>Garantía</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Truck className="w-5 h-5 text-[#7d562d]" />
                <span>Envío Rápido</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Leaf className="w-5 h-5 text-[#7d562d]" />
                <span>Orgánico</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
