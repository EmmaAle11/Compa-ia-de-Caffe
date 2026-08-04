/**
 * [FRONTEND - FSD LAYER: Page - Contact]
 * Direct contact and wholesale inquiry view with interactive form, fast WhatsApp link, and roaster note.
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HEADER */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs uppercase tracking-widest font-bold text-[#B87D4B]">
          CONEXIÓN Y ATENCIÓN DIRECTA
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1F140E]">
          Encuentra el punto medio con nosotros.
        </h1>
        <p className="text-sm text-[#724C3A] font-light leading-relaxed">
          Ya sea que seas un apasionado del café, un posible aliado de mayoreo o simplemente quieras conversar sobre nuestros granos: estamos aquí para escucharte y compartir nuestra travesía desde la tierra mexicana hasta tu taza.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* FORM (2 COLUMNS) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DAC8] shadow-sm space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1F140E]">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Gracias por escribirnos. Nuestro equipo de tostaduría te responderá en un lapso menor a 24 horas.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#1F140E] text-white text-xs font-semibold hover:bg-[#B87D4B] transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1F140E]">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none focus:border-[#B87D4B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1F140E]">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="hola@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none focus:border-[#B87D4B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1F140E]">Asunto</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none focus:border-[#B87D4B]"
                >
                  <option value="Consulta General">Consulta General</option>
                  <option value="Ventas al Mayoreo">Ventas al Mayoreo y Alianzas</option>
                  <option value="Estado de Pedido">Estado de Pedido</option>
                  <option value="Visita a Finca">Visita a Finca y Catas</option>
                  <option value="Feedback de Tueste">Retroalimentación de Tueste</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1F140E]">Tu Mensaje</label>
                <textarea
                  required
                  rows={5}
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DAC8] rounded-xl text-xs text-[#1F140E] focus:outline-none focus:border-[#B87D4B]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1F140E] hover:bg-[#B87D4B] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </button>
            </form>
          )}
        </div>

        {/* RIGHT SIDEBAR DETAILS */}
        <div className="space-y-6">
          
          {/* WhatsApp Card */}
          <div className="bg-[#1F140E] text-[#FAF6F0] p-6 rounded-3xl space-y-3 shadow-md border border-[#4A2E22]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D4A373]" />
              <h4 className="font-serif font-bold text-lg text-white">Conexión Rápida</h4>
            </div>
            <p className="text-xs text-[#E6DAC8] font-light leading-relaxed">
              Escríbenos directamente por WhatsApp para recibir atención inmediata durante nuestro horario laboral.
            </p>
            <a
              href="https://wa.me/525512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D4A373] hover:text-white pt-2 underline underline-offset-4"
            >
              Iniciar Chat →
            </a>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DAC8] space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#1F140E]">Detalles de Contacto</h4>

            <div className="space-y-3 text-xs text-[#724C3A]">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B87D4B]" />
                <span>hola@puntomedio.mx</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B87D4B]" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B87D4B] shrink-0 mt-0.5" />
                <span>Nuestra Finca, Cuetzalan del Progreso, Puebla, México</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6DAC8] text-xs">
              <span className="font-bold text-[#1F140E] block mb-1">Horario de Atención:</span>
              <span className="text-[#724C3A] block">Lun – Vie: 9:00 am – 6:00 pm</span>
              <span className="text-[#724C3A] block">Sáb: 10:00 am – 4:00 pm</span>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="rounded-3xl overflow-hidden border border-[#E6DAC8] bg-[#FAF6F0] relative flex flex-col shadow-sm">
            <div className="h-56 w-full relative bg-[#E6DAC8]">
              <iframe
                title="Mapa Cuetzalan del Progreso"
                src="https://maps.google.com/maps?q=Cuetzalan%20del%20Progreso,%20Puebla,%20Mexico&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full"
              />
            </div>
            <div className="p-4 bg-white border-t border-[#E6DAC8] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B87D4B] shrink-0" />
                <div className="text-left">
                  <span className="text-xs font-serif font-bold text-[#1F140E] block">Cuetzalan del Progreso</span>
                  <span className="text-[10px] text-[#724C3A]">Puebla, México</span>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Cuetzalan+del+Progreso,+Puebla"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#1F140E] hover:bg-[#B87D4B] text-white text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>Abrir en Maps</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ROASTER QUOTE */}
      <section className="bg-[#FAF6F0] p-8 sm:p-12 rounded-3xl border border-[#E6DAC8] text-center max-w-3xl mx-auto space-y-3">
        <span className="text-3xl text-[#B87D4B] font-serif block">“</span>
        <blockquote className="text-lg font-serif italic text-[#1F140E] leading-relaxed">
          "El café más fino es una conversación entre la tierra, el caficultor y tus sentidos. Esperamos iniciar ese diálogo contigo."
        </blockquote>
        <cite className="text-xs font-bold text-[#B87D4B] uppercase tracking-wider block not-italic">
          — Rodrigo, Tostador Principal
        </cite>
      </section>

    </div>
  );
};
