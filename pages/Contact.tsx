import React, { useState } from 'react';
import { Send, MapPin, Instagram, Youtube, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'geral', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `*Contato via Site God Provider* \n\n*Nome:* ${formData.name}\n*Email:* ${formData.email}\n*Assunto:* ${formData.subject}\n*Mensagem:* ${formData.message}`;

    // Using the same number as the Mission page
    const whatsappUrl = `https://wa.me/5562999999999?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-black min-h-screen text-white pt-36 pb-20">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Fale Conosco</h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
              Estamos aqui para servir você. Entre em contato conosco ou visite nossa igreja presencialmente.
            </p>

            <div className="space-y-10">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full shrink-0 text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg mb-2">Unidade Sede</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Av. T-14, 835 – St. Bela Vista<br />
                    Goiânia - GO
                  </p>
                </div>
              </div>

              {/* Service Times */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full shrink-0 text-white">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg mb-2">Nossos Cultos</h3>
                  <div className="text-zinc-400 text-lg space-y-1">
                    <p><span className="text-white font-bold">Domingo:</span> 10h e 19h</p>
                    <p><span className="text-white font-bold">Sábado (Impulse):</span> 19h30</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-4">
                <h3 className="font-bold uppercase text-lg mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/godproviderchurch/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://www.youtube.com/@GodProviderChurch"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  >
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-zinc-900 p-8 md:p-12 rounded-lg border border-zinc-800">
            <h2 className="text-2xl font-black uppercase mb-6">Envie uma Mensagem</h2>
            <p className="text-zinc-400 mb-8">
              Preencha o formulário abaixo para iniciar uma conversa diretamente pelo WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Assunto</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                >
                  <option value="geral">Informações Gerais</option>
                  <option value="oracao">Pedido de Oração</option>
                  <option value="voluntariado">Voluntariado</option>
                  <option value="midia">Imprensa/Mídia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Mensagem</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#25D366] text-white font-bold uppercase py-4 tracking-widest hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                Enviar no WhatsApp <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
