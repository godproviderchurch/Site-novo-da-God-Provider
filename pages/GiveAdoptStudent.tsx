import React from 'react';
import { useContent } from '../src/context/ContentContext';

export const GiveAdoptStudent: React.FC = () => {
    const { content, loading } = useContent();

    if (loading) return <div className="bg-white min-h-screen text-black pt-36 text-center">Carregando...</div>;

    const data = content?.give_adopt_page || {};
    const header = data.header || {};
    const letter = data.letter || {};

    return (
        <div className="bg-white min-h-screen text-black pt-36 pb-20">
            {/* Hero */}
            <div className="container mx-auto px-6 mb-20 text-center">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                    {header.title}
                </h1>
                <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                    {header.description}
                </p>
            </div>

            {/* Letter */}
            <div className="container mx-auto px-6 mb-24">
                <div className="max-w-4xl mx-auto bg-zinc-50 p-10 md:p-16 border border-zinc-200 shadow-lg relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                    <h2 className="text-2xl font-black uppercase mb-8">Carta Apresentação - Adote um Aluno</h2>

                    <div className="prose prose-lg text-zinc-700">
                        <p className="mb-6">
                            {letter.intro}
                        </p>

                        <h3 className="text-xl font-bold text-black uppercase mb-4">Nosso Objetivo</h3>
                        <p className="mb-6">
                            {letter.objective}
                        </p>

                        <h3 className="text-xl font-bold text-black uppercase mb-4">Como funciona?</h3>
                        <p className="mb-6">
                            {letter.how_it_works}
                        </p>

                        <p className="mb-6">
                            Nesse período, você será informado sobre quem será o aluno beneficiado por suas contribuições e receberá informações acerca da sua evolução escolar, podendo acompanhar todo o desenvolvimento da criança apadrinhada. Logo após a definição do aluno apadrinhado, entraremos em contato para te conectarmos com o nosso colégio parceiro, que informará os valores e as formas de pagamento disponíveis.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-black text-white py-24">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl font-black uppercase mb-6">Como se inscrever?</h2>
                    <p className="text-zinc-400 mb-12">
                        Se você deseja participar dessa iniciativa como apadrinhado, preencha seus dados abaixo para entrarmos em contato com maiores informações.
                    </p>

                    <form className="space-y-6 text-left">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Nome Completo</label>
                                <input type="text" className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:border-white outline-none transition-colors" placeholder="Seu nome" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Email</label>
                                <input type="email" className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:border-white outline-none transition-colors" placeholder="seu@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Telefone / WhatsApp</label>
                            <input type="tel" className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:border-white outline-none transition-colors" placeholder="(00) 00000-0000" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Mensagem (Opcional)</label>
                            <textarea className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:border-white outline-none transition-colors h-32" placeholder="Gostaria de saber mais sobre..."></textarea>
                        </div>
                        <button type="button" className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-zinc-200 transition-colors">
                            Enviar Interesse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
