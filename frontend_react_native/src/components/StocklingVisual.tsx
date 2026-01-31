import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Archetype } from '@/types/stocklings';
import { colors } from '@/constants/colors';

interface Props {
  archetype: Archetype;
  color: string;
  mood: 'happy' | 'tired' | 'nervous';
  isAffectedByStorm?: boolean;
}

const getArchetypeEmoji = (archetype: Archetype) => {
  switch (archetype) {
    case 'Steady Guardian':
      return '🛡️';
    case 'Trend Chaser':
      return '⚡';
    case 'Giant':
      return '👑';
    case 'Sprinter':
      return '🏃';
    case 'Diversifier':
      return '🌈';
    default:
      return '📊';
  }
};

const createStyles = (color: string) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    visualBox: {
      width: 128,
      height: 128,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${color}33`,
      borderWidth: 2,
      borderColor: color,
    },
    emoji: {
      fontSize: 48,
    },
    label: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.slate400,
      marginTop: 12,
      letterSpacing: 0.5,
    },
  });

export const StocklingVisual: React.FC<Props> = ({
  archetype,
  color,
  mood,
  isAffectedByStorm,
}) => {
  const styles = createStyles(color);

  const getMoodAnimation = () => {
    switch (mood) {
      case 'happy':
        return { scale: 1.05 };
      case 'tired':
        return { scale: 0.95 };
      case 'nervous':
        return { scale: 1.02 };
      default:
        return { scale: 1 };
    }
  };

  return (
    <View style={styles.container}>
      <MotiView
        from={{ scale: 1, opacity: 1 }}
        animate={getMoodAnimation()}
        transition={{ type: 'timing', duration: 2000, loop: true }}
        style={{
          opacity: isAffectedByStorm ? 0.6 : 1,
        }}
      >
        <View style={styles.visualBox}>
          <Text style={styles.emoji}>{getArchetypeEmoji(archetype)}</Text>
        </View>
      </MotiView>

      {/* Archetype Label */}
      <Text style={styles.label}>{archetype.toUpperCase()}</Text>
    </View>
  );
};
