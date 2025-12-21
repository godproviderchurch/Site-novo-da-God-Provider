import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '../src/context/ContentContext';

export const Contact: React.FC = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'geral', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const data = content?.contact_page || {};
  const header = data.header || {};
  const info = data.info || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send email would go here
  };

  return (
    <div className="bg-black min-h-screen text-white pt-36 pb-20">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">{header.title}</h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
              {header.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg mb-1">Visite-nos</h3>
                  <p className="text-zinc-500 whitespace-pre-line">{info.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg mb-1">Email</h3>
                  <p className="text-zinc-500">{info.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg mb-1">Telefone</h3>
                  <p className="text-zinc-500">{info.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-zinc-900 p-8 md:p-12 rounded-lg border border-zinc-800">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Mensagem Enviada!</h3>
                <p className="text-zinc-400">Obrigado por entrar em contato. Responderemos em breve.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-bold uppercase underline hover:text-white text-zinc-500"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
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
                  className="w-full bg-white text-black font-bold uppercase py-4 tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  Enviar Mensagem <Send size={18} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};