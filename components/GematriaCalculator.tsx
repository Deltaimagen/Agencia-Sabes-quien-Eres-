
import React, { useState, useCallback } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { GEMATRIA_MAP } from '../constants';
import { generateGematriaInterpretation } from '../services/geminiService';

const GematriaCalculator: React.FC = () => {
    const [word, setWord] = useState('');
    const [result, setResult] = useState<{ value: number; interpretation: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateGematria = useCallback((input: string): number => {
        const normalized = input.toUpperCase().replace(/ /g, '');
        return normalized.split('').reduce((acc, char) => acc + (GEMATRIA_MAP[char] || 0), 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);

        if (!word) {
            setError('Por favor, introduce una palabra o nombre.');
            return;
        }

        setIsLoading(true);
        const value = calculateGematria(word);
        try {
            const { interpretation } = await generateGematriaInterpretation(word, value);
            setResult({ value, interpretation });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-cinzel text-center text-yellow-400 mb-4">Calculadora de Gematria</h2>
            <p className="text-center text-gray-400 mb-6">Descubre la vibración numérica oculta en las palabras.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="word" className="block text-sm font-medium text-gray-300 mb-1">Palabra o Nombre</label>
                    <input
                        id="word"
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Ej: Amor, Sabiduría, tu nombre..."
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        required
                    />
                </div>
                <Button type="submit" isLoading={isLoading} disabled={!word}>
                    Calcular Valor
                </Button>
            </form>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}
            
            {isLoading && <LoadingSpinner />}

            {result && (
                <div className="mt-8 pt-6 border-t border-yellow-500/30 text-center animate-fade-in">
                    <p className="text-gray-300">El valor de Gematria para "{word}" es:</p>
                    <p className="text-7xl font-cinzel font-bold text-yellow-300 my-4">{result.value}</p>
                    <p className="text-lg text-gray-300 italic">"{result.interpretation}"</p>
                </div>
            )}
        </Card>
    );
};

export default GematriaCalculator;