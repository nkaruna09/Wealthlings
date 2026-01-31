import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';
import { MotiView } from 'moti';
import { Stockling } from '@/types/stocklings';
import { StocklingVisual } from './StocklingVisual';
import { colors } from '@/constants/colors';

interface Props {
  stockling: Stockling;
  hasShield?: boolean;
  inventoryPotions: number;
  onHeal: (id: string) => void;
}

const styles = StyleSheet.create({
  card: {
    width: 288,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: colors.slate800,
    borderWidth: 1,
    borderColor: colors.slate700,
  },
  cardStorm: {
    backgroundColor: colors.indigo900 + '66',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.indigo500 + '1a',
    zIndex: 10,
  },
  overlayGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.indigo900 + '66',
  },
  shieldBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    borderWidth: 4,
    borderColor: colors.emerald400,
    borderRadius: 24,
  },
  contentView: {
    position: 'relative',
    zIndex: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -0.5,
    lineHeight: 20,
    marginBottom: 4,
  } as TextStyle,
  info: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.slate400,
  } as TextStyle,
  iconBox: {
    backgroundColor: colors.slate800,
    opacity: 0.8,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  visual: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stats: {
    gap: 16,
  },
  healthSection: {
    gap: 6,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: colors.slate400,
  } as TextStyle,
  healthValue: {
    fontSize: 12,
    fontWeight: '700',
  } as TextStyle,
  healthValueLow: {
    color: colors.rose500,
  } as TextStyle,
  healthValueNormal: {
    color: colors.slate200,
  } as TextStyle,
  healthBarContainer: {
    height: 12,
    backgroundColor: colors.slate800,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  healthBar: {
    height: '100%',
    backgroundColor: colors.rose500,
  },
  healthBarLow: {
    backgroundColor: colors.rose400,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: colors.slate400,
  } as TextStyle,
  levelValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  } as TextStyle,
  potionButton: {
    backgroundColor: colors.rose500 + '33',
    borderWidth: 1,
    borderColor: colors.rose500 + '4d',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  potionText: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: colors.rose300,
  } as TextStyle,
});

export const StocklingCard: React.FC<Props> = ({
  stockling,
  hasShield,
  inventoryPotions,
  onHeal,
}) => {
  const healthPercentage = stockling.health;
  const isLowHealth = healthPercentage < 40;
  const isStormAffected = stockling.isAffectedByStorm && !hasShield;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={[styles.card, stockling.isAffectedByStorm && styles.cardStorm]}
    >
      {/* Fog Overlay */}
      {stockling.isAffectedByStorm && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.overlay}
        >
          <View style={styles.overlayGradient} />
        </MotiView>
      )}

      {/* Shield Beam */}
      {stockling.isAffectedByStorm && hasShield && (
        <MotiView
          from={{ opacity: 0.4 }}
          animate={{ opacity: 0.8 }}
          transition={{ type: 'timing', duration: 2000, loop: true }}
          style={styles.shieldBorder}
        />
      )}

      <View style={styles.contentView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{stockling.name}</Text>
            <Text style={styles.info}>
              {stockling.brand} • {stockling.sector}
            </Text>
          </View>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>{stockling.icon}</Text>
          </View>
        </View>

        {/* Visual */}
        <View style={styles.visual}>
          <StocklingVisual
            archetype={stockling.archetype}
            color={stockling.color}
            mood={stockling.mood}
            isAffectedByStorm={isStormAffected}
          />
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {/* Health Bar */}
          <View style={styles.healthSection}>
            <View style={styles.healthHeader}>
              <Text style={styles.healthLabel}>❤️ Confidence</Text>
              <Text style={[styles.healthValue, isLowHealth ? styles.healthValueLow : styles.healthValueNormal]}>
                {healthPercentage}%
              </Text>
            </View>
            <View style={styles.healthBarContainer}>
              <MotiView
                from={{ width: '0%' }}
                animate={{ width: `${healthPercentage}%` }}
                style={[
                  styles.healthBar,
                  isLowHealth && styles.healthBarLow,
                  { width: `${healthPercentage}%` },
                ]}
              />
            </View>
          </View>

          {/* Level */}
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>Level</Text>
            <Text style={styles.levelValue}>{stockling.level}</Text>
          </View>

          {/* Heal Button */}
          {isLowHealth && inventoryPotions > 0 && (
            <TouchableOpacity
              onPress={() => onHeal(stockling.id)}
              style={styles.potionButton}
            >
              <Text style={styles.potionText}>Use Potion ({inventoryPotions})</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </MotiView>
  );
};
