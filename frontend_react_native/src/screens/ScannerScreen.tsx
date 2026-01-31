import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Scanner } from '@/components/Scanner';

interface Props {
  onNavigate: (tab: string) => void;
}

export const ScannerScreen: React.FC<Props> = ({ onNavigate }) => {
  const { addStockling } = useGameStore();

  const handleScanComplete = (brand: string) => {
    const newStockling = {
      id: Math.random().toString(),
      name: 'Flash',
      brand: brand,
      sector: 'Market DNA',
      archetype: 'Sprinter' as const,
      level: 1,
      health: 100,
      mood: 'happy' as const,
      isAffectedByStorm: false,
      color: '#FFD700',
      icon: '✨',
    };
    addStockling(newStockling);
    onNavigate('dashboard');
  };

  return (
    <Scanner onScanComplete={handleScanComplete} onBack={() => onNavigate('dashboard')} />
  );
};
