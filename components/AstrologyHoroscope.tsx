
import React, { useState, useCallback } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ZODIAC_SIGNS } from '../constants';
import { generateDailyHoroscope } from '../services/geminiService';

const AstrologyHoroscope: React.FC = () => {
    const [birthDate, setBirthDate] = useState('');
    const [result, setResult] = useState<{ sign: string; horoscope: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getZodiacSign = useCallback((dateString: string): string => {
        if (!dateString) return '';
        try {
            const [year, month, day] = dateString.split('-').map(Number);
            const mmdd = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Capricorn spans the new year
            if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
                return 'Capricornio';
            }
            
            const foundSign = ZODIAC_SIGNS.find(sign => {
                // Ensure we don't match Capricorn again
                if (sign.sign === 'Capricornio') return false;
                return mmdd >= sign.start && mmdd <= sign.end;
            });
            
            return foundSign ? foundSign.sign : 'Desconocido';
        } catch {
            return 'Desconocido';
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);
        
        const sign = getZodiacSign(birthDate);
        if (!sign || sign === 'Desconocido') {
            setError('Por favor, introduce una fecha de nacimiento válida.');
            return;
        }

        setIsLoading(true);
        try {
            const { horoscope } = await generateDailyHoroscope(sign);
            setResult({ sign, horoscope });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };

    const zodiacSign = getZodiacSign(birthDate);

    return (
        <Card>
            <h2 className="text-2xl font-cinzel text-center text-yellow-400 mb-4">Horóscopo del Día</h2>
            <p className="text-center text-gray-400 mb-6">Recibe un mensaje de las estrellas para guiar tu jornada.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="horoscope-birthdate" className="block text-sm font-medium text-gray-300 mb-1">Tu Fecha de Nacimiento</label>
                    <input
                        id="horoscope-birthdate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        required
                    />
                </div>
                <Button type="submit" isLoading={isLoading} disabled={!birthDate}>
                    Obtener mi Horóscopo
                </Button>
            </form>
            
            {error && <p className="mt-4 text-center text-red-400">{error}</p>}
            
            {isLoading && <LoadingSpinner />}

            {result && (
                <div className="mt-8 pt-6 border-t border-yellow-500/30 animate-fade-in">
                    <h3 className="text-3xl font-cinzel text-center text-yellow-300">{result.sign}</h3>
                    {zodiacSign && zodiacSign !== 'Desconocido' && <p className="text-center text-gray-400 mb-4">Tu signo zodiacal</p>}
                    <p className="text-lg text-gray-300 leading-relaxed text-center">{result.horoscope}</p>
                </div>
            )}
        </Card>
    );
};

export default AstrologyHoroscope;