import React from 'react';
import { Hero } from '../components/Hero';
import { ArrowRight, MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

// Types
import { Event } from '../types';



export const Home: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
  }

  // Fallback if content isn't loaded yet or format is wrong, though loading check handles most
  const homeData = content?.home || {};
  const ministries = homeData.ministriesSection?.list || [];
  const locations = homeData.locations?.items || [];



  return (
    <>
      <Hero />

      {/* About Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-zinc-500 font-bold tracking-widest uppercase text-sm mb-4 block">{homeData.identity?.tagline || 'Nossa Identidade'}</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
              {homeData.identity?.title || 'Uma igreja para a cidade'}
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              {homeData.identity?.description || 'Conheça o nosso DNA...'}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider hover:gap-4 transition-all">
              {homeData.identity?.buttonText || 'Saiba mais'} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {homeData.identity?.images?.map((img: string, idx: number) => (
              <img key={idx} src={img} className={`w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-500 ${idx === 1 ? 'mt-8' : ''}`} alt={`About ${idx}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Carousel */}
      <section className="py-24 bg-zinc-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black uppercase mb-2">{homeData.ministriesSection?.title}</h2>
              <p className="text-zinc-500">
                {homeData.ministriesSection?.description}
              </p>
            </div>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="flex gap-6 w-max animate-infinite-scroll hover:[animation-play-state:paused] py-4">
              {[...ministries, ...ministries].map((min: any, idx: number) => (
                <div key={`${min.id}-${idx}`} className="min-w-[300px] md:min-w-[400px] group relative h-96 overflow-hidden cursor-pointer bg-zinc-900 rounded-lg shrink-0">
                  <img
                    src={min.image}
                    alt={min.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-black uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{min.title}</h3>
                    <p className="text-sm text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{min.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/ministries" className="text-zinc-500 hover:text-white text-sm uppercase font-bold transition-colors">Ver todos</Link>
          </div>
        </div>
      </section>

      {/* Locations / Cultos */}
      <section id="locations" className="py-24 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4">{homeData.locations?.title}</h2>
            <p className="text-zinc-600">Domingo, 10h00 e Domingo, 19h00</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {locations.map((loc: any) => (
              <div key={loc.id} className="border-l-2 border-black pl-6 py-2 hover:bg-zinc-50 transition-colors min-w-[280px]">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} />
                  <h3 className="text-xl font-bold uppercase">{loc.city}</h3>
                </div>
                <p className="text-zinc-600 text-sm mb-4">{loc.address}</p>
                <div className="flex gap-2 text-xs font-bold uppercase">
                  {loc.serviceTimes.map((time: string) => (
                    <span key={time} className="bg-black text-white px-2 py-1">{time}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media / Sermons */}
      <section id="sermons" className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-black uppercase">Últimas Mensagens</h2>
            <a href="https://www.youtube.com/@GodProviderChurch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase text-sm font-bold mt-4 md:mt-0">
              Canal do Youtube <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(homeData.latest_videos || []).map((video: any) => (
              <a key={video.id} href={video.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
                <div className="relative aspect-video bg-black mb-4 overflow-hidden rounded-lg">
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                    alt={video.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-white group-hover:text-black transition-all duration-300 backdrop-blur-sm bg-black/20">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold uppercase group-hover:text-zinc-300 transition-colors line-clamp-2">{video.title}</h3>
                <p className="text-zinc-500 text-sm mt-2">{video.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black uppercase mb-12 text-center">Agenda</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {(content?.events_page?.list || []).slice(0, 3).map((evt: any, idx: number) => (
              <a
                key={idx}
                href={evt.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex bg-zinc-900 p-6 hover:bg-zinc-800 transition-colors group rounded-lg border border-zinc-800 hover:border-zinc-700 cursor-pointer"
              >
                <div className="pr-6 border-r border-zinc-700">
                  <span className="block text-3xl font-black text-white">{evt.day}</span>
                  <span className="block text-sm font-bold text-zinc-500 uppercase">{evt.month}</span>
                </div>
                <div className="pl-6 flex flex-col justify-center">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1 group-hover:text-white transition-colors">{evt.category}</span>
                  <h3 className="text-xl font-bold uppercase">{evt.title}</h3>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/events" className="inline-block border border-zinc-700 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all">
              Ver Agenda Completa
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Giving */}
      <section className="py-32 bg-white text-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tighter">{homeData.cta?.title}</h2>
          <p className="max-w-2xl mx-auto text-zinc-600 text-lg mb-10">
            {homeData.cta?.description}
          </p>
          <Link to="/give" className="bg-black text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
            {homeData.cta?.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
};
