import { create } from 'zustand';
import { Stockling, Inventory } from '@/types/stocklings';

interface GameState {
  stocklings: Stockling[];
  coins: number;
  inventory: Inventory;
  isStormActive: boolean;
  addStockling: (stockling: Stockling) => void;
  removeStockling: (id: string) => void;
  updateStockling: (id: string, updates: Partial<Stockling>) => void;
  setCoins: (coins: number) => void;
  addCoins: (amount: number) => void;
  updateInventory: (inventory: Partial<Inventory>) => void;
  setStormActive: (active: boolean) => void;
  applyStormDamage: () => void;
  clearStormEffects: () => void;
}

const INITIAL_STOCKLINGS: Stockling[] = [
  {
    id: '1',
    name: 'Berty',
    brand: 'GENERAL MILLS',
    sector: 'Consumer',
    archetype: 'Steady Guardian',
    level: 5,
    health: 92,
    mood: 'happy',
    isAffectedByStorm: false,
    color: '#10B981',
    icon: '🥣',
  },
  {
    id: '2',
    name: 'Glitch',
    brand: 'ROBLOX',
    sector: 'Gaming',
    archetype: 'Trend Chaser',
    level: 12,
    health: 78,
    mood: 'happy',
    isAffectedByStorm: true,
    color: '#3B82F6',
    icon: '🎮',
  },
  {
    id: '3',
    name: 'Titan',
    brand: 'APPLE',
    sector: 'Tech',
    archetype: 'Giant',
    level: 3,
    health: 95,
    mood: 'happy',
    isAffectedByStorm: false,
    color: '#94A3B8',
    icon: '🍎',
  },
];

export const useGameStore = create<GameState>((set) => ({
  stocklings: INITIAL_STOCKLINGS,
  coins: 2450,
  inventory: { potions: 2, snacks: 0 },
  isStormActive: false,

  addStockling: (stockling) =>
    set((state) => ({
      stocklings: [stockling, ...state.stocklings],
    })),

  removeStockling: (id) =>
    set((state) => ({
      stocklings: state.stocklings.filter((s) => s.id !== id),
    })),

  updateStockling: (id, updates) =>
    set((state) => ({
      stocklings: state.stocklings.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),

  setCoins: (coins) => set({ coins: Math.max(0, coins || 0) }),

  addCoins: (amount) => set((state) => {
    const validAmount = typeof amount === 'number' && !isNaN(amount) && isFinite(amount) ? amount : 0;
    return { coins: Math.max(0, state.coins + validAmount) };
  }),

  updateInventory: (inventory) =>
    set((state) => ({
      inventory: { ...state.inventory, ...inventory },
    })),

  setStormActive: (active) => set({ isStormActive: active }),

  applyStormDamage: () =>
    set((state) => ({
      stocklings: state.stocklings.map((s) => {
        if (s.archetype === 'Trend Chaser' || s.archetype === 'Sprinter') {
          return {
            ...s,
            isAffectedByStorm: true,
            mood: 'nervous',
            health: Math.max(10, s.health - 20),
          };
        }
        return s;
      }),
    })),

  clearStormEffects: () =>
    set((state) => ({
      stocklings: state.stocklings.map((s) => ({
        ...s,
        isAffectedByStorm: false,
        mood: 'happy',
      })),
    })),
}));
