import React from 'react';
import { Check, Copy } from 'lucide-react';
import { useContent } from '../src/context/ContentContext';

export const GiveCNH: React.FC = () => {
    const { content, loading } = useContent();
    const [copied, setCopied] = React.useState(false);

    if (loading) return <div className="bg-black min-h-screen text-white pt-36 text-center">Carregando...</div>;

    const data = content?.give_cnh_page || {};
    const header = data.header || {};
    const progress = data.progress || { raised: 0, goal: 700000 };
    const PIX_KEY = data.pix || "cnh@godproviderchurch.com";

    // Calculate percentage
    const percent = Math.min(100, Math.round((progress.raised / progress.goal) * 100));

    const handleCopy = () => {
        navigator.clipboard.writeText(PIX_KEY);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-black min-h-screen text-white pt-36 pb-20">
            {/* Hero */}
            <div className="container mx-auto px-6 mb-20 text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                    {header.title}
                </h1>
                <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                    {header.description}
                </p>
            </div>

            {/* Foundation */}
            <div className="container mx-auto px-6 mb-24">
                <div className="bg-zinc-900 p-10 border-l-4 border-white">
                    <h2 className="text-3xl font-black uppercase mb-4">A Fundação Já Foi Lançada.</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Estamos vendo a mão de Deus nos detalhes da nossa construção! 🙌🔥 Cada oferta, cada semente plantada, está se transformando em espaço, estrutura e ambiente para vidas serem tocadas. Estamos avançando porque cada um está fazendo parte do que Deus está construindo em nosso meio.
                    </p>
                </div>
            </div>

            {/* Progress */}
            <div className="container mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-black uppercase mb-6">Progresso Geral</h3>
                        <div className="bg-zinc-900 p-6 rounded-lg mb-6">
                            <div className="flex justify-between text-sm font-bold uppercase text-zinc-500 mb-2">
                                <span>Arrecadado: R$ {progress.raised.toLocaleString('pt-BR')}</span>
                                <span>Meta: R$ {progress.goal.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="w-full bg-black h-4 rounded-full overflow-hidden">
                                <div className="bg-white h-full" style={{ width: `${percent}%` }}></div>
                            </div>
                            <p className="text-right text-xs text-zinc-600 mt-2">{percent}% Concluído</p>
                        </div>
                        <p className="text-zinc-400">Seguimos juntos, porque grandes coisas ainda estão por vir!</p>

                        <h4 className="font-bold uppercase mt-8 mb-4">Metas Concluídas</h4>
                        <ul className="space-y-2 text-zinc-400">
                            {/* Static for now or fetch from CMS if added */}
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Painel de LED (R$ 114.300)</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Sala Pastoral (R$ 35.000)</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Terceiro Andar (R$ 265.000)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-black uppercase mb-6">Meta Atual: Segunda Etapa</h3>
                        <div className="bg-white text-black p-8 rounded-lg">
                            <h4 className="text-4xl font-black mb-2">R$ 350.000</h4>
                            <p className="text-zinc-600 mb-6">Meta para a última etapa do terceiro andar.</p>
                            <div className="bg-zinc-100 p-4 rounded border-l-4 border-green-500">
                                <p className="font-bold text-green-700">Glória a Deus!</p>
                                <p className="text-sm text-zinc-600">Acabamos de receber mais R$ 100.000!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Future Spaces - Static */}
            <div className="bg-zinc-900 py-24 mb-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase mb-4">Um Novo Andar. Um Novo Futuro.</h2>
                        <p className="text-zinc-400">A próxima fase irá desbloquear novas frentes de atuação para a nossa comunidade.</p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { title: "Torre de Oração 24h", desc: "Um espaço sagrado de intercessão contínua." },
                            { title: "Espaço dos Adolescentes", desc: "Um ambiente moderno e seguro para a próxima geração." },
                            { title: "Coworking Inspirador", desc: "Conectando fé e trabalho em um espaço colaborativo." },
                            { title: "Salas de Reunião", desc: "Para planejamento estratégico e crescimento de ministérios." },
                            { title: "Auditório de Ensino", desc: "Capacitação e conhecimento através de cursos e escolas." },
                        ].map((item, i) => (
                            <div key={i} className="bg-black p-6 border border-zinc-800 hover:border-white transition-colors">
                                <h3 className="font-bold uppercase mb-2 text-lg">{item.title}</h3>
                                <p className="text-zinc-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ways to Contribute */}
            <div className="container mx-auto px-6 mb-24">
                <h2 className="text-3xl font-black uppercase mb-12 text-center">Sua Vez de Fazer História</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center">
                        <h3 className="text-xl font-bold uppercase mb-6">Contribuir com PIX</h3>
                        <div className="bg-black p-4 rounded flex items-center justify-between mb-4">
                            <code className="text-zinc-300">{PIX_KEY}</code>
                            <button onClick={handleCopy}><Copy size={20} className="text-zinc-400 hover:text-white" /></button>
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center">
                        <h3 className="text-xl font-bold uppercase mb-6">Contribuir com Cartão</h3>
                        <p className="text-zinc-400 mb-6">Doações seguras e parceladas via Mercado Pago.</p>
                        <button className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">Doar Agora</button>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-black uppercase mb-12 text-center">Perguntas Frequentes</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        "O valor que vou contribuir com a visão, já está incluso meus dízimos?",
                        "Por que é necessário essa jornada se a igreja já recebe dízimos e ofertas?",
                        "Se eu participar de uma ação extra, poderei deixar de honrar meu compromisso mensal no que se refere a essa ação?",
                        "O compromisso é individual ou familiar?",
                        "Se eu não puder mais contribuir com a visão, o que eu faço?",
                        "Como a igreja identificará a minha contribuição?"
                    ].map((q, i) => (
                        <div key={i} className="bg-zinc-900 p-6 border border-zinc-800">
                            <h4 className="font-bold text-zinc-300">{q}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
