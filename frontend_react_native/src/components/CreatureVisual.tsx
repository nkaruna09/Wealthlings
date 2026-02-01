import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { Stockling } from '@/types/stocklings';
import { colors } from '@/constants/colors';

interface CreatureProps {
  stockling: Stockling;
  size?: 'sm' | 'md' | 'lg';
  isAffectedByStorm?: boolean;
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 16,
    },
    creatureBodyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    sickLabel: {
      position: 'absolute',
      top: -40,
      backgroundColor: '#fee2e2',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      zIndex: 10,
    },
    sickLabelText: {
      fontSize: 10,
      fontWeight: '900',
      color: '#dc2626',
      textTransform: 'uppercase',
    },

    // Speed-Runner styles
    speedRunnerBody: {
      width: 96,
      height: 96,
      backgroundColor: colors.blue500,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
    speedRunnerEye: {
      width: 16,
      height: 16,
      backgroundColor: colors.white,
      borderRadius: 8,
      position: 'absolute',
    },
    speedRunnerLeftEye: {
      top: 24,
      left: 24,
    },
    speedRunnerRightEye: {
      top: 24,
      right: 24,
    },
    speedRunnerMouth: {
      width: 48,
      height: 16,
      backgroundColor: '#1e3a8a',
      borderRadius: 8,
      marginTop: 32,
      opacity: 0.5,
    },
    speedRunnerLegs: {
      position: 'absolute',
      bottom: -8,
      left: 0,
      right: 0,
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    speedRunnerLeg: {
      width: 16,
      height: 8,
      backgroundColor: '#93c5fd',
      borderRadius: 4,
    },

    // Caffeine-Sprite styles
    caffeineBody: {
      width: 96,
      height: 96,
      backgroundColor: '#15803d',
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    caffeineEye: {
      width: 12,
      height: 12,
      backgroundColor: colors.white,
      borderRadius: 6,
      position: 'absolute',
    },
    caffeineLeftEye: {
      top: 24,
      left: 24,
    },
    caffeineRightEye: {
      top: 24,
      right: 24,
    },
    caffeineAura: {
      position: 'absolute',
      width: 64,
      height: 64,
      backgroundColor: '#86efac',
      borderRadius: 32,
      opacity: 0.3,
      top: -16,
    },

    // iCore-Golem styles
    golmBody: {
      width: 96,
      height: 96,
      backgroundColor: '#9ca3af',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4,
      borderColor: '#6b7280',
    },
    golemScreen: {
      width: 64,
      height: 48,
      backgroundColor: '#d1d5db',
      borderRadius: 4,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    golemLed: {
      width: 8,
      height: 8,
      backgroundColor: '#60a5fa',
      borderRadius: 4,
    },

    // Volt-Dragon styles
    dragonBody: {
      width: 96,
      height: 80,
      backgroundColor: '#b45309',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    dragonZap: {
      fontSize: 32,
      marginBottom: 8,
    },
    dragonTail: {
      position: 'absolute',
      width: 16,
      height: 32,
      backgroundColor: '#92400e',
      borderRadius: 8,
      bottom: -32,
    },
    dragonLeftTail: {
      left: 16,
      transform: [{ rotate: '48deg' }],
    },
    dragonRightTail: {
      right: 16,
      transform: [{ rotate: '-48deg' }],
    },

    // Golden-Archie styles
    archieBody: {
      width: 96,
      height: 96,
      backgroundColor: '#991b1b',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    archieStar: {
      fontSize: 48,
    },
    archieGlow: {
      width: 24,
      height: 24,
      backgroundColor: '#fbbf24',
      borderRadius: 12,
      position: 'absolute',
    },
    archieLeftGlow: {
      top: 8,
      left: 16,
    },
    archieRightGlow: {
      top: 8,
      right: 16,
    },

    // Generic fallback
    fallbackBody: {
      width: 96,
      height: 96,
      backgroundColor: '#cbd5e1',
      borderRadius: 48,
    },

    // Name and info section
    infoSection: {
      alignItems: 'center',
      marginTop: 8,
    },
    name: {
      fontSize: 14,
      fontWeight: '900',
      color: colors.white,
    },
    archetype: {
      fontSize: 8,
      fontWeight: '900',
      textTransform: 'uppercase',
      color: colors.slate500,
      letterSpacing: 0.5,
      marginTop: 4,
    },

    // Stats section
    statsSection: {
      width: '100%',
      maxWidth: 120,
      marginTop: 16,
      gap: 12,
    },
    statRow: {
      gap: 8,
    },
    statLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statLabelText: {
      fontSize: 8,
      fontWeight: '900',
      textTransform: 'uppercase',
      color: colors.slate400,
      letterSpacing: 0.3,
    },
    statValue: {
      fontSize: 8,
      fontWeight: '900',
      color: colors.white,
    },
    healthBarContainer: {
      width: '100%',
      height: 4,
      backgroundColor: colors.slate900,
      borderRadius: 2,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.slate700,
    },
    healthBar: {
      height: '100%',
      borderRadius: 2,
    },

    icon: {
      width: 8,
      height: 8,
    },

    healthGood: {
      color: colors.emerald400,
    },
    healthBad: {
      color: '#f87171',
    },
  });

export const CreatureVisual: React.FC<CreatureProps> = ({ stockling, size = 'md' }) => {
  const styles = createStyles();
  const scale = size === 'sm' ? 0.6 : size === 'lg' ? 1.5 : 1;
  const isHealthLow = stockling.health < 30;
  const healthColor = isHealthLow ? '#f87171' : colors.emerald400;

  const renderCreatureBody = () => {
    switch (stockling.archetype) {
      case 'Sprinter':
        // Animate legs back-and-forth
        return (
          <View style={styles.speedRunnerBody}>
            <View style={[styles.speedRunnerEye, styles.speedRunnerLeftEye]} />
            <View style={[styles.speedRunnerEye, styles.speedRunnerRightEye]} />
            <View style={styles.speedRunnerMouth} />
            <MotiView
              from={{ translateX: -6 }}
              animate={{ translateX: 6 }}
              transition={{ type: 'timing', duration: 400, loop: true, repeatReverse: true }}
              style={styles.speedRunnerLegs}
            >
              <View style={styles.speedRunnerLeg} />
              <View style={styles.speedRunnerLeg} />
            </MotiView>
          </View>
        );

      case 'Trend Chaser':
        // Aura pulsates and rotates
        return (
          <View style={styles.caffeineBody}>
            <View style={[styles.caffeineEye, styles.caffeineLeftEye]} />
            <View style={[styles.caffeineEye, styles.caffeineRightEye]} />
            <MotiView
              from={{ transform: [{ scale: 1 }, { rotate: '0deg' }] }}
              animate={{ transform: [{ scale: 1.05 }, { rotate: '10deg' }] }}
              transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
              style={styles.caffeineAura}
            />
          </View>
        );

      case 'Giant':
        // Screen LEDs blinking
        return (
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{ type: 'timing', duration: 3000, loop: true, repeatReverse: true }}
            style={styles.golmBody}
          >
            <View style={styles.golemScreen}>
              <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 600, loop: true, repeatReverse: true }}
                style={styles.golemLed}
              />
              <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 600, delay: 300, loop: true, repeatReverse: true }}
                style={styles.golemLed}
              />
            </View>
          </MotiView>
        );

      case 'Steady Guardian':
        // Dragon body bobbing
        return (
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: -12 }}
            transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
            style={styles.dragonBody}
          >
            <Text style={styles.dragonZap}>⚡</Text>
            <View style={[styles.dragonTail, styles.dragonLeftTail]} />
            <View style={[styles.dragonTail, styles.dragonRightTail]} />
          </MotiView>
        );

      case 'Diversifier':
        // Archie pulsing
        return (
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ type: 'timing', duration: 800, loop: true, repeatReverse: true }}
            style={styles.archieBody}
          >
            <Text style={styles.archieStar}>⭐</Text>
            <View style={[styles.archieGlow, styles.archieLeftGlow]} />
            <View style={[styles.archieGlow, styles.archieRightGlow]} />
          </MotiView>
        );

      default:
        return <View style={styles.fallbackBody} />;
    }
  };


  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -8 }}
        transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
        style={[styles.creatureBodyContainer, { paddingTop: 32 }]}
      >
        {/* Sick label */}
        {stockling.mood === 'nervous' && (
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.sickLabel}
          >
            <Text style={styles.sickLabelText}>Feeling Sick...</Text>
          </MotiView>
        )}
        {/* Creature body */}
        {renderCreatureBody()}
      </MotiView>  

      <View style={styles.infoSection}>
        <Text style={styles.name}>{stockling.name}</Text>
        <Text style={styles.archetype}>{stockling.archetype}</Text>
      </View>
  
    </View>
  );
};
