import React from 'react';
import { Globe, Heart, HandHelping, ArrowRight, Plane, Cross } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Missions: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) return <div className="bg-black min-h-screen text-white pt-36 text-center">Carregando...</div>;

  const data = content?.missions_page || {};
  const header = data.header || {};
  const stats = data.stats || {};
  const philosophy = data.philosophy || {};
  const projects = data.projects || [];

  return (
    <div className="bg-black min-h-screen text-white pt-36 pb-20">

      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <div className="inline-block border border-white px-4 py-1 mb-6 rounded-full">
          <span className="text-xs font-bold uppercase tracking-[0.2em]">{header.subtitle}</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-none">
          {header.title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          {header.description}
          <br />
          <span className="text-sm text-zinc-600 font-bold uppercase tracking-widest mt-2 block">{header.verse}</span>
        </p>
      </div>

      {/* World Map / Stats Section */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://picsum.photos/seed/missmap/1920/1080?grayscale&blur=2" alt="World Map" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border-r border-zinc-800 last:border-r-0">
              <span className="block text-5xl md:text-6xl font-black text-white mb-2">{stats.countries}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Países Alcançados</span>
            </div>
            <div className="p-6 border-r border-zinc-800 last:border-r-0">
              <span className="block text-5xl md:text-6xl font-black text-white mb-2">{stats.missionaries}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Missionários</span>
            </div>
            <div className="p-6 border-r border-zinc-800 last:border-r-0">
              <span className="block text-5xl md:text-6xl font-black text-white mb-2">{stats.impact}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Vidas/Mês</span>
            </div>
            <div className="p-6">
              <span className="block text-5xl md:text-6xl font-black text-white mb-2">{stats.bases}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Bases</span>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="py-24 bg-black">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase mb-6 leading-tight">
              {philosophy.title}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              {philosophy.description}
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-white font-bold uppercase text-sm">
                <Globe size={18} /> Transcultural
              </div>
              <div className="flex items-center gap-2 text-white font-bold uppercase text-sm">
                <Heart size={18} /> Humanitário
              </div>
            </div>
          </div>
          <div className="h-[500px] bg-zinc-900 relative rounded-lg overflow-hidden">
            <img src={philosophy.image || "https://picsum.photos/seed/missphilo/800/1000"} className="w-full h-full object-cover" alt="Missionary Field" />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="bg-white text-black py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black uppercase mb-16 text-center">Nossos Campos</h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {projects.map((project: any, idx: number) => (
              <div key={idx} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 h-64 relative bg-zinc-100 rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold uppercase px-3 py-1">
                    {project.focus}
                  </div>
                </div>
                <h3 className="text-3xl font-black uppercase mb-3 flex items-center gap-2 group-hover:text-zinc-600 transition-colors">
                  {project.title} <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to get involved */}
      <div className="py-24 bg-black">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black uppercase">Envolva-se</h2>
          <p className="text-zinc-400 mt-4">Existem três formas principais de fazer missões.</p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* Pray */}
          <div className="bg-zinc-900 p-10 border border-zinc-800 hover:border-white transition-all group rounded-lg">
            <Cross className="w-12 h-12 text-zinc-500 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-2xl font-black uppercase mb-4">Orar</h3>
            <p className="text-zinc-400 mb-8">
              Interceda pelos missionários, pelos povos não alcançados e pelos recursos necessários para a obra.
            </p>
            <button className="text-sm font-bold uppercase border-b border-zinc-600 pb-1 text-zinc-400 group-hover:text-white group-hover:border-white transition-all">
              Receber Motivos
            </button>
          </div>

          {/* Give */}
          <div className="bg-zinc-900 p-10 border border-zinc-800 hover:border-white transition-all group rounded-lg">
            <HandHelping className="w-12 h-12 text-zinc-500 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-2xl font-black uppercase mb-4">Contribuir</h3>
            <p className="text-zinc-400 mb-8">
              Financie projetos, envie missionários e sustente bases ao redor do mundo. Sua generosidade salva vidas.
            </p>
            <a href="/give" className="text-sm font-bold uppercase border-b border-zinc-600 pb-1 text-zinc-400 group-hover:text-white group-hover:border-white transition-all">
              Doar para Missões
            </a>
          </div>

          {/* Go */}
          <div className="bg-zinc-900 p-10 border border-zinc-800 hover:border-white transition-all group rounded-lg">
            <Plane className="w-12 h-12 text-zinc-500 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-2xl font-black uppercase mb-4">Ir</h3>
            <p className="text-zinc-400 mb-8">
              Participe de viagens missionárias de curto ou longo prazo. Disponibilize seus talentos para o campo.
            </p>
            <a href="/contact" className="text-sm font-bold uppercase border-b border-zinc-600 pb-1 text-zinc-400 group-hover:text-white group-hover:border-white transition-all">
              Inscrever-se
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
