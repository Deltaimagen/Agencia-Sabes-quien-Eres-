
import React, { useState, useCallback } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { PYTHAGOREAN_MAP, VOWELS } from '../constants';
import { generateNumerologyReport } from '../services/geminiService';
import type { NumerologyNumbers, NumerologyReport } from '../types';

const NumerologyCalculator: React.FC = () => {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [report, setReport] = useState<NumerologyReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const reduceNumber = useCallback((num: number): number => {
        if (num === 11 || num === 22 || num === 33) return num;
        let sum = String(num).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        if (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            return reduceNumber(sum);
        }
        return sum;
    }, []);

    const calculateNumbers = useCallback((): NumerologyNumbers | null => {
        if (!name || !birthDate) return null;

        const normalizedName = name.toUpperCase().replace(/[^A-Z]/g, '');
        
        // Life Path
        const dateDigits = birthDate.replace(/-/g, '');
        const lifePathSum = dateDigits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        const lifePath = reduceNumber(lifePathSum);

        // Expression
        const expressionSum = normalizedName.split('').reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
        const expression = reduceNumber(expressionSum);

        // Soul Urge
        const soulUrgeSum = normalizedName.split('').filter(char => VOWELS.includes(char)).reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
        const soulUrge = reduceNumber(soulUrgeSum);

        // Personality
        const personalitySum = normalizedName.split('').filter(char => !VOWELS.includes(char)).reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
        const personality = reduceNumber(personalitySum);

        return { lifePath, expression, soulUrge, personality };
    }, [name, birthDate, reduceNumber]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setReport(null);
        
        const numbers = calculateNumbers();
        if (!numbers) {
            setError('Por favor, completa tu nombre y fecha de nacimiento.');
            return;
        }

        setIsLoading(true);
        try {
            const result = await generateNumerologyReport(name, birthDate, numbers);
            setReport(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderReportSection = (title: string, value: number, content: { name: string; description: string; }) => (
        <div className="py-4 border-b border-yellow-500/20 last:border-b-0">
            <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-cinzel text-yellow-400">{title}</h3>
                <span className="text-4xl font-cinzel font-bold text-white">{value}</span>
            </div>
            <p className="text-lg font-semibold text-gray-300 mt-1">{content.name}</p>
            <p className="text-gray-400 mt-2">{content.description}</p>
        </div>
    );
    
    const numbers = calculateNumbers();

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Ana María García"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-1">Fecha de Nacimiento</label>
                        <input
                            id="birthdate"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                            required
                        />
                    </div>
                </div>
                <Button type="submit" isLoading={isLoading} disabled={!name || !birthDate}>
                    Revelar mi Esencia Numérica
                </Button>
            </form>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}
            
            {isLoading && <LoadingSpinner />}

            {report && numbers && (
                <div className="mt-8 pt-6 border-t border-yellow-500/30 animate-fade-in">
                    <h2 className="text-3xl font-cinzel text-center text-yellow-300 mb-2">{report.title}</h2>
                    <p className="text-center text-gray-300 mb-6">{report.description}</p>
                    <div className="space-y-4">
                        {renderReportSection("Camino de Vida", numbers.lifePath, report.lifePath)}
                        {renderReportSection("Expresión", numbers.expression, report.expression)}
                        {renderReportSection("Impulso del Alma", numbers.soulUrge, report.soulUrge)}
                        {renderReportSection("Personalidad", numbers.personality, report.personality)}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default NumerologyCalculator;
