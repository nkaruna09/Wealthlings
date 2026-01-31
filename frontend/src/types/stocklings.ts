export type Archetype = 'Steady Guardian' | 'Trend Chaser' | 'Giant' | 'Sprinter' | 'Diversifier';

export interface Stockling {
  id: string;
  name: string;
  brand: string;
  sector: string;
  archetype: Archetype;
  level: number;
  health: number; // 0-100
  mood: 'happy' | 'tired' | 'nervous';
  isAffectedByStorm: boolean;
  color: string;
  icon: string;
}

export interface Inventory {
  potions: number;
  snacks: number;
}

export const ARCHEPIPE_METADATA: Record<Archetype, { description: string, traits: string[] }> = {
  'Steady Guardian': {
    description: 'Slow, resilient protectors like food and utilities.',
    traits: ['Stable', 'Protective']
  },
  'Trend Chaser': {
    description: 'Fast, volatile tech and gaming friends.',
    traits: ['Fast', 'Exciting']
  },
  'Giant': {
    description: 'Large, stable blue-chip brands.',
    traits: ['Big', 'Reliable']
  },
  'Sprinter': {
    description: 'Quick growth but can be fragile startups.',
    traits: ['Growth', 'Agile']
  },
  'Diversifier': {
    description: 'Boosts others with mixed ETF-style energy.',
    traits: ['Teamwork', 'Balanced']
  }
};
