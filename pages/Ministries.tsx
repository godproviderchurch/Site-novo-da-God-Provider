import React from 'react';
import { useContent } from '../context/ContentContext';

export const Ministries: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
  }

  const ministriesData = content?.ministries || {};
  const ministriesList = ministriesData.list || [];

  return (
    <div className="bg-black min-h-screen text-white pt-36 pb-20">
      <div className="container mx-auto px-6 mb-20">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          {ministriesData.header?.title?.split(' ')[0]} <span className="text-zinc-500">{ministriesData.header?.title?.split(' ').slice(1).join(' ') || 'Atuação'}</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          {ministriesData.header?.description}
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid gap-12">
          {ministriesList.map((min: any, index: number) => (
            <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden group rounded-lg">
                  <img
                    src={min.image}
                    alt={min.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors pointer-events-none"></div>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">{min.subtitle}</span>
                <h2 className="text-4xl font-black uppercase">{min.title}</h2>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                  {min.description}
                </p>
                <a
                  href="#"
                  className="inline-block mt-4 text-white border-b border-white pb-1 font-bold uppercase text-sm hover:text-zinc-300 hover:border-zinc-300 transition-colors"
                >
                  Saiba Mais
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
