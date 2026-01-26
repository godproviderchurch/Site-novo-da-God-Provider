import React from 'react';
import { useContent } from '../context/ContentContext';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { content } = useContent();
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        {content?.home?.hero?.backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            id="hero-video"
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src={content.home.hero.backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={content?.home?.hero?.backgroundImage || "https://picsum.photos/seed/hero/1920/1080"}
            alt="Worship Background"
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-zinc-300 mb-6 animate-pulse">
          Bem-vindo à God Provider Church
        </h2>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white">
          Cidadãos do <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Reino</span>
        </h1>
        <p className="max-w-xl mx-auto text-zinc-200 text-lg mb-10 leading-relaxed drop-shadow-lg">
          Faça parte daquilo que nós estamos construindo!
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a href="#locations" className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all w-full md:w-auto min-w-[200px]">
            Visite uma Unidade
          </a>
          <a href="#sermons" className="border border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all w-full md:w-auto min-w-[200px]">
            Assista Online
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};
