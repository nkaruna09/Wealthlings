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
    if (activeTab === 'dashboard') {
      return <DashboardScreen onNavigate={handleNavigate} />;
    } else if (activeTab === 'store') {
      return <StoreScreen onNavigate={handleNavigate} />;
    } else if (activeTab === 'scanner') {
      return <ScannerScreen onNavigate={handleNavigate} />;
    } else if (activeTab === 'lab') {
      return <LabScreen onNavigate={handleNavigate} />;
    } else {
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
