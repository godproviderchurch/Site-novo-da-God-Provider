import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Leadership: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) return <div className="min-h-screen bg-black text-white pt-36 pb-20 text-center">Carregando...</div>;

  const data = content?.leadership_page || {};
  const senior = data.senior || {};
  const team = data.team || [];
  const header = data.header || {};
  const quote = data.quote || {};

  return (
    <div className="bg-black min-h-screen text-white pt-36 pb-20">

      {/* Header */}
      <div className="container mx-auto px-6 mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          {header.title?.split(' ')[0]} <span className="text-zinc-500">{header.title?.split(' ').slice(1).join(' ') || 'Liderança'}</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {header.description}
        </p>
      </div>

      {/* Senior Couple Section */}
      <div className="container mx-auto px-6 mb-32">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-12 text-center border-b border-zinc-900 pb-4">
          Liderança Sênior
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="w-full lg:w-2/5">
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 group rounded-lg">
              <img
                src={senior.image}
                alt={senior.names}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-3/5 space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-2">
                {senior.names}
              </h3>
              <p className="text-zinc-500 font-bold uppercase text-sm tracking-widest border-l-2 border-white pl-4">
                {senior.roles}
              </p>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed">
              {senior.bio}
            </p>

            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-900">
              <a
                href={senior.instagram_heber || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white hover:text-zinc-400 transition-colors uppercase font-bold text-sm tracking-wide group"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Instagram size={16} />
                </div>
                @heberteo
              </a>
              <a
                href={senior.instagram_rayssa || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white hover:text-zinc-400 transition-colors uppercase font-bold text-sm tracking-wide group"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Instagram size={16} />
                </div>
                @rayssateo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Other Leaders */}
      <div className="bg-white text-black py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-16 text-center">
            Corpo Pastoral
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 justify-center">
            {team.map((pastor: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-zinc-100 group-hover:border-black transition-colors duration-300">
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-black uppercase mb-1">{pastor.name}</h3>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">{pastor.role}</p>
                <div className="flex gap-2">
                  {pastor.instagram && (
                    <a href={pastor.instagram} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                  {pastor.instagram_lucas && (
                    <a href={pastor.instagram_lucas} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                  {pastor.instagram_flavia && (
                    <a href={pastor.instagram_flavia} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                  {pastor.instagram_adarque && (
                    <a href={pastor.instagram_adarque} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="container mx-auto px-6 py-32 text-center">
        <blockquote className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-5xl font-black uppercase leading-tight text-zinc-300 mb-8">
            "{quote.text}"
          </p>
          <cite className="text-white font-bold not-italic tracking-widest uppercase text-sm">
            — {quote.author}
          </cite>
        </blockquote>
      </div>

    </div>
  );
};
