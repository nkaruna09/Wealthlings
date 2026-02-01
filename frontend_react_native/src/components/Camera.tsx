import { Image } from 'expo-image';
import { StyleSheet, Pressable, View, Text, Button, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { DarkTheme } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export function Camera({buttonPressed}: {buttonPressed: boolean}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);

  const takePictureAndSave = async () => {
    if (cameraRef.current) {
      try {
        // 1. Take the picture
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo URI (temporary):', photo.uri);

        // 2. Save the image to the media library
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        alert('Image successfully saved to Library!');
        console.log('Image saved to library!');
      } catch (error) {
        console.error('Failed to save image:', error);
      }
    }
  };

  useEffect(() => {
    if (buttonPressed) {
      takePictureAndSave();
    }
  }, [buttonPressed]);

  if (!permission || !mediaLibraryPermission) {
    // Camera permissions are not granted yet
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  if (!mediaLibraryPermission.granted) {
    // Media library permissions are not granted yet
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>We need your permission to save photos</Text>
        <Button onPress={requestMediaLibraryPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} zoom={0.1}>
        <View style={styles.buttonContainer}>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1000,
    width: 305,
    height: 305,
    justifyContent: 'center',
    borderRadius: 400,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 90,
    backgroundColor: '#ffffff', 
    width: 70,
    height: 70,
    borderRadius: 40, 
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});