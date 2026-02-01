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
      console.log('Creature Captured:', data.creature);
      return data;
    } else {
      alert(data.error || 'Scan failed');
    }
  } catch (error) {
    console.error('Connection Error:', error);
    alert('Cannot reach server. Check your IP and network.')
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
      {/* The CameraView is now a sibling, not a parent */}
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        ref={cameraRef} 
      />
      
      {/* This View sits ON TOP of the camera */}
      <View style={styles.buttonContainer} pointerEvents="box-none">
        <TouchableOpacity 
          style={styles.fab} 
          onPress={takePictureAndUpload}
        >
          {/* The button visual */}
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 35, borderWeight: 4, borderColor: '#ddd' }} />
        </TouchableOpacity>
      </View>
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