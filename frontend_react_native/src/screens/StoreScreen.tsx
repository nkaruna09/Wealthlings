import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, TextStyle } from 'react-native';
import { MotiView } from 'moti';
import { useGameStore } from '@/store/gameStore';
import { colors } from '@/constants/colors';

interface Props {
  onNavigate?: (tab: string) => void;
}

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  type: 'healing' | 'xp' | 'bundle';
  quantity?: number;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: '1',
    name: 'Healing Potion',
    description: 'Restore confidence to your Stocklings',
    price: 100,
    emoji: '💚',
    type: 'healing',
  },
  {
    id: '2',
    name: 'Super Snack',
    description: 'Boost XP gain for your team',
    price: 150,
    emoji: '🍕',
    type: 'xp',
  },
  {
    id: '3',
    name: 'Mega Bundle',
    description: '3x Potions + 1x Snack (Best Value)',
    price: 350,
    emoji: '📦',
    type: 'bundle',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate950,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -0.5,
    marginBottom: 8,
  } as TextStyle,
  coinsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coinsText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  itemsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  itemCard: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 24,
    borderWidth: 1,
  },
  itemCardAffordable: {
    backgroundColor: colors.slate800 + '66',
    borderColor: colors.slate700,
  },
  itemCardUnaffordable: {
    backgroundColor: colors.slate900 + '66',
    borderColor: colors.slate800,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  itemIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.slate900 + '99',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconText: {
    fontSize: 36,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemNameText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  itemDesc: {
    fontSize: 12,
    color: colors.slate400,
    marginTop: 4,
  } as TextStyle,
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.secondary + '33',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.secondary + '4d',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.secondary,
  } as TextStyle,
  buyButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonActive: {
    backgroundColor: colors.blue500,
  },
  buyButtonDisabled: {
    backgroundColor: colors.slate700,
  },
  buyButtonText: {
    fontWeight: '900',
    fontSize: 14,
  } as TextStyle,
  buyButtonTextActive: {
    color: colors.white,
  } as TextStyle,
  buyButtonTextDisabled: {
    color: colors.slate400,
  } as TextStyle,
  inventorySection: {
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  inventoryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 16,
    letterSpacing: -0.5,
  } as TextStyle,
  inventoryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  inventoryCard: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.slate800 + '66',
    borderWidth: 1,
    borderColor: colors.slate700,
    borderRadius: 16,
    alignItems: 'center',
  },
  inventoryEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  inventoryLabel: {
    fontSize: 12,
    color: colors.slate400,
    marginBottom: 4,
  } as TextStyle,
  inventoryCount: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  spacer: {
    height: 80,
  },
});

export const StoreScreen: React.FC<Props> = ({ onNavigate }) => {
  const { coins, inventory, setCoins, updateInventory } = useGameStore();

  const handlePurchase = (item: StoreItem) => {
    if (coins < item.price) return;

    setCoins(coins - item.price);

    if (item.type === 'healing') {
      updateInventory({ potions: inventory.potions + 1 });
    } else if (item.type === 'xp') {
      updateInventory({ snacks: inventory.snacks + 1 });
    } else if (item.type === 'bundle') {
      updateInventory({ potions: inventory.potions + 3, snacks: inventory.snacks + 1 });
    }
  };

  const canAfford = (price: number) => coins >= price;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Market Store</Text>
          <View style={styles.coinsDisplay}>
            <Text>🪙</Text>
            <Text style={styles.coinsText}>{coins.toLocaleString()}</Text>
          </View>
        </View>

        {/* Store Items */}
        <View style={styles.itemsContainer}>
          {STORE_ITEMS.map((item, index) => (
            <MotiView
              key={item.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100 }}
              style={[
                styles.itemCard,
                canAfford(item.price) ? styles.itemCardAffordable : styles.itemCardUnaffordable,
              ]}
            >
              <View style={styles.itemContent}>
                <View style={styles.itemIcon}>
                  <Text style={styles.itemIconText}>{item.emoji}</Text>
                </View>

                <View style={styles.itemInfo}>
                  <View>
                    <Text style={styles.itemNameText}>{item.name}</Text>
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  </View>

                  <View style={styles.itemFooter}>
                    <View style={styles.priceBadge}>
                      <Text>🪙</Text>
                      <Text style={styles.priceText}>{item.price}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handlePurchase(item)}
                      disabled={!canAfford(item.price)}
                      style={[
                        styles.buyButton,
                        canAfford(item.price) ? styles.buyButtonActive : styles.buyButtonDisabled,
                      ]}
                    >
                      <Text
                        style={[
                          styles.buyButtonText,
                          canAfford(item.price) ? styles.buyButtonTextActive : styles.buyButtonTextDisabled,
                        ]}
                      >
                        BUY
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </MotiView>
          ))}
        </View>

        {/* Inventory */}
        <View style={styles.inventorySection}>
          <Text style={styles.inventoryTitle}>Your Inventory</Text>
          <View style={styles.inventoryRow}>
            <View style={styles.inventoryCard}>
              <Text style={styles.inventoryEmoji}>💚</Text>
              <Text style={styles.inventoryLabel}>Potions</Text>
              <Text style={styles.inventoryCount}>{inventory.potions}</Text>
            </View>
            <View style={styles.inventoryCard}>
              <Text style={styles.inventoryEmoji}>🍕</Text>
              <Text style={styles.inventoryLabel}>Snacks</Text>
              <Text style={styles.inventoryCount}>{inventory.snacks}</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};
