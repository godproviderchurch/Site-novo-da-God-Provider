import React, { useEffect } from 'react';
import { Flame, Clock, Users, MessageCircle, ChevronRight, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrayerTower: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const whatsappLink = "https://api.whatsapp.com/send/?phone=556239960060&text=Ol%C3%A1%2C+quero+fazer+parte+da+Torre+de+Ora%C3%A7%C3%A3o.&type=phone_number&app_absent=0";
    const requestPrayerLink = "https://api.whatsapp.com/send/?phone=556239960060&text=Ol%C3%A1%2C+gostaria+de+fazer+um+pedido+de+ora%C3%A7%C3%A3o.&type=phone_number&app_absent=0";

    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-white selection:text-black">

            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/65 z-10"></div>
                    <img
                        src="/images/hero-torre.jpg"
                        alt="Torre de Oração"
                        className="w-full h-full object-cover object-top grayscale"
                    />
                </div>

                <div className="relative z-20 container mx-auto px-6 text-center pt-32">

                    <img
                        src="/images/logo-torre.png"
                        alt="Logo Torre de Oração"
                        className="w-20 md:w-32 mx-auto mb-12 opacity-90 drop-shadow-2xl animate-in fade-in zoom-in duration-1000 grayscale"
                    />

                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                        Torre God Provider<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Oração 24/7</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed mb-8">
                        "Dia e noite, sem cessar, até que seja na Terra como é no Céu, até que todos os Seus inimigos estejam debaixo dos Seus pés."
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                        <span className="bg-zinc-900/50 backdrop-blur border border-zinc-800 px-4 py-2 rounded-full">Lv 6:13</span>
                        <span className="bg-zinc-900/50 backdrop-blur border border-zinc-800 px-4 py-2 rounded-full">Mt 6:10</span>
                        <span className="bg-zinc-900/50 backdrop-blur border border-zinc-800 px-4 py-2 rounded-full">1Co 15:25</span>
                    </div>
                </div>
            </section>

            {/* 2. Intro Section - What is it? */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8 text-white">
                        <Flame size={32} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">O que é a Torre de Oração?</h2>
                    <p className="text-2xl text-zinc-400 font-medium leading-relaxed">
                        Existe um lugar onde a oração nunca para.<br />
                        <span className="text-white">24 horas por dia. 7 dias por semana.</span>
                    </p>
                </div>
            </section>

            {/* 3. Description Section - Continuous Altar */}
            <section className="py-24 px-6 bg-zinc-900 overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-white blur-[100px] opacity-10"></div>
                            <img
                                src="/images/torre-1.jpeg"
                                alt="Altar Contínuo"
                                className="relative z-10 rounded-xl shadow-2xl w-full object-cover aspect-[4/5] md:aspect-[3/4] grayscale"
                            />
                        </div>
                        <div className="order-1 md:order-2 space-y-8">
                            <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                                Um Altar <span className="text-zinc-500">Contínuo</span>
                            </h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Nossa torre de oração é um altar contínuo. Sempre há alguém clamando, adorando e intercedendo.
                            </p>
                            <div className="p-6 bg-zinc-950/50 border-l-4 border-white rounded-r-lg">
                                <p className="text-zinc-300">
                                    Todos os dias temos um <strong className="text-white">tema central</strong> que direciona as nossas orações e <strong className="text-white">subtemas</strong> pra cada hora de oração. Assim todos sabem por quais motivos orar e como orar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Participation Section - Who can pray? */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 text-white">
                                <Users size={24} />
                                <span className="font-bold uppercase tracking-widest">Participação</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                                Quem pode orar conosco?
                            </h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Os horários de liderança dos turnos são priorizados para quem já é membro ou está caminhando conosco há algum tempo com o propósito de se tornar membro.
                            </p>
                            <div className="space-y-6">
                                <p className="text-white text-xl font-bold">
                                    Mas todos são bem-vindos a vir em qualquer horário e orar conosco!
                                </p>
                                <p className="text-zinc-400">
                                    Basta preencher o formulário no link abaixo para agendar o seu horário.
                                </p>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wide rounded-lg transition-all transform hover:scale-105"
                                >
                                    Agendar horário <ChevronRight />
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-transparent border-2 border-zinc-800 rounded-xl transform rotate-3 translate-x-4 translate-y-4"></div>
                            <img
                                src="/images/torre-2.jpeg"
                                alt="Quem pode orar"
                                className="relative z-10 rounded-xl shadow-2xl w-full object-cover aspect-video md:aspect-square grayscale"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Prayer Requests Section */}
            <section className="py-24 px-6 bg-zinc-100 relative overflow-hidden text-black">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <MessageCircle size={48} className="mx-auto mb-6 text-black" />
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 text-black">Precisa de Oração?</h2>
                    <p className="text-xl text-zinc-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Você também pode fazer os seus pedidos de oração e um intercessor falará com você. Preencha o formulário no link e aguarde nosso contato.
                    </p>
                    <a
                        href={requestPrayerLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-xl"
                    >
                        Fazer Pedido de Oração
                    </a>
                </div>
            </section>
        </div >
    );
};
