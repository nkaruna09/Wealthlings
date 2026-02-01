import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Scanner } from '@/components/Scanner';
import { Archetype } from '@/types/stocklings';

interface Props {
  onNavigate: (tab: string) => void;
}

export const ScannerScreen: React.FC<Props> = ({ onNavigate }) => {
  const { addStockling } = useGameStore();

  const handleScanComplete = (id: string, name: string, brand: string, sector: string, level: number, archetype: Archetype, isAffectedByStorm: boolean) => {
    const newStockling = {
      id: id,
      name: name,
      brand: brand,
      sector: sector,
      archetype: archetype,
      level: level,
      health: 100,
      mood: 'happy' as const,
      isAffectedByStorm: isAffectedByStorm,
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
