import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Stockling } from '@/types/stocklings';
import { CreatureVisual } from './CreatureVisual';
import { colors } from '@/constants/colors';
import { Moon, Sparkles, Shield, Trophy } from 'lucide-react-native';

interface Props {
  stockling: Stockling;
  inventoryPotions: number;
  onHeal: (id: string) => void;
  onSell: () => void;
  hasShield: boolean;
}

export const StocklingCard: React.FC<Props> = ({
  stockling,
  inventoryPotions,
  onHeal,
  onSell,
  hasShield,
}) => {
  const isLowHealth = stockling.health < 40;
  const healthColor = isLowHealth ? colors.rose500 : colors.emerald400;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={[styles.card, stockling.isAffectedByStorm && { backgroundColor: colors.indigo900 + '30' }]}
    >
      {/* Storm Overlay */}
      {stockling.isAffectedByStorm && !hasShield && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.stormOverlay}
        >
          <Moon color={colors.indigo500 + '80'} size={32} />
        </MotiView>
      )}

      {/* Shield Indicator */}
      {hasShield && stockling.isAffectedByStorm && (
        <View style={styles.shieldBadge}>
          <Shield color={colors.emerald400} size={20} />
        </View>
      )}

      {/* Header: Name & Brand */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{stockling.name}</Text>
          <Text style={styles.brand}>
            {stockling.brand} • {stockling.sector}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.sellButton} onPress={onSell}>
            <Text style={styles.sellText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Creature Visual */}
      <View style={styles.visual}>
        <CreatureVisual
          stockling={stockling}
          size="md"
          isAffectedByStorm={stockling.isAffectedByStorm && !hasShield}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        {/* Confidence / Health Bar */}
        <View style={styles.statRow}>
          <View style={styles.statLabel}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Sparkles color={healthColor} size={14} />
              <Text style={styles.statLabelText}>Confidence</Text>
            </View>
            <Text style={[styles.statValue, { color: healthColor }]}>
              {Math.round(stockling.health)}%
            </Text>
          </View>
          <View style={styles.healthBarContainer}>
            <MotiView
              from={{ width: '0%' }}
              animate={{ width: `${stockling.health}%` }}
              style={[styles.healthBar, { backgroundColor: healthColor }]}
            />
          </View>
          <Text style={styles.healthDescription}>
            {stockling.isAffectedByStorm
              ? "Resting helps friends grow even stronger!"
              : "Your friend is feeling great and learning lots!"}
          </Text>
        </View>

        {/* Level + Heal Row */}
        <View style={styles.bottomRow}>
          {/* Level */}
          <View style={styles.levelRow}>
            <Trophy color={'#facc15'} size={16} />
            <Text style={styles.levelText}>LEVEL {stockling.level}</Text>
          </View>

          {/* Right-side Actions */}
          <View style={styles.actionsRight}>
            {inventoryPotions > 0 && stockling.health < 100 && (
              <TouchableOpacity style={styles.healButton} onPress={() => onHeal(stockling.id)}>
                <Sparkles color={colors.white} size={14} />
                <Text style={styles.healText}>Heal</Text>
              </TouchableOpacity>
            )}
            {hasShield && stockling.isAffectedByStorm && (
              <View style={styles.shieldBox}>
                <Shield color={'#818cf8'} size={16} />
              </View>
            )}
          </View>
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    padding: 16,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: colors.slate800,
    borderWidth: 1,
    borderColor: colors.slate700,
  },
  stormOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  shieldBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.emerald500 + '30',
    borderRadius: 16,
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
  },
  brand: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: colors.slate400,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.slate800 + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellButton: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.rose500 + '4d',
    backgroundColor: colors.rose500 + '10',
  },
  sellText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.rose300,
    textTransform: 'uppercase',
  },
  visual: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statsSection: {
    width: '100%',
    gap: 10,
  },
  statRow: {
    width: '100%',
    marginBottom: 8,
  },
  statLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statLabelText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: colors.slate400,
  },
  statValue: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.white,
  },
  healthBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.slate900,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.slate700,
    marginBottom: 4,
  },
  healthBar: {
    height: '100%',
    borderRadius: 4,
  },
  healthDescription: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.slate500,
    marginTop: 2,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.white,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  healButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.emerald500,
    borderRadius: 16,
  },
  healText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.white,
    textTransform: 'uppercase',
  },
  shieldBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.indigo500 + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
