
export type View = 'numerology' | 'gematria' | 'astrology';

export interface NumerologyNumbers {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
}

export interface NumerologyReport {
    title: string;
    description: string;
    lifePath: { name: string; description: string; };
    expression: { name: string; description: string; };
    soulUrge: { name: string; description: string; };
    personality: { name: string; description: string; };
}
