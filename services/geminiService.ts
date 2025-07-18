import type { NumerologyNumbers, NumerologyReport } from '../types';

async function fetchFromApi<T>(endpoint: string, body: object): Promise<T> {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.error || `Error del servidor: ${response.statusText}`);
        }
        
        return await response.json();

    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        if (error instanceof Error) {
            // Re-throw custom messages for the UI
            throw error;
        }
        throw new Error('Ocurrió un error de comunicación. Por favor, inténtalo de nuevo.');
    }
}

export const generateNumerologyReport = async (name: string, birthDate: string, numbers: NumerologyNumbers): Promise<NumerologyReport> => {
    return fetchFromApi<NumerologyReport>('/api/numerology', { name, birthDate, numbers });
};

export const generateGematriaInterpretation = async (word: string, value: number): Promise<{ interpretation: string }> => {
    const result = await fetchFromApi<{ interpretation: string }>('/api/gematria', { word, value });
    return { interpretation: result.interpretation };
};

export const generateDailyHoroscope = async (zodiacSign: string): Promise<{ horoscope: string }> => {
    const result = await fetchFromApi<{ horoscope: string }>('/api/astrology', { zodiacSign });
    return { horoscope: result.horoscope };
};