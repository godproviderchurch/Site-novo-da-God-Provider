import React from 'react';
import { MapPin } from 'lucide-react';
import { useContent } from '../src/context/ContentContext';

export const Locations: React.FC = () => {
  const { content, loading } = useContent();

  if (loading) return <div className="bg-zinc-50 min-h-screen text-black pt-36 pb-20 text-center">Carregando...</div>;

  const data = content?.locations_page || {};
  const header = data.header || {};
  const campuses = data.campuses || [];

  return (
    <div className="bg-zinc-50 min-h-screen text-black pt-36 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{header.title}</h1>
          <p className="text-xl text-zinc-600">
            {header.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {campuses.map((campus: any) => (
            <div key={campus.id} className="bg-white border border-zinc-200 group hover:border-black transition-colors duration-300 flex flex-col shadow-sm hover:shadow-xl">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={campus.image}
                  alt={campus.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black uppercase mb-4 leading-tight">{campus.name}</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="shrink-0 mt-1 text-zinc-400" size={20} />
                    <div>
                      <span className="text-zinc-800 font-medium text-lg block">{campus.address}</span>
                      {campus.times && campus.times.map((time: string, i: number) => (
                        <span key={i} className="text-zinc-500 text-sm block mt-1">{time}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-600 text-sm mt-4">{campus.details}</p>
                </div>

                <div className="mt-auto">
                  <a
                    href={campus.mapLink || `https://maps.google.com/?q=${campus.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center bg-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors"
                  >
                    Como Chegar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};