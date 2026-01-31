import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { StoreScreen } from '@/screens/StoreScreen';
import { ScannerScreen } from '@/screens/ScannerScreen';
import { LabScreen } from '@/screens/LabScreen';
import { BottomTabBar } from '@/components/BottomTabBar';
import { colors } from '@/constants/colors';

type TabType = 'dashboard' | 'store' | 'scanner' | 'lab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate950,
  },
});

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as TabType);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen onNavigate={handleNavigate} />;
      case 'store':
        return <StoreScreen onNavigate={handleNavigate} />;
      case 'scanner':
        return <ScannerScreen onNavigate={handleNavigate} />;
      case 'lab':
        return <LabScreen onNavigate={handleNavigate} />;
      default:
        return <DashboardScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}
