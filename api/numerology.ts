import { GoogleGenAI, Type } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from 'next'; // Using Next.js types for Vercel Edge compatibility

// Define the schema for the AI's response right here in the backend
const numerologyReportSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "Un título místico y atractivo para el informe de numerología." },
        description: { type: Type.STRING, description: "Una breve introducción inspiradora (2-3 frases) sobre el significado general de la numerología para la persona, enfocada en el autodescubrimiento." },
        lifePath: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "El nombre del número del Camino de Vida (ej. 'El Líder', 'El Cooperador')." },
                description: { type: Type.STRING, description: "Una descripción detallada, motivadora y profunda (un párrafo de 5-7 frases) del significado del número del Camino de Vida, explicando sus dones, desafíos y misión de vida." },
            },
            required: ["name", "description"]
        },
        expression: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "El nombre del número de Expresión." },
                description: { type: Type.STRING, description: "Una descripción detallada, motivadora y profunda (un párrafo de 5-7 frases) del significado del número de Expresión, detallando talentos naturales y el potencial a desarrollar." },
            },
            required: ["name", "description"]
        },
        soulUrge: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "El nombre del número del Impulso del Alma." },
                description: { type: Type.STRING, description: "Una descripción detallada, motivadora y profunda (un párrafo de 5-7 frases) del significado del número del Impulso del Alma, revelando las motivaciones internas y los deseos del corazón." },
            },
            required: ["name", "description"]
        },
        personality: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "El nombre del número de Personalidad." },
                description: { type: Type.STRING, description: "Una descripción detallada, motivadora y profunda (un párrafo de 5-7 frases) del significado del número de Personalidad, describiendo cómo la persona es percibida por los demás y su máscara social." },
            },
            required: ["name", "description"]
        }
    },
    required: ["title", "description", "lifePath", "expression", "soulUrge", "personality"]
};


export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { name, birthDate, numbers } = await req.json();

        if (!name || !birthDate || !numbers) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const model = "gemini-2.5-flash";

        const prompt = `
            Analiza el siguiente perfil numerológico basado en la numerología Pitagórica para una persona llamada ${name} nacida el ${birthDate}.
            Los números calculados son:
            - Camino de Vida: ${numbers.lifePath}
            - Expresión: ${numbers.expression}
            - Impulso del Alma: ${numbers.soulUrge}
            - Personalidad: ${numbers.personality}

            Proporciona una interpretación inspiradora, profunda y muy motivadora para cada número. Elabora sobre cómo estos dones y lecciones pueden ser utilizados para el crecimiento personal y la realización. El tono debe ser místico, positivo y empoderador.
            Genera una respuesta en formato JSON que se adhiera al esquema proporcionado. No incluyas markdown.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: numerologyReportSchema,
                temperature: 0.8,
            },
        });
        
        const jsonText = response.text.trim();
        
        return new Response(jsonText, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error in numerology API:", error);
        return new Response(JSON.stringify({ error: "No se pudo generar el informe numerológico. La IA podría estar ocupada. Por favor, inténtalo de nuevo." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Vercel Edge Runtime configuration
export const config = {
    runtime: 'edge',
};