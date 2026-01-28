import React, { useEffect } from 'react';
import { Play, Calendar, MapPin, CheckCircle, ArrowRight, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const School: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const subjects = [
        { title: "Identidade e Propósito", desc: "Foco no entendimento do \"eu\" em Deus e seu impacto nas relações interpessoais." },
        { title: "Oração", desc: "Transição de uma agenda obrigatória para uma conexão real com a atmosfera celestial." },
        { title: "Alianças Espirituais", desc: "Ensino sobre reconhecimento e desconexão de pactos malignos para plenitude divina." },
        { title: "Altares", desc: "Importância e estabelecimento de altares em ambientes cotidianos (casa, trabalho, etc)." },
        { title: "Adoração e Tabernáculo", desc: "A adoração como estilo de vida baseada no modelo celestial." },
        { title: "Sistema de Crenças", desc: "Construção de uma mentalidade alicerçada na verdade bíblica." },
        { title: "Frutos e Dons", desc: "Desenvolvimento do fruto do Espírito e ativação de dons para serviço cristão." }
    ];

    const testimonials = [
        { name: "Pr. Carlos", text: "A escola foi o degrau necessário para um novo nível em Deus." },
        { name: "Sabrina", text: "Fui surpreendida ao aprender a mover-me além da razão humana." },
        { name: "Gabriel", text: "A resposta às minhas orações por ensino prático de dons espirituais." }
    ];

    return (
        <div className="min-h-screen text-white pt-24 pb-20 font-sans selection:bg-white selection:text-black relative">

            {/* Fixed Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-black"></div>
                <div className="absolute inset-0 bg-[url('/images/min-escolas.jpg')] bg-cover bg-center grayscale opacity-20"></div>
            </div>

            <div className="relative z-10">

                {/* Hero Section */}
                <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6">

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <span className="inline-block py-2 px-4 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-sm font-bold uppercase tracking-widest mb-4">
                            Turma 2026
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-anton uppercase leading-none tracking-tight mb-6">
                            Escola<br /><span className="text-zinc-500">Sobrenatural</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
                            Uma jornada de profundidade, identidade e poder. Descubra quem você é em Cristo e acesse o extraordinário.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <a
                                href="https://linktr.ee/escolasobrenatural"
                                target="_blank"
                                rel="noreferrer"
                                className="px-8 py-4 bg-white text-black font-anton uppercase text-xl tracking-wide hover:bg-zinc-200 transition-colors w-full sm:w-auto"
                            >
                                Aplicar Agora
                            </a>
                            <a
                                href="https://linktr.ee/escolasobrenatural"
                                target="_blank"
                                rel="noreferrer"
                                className="px-8 py-4 bg-white text-black font-anton uppercase text-xl tracking-wide hover:bg-zinc-200 transition-colors w-full sm:w-auto"
                            >
                                Aplicar Agora
                            </a>
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-5xl">
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/9OC7gdXOPGE"
                                title="Escola Sobrenatural Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* Intro Quote */}
                <section className="py-32 px-6 bg-zinc-950 border-y border-zinc-900">
                    <div className="max-w-4xl mx-auto text-center">
                        <BookOpen size={48} className="mx-auto mb-8 text-zinc-500" />
                        <h2 className="text-3xl md:text-5xl font-anton uppercase leading-tight text-white mb-8">
                            "Aqui, desejamos familiarizá-lo com a verdade da Palavra a respeito de quem você é em Cristo, e quais são os benefícios concedidos por meio do Seu sacrifício."
                        </h2>
                        <p className="text-zinc-500 uppercase tracking-widest font-bold text-sm">— Propósito da Escola</p>
                    </div>
                </section>

                {/* Curriculum Grid */}
                <section className="py-32 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="mb-20 text-center md:text-left border-b border-zinc-800 pb-8">
                            <h2 className="text-5xl md:text-7xl font-anton uppercase mb-4">Grade Curricular</h2>
                            <p className="text-zinc-400 text-lg max-w-xl">
                                Do fundamento à prática, uma estrutura completa para o seu crescimento espiritual.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subjects.map((sub, i) => (
                                <div key={i} className="group p-8 border border-zinc-800 hover:border-white bg-zinc-900/30 transition-colors duration-300 rounded-xl">
                                    <div className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity text-4xl font-anton text-zinc-500">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-2xl font-anton uppercase mb-3 text-white group-hover:translate-x-2 transition-transform duration-300">{sub.title}</h3>
                                    <p className="text-zinc-500 leading-relaxed font-light text-sm">
                                        {sub.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-wrap gap-4 justify-center text-center">
                            {["Batismo no Espírito Santo", "Tribunal de Deus", "Temor do Senhor", "Personalidades Proféticas", "Cultura da Honra"].map((tag, i) => (
                                <span key={i} className="px-4 py-2 bg-black border border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Logistics */}
                <section className="py-32 px-6 bg-white text-black">
                    <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-anton uppercase mb-8 leading-none">
                                Informações<br />Gerais
                            </h2>
                            <div className="space-y-8 text-lg">
                                <div className="flex items-start gap-4">
                                    <Calendar className="shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold uppercase tracking-wider mb-1">Período</h4>
                                        <p className="text-zinc-600">5 de Março a 23 de Maio</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 mt-1 font-bold text-xl w-6 text-center">⏰</div>
                                    <div>
                                        <h4 className="font-bold uppercase tracking-wider mb-1">Horário</h4>
                                        <p className="text-zinc-600">Quintas-feiras, das 20h às 22h</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold uppercase tracking-wider mb-1">Local</h4>
                                        <p className="text-zinc-600">Sede God Provider Church, Goiânia</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-zinc-100 border-l-4 border-black">
                                <p className="font-bold uppercase text-sm tracking-wide mb-2">Nota Importante</p>
                                <p className="text-zinc-600 text-sm">
                                    As aulas culminam em uma imersão presencial ao final de cada módulo. A aplicação prévia é obrigatória para garantir sua vaga.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end">
                            <div className="aspect-[9/16] w-full max-w-sm bg-black overflow-hidden rounded-lg shadow-2xl border border-zinc-800">
                                <iframe
                                    src="https://www.instagram.com/reel/DAvy8HbJv7P/embed"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency={true}
                                ></iframe>
                            </div>
                            <div className="absolute bottom-10 left-0 lg:-left-12 bg-black text-white p-8 max-w-xs shadow-xl border border-zinc-800 hidden md:block">
                                <p className="font-anton uppercase text-3xl leading-none mb-2">Vagas Limitadas</p>
                                <p className="text-zinc-400 text-sm">Garanta seu lugar nesta turma.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-32 px-6 border-t border-zinc-900">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h2 className="text-4xl font-anton uppercase mb-16">O que dizem nossos alunos</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                                <div key={i} className="p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl relative">
                                    <Star className="absolute top-4 right-4 text-yellow-500/20" size={40} />
                                    <p className="text-lg text-zinc-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-anton text-zinc-500">
                                            {t.name[0]}
                                        </div>
                                        <span className="font-bold uppercase tracking-widest text-sm">{t.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-40 px-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black pointer-events-none"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-8xl font-anton uppercase leading-none mb-8 tracking-tighter">
                            Mude sua vida<br />para sempre
                        </h2>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                            Não é apenas um curso. É uma ativação do seu destino profético.
                        </p>
                        <a
                            href="https://linktr.ee/escolasobrenatural"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-anton uppercase text-2xl tracking-wide hover:scale-105 transition-transform duration-300 rounded-full"
                        >
                            Aplicar Agora <ArrowRight />
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
};
