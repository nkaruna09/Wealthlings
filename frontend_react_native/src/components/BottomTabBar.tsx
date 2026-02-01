import React, { ReactNode} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextStyle } from 'react-native';
import { MotiView } from 'moti';
import { LayoutGrid, Scan, Beaker, Shield, CloudRain, Trash2, ShoppingBag, Heart, Zap, Book } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface Props {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.slate950,
    borderTopWidth: 1,
    borderTopColor: colors.white + '08',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  tabButton: {
    alignItems: 'center',
    width: 64,
  },
  tabIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  tabIconActive: {
    backgroundColor: colors.blue500 + '1a',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
    lineHeight: 14,
  } as TextStyle,
  tabLabelActive: {
    color: colors.blue500,
    opacity: 1,
  } as TextStyle,
  tabLabelInactive: {
    color: colors.slate500,
    opacity: 0.6,
  } as TextStyle,
  tabEmoji: {
    fontSize: 20,
  },
  tabEmojiInactive: {
    opacity: 0.6,
  },
});

export const BottomTabBar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Team', icon: <LayoutGrid color={activeTab === 'dashboard' ? colors.blue500 : colors.slate500} /> },
    { id: 'guide', label: 'Guide', icon: <Book color={activeTab === 'guide' ? colors.blue500 : colors.slate500} /> },
    { id: 'store', label: 'Store', icon: <ShoppingBag color={activeTab === 'store' ? colors.blue500 : colors.slate500} /> },
    { id: 'scanner', label: 'Scan', icon: <Scan color={activeTab === 'scanner' ? colors.blue500 : colors.slate500} /> },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          active={activeTab === tab.id}
          label={tab.label}
          icon={tab.icon}
          onPress={() => onTabChange(tab.id)}
        />
      ))}
    </View>
  );
};

interface TabButtonProps {
  active: boolean;
  label: string;
  icon: ReactNode;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ active, label, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.tabButton}>
    <MotiView
      animate={active ? { scale: 1.1 } : { scale: 1 }}
      style={[styles.tabIcon, active && styles.tabIconActive]}
    >
      {icon}
    </MotiView>
    <Text style={[styles.tabLabel, active ? styles.tabLabelActive : styles.tabLabelInactive]}>
      {label}
    </Text>
  </TouchableOpacity>
);
