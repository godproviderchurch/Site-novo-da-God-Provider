import React from 'react';
import { Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const DomingoService: React.FC = () => {
    const { content, loading } = useContent();

    if (loading) return <div className="bg-black min-h-screen text-white pt-36 text-center">Carregando...</div>;

    const data = content?.sunday_service_page || {};
    const header = data.header || {};

    return (
        <div className="bg-black min-h-screen text-white pt-36 pb-20">
            <div className="container mx-auto px-6 text-center mb-20">
                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6">
                    {header.title}
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    {header.description}
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-zinc-900 p-10 border border-zinc-800 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="text-zinc-500" />
                            <h2 className="text-2xl font-black uppercase">Horários</h2>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <span className="text-zinc-400">1ª Sessão</span>
                                <span className="text-2xl font-bold">{data.session1}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <span className="text-zinc-400">2ª Sessão</span>
                                <span className="text-2xl font-bold">{data.session2}</span>
                            </div>
                        </div>
                        <p className="text-zinc-400 leading-relaxed">
                            São nossos cultos de celebração. Nesses encontros, criamos um ambiente familiar onde somos levados a expressar nossa adoração e entrega ao Senhor. Também é nesse lugar em que recebemos direção, exortação e encorajamento.
                        </p>
                    </div>

                    <div className="h-full min-h-[400px] bg-zinc-800 relative overflow-hidden group rounded-lg">
                        <img
                            src={data.hero_image || "https://picsum.photos/seed/sundayhero/800/1000"}
                            alt="Culto de Domingo"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
