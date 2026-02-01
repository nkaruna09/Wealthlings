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

export const ARCHETYPE_METADATA: Record<Archetype, { description: string; traits: string[] }> = {
  'Steady Guardian': {
    description: 'The Steady Guardian usually represents big, reliable companies like power companies or grocery stores. When its mood is Happy, it means people feel safe! It will not zoom to the moon, but it grows strong, sturdy roots.',
    traits: ['Stable', 'Protective'],
  },
  'Trend Chaser': {
    description: 'The Trend Chaser loves whatever is "cool" right now—like a new viral toy or a movie. When its mood is Nervous, it means the "hype" might be fading. Its price might be shaking because people are not sure if it will stay popular.',
    traits: ['Fast', 'Exciting'],
  },
  Giant: {
    description: 'The Giant is a massive company that has been around forever. When it is Tired, the stock price is not moving much. It is not growing fast because it is already so big!',
    traits: ['Big', 'Reliable'],
  },
  Sprinter: {
    description: 'The Sprinter represents small, new companies with big ideas (like a new robot inventor!). When it is Happy, it is running at full speed and its value is skyrocketing!',
    traits: ['Growth', 'Agile'],
  },
  Diversifier: {
    description: 'The Diversifier is a special creature that is actually a "bundle" of many different stocks (like an Index Fund). Because it’s a team, it’s almost always Happy or calm, because if one stock in the bundle has a bad day, the others help pick it up!',
    traits: ['Teamwork', 'Balanced'],
  },
};
