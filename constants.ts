
// Pythagorean Numerology Mapping
export const PYTHAGOREAN_MAP: { [key: string]: number } = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

export const VOWELS = ['A', 'E', 'I', 'O', 'U'];

// Simplified Gematria Mapping (Spanish Alphabet -> Hebrew Value Approximation)
export const GEMATRIA_MAP: { [key: string]: number } = {
  A: 1, B: 2, C: 20, D: 4, E: 5, F: 80, G: 3, H: 8, I: 10, J: 10, K: 20, L: 30, M: 40, 
  N: 50, 'Ñ': 50, O: 70, P: 80, Q: 100, R: 200, S: 300, T: 400, U: 6, V: 6, W: 6, X: 60, Y: 10, Z: 7
};

// Zodiac Signs
export const ZODIAC_SIGNS = [
  { sign: 'Aries', start: '03-21', end: '04-19' },
  { sign: 'Tauro', start: '04-20', end: '05-20' },
  { sign: 'Géminis', start: '05-21', end: '06-20' },
  { sign: 'Cáncer', start: '06-21', end: '07-22' },
  { sign: 'Leo', start: '07-23', end: '08-22' },
  { sign: 'Virgo', start: '08-23', end: '09-22' },
  { sign: 'Libra', start: '09-23', end: '10-22' },
  { sign: 'Escorpio', start: '10-23', end: '11-21' },
  { sign: 'Sagitario', start: '11-22', end: '12-21' },
  { sign: 'Capricornio', start: '12-22', end: '01-19' },
  { sign: 'Acuario', start: '01-20', end: '02-18' },
  { sign: 'Piscis', start: '02-19', end: '03-20' },
];
