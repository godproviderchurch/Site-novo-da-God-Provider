import React, { useRef, useState } from 'react';
import { Hero } from '../components/Hero';
import { ArrowRight, MapPin, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../src/context/ContentContext';

// Types
import { Event } from '../types';

const EVENTS: Event[] = [
  { id: '1', title: 'Conferência GP', date: '15-17 SET', category: 'Conferência' },
  { id: '2', title: 'Batismo', date: '24 SET', category: 'Celebração' },
  { id: '3', title: 'Vigília da Virada', date: '31 DEZ', category: 'Culto Especial' },
];

export const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { content, loading } = useContent();

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
  }

  // Fallback if content isn't loaded yet or format is wrong, though loading check handles most
  const homeData = content?.home || {};
  const ministries = homeData.ministriesSection?.list || [];
  const locations = homeData.locations?.items || [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = window.innerWidth >= 768 ? 424 : 324;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveSlide(index);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 424 : 324;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

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
            <div className="flex gap-4">
              <button onClick={() => scroll('left')} className="p-2 rounded-full border border-zinc-700 hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full border border-zinc-700 hover:bg-white hover:text-black transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ministries.map((min: any) => (
              <div key={min.id} className="min-w-[300px] md:min-w-[400px] snap-start group relative h-96 overflow-hidden cursor-pointer bg-zinc-900 rounded-lg shrink-0">
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

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {ministries.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 'majgfPFXoeU',
                title: "Desperta Minh'Alma (Awake My Soul) + Glória, Glória, Aleluia! - God Provider Church, Gabriel Aquino",
                date: 'há 6 horas',
                thumbnail: 'https://img.youtube.com/vi/majgfPFXoeU/maxresdefault.jpg',
                link: 'https://www.youtube.com/watch?v=majgfPFXoeU'
              },
              {
                id: 'XzfvRs_l-V4',
                title: 'Conferência It´s Time to Bloom // Marcadas Pelo sangue // Pra. Flávia teo',
                date: 'há 1 dia',
                thumbnail: 'https://img.youtube.com/vi/XzfvRs_l-V4/maxresdefault.jpg',
                link: 'https://www.youtube.com/watch?v=XzfvRs_l-V4'
              },
              {
                id: '0eJWJSZh7Zw',
                title: 'O poder da gratidão - Pr. Heber Teo',
                date: 'há 3 dias',
                thumbnail: 'https://img.youtube.com/vi/0eJWJSZh7Zw/maxresdefault.jpg',
                link: 'https://www.youtube.com/watch?v=0eJWJSZh7Zw'
              }
            ].map((video) => (
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
            {EVENTS.map((evt) => (
              <div key={evt.id} className="flex bg-zinc-900 p-6 hover:bg-zinc-800 transition-colors group rounded-lg border border-zinc-800 hover:border-zinc-700">
                <div className="pr-6 border-r border-zinc-700">
                  <span className="block text-3xl font-black text-white">{evt.date.split(' ')[0]}</span>
                  <span className="block text-sm font-bold text-zinc-500 uppercase">{evt.date.split(' ')[1]}</span>
                </div>
                <div className="pl-6 flex flex-col justify-center">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1 group-hover:text-white transition-colors">{evt.category}</span>
                  <h3 className="text-xl font-bold uppercase">{evt.title}</h3>
                </div>
              </div>
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