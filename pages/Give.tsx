import React from 'react';
import { Copy, Check, ArrowRight, Building, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export const Give: React.FC = () => {
  const { content } = useContent();
  const [copied, setCopied] = React.useState(false);

  const data = content?.give_page || {};
  const header = data.header || {};
  const bank = data.bank || {};
  const PIX_KEY = data.pix || "05.235.901/0001-86";

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white pt-36 pb-20">
      {/* Hero */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          {header.title || "Contribua"}
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {header.description}
        </p>
      </div>

      {/* Purpose */}
      <div className="container mx-auto px-6 mb-24">
        <div className="bg-zinc-900 p-10 rounded-xl border border-zinc-800 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black uppercase mb-6">O que construímos através da generosidade</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Através da generosidade e fidelidade podemos avançar o Reino através dos projetos que Deus tem nos entregado como Igreja através do Construindo Nossa História, empregar recursos na manutenção do Templo e nas despesas fixas mensais.
          </p>
        </div>
      </div>

      {/* Special Projects Links */}
      <div className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CNH */}
          <Link to="/give/cnh" className="group relative overflow-hidden rounded-xl h-80 flex items-end p-8 border border-zinc-800 hover:border-white transition-colors">
            <div className="absolute inset-0 bg-zinc-900">
              <img src="https://picsum.photos/800/600?random=90" alt="Building" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Building size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">Construindo Nossa História</h3>
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                O Construindo Nossa História visa financiar a expansão física e digital da nossa estrutura.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-bold uppercase text-sm tracking-widest group-hover:gap-4 transition-all">
                Saiba Mais <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          {/* Adopt a Student */}
          <Link to="/give/adopt-student" className="group relative overflow-hidden rounded-xl h-80 flex items-end p-8 border border-zinc-800 hover:border-white transition-colors">
            <div className="absolute inset-0 bg-zinc-900">
              <img src="https://picsum.photos/800/600?random=91" alt="Student" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">Adote um Aluno</h3>
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                Faça parte deste projeto que impacta crianças e famílias através da educação.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-bold uppercase text-sm tracking-widest group-hover:gap-4 transition-all">
                Saiba Mais <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Online Giving Methods */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-black uppercase mb-12 text-center">Formas de contribuir online!</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* PIX */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl flex flex-col items-center text-center hover:border-zinc-600 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-black font-black text-xs">PIX</span>
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Chave PIX</h3>
            <div className="w-full bg-black border border-zinc-700 p-3 rounded-lg flex items-center justify-between mb-2">
              <code className="text-zinc-300 font-mono text-sm truncate mr-2">{PIX_KEY}</code>
              <button onClick={handleCopy} className="text-zinc-400 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <p className="text-xs text-zinc-600">CNPJ 05.235.901/0001-86</p>
          </div>

          {/* Bank Transfer */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl flex flex-col items-center text-center hover:border-zinc-600 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-black font-black text-xs">TED</span>
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Transferência</h3>
            <div className="text-sm text-zinc-400 space-y-1">
              <p><strong className="text-white">{bank.bank}</strong></p>
              <p>Agência: <span className="text-white">{bank.agency}</span></p>
              <p>C/C: <span className="text-white">{bank.cc}</span></p>
              <p>Favorecido: God Provider Church</p>
            </div>
          </div>

          {/* Credit Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl flex flex-col items-center text-center hover:border-zinc-600 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-black font-black text-xs">CARD</span>
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Cartão de Crédito</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Faça sua doação única ou programe uma doação recorrente mensal.
            </p>
            <div className="flex flex-col gap-2 w-full">
              <button className="w-full bg-white text-black py-2 font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors">
                Doar Agora
              </button>
              <button className="w-full border border-zinc-700 text-white py-2 font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 transition-colors">
                Plano Mensal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
