# Wealthlings Mobile App (React Native)

This is the React Native version of the Wealthlings game, converted from the web version.

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
cd frontend_react_native
npm install
# or
yarn install
```

### Running the App

**Development (Expo Go)**
```bash
npm start
```

Then scan the QR code with:
- **iOS**: Use the built-in Camera app
- **Android**: Use the Expo Go app

**iOS Native Build**
```bash
npm run ios
```

**Android Native Build**
```bash
npm run android
```

**Web**
```bash
npm run web
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── StocklingCard.tsx
│   ├── StocklingVisual.tsx
│   ├── Scanner.tsx
│   └── BottomTabBar.tsx
├── screens/             # Full-screen views
│   ├── DashboardScreen.tsx
│   ├── StoreScreen.tsx
│   ├── ScannerScreen.tsx
│   └── LabScreen.tsx
├── store/              # Zustand state management
│   └── gameStore.ts
├── types/              # TypeScript types
│   └── stocklings.ts
├── styles/             # Global styles
│   └── global.css
└── App.tsx            # Main app component
```

## Key Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and SDK
- **Moti**: Animation library
- **Zustand**: State management
- **NativeWind**: Tailwind CSS for React Native
- **TypeScript**: Type safety

## Main Differences from Web Version

1. **Navigation**: Tab-based navigation instead of React Router
2. **Animations**: Using `moti` instead of `framer-motion`
3. **Styling**: NativeWind for responsive design
4. **Components**: Native components instead of HTML/CSS
5. **State Management**: Zustand for global state

## Features

- **Dashboard**: View your team of Stocklings
- **Market Storms**: Random volatility events
- **Scanner**: Scan products to capture new Stocklings
- **Store**: Purchase potions and snacks
- **Lab**: View archetype data and team composition
- **Diversification Shield**: Protect your team with varied archetypes

## Development Notes

- Hot reload is enabled by default with Expo
- All icons are emojis (no external icon library needed)
- Tailwind CSS is compiled for React Native via NativeWind
- State is persisted using Zustand (consider adding AsyncStorage for persistence)

## Future Enhancements

- [ ] Add camera/barcode scanning with Expo Camera
- [ ] Implement persistent storage with AsyncStorage
- [ ] Add sound effects with Expo AV
- [ ] Add push notifications
- [ ] Backend integration for multiplayer features
