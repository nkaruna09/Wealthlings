# Environment Setup Instructions

## System Requirements

- **macOS/Linux**: Node.js 18+, npm 8+
- **macOS with iOS**: Xcode Command Line Tools
- **Windows/Android**: Android SDK/Emulator

## Quick Start (macOS)

### 1. Install Node.js
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org
```

### 2. Install Expo CLI
```bash
npm install -g expo-cli
```

### 3. Setup Project
```bash
cd frontend_react_native
npm install
```

### 4. Run Development Server
```bash
npm start
```

### 5. Test on Device/Emulator
- **iOS Simulator**: Press `i` in terminal
- **Android Emulator**: Press `a` in terminal
- **Physical Device**: Scan QR code with Camera (iOS) or Expo Go (Android)

## Installation Guide

### macOS Setup

#### Prerequisites
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Verify installation
xcode-select -p
# Should output: /Applications/Xcode.app/contents/Developer
```

#### Install Node.js
```bash
# Using Homebrew (recommended)
brew install node

# Or using NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Install Expo CLI
```bash
npm install -g expo-cli
```

#### Verify Installation
```bash
expo --version
npm --version
node --version
```

### Windows Setup

#### Prerequisites
- Visual Studio (with C++ build tools) or Build Tools for Visual Studio
- Android SDK/Emulator

#### Install Node.js
```
https://nodejs.org → Download LTS → Run installer
```

#### Install Expo CLI
```bash
npm install -g expo-cli
```

#### Android Emulator Setup
1. Install Android Studio
2. Download SDK through Android Studio
3. Create Virtual Device in AVD Manager

### Linux Setup

#### Prerequisites
```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# Fedora/RHEL
sudo dnf groupinstall "Development Tools"
```

#### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Install Expo CLI
```bash
npm install -g expo-cli
```

## Project Setup

### 1. Install Dependencies
```bash
cd /Users/dana/VSCode/Wealthlings/frontend_react_native
npm install
```

This installs:
- React Native
- Expo SDK
- Animation libraries (Moti)
- State management (Zustand)
- Styling (NativeWind)
- Development tools

### 2. Verify Setup
```bash
npm start
```

You should see:
```
Expo DevTools is running at http://localhost:19002
Opening iOS simulator...
```

### 3. Run on Emulator/Device

**iOS (macOS only)**
```bash
npm run ios
# or press 'i' when server is running
```

**Android**
```bash
npm run android
# or press 'a' when server is running
```

**Expo Go App (Any Device)**
```bash
npm start
# Scan QR code with camera (iOS 11+) or Expo Go app (Android)
```

## Troubleshooting

### Issue: "Command not found: expo"
**Solution**: Install Expo CLI globally
```bash
npm install -g expo-cli
```

### Issue: Port 19000 already in use
**Solution**: Use different port
```bash
npm start -- --port 19001
```

### Issue: iOS Simulator won't open
**Solution**: Start simulator manually
```bash
# Open Simulator first
open -a Simulator

# Then run
npm start
```

### Issue: Android Emulator won't connect
**Solution**: Restart adb
```bash
adb kill-server
adb start-server
npm run android
```

### Issue: Dependencies not found
**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### Issue: Build fails with "NativeWind not found"
**Solution**: Install NativeWind specifically
```bash
npm install nativewind
npm start -- --clear
```

## Development Workflow

### Daily Development
```bash
cd frontend_react_native
npm start

# In another terminal, keep this running
# Open iOS Simulator or Expo Go app
# Code changes hot-reload automatically
```

### Running Type Checker
```bash
npx tsc --noEmit
```

### Building for Distribution
```bash
# Requires EAS account
eas login
eas build --platform ios
eas build --platform android
```

## VS Code Extensions (Recommended)

- **React Native Tools** (Microsoft)
- **Prettier** (Code Formatter)
- **ESLint** (Linting)
- **Thunder Client** (API Testing)
- **Tailwind CSS IntelliSense** (for NativeWind)

Install via:
```bash
code --install-extension vsmobile.vscode-react-native
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension rangav.vscode-thunder-client
code --install-extension bradlc.vscode-tailwindcss
```

## Environment Variables

Create `.env` file in project root:
```
# .env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENVIRONMENT=development
```

Access in code:
```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

## Common Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web (experimental)
npm run web

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Check TypeScript
npx tsc --noEmit

# Clean cache
npm start -- --clear

# Update dependencies
npm update
```

## Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Run development server (`npm start`)
3. ✅ Test on iOS/Android emulator
4. ✅ Make code changes
5. ✅ Watch hot reload in action
6. 🚀 Build and deploy with EAS

## Resources

- **Expo Documentation**: https://docs.expo.dev
- **React Native Guide**: https://reactnative.dev/docs/getting-started
- **NativeWind**: https://www.nativewind.dev
- **Moti Animations**: https://moti.fyi
- **Zustand State**: https://github.com/pmndrs/zustand

## Support

For issues:
1. Check `CONVERSION_GUIDE.md` for conversion details
2. Review `README.md` for project overview
3. Check official documentation links above
4. Test on physical device for real-world behavior

---

**Last Updated**: 2026-01-31  
**Status**: Ready for development
