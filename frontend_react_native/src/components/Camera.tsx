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
import * as ImageManipulator from 'expo-image-manipulator';

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
  formData.append('file', {
    uri: compressedUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  } as any);

  try {
    const response = await fetch('https://your-backend.com/upload', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

export function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef(null);

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

  const takePictureAndUpload = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo URI:', photo.uri);

        // compress + send to backend
        await uploadPhoto(photo.uri);

        alert('Photo uploaded successfully!');
      } catch (error) {
        console.error('Failed to upload photo:', error);
      }
    }
  };


  return (
    <View style={styles.container}>
      <CameraView style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.fab} 
            onPress={() => {takePictureAndUpload()}}
          >
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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