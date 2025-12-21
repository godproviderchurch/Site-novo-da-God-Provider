import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// NOTE: In a real production app, this key should be proxied or handled securely.
// Using process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual da God Provider Church.
Sua missão é ajudar visitantes e membros com informações sobre a igreja.

CONTEXTO DA IGREJA:
- Nome: God Provider Church
- Visão: Edificar uma igreja gloriosa, relevante e influente.
- Unidades Principais: Morumbi (Sede), Osasco, Alphaville, Bragança Paulista, Quito (Equador), Lisboa (Portugal).
- Cultos Gerais: Domingos às 10h, 17h e 19h (pode variar por unidade).
- Ministérios: 
  - Kingdom Kids (Crianças)
  - Raise (Adolescentes 11-17 anos)
  - Impulse (Jovens 18-24 anos)
  - God Provider Worship (Louvor)
  - Únicas (Mulheres)
  - Kings (Homens)
  - Torre de Oração 24H
  - Escola Sobrenatural (Ensino e Ativação)
- Eventos Recentes: Conferência GP, Escola de Profetas.

DIRETRIZES DE RESPOSTA:
1. Responda sempre em Português do Brasil.
2. Seja acolhedor, moderno e direto (tom "jovem" mas respeitoso).
3. Se não souber uma informação específica (ex: horário exato de uma unidade pequena), peça para a pessoa visitar a página "Unidades" ou o Instagram oficial.
4. Mantenha as respostas curtas (máximo 3 parágrafos).
5. O site é "Monochrome", então você pode fazer piadas sutis sobre "preto no branco" ou clareza se couber.

RESUMO DO SITE ATUAL:
O usuário está navegando em uma recriação minimalista em preto e branco do site da God Provider Church.
`;

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    if (!process.env.API_KEY) {
      return "⚠️ A chave da API Gemini não foi configurada. Por favor, configure o metadata.json ou variáveis de ambiente.";
    }

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, estou tendo problemas para conectar ao servidor celestial no momento. Tente novamente mais tarde.";
  }
};