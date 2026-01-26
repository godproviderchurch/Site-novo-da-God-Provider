import React from 'react';
import { Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Groups: React.FC = () => {
   const { content, loading } = useContent();

   if (loading) {
      return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
   }

   const groupsData = content?.groups || {};

   return (
      <div className="bg-zinc-950 min-h-screen text-white pt-36 pb-20">
         <div className="container mx-auto px-6 text-center mb-20">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6">
               {groupsData.header?.title}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
               {groupsData.header?.description}
            </p>
         </div>

         <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-2xl text-center">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-8">
                  <Users size={32} />
               </div>

               <h2 className="text-4xl font-black uppercase mb-4">{groupsData.card?.title}</h2>
               <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                  {groupsData.card?.description}
               </p>

               <div className="text-left max-w-lg mx-auto bg-black p-8 rounded-lg mb-8">
                  <h3 className="text-xl font-bold uppercase mb-6 text-center border-b border-zinc-800 pb-4">Nossos Líderes</h3>
                  <div className="space-y-4">
                     {groupsData.card?.leaders?.map((leader: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center">
                           <span className="text-zinc-400">{leader.area}</span>
                           <span className="font-bold uppercase">{leader.leader}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <button className="bg-white text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                  {groupsData.card?.buttonText || 'Encontrar um Grupo'}
               </button>
            </div>
         </div>
      </div>
   );
};
