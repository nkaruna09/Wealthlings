#!/bin/bash

# Setup script for Wealthlings React Native
# This script installs all dependencies and prepares the project

echo "🎮 Wealthlings React Native Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g expo-cli
fi

echo "✅ Expo CLI installed"
echo ""

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 To start development:"
    echo "   npm start"
    echo ""
    echo "📱 To run on specific platform:"
    echo "   npm run ios      (iOS simulator)"
    echo "   npm run android  (Android emulator)"
    echo ""
    echo "Happy coding! 🎉"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
