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
import { Archetype } from '@/types/stocklings';
import * as ImageManipulator from 'expo-image-manipulator';

interface Props {
  onScanComplete: (id: string, name: string, brand: string, sector: string, level: number, archetype: Archetype, isAffectedByStorm: boolean) => void;
  onBack: () => void;
}

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
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  scannerCircle: {
    width: 320,
    height: 320,
    borderRadius: 170,
    borderWidth: 2,
    borderColor: colors.blue500,
  },
  innerCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 160,
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
  errorIconText: {
    fontSize: 56,
    bottom: 12,
  },
  errorTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  errorMessage: {
    color: colors.rose400,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
  },
  errorDescription: {
    color: colors.slate400,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue500,
  },
  retryButtonText: {
    fontWeight: '900',
    fontSize: 16,
    color: colors.white,
  },
});


// Compress the photo
const compressPhoto = async (uri: string) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // resize to 800px wide
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
};

// Upload the photo to backend
const uploadPhoto = async (uri: string) => {
  const compressedUri = await compressPhoto(uri);

  const formData = new FormData();
  formData.append('image', {
    uri: compressedUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  } as any);

  formData.append('user_id', 'user_1');

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  try {
    console.log("SENDING TO URL:", `${process.env.EXPO_PUBLIC_API_URL}/api/scan`);
    const response = await fetch(`${API_BASE_URL}/api/scan`, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Creature Captured:', data.creature.personality);
      alert('Creature captured successfully! It cost 1000 coins.');
      return data;
    } else {
      alert(data.error || 'Scan failed');
    }
  } catch (error) {
    console.error('Connection Error:', error);
    alert('Cannot reach server. Check your IP and network.')
  }
};


export const Scanner: React.FC<Props> = ({ onScanComplete, onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedBrand, setDetectedBrand] = useState<string | null>(null);
  const [scanError, setScanError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    const upload = async () => {
        if (photoUri) {
            setIsScanning(true);
            setProgress(0);
            setScanError(false);

            try {
                const result = await uploadPhoto(photoUri);
                if (result) {
                    const id = result.creature.id;
                    const name = result.creature.name;
                    const brand = result.creature.company_name;
                    const ticker = result.creature.ticker;
                    const sector = result.creature.sector;
                    const level = result.creature.level;
                    const personality = result.creature.personality;
                    const isAffectedByStorm = result.market_storm.affected_sector;

                    setDetectedBrand(brand);

                    onScanComplete(
                        id,
                        name,
                        ticker,
                        sector,
                        level,
                        personality as Archetype,
                        isAffectedByStorm
                    );
                } else {
                    setScanError(true);
                }
            } catch (error) {
                console.error('Error occurred while scanning:', error);
            }
        }
    }
    upload();
  }, [photoUri]);

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
        
      }, 1500);
    }
  }, [detectedBrand, progress, onScanComplete]);

  const handleRetry = () => {
    setDetectedBrand(null);
    setScanError(false);
    setProgress(0);
    setIsScanning(false);
  };

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
          {!detectedBrand && !scanError ? (
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
              <Camera buttonPressed={isScanning} setPhotoUri={setPhotoUri} />

              {/* Instructions */}
              <Text style={styles.instructionTitle}>Point at a Product</Text>

              <Text style={styles.instructionText}>
                Point at brand logos to gain new friends
              </Text>

              {/* Scan Button */}
              <TouchableOpacity
                onPress={() => setIsScanning(true)}
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
          ) : scanError ? (
            <View style={styles.detectedContainer}>
              {/* Error Detected */}
              <MotiView
                from={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Text style={styles.errorIconText}>😢</Text>
              </MotiView>

              <Text style={styles.errorTitle}>No Logo Detected</Text>
              <Text style={styles.errorMessage}>Try Again</Text>

              <Text style={styles.errorDescription}>
                Make sure the product is well-lit and the logo is clearly visible
              </Text>

              {/* Retry Button */}
              <TouchableOpacity
                onPress={handleRetry}
                style={styles.retryButton}
              >
                <Text style={styles.retryButtonText}>RETRY SCAN</Text>
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
