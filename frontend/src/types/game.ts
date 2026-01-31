export interface Creature {
  id: string;
  name: string;
  type: string;
  brand: string;
  symbol: string;
  health: number; // 0-100
  level: number;
  exp: number;
  status: 'happy' | 'sick' | 'sleeping';
  priceHistory: { time: string; price: number }[];
  currentPrice: number;
  changePercent: number;
  color: string;
}

export interface BrandInfo {
  name: string;
  symbol: string;
  creatureType: string;
  color: string;
}

export const BRAND_DATA: Record<string, BrandInfo> = {
  'Nike': { name: 'Nike', symbol: 'NKE', creatureType: 'Speed-Runner', color: '#3b82f6' },
  'Starbucks': { name: 'Starbucks', symbol: 'SBUX', creatureType: 'Caffeine-Sprite', color: '#10b981' },
  'Apple': { name: 'Apple', symbol: 'AAPL', creatureType: 'iCore-Golem', color: '#94a3b8' },
  'Tesla': { name: 'Tesla', symbol: 'TSLA', creatureType: 'Volt-Dragon', color: '#f59e0b' },
  'McDonalds': { name: 'McDonald\'s', symbol: 'MCD', creatureType: 'Golden-Archie', color: '#ef4444' },
};
