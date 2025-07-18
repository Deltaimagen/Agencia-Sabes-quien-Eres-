import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { zodiacSign } = await req.json();

        if (!zodiacSign) {
            return new Response(JSON.stringify({ error: 'Missing required field: zodiacSign' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const model = "gemini-2.5-flash";

        const prompt = `
            Escribe un horóscopo diario único, inspirador, motivador y más extenso para el signo zodiacal ${zodiacSign}.
            El horóscopo debe tener dos párrafos (aproximadamente 6-8 frases en total). El primer párrafo debe enfocarse en la energía cósmica general del día y una reflexión para el alma. El segundo párrafo debe ofrecer consejos prácticos y poéticos para el amor, la carrera y el bienestar personal, empoderando al lector a aprovechar el día.
            El tono debe ser positivo, alentador y mágico. Responde en texto plano, sin formato adicional.
        `;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.9,
            }
        });

        return new Response(JSON.stringify({ horoscope: response.text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error in astrology API:", error);
        return new Response(JSON.stringify({ error: "No se pudo generar el horóscopo." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const config = {
    runtime: 'edge',
};