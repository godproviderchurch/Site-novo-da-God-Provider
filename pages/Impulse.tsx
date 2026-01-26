import React from 'react';
import { useContent } from '../context/ContentContext';

export const Impulse: React.FC = () => {
    const { content, loading } = useContent();

    if (loading) return <div className="bg-black min-h-screen text-white pt-36 text-center">Carregando...</div>;

    const data = content?.impulse_page || {};

    return (
        <div className="bg-black min-h-screen text-white pt-36 pb-20">
            <div className="container mx-auto px-6 text-center mb-20">
                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800">
                    {data.title || 'Impulse'}
                </h1>
                <p className="text-2xl text-zinc-400 uppercase tracking-widest font-bold">
                    {data.subtitle || 'Seja impulsionado'}
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-zinc-900 p-10 border border-zinc-800">
                        <h2 className="text-3xl font-black uppercase mb-6">{data.schedule}</h2>
                        <div className="h-1 w-20 bg-white mb-6"></div>
                        <p className="text-zinc-400 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                    <div className="w-full h-[60vh] overflow-hidden mb-20 relative rounded-lg">
                        <img
                            src={data.image || "https://picsum.photos/seed/impulsehero/800/800"}
                            alt="Impulse Ministry"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
