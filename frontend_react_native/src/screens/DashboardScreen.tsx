// frontend_react_native/src/screens/DashboardScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, FlatList, StyleSheet, TextStyle, Modal, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { useGameStore } from '@/store/gameStore';
import { StocklingCard } from '@/components/StocklingCard';
import { CreatureVisual } from '@/components/CreatureVisual';
import { colors } from '@/constants/colors';

interface Props {
  onNavigate: (tab: string) => void;
}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -0.5,
  } as TextStyle,
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: colors.emerald500,
    letterSpacing: 0.5,
    marginTop: 4,
  } as TextStyle,
  coinsDisplay: {
    backgroundColor: colors.slate800,
    opacity: 0.8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.slate700,
  },
  coinsText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  howToPlayButton: {
    backgroundColor: colors.rose500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 12,
  },
  howToPlayText: { color: colors.white, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.slate950,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate700,
  },
  modalTitle: { fontSize: 20, fontWeight: '900', color: colors.white, marginBottom: 16 },
  modalText: { fontSize: 14, color: colors.slate400, marginBottom: 12 },
  closeButton: {
    backgroundColor: colors.rose500,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  closeButtonText: { color: colors.white, fontWeight: '700' },
  stormAlert: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.indigo900 + '66',
    borderWidth: 1,
    borderColor: colors.indigo500 + '4d',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  stormIcon: {
    width: 56,
    height: 56,
    backgroundColor: colors.indigo500,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stormIconText: {
    fontSize: 24,
  },
  stormContent: {
    flex: 1,
  },
  stormLabel: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: colors.indigo500 + 'ff',
    letterSpacing: 0.5,
  } as TextStyle,
  stormTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.white,
    marginTop: 4,
  } as TextStyle,
  stormDesc: {
    fontSize: 12,
    color: colors.slate400,
    marginTop: 4,
  } as TextStyle,
  teamSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -0.5,
  } as TextStyle,
  potionBadge: {
    backgroundColor: colors.rose500 + '33',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.rose500 + '33',
  },
  potionBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.rose400,
    textTransform: 'uppercase',
  } as TextStyle,
  flatListContent: {
    paddingRight: 24,
  },
  cardWrapper: {
    marginRight: 0,
  },
  deleteButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 40,
    height: 40,
    backgroundColor: colors.slate800,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    borderWidth: 1,
    borderColor: colors.slate700,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  shieldSection: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  shieldSectionActive: {
    backgroundColor: colors.emerald500 + '1a',
    borderWidth: 1,
    borderColor: colors.emerald500 + '33',
  },
  shieldSectionInactive: {
    backgroundColor: colors.slate800 + '66',
    borderWidth: 1,
    borderColor: colors.white + '08',
  },
  shieldContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  shieldIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldIconActive: {
    backgroundColor: colors.emerald500,
  },
  shieldIconInactive: {
    backgroundColor: colors.slate800,
  },
  shieldText: {
    fontWeight: '900',
    color: colors.white,
    fontSize: 14,
    letterSpacing: -0.5,
    marginBottom: 4,
  } as TextStyle,
  shieldSubtext: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate500,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  } as TextStyle,
  shieldBadge: {
    fontSize: 20,
  },
  spacer: {
    height: 80,
  },
});

export const DashboardScreen: React.FC<Props> = ({ onNavigate }) => {
  const {
    stocklings,
    coins,
    inventory,
    isStormActive,
    addCoins,
    updateStockling,
    updateInventory,
    setStormActive,
    applyStormDamage,
    clearStormEffects,
    removeStockling,
  } = useGameStore();

  const uniqueArchetypes = new Set(stocklings.map((s) => s.archetype));
  const hasDiversificationShield = uniqueArchetypes.size >= 3;
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

    const onSell = async (id: string) => {
        try {
            if (!API_BASE_URL) {
                console.error('API_BASE_URL is not set');
                return;
            }

            const result = await fetch(`${API_BASE_URL}/api/creature/${id}/sell`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!result.ok) {
                console.error('Sell request failed:', result.status);
                return;
            }

            const data = await result.json();
            if (data.success && typeof data.value === 'number') {
                const sellPrice = data.value * 10;
                // Ensure sellPrice is a valid number
                if (!isNaN(sellPrice) && isFinite(sellPrice)) {
                    addCoins(Math.floor(sellPrice));
                    removeStockling(id);
                } else {
                    console.error('Invalid sell price calculated:', sellPrice);
                }
            } else {
                console.error('Invalid API response:', data);
            }
        } catch (error) {
            console.error('Error selling creature:', error);
        }
    };

  // Simulate storms
  useEffect(() => {
    const stormTimer = setInterval(() => {
      if (!isStormActive && Math.random() > 0.7) {
        triggerStorm();
      }
    }, 20000);

    const coinTimer = setInterval(() => {
      // Add coins periodically
    }, 60000);

    return () => {
      clearInterval(stormTimer);
      clearInterval(coinTimer);
    };
  }, [isStormActive]);

  const triggerStorm = () => {
    setStormActive(true);
    applyStormDamage();

    setTimeout(() => {
      setStormActive(false);
      clearStormEffects();
    }, 12000);
  };

  const handleHeal = (id: string) => {
    if (inventory.potions <= 0) return;
    updateInventory({ potions: inventory.potions - 1 });
    updateStockling(id, {
      health: Math.min(100, (stocklings.find((s) => s.id === id)?.health || 0) + 50),
      mood: 'happy',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Text style={styles.headerIconText}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Weathlings</Text>
              <Text style={styles.headerSubtitle}>● Market Live</Text>
            </View>
          </View>
          <View style={styles.coinsDisplay}>
            <Text>🪙</Text>
            <Text style={styles.coinsText}>{coins !== undefined && coins !== null ? coins.toString() : '0'}</Text>
          </View>
        </View>

        {/* Storm Alert */}
        {isStormActive && (
          <MotiView
            from={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.stormAlert}
          >
            <MotiView
              from={{ translateY: 0 }}
              animate={{ translateY: -10 }}
              transition={{ type: 'timing', duration: 2000, loop: true }}
              style={styles.stormIcon}
            >
              <Text style={styles.stormIconText}>☁️</Text>
            </MotiView>
            <View style={styles.stormContent}>
              <Text style={styles.stormLabel}>Atmosphere Alert</Text>
              <Text style={styles.stormTitle}>Volatility Fog Inbound</Text>
              <Text style={styles.stormDesc}>High-risk sectors are taking damage</Text>
            </View>
          </MotiView>
        )}

        {/* My Team Section */}
        <View style={styles.teamSection}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamTitle}>My Team</Text>
            {/* Potion Badge */}
            <View style={styles.potionBadge}>
              <Text>💖</Text>
              <Text style={styles.potionBadgeText}>{inventory.potions} Potions</Text>
            </View>
          </View>

          {/* Stockling Cards */}
          <FlatList
            data={stocklings}
            horizontal
            scrollEnabled={stocklings.length > 1}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item, index }) => (
              <MotiView
                from={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
                style={styles.cardWrapper}
              >
                <StocklingCard
                  stockling={item}
                  hasShield={hasDiversificationShield}
                  inventoryPotions={inventory.potions}
                  onHeal={handleHeal}
                  onSell={() => onSell(item.id)} // make sure to pass onSell
                />
              </MotiView>
            )}
          />
        </View>


        {/* Diversification Shield */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={[
            styles.shieldSection,
            hasDiversificationShield ? styles.shieldSectionActive : styles.shieldSectionInactive,
          ]}
        >
          <View style={styles.shieldContent}>
            <MotiView
              from={{ scale: 1 }}
              animate={hasDiversificationShield ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: 'timing', duration: 2000, loop: true }}
              style={[
                styles.shieldIcon,
                hasDiversificationShield ? styles.shieldIconActive : styles.shieldIconInactive,
              ]}
            >
              <Text>⚡</Text>
            </MotiView>
            <View>
              <Text style={styles.shieldText}>
                {hasDiversificationShield ? 'Team Shield: ACTIVE' : 'Team Shield: OFFLINE'}
              </Text>
              <Text style={styles.shieldSubtext}>
                {hasDiversificationShield
                  ? 'Volatility protection online'
                  : 'Collect 3+ archetypes to activate'}
              </Text>
            </View>
          </View>
          {hasDiversificationShield}
        </MotiView>

        {/* How to Play Button (below shield) */}
        <TouchableOpacity
          style={[styles.howToPlayButton, { alignSelf: 'center', marginVertical: 24 }]}
          onPress={() => setShowHowToPlay(true)}
        >
          <Text style={styles.howToPlayText}>How to Play</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <View style={styles.spacer} />

      </ScrollView>

      {/*How to Play Modal*/}
      <Modal transparent visible={showHowToPlay} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How to Play Wealthlings</Text>
            <Text style={styles.modalText}>1️⃣ Collect Wealthlings by exploring the market.</Text>
            <Text style={styles.modalText}>2️⃣ Use potions to heal your Wealthlings.</Text>
            <Text style={styles.modalText}>3️⃣ Diversify your team to activate the Team Shield.</Text>
            <Text style={styles.modalText}>4️⃣ Protect your Wealthlings from storms and market volatility.</Text>
            <Pressable style={styles.closeButton} onPress={() => setShowHowToPlay(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
