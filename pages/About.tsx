import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export const About: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
  }

  const aboutData = content?.about || {};

  return (
    <div className="bg-black min-h-screen text-white pt-36 pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-20">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          {aboutData.header?.title?.split(' ')[0]} <span className="text-zinc-500">{aboutData.header?.title?.split(' ').slice(1).join(' ') || 'NÓS'}</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed border-l-4 border-white pl-6">
          {aboutData.header?.description}
        </p>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[50vh] overflow-hidden mb-20 relative">
        <img
          src={aboutData.header?.heroImage}
          alt="Church Congregation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Vision */}
      <div className="container mx-auto px-6 mb-32">
        <div className="bg-zinc-900 p-12 border border-zinc-800 hover:border-white transition-colors max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4">{aboutData.dna?.title}</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">{aboutData.dna?.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Visão</h3>
              <p className="text-zinc-400 leading-relaxed">
                {aboutData.dna?.vision}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Missão</h3>
              <p className="text-zinc-400 leading-relaxed">
                {aboutData.dna?.mission}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black uppercase mb-8 text-center text-white">Nossos Valores</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {aboutData.dna?.values?.map((val: string, i: number) => (
                <span key={i} className="px-6 py-3 bg-black border border-zinc-800 text-sm font-bold uppercase tracking-wider hover:border-zinc-500 transition-colors cursor-default">
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-white text-black py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black uppercase mb-16 text-center">{aboutData.leadership?.title}</h2>

          <div className="grid gap-16 max-w-5xl mx-auto">
            {/* Find Senior Pastors */}
            {aboutData.leadership?.items?.filter((l: any) => l.id === 'senior').map((leader: any) => (
              <div key={leader.id} className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-[3/4] bg-zinc-200 overflow-hidden rounded-lg">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2 block">{leader.role}</span>
                  <h3 className="text-4xl font-black uppercase mb-6">{leader.name}</h3>
                  <div className="space-y-4 text-zinc-600 leading-relaxed">
                    {Array.isArray(leader.bio) ? leader.bio.map((p: string, idx: number) => (
                      <p key={idx}>{p}</p>
                    )) : <p>leader.bio</p>}
                  </div>
                </div>
              </div>
            ))}

            {/* Other Leaders Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-12 border-t border-zinc-200 pt-16">
              {aboutData.leadership?.items?.filter((l: any) => l.id !== 'senior').map((leader: any) => (
                <div key={leader.id} className="text-center group">
                  <div className="aspect-[3/4] bg-zinc-200 mb-6 overflow-hidden rounded-lg transition-all duration-500">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-black uppercase">{leader.name}</h3>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-white text-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 leading-tight max-w-4xl mx-auto">
            Faça parte daquilo que Deus está fazendo através da God Provider Church
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Link to="/contato" className="group p-8 border-2 border-black hover:bg-black hover:text-white transition-colors">
              <h3 className="text-xl font-black uppercase mb-2">Sou novo aqui</h3>
              <p className="text-zinc-600 group-hover:text-zinc-400 text-sm">Planeje sua primeira visita</p>
            </Link>

            <Link to="/unidades" className="group p-8 border-2 border-black hover:bg-black hover:text-white transition-colors">
              <h3 className="text-xl font-black uppercase mb-2">Localização</h3>
              <p className="text-zinc-600 group-hover:text-zinc-400 text-sm">Encontre uma unidade</p>
            </Link>

            <Link to="/contribua" className="group p-8 border-2 border-black hover:bg-black hover:text-white transition-colors">
              <h3 className="text-xl font-black uppercase mb-2">Quero contribuir</h3>
              <p className="text-zinc-600 group-hover:text-zinc-400 text-sm">Faça parte da história</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
