import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { word, value } = await req.json();

        if (!word || value === undefined) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const model = "gemini-2.5-flash";

        const prompt = `
            Analiza la palabra "${word}" que tiene un valor de Gematria (aproximación Hebrea) de ${value}.
            Proporciona una interpretación mística, espiritual y motivadora en un párrafo corto pero profundo (alrededor de 3-4 frases). Explora el significado oculto de esta palabra y su valor numérico, y cómo su energía puede inspirar a la persona.
            El tono debe ser enigmático y revelador. Responde en texto plano, sin formato adicional.
        `;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        });

        return new Response(JSON.stringify({ interpretation: response.text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error in gematria API:", error);
        return new Response(JSON.stringify({ error: "No se pudo generar la interpretación de Gematria." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const config = {
    runtime: 'edge',
};