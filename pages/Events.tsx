import React from 'react';
import { Calendar as CalendarIcon, MapPin, ArrowUpRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Events: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) return <div className="bg-white min-h-screen text-black pt-36 pb-20 text-center">Carregando...</div>;

  const data = content?.events_page || {};
  const header = data.header || {};
  const list = data.list || [];

  return (
    <div className="bg-white min-h-screen text-black pt-36 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
              {header.title}
            </h1>
            <p className="text-zinc-500 text-lg">{header.description}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-black font-bold uppercase hover:bg-black hover:text-white transition-all text-sm">
              Baixar Calendário PDF
            </button>
          </div>
        </div>

        <div className="border-t-2 border-black">
          {list.map((evt: any, idx: number) => (
            <a
              key={idx}
              href={evt.link || '#'}
              target="_blank"
              rel="noreferrer"
              className="group border-b border-zinc-200 py-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-zinc-50 transition-colors cursor-pointer"
            >

              <div className="flex items-start gap-4 md:w-32 shrink-0">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">{evt.month}</span>
                  <span className="text-4xl font-black">{evt.day}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-black text-white text-[10px] font-bold uppercase px-2 py-1">{evt.category}</span>
                  <span className="text-zinc-500 text-sm font-medium flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" /> {evt.time}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase mb-1 group-hover:text-zinc-700 transition-colors">{evt.title}</h3>
                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                  <MapPin size={16} />
                  {evt.location}
                </div>
              </div>

              <div className="md:w-32 flex justify-end">
                <button className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                  <ArrowUpRight size={20} />
                </button>
              </div>

            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
