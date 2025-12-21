import React from 'react';
import { useContent } from '../src/context/ContentContext';

export const Unicas: React.FC = () => {
    const { content, loading } = useContent();

    if (loading) return <div className="bg-white min-h-screen text-black pt-36 text-center">Carregando...</div>;

    const data = content?.unicas_page || {};

    return (
        <div className="bg-white min-h-screen text-black pt-36 pb-20">
            <div className="container mx-auto px-6 text-center mb-20">
                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-black to-zinc-400">
                    {data.title || 'Únicas'}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-light">
                    {data.subtitle}
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 aspect-square bg-zinc-100 relative overflow-hidden group">
                        <img
                            src={data.image || "https://picsum.photos/seed/unicashero/800/800"}
                            alt="Únicas"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="order-1 md:order-2 bg-zinc-50 p-10 border border-zinc-200">
                        <h2 className="text-3xl font-black uppercase mb-2">Próximo Encontro</h2>
                        <p className="text-lg font-bold text-zinc-500 mb-6 uppercase tracking-wider">{data.next_meeting}</p>
                        <div className="h-1 w-20 bg-black mb-6"></div>
                        <p className="text-zinc-600 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
