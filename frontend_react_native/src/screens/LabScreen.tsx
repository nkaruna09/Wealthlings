import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TextStyle } from 'react-native';
import { MotiView } from 'moti';
import { useGameStore } from '@/store/gameStore';
import { ARCHETYPE_METADATA } from '@/types/stocklings';
import { colors } from '@/constants/colors';

interface Props {
  onNavigate?: (tab: string) => void;
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
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -0.5,
    marginBottom: 8,
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    color: colors.slate400,
  } as TextStyle,
  archetypesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  archetypeCard: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.slate800 + '66',
    borderWidth: 1,
    borderColor: colors.slate700,
    borderRadius: 16,
  },
  archetypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  archetypeName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    flex: 1,
  } as TextStyle,
  countBadge: {
    backgroundColor: colors.blue500 + '33',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.blue500 + '4d',
  },
  countText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.blue400,
  } as TextStyle,
  description: {
    fontSize: 14,
    color: colors.slate400,
    marginBottom: 16,
  } as TextStyle,
  traitsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  trait: {
    backgroundColor: colors.slate700 + '80',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.slate600,
  },
  traitText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate300,
  } as TextStyle,
  compositionSection: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  compositionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 16,
    letterSpacing: -0.5,
  } as TextStyle,
  compositionCard: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.slate800 + '66',
    borderWidth: 1,
    borderColor: colors.slate700,
    borderRadius: 16,
  },
  compositionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  compositionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate400,
  } as TextStyle,
  compositionValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  compositionValueSuccess: {
    color: colors.emerald400,
  } as TextStyle,
  spacer: {
    height: 80,
  },
});

export const LabScreen: React.FC<Props> = ({ onNavigate }) => {
  const { stocklings } = useGameStore();

  const archetypeStats = Object.entries(ARCHETYPE_METADATA).map(([name, metadata]) => ({
    name,
    ...metadata,
    count: stocklings.filter((s) => s.archetype === name).length,
  }));

  const totalStocklings = stocklings.length;
  const uniqueArchetypes = new Set(stocklings.map((s) => s.archetype)).size;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Market Lab</Text>
          <Text style={styles.subtitle}>Explore archetype data</Text>
        </View>

        {/* Archetypes Grid */}
        <View style={styles.archetypesContainer}>
          {archetypeStats.map((archetype, index) => (
            <MotiView
              key={archetype.name}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100 }}
              style={styles.archetypeCard}
            >
              <View style={styles.archetypeHeader}>
                <Text style={styles.archetypeName}>{archetype.name}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{archetype.count}</Text>
                </View>
              </View>

              <Text style={styles.description}>{archetype.description}</Text>

              <View style={styles.traitsContainer}>
                {archetype.traits.map((trait) => (
                  <View key={trait} style={styles.trait}>
                    <Text style={styles.traitText}>{trait}</Text>
                  </View>
                ))}
              </View>
            </MotiView>
          ))}
        </View>

        {/* Team Composition */}
        <View style={styles.compositionSection}>
          <Text style={styles.compositionTitle}>Team Composition</Text>
          <View style={styles.compositionCard}>
            <View style={styles.compositionRow}>
              <Text style={styles.compositionLabel}>Total Stocklings:</Text>
              <Text style={styles.compositionValue}>{totalStocklings}</Text>
            </View>
            <View style={styles.compositionRow}>
              <Text style={styles.compositionLabel}>Unique Archetypes:</Text>
              <Text style={[styles.compositionValue, styles.compositionValueSuccess]}>
                {uniqueArchetypes}/5
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};
