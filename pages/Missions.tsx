import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, Globe, Heart, HandHeart, CheckCircle2, AlertCircle, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Missions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  // Noise Texture (Base64 for subtle grain)
  const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tlHero = gsap.timeline();
      tlHero.from('.hero-element', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Background Parallax removed to prevent scroll lag


      // Section Reveal
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Timeline Animation
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -30,
        stagger: 0.3,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#timeline',
          start: 'top 70%'
        }
      });

      gsap.from('.timeline-line', {
        height: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#timeline',
          start: 'top 70%'
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá, vim pelo site, meu nome é ${formData.name} e eu gostaria de fazer parte do time missionário da God Provider`;
    const whatsappUrl = `https://wa.me/5562999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', contact: '' }); // Reset only name, contact is unused now but type expects it? I will handle state below
  };

  const openListModal = () => setIsModalOpen(true);

  return (
    <div ref={containerRef} className="bg-zion-black min-h-screen text-white font-sans selection:bg-mission-blue selection:text-white overflow-x-hidden pt-20">

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-zion-black/80"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: noiseBg }}></div>
        <div className="absolute inset-0 opacity-30 bg-[url('/images/europa-mission.gif')] bg-cover bg-center bg-no-repeat grayscale mix-blend-overlay"></div>
        <div className="bg-shape absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-mission-blue rounded-full mix-blend-screen blur-[120px] opacity-20 duration-[4s]"></div>
        <div className="bg-shape absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-mission-orange rounded-full mix-blend-screen blur-[100px] opacity-10"></div>
        <div className="bg-shape absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-mission-green rounded-full mix-blend-screen blur-[100px] opacity-10"></div>
      </div>

      <div className="relative z-10">

        {/* HERO SECTION */}
        <section ref={heroRef} className="min-h-[90vh] flex flex-col justify-center items-center px-6 relative pt-20">

          <div className="absolute top-10 right-6 md:right-12 hero-element">
            <img src="/images/logo-mission-offwhite.png" alt="Mission Logo" className="w-24 opacity-80" />
          </div>

          <div className="max-w-5xl mx-auto w-full text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-8 hero-element backdrop-blur-sm">
              <AlertCircle size={14} /> Inscrições Encerradas
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6 hero-element bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Viagem<br />Missionária
            </h1>

            <div className="text-lg md:text-2xl font-bold uppercase tracking-[0.3em] text-white mb-6 hero-element flex flex-wrap justify-center gap-x-8 gap-y-4 items-center">
              <span className="flex items-center gap-3"><img src="/images/frança-bandeira.avif" className="h-6 w-auto rounded-sm" alt="França" /> França</span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-3"><img src="/images/alemanha-bandeira.jpg" className="h-6 w-auto rounded-sm" alt="Alemanha" /> Alemanha</span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-3"><img src="/images/suiça-bandeira.avif" className="h-6 w-auto rounded-sm" alt="Suíça" /> Suíça</span>
            </div>

            <p className="text-2xl md:text-4xl font-black text-white mb-12 hero-element border-y border-zinc-800 py-4 inline-block">
              MARÇO // 2026
            </p>

            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12 hero-element">
              Uma jornada de <span className="text-white font-bold">presença</span>, <span className="text-white font-bold">serviço</span> e <span className="text-white font-bold">esperança</span> pelas ruas da Europa. Levando o Reino para quem mais precisa.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center hero-element">
              <button
                onClick={openListModal}
                className="group relative px-8 py-4 bg-zinc-100 text-black font-black uppercase tracking-wider text-sm overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-mission-blue via-mission-orange to-mission-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Quero ser um missionário <ArrowRight size={16} />
                </span>
              </button>

              <a
                href="https://www.instagram.com/godprovidermission/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-8 py-4 border border-zinc-800 hover:border-white text-zinc-400 hover:text-white font-bold uppercase tracking-wider text-sm transition-all hover:bg-white/5"
              >
                <Instagram size={18} /> Acompanhar Bastidores
              </a>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-32 px-6 reveal-section">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
                Sobre a <span className="text-mission-blue">Missão</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-mission-blue to-mission-green"></div>

              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed md:pr-12">
                <p>
                  Durante esse período, serão realizadas diversas ações evangelísticas com a comunidade local, com o objetivo de compartilhar <strong className="text-white">valores</strong> e promover <strong className="text-white">esperança</strong>.
                </p>
                <p>
                  Além disso, dedicaremos esforços para servir comunidades carentes de <strong className="text-white">refugiados</strong>, levando apoio e assistência às pessoas em situação de vulnerabilidade.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {[
                { title: "Evangelismo Local", icon: Globe, color: "text-mission-blue", border: "hover:border-mission-blue/50", desc: "Levando a mensagem do Reino para as praças e ruas." },
                { title: "Serviço a Refugiados", icon: HandHeart, color: "text-mission-orange", border: "hover:border-mission-orange/50", desc: "Apoio prático e acolhimento para deslocados de guerra." },
              ].map((card, idx) => (
                <div key={idx} className={`p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 ${card.border} transition-colors duration-500 group rounded-xl`}>
                  <div className={`${card.color} mb-4 transform group-hover:-translate-y-1 transition-transform duration-300`}>
                    <card.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black uppercase mb-2">{card.title}</h3>
                  <p className="text-zinc-500 text-sm font-medium">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section id="timeline" className="py-32 px-6 bg-black/50 reveal-section relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-black uppercase mb-20">Dinâmica da Viagem</h2>

            <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-0 md:pl-0 space-y-16">
              {/* Animated Line Overlay */}
              <div className="timeline-line absolute left-0 top-0 w-[2px] bg-gradient-to-b from-mission-blue via-mission-orange to-mission-green h-full origin-top"></div>

              {[
                { step: "01", title: "Preparação & Treinamento", desc: "Encontros de alinhamento espiritual, cultural e prático antes do embarque." },
                { step: "02", title: "Chegada & Imersão", desc: "Estabelecimento de base e reconhecimento das áreas de atuação nas cidades-alvo." },
                { step: "03", title: "Ações de Campo", desc: "Dias intensos de evangelismo, serviço comunitário e apoio aos refugiados." },
                { step: "04", title: "Debriefing & Retorno", desc: "Momento de testemunhos, processamento da experiência e volta para casa." },
              ].map((item, i) => (
                <div key={i} className="timeline-item relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-center group">

                  {/* Dot */}
                  <div className="absolute left-[-5px] top-2 w-3 h-3 bg-zinc-950 border-2 border-white rounded-full z-10 group-hover:scale-150 group-hover:border-mission-blue transition-all duration-300"></div>

                  <div className={`md:text-right ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <span className="text-6xl font-black text-zinc-900 absolute opacity-50 -z-10 -translate-y-8 select-none md:static md:translate-y-0 md:opacity-100 md:text-zinc-900 group-hover:text-zinc-800 transition-colors duration-500">
                      {item.step}
                    </span>
                  </div>

                  <div className={`${i % 2 === 1 ? 'md:order-0 md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-xl font-black uppercase mb-2 text-white group-hover:text-mission-blue transition-colors duration-300">{item.title}</h3>
                    <p className="text-zinc-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-2xl mx-auto backdrop-blur-md">
              <p className="text-yellow-500 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                <AlertCircle size={16} /> Inscrições encerradas
              </p>
              <p className="text-zinc-400 mt-2 text-sm">Acompanhe os próximos passos e cobertura da viagem pelo Instagram.</p>
            </div>

          </div>
        </section>

        {/* FINAL CTA / FORM */}
        <section className="py-32 px-6 reveal-section text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-black uppercase mb-6">Próximas Missões</h2>
            <p className="text-zinc-400 mb-12">
              As inscrições para esta viagem estão encerradas, mas você pode entrar para a lista de interesse e ser o primeiro a saber das próximas oportunidades.
            </p>

            {formStatus === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-xl animate-in fade-in zoom-in duration-500">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Cadastro Realizado!</h3>
                <p className="text-zinc-400 text-sm">Entraremos em contato assim que abrirmos novas vagas.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Seu Nome Completo"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-zinc-800 p-4 pl-6 rounded-lg text-white outline-none focus:border-mission-blue transition-all"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-mission-blue/20 to-mission-green/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 -z-10 blur-sm"></div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded-lg"
                >
                  Entrar na Lista de Interesse
                </button>
              </form>
            )}

            <div className="mt-12 pt-12 border-t border-zinc-900">
              <p className="text-zinc-500 text-sm mb-6">Ou siga a Mission nas redes sociais</p>
              <a
                href="https://www.instagram.com/godprovidermission/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-white hover:text-mission-blue transition-colors font-bold uppercase tracking-widest"
              >
                <div className="p-2 bg-zinc-900 rounded-full"><Instagram size={20} /></div> @godprovidermission
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-zion-gray border border-zinc-700 p-8 rounded-2xl max-w-md w-full relative shadow-2xl shadow-mission-blue/20">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-700">
                <AlertCircle size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">Inscrições Encerradas</h3>
              <p className="text-zinc-400 mb-8">
                O período de inscrição para a missão Europa 2026 já foi finalizado. Gostaria de entrar na lista de espera para futuras viagens?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => { setIsModalOpen(false); document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full py-3 bg-white text-black font-bold uppercase tracking-wide rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Entrar na Lista de Interesse
                </button>
                <a
                  href="https://www.instagram.com/godprovidermission/"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-wide rounded-lg hover:border-white hover:text-white transition-colors"
                >
                  Ir para o Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
