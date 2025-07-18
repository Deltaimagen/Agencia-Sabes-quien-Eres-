
import React, { useState } from 'react';
import { View } from './types';
import NumerologyCalculator from './components/NumerologyCalculator';
import GematriaCalculator from './components/GematriaCalculator';
import AstrologyHoroscope from './components/AstrologyHoroscope';

const bgImageBase64 = 'data:image/jpeg;base64,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';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('numerology');

    const renderView = () => {
        switch (activeView) {
            case 'numerology':
                return <NumerologyCalculator />;
            case 'gematria':
                return <GematriaCalculator />;
            case 'astrology':
                return <AstrologyHoroscope />;
            default:
                return <NumerologyCalculator />;
        }
    };
    
    const appStyle: React.CSSProperties = {
        backgroundImage: `
            linear-gradient(rgba(10, 5, 20, 0.88), rgba(10, 5, 20, 0.92)),
            url("${bgImageBase64}")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
    };

    const viewColors: Record<View, { active: string; hover: string }> = {
        numerology: { 
            active: 'text-yellow-300 border-yellow-400 bg-yellow-400/20 shadow-md shadow-yellow-500/20', 
            hover: 'hover:bg-yellow-400/10 hover:border-yellow-400' 
        },
        gematria: { 
            active: 'text-sky-300 border-sky-400 bg-sky-400/20 shadow-md shadow-sky-500/20', 
            hover: 'hover:bg-sky-400/10 hover:border-sky-400' 
        },
        astrology: { 
            active: 'text-purple-300 border-purple-400 bg-purple-400/20 shadow-md shadow-purple-500/20', 
            hover: 'hover:bg-purple-400/10 hover:border-purple-400' 
        },
    };

    const NavButton = ({ view, label }: { view: View; label: string; }) => {
        const colors = viewColors[view];
        const isActive = activeView === view;

        return (
            <button
                onClick={() => setActiveView(view)}
                className={`
                    flex-1 justify-center px-4 py-3 text-sm md:text-base font-cinzel tracking-wider 
                    transition-all duration-300 ease-in-out border rounded-lg
                    ${
                        isActive
                            ? colors.active
                            : `text-gray-300 border-gray-600/70 bg-black/25 ${colors.hover} hover:text-white`
                    }
                `}
            >
                {label}
            </button>
        );
    };


    return (
        <div 
            style={appStyle}
            className="min-h-screen text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <header className="text-center mb-8 w-full max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-yellow-400 tracking-wider">
                    ¿Sabes Quién Eres?
                </h1>
                <p className="text-gray-300 mt-2 text-sm md:text-base">
                    Un viaje místico a través de los números y las estrellas.
                </p>
            </header>

            <main className="w-full max-w-3xl mx-auto flex-grow">
                <div className="bg-black/20 backdrop-blur-md rounded-t-xl overflow-hidden border border-b-0 border-yellow-500/20">
                     <nav className="flex p-2 gap-2">
                        <NavButton view="numerology" label="Numerología" />
                        <NavButton view="gematria" label="Gematria" />
                        <NavButton view="astrology" label="Astrología" />
                    </nav>
                </div>
                <div className="w-full transition-all duration-500">
                    {renderView()}
                </div>
            </main>
            
            <div className="w-full max-w-3xl mx-auto mt-8">
                <a 
                    href="https://www.sabesquieneres.com/contact-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-cinzel tracking-wider bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                    Contacta para una Lectura Personalizada
                </a>
            </div>

            <footer className="text-center mt-4 text-gray-500 text-xs">
                <p>Análisis generados por IA. Utilizar únicamente con fines de entretenimiento y autoconocimiento.</p>
            </footer>
        </div>
    );
};

export default App;
