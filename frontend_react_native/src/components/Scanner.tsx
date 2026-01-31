import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { MotiView } from 'moti';
import { Camera } from './Camera';
import { colors } from '@/constants/colors';

interface Props {
  onScanComplete: (brand: string) => void;
  onBack: () => void;
}

const BRAND_MOCKS = ['NIKE', 'APPLE', 'STARBUCKS', 'TESLA', 'DISNEY'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate950,
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    padding: 12,
  },
  backButtonText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
  },
  spacer: {
    width: 40,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  scannerCircle: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 2,
    borderColor: colors.blue500,
  },
  innerCircle: {
    position: 'absolute',
    width: 224,
    height: 224,
    borderRadius: 112,
    borderWidth: 4,
    borderColor: colors.blue400,
    opacity: 0.6,
  },
  iconView: {
    position: 'absolute',
  },
  iconText: {
    fontSize: 60,
  },
  instructionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 64,
    marginBottom: 32,
  },
  instructionText: {
    color: colors.slate400,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  scanButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonActive: {
    backgroundColor: colors.blue500,
  },
  scanButtonDisabled: {
    backgroundColor: colors.slate700,
  },
  scanButtonTextActive: {
    fontWeight: '900',
    fontSize: 18,
    color: colors.white,
  },
  scanButtonTextDisabled: {
    fontWeight: '900',
    fontSize: 18,
    color: colors.slate400,
  },
  detectedContainer: {
    alignItems: 'center',
    width: '100%',
  },
  successCheckbox: {
    width: 96,
    height: 96,
    borderRadius: 36,
    backgroundColor: `${colors.emerald500}33`,
    borderWidth: 2,
    borderColor: colors.emerald500,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  checkText: {
    fontSize: 56,
  },
  detectedTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  brandName: {
    color: colors.emerald400,
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 32,
  },
  progressBarContainer: {
    width: '100%',
    maxWidth: 320,
    height: 12,
    backgroundColor: colors.slate800,
    borderRadius: 9999,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.emerald500,
  },
  progressText: {
    color: colors.slate400,
    fontSize: 14,
    fontWeight: '700',
  },
});

export const Scanner: React.FC<Props> = ({ onScanComplete, onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedBrand, setDetectedBrand] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    const delay = 1500 + Math.random() * 1500;

    setTimeout(() => {
      const randomBrand = BRAND_MOCKS[Math.floor(Math.random() * BRAND_MOCKS.length)];
      setDetectedBrand(randomBrand);
    }, delay);
  };

  useEffect(() => {
    if (detectedBrand && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1.5;
          return next > 100 ? 100 : next;
        });
      }, 30);

      return () => clearInterval(interval);
    }

    if (progress === 100 && detectedBrand) {
      setTimeout(() => {
        onScanComplete(detectedBrand);
      }, 1500);
    }
  }, [detectedBrand, progress, onScanComplete]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentView}>
        {/* Header */}
        <View style={styles.headerView}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Brand Scanner</Text>
          <View style={styles.spacer} />
        </View>

        {/* Scanner View */}
        <View style={styles.scannerContainer}>
          {!detectedBrand ? (
            <View style={styles.itemsCenter}>
              {/* Scanner Circle */}
              <MotiView
                from={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.1, opacity: 0.5 }}
                transition={{ type: 'timing', duration: 1500, loop: true }}
                style={styles.scannerCircle}
              />

              <View style={styles.innerCircle} />

              {/* Scanner Icon */}
              <Camera />

              {/* Instructions */}
              <Text style={styles.instructionTitle}>Point at a Product</Text>

              <Text style={styles.instructionText}>
                Scan product barcodes or point at brand logos to extract their market DNA
              </Text>

              {/* Scan Button */}
              <TouchableOpacity
                onPress={startScan}
                disabled={isScanning}
                style={[
                  styles.scanButton,
                  isScanning ? styles.scanButtonDisabled : styles.scanButtonActive,
                ]}
              >
                <Text
                  style={
                    isScanning ? styles.scanButtonTextDisabled : styles.scanButtonTextActive
                  }
                >
                  {isScanning ? 'SCANNING...' : 'START SCAN'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.detectedContainer}>
              {/* Brand Detected */}
              <MotiView
                from={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <View style={styles.successCheckbox}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              </MotiView>

              <Text style={styles.detectedTitle}>Brand Detected!</Text>
              <Text style={styles.brandName}>{detectedBrand}</Text>

              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <MotiView
                  from={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'timing', duration: 30 }}
                  style={[styles.progressBar, { width: `${progress}%` }]}
                />
              </View>

              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
