# React Native Conversion Summary

## Overview
The Wealthlings web app has been successfully converted to React Native using Expo. This mobile version maintains all the core gameplay features while adapting the UI/UX for mobile screens.

## What Was Converted

### 1. **State Management**
- **From**: React hooks + local state
- **To**: Zustand store (`gameStore.ts`)
- Centralized game state with actions for updates
- Immutable state patterns

### 2. **Components**
Converted all web components to React Native:
- `StocklingCard` - displays individual stockling info with health bar
- `StocklingVisual` - renders animated archetype emoji visuals
- `Scanner` - brand scanning interface
- `BottomTabBar` - mobile navigation tabs

### 3. **Screens**
Created full-screen views:
- `DashboardScreen` - main team view with storm alerts
- `StoreScreen` - purchase potions and items
- `ScannerScreen` - scan brands for new stocklings
- `LabScreen` - view archetype data and team composition

### 4. **Animations**
- **From**: Framer Motion (`motion as Motion`)
- **To**: Moti (`MotiView`)
- Same animation capabilities with React Native support

### 5. **Styling**
- **From**: Tailwind CSS + custom CSS
- **To**: NativeWind (Tailwind CSS for React Native)
- Uses `className` attribute just like web version

### 6. **Navigation**
- **From**: Tab switching with state
- **To**: Tab-based navigation with mobile UI patterns
- Bottom tab bar for easy mobile access

## Project Structure

```
frontend_react_native/
├── src/
│   ├── components/
│   │   ├── StocklingCard.tsx
│   │   ├── StocklingVisual.tsx
│   │   ├── Scanner.tsx
│   │   └── BottomTabBar.tsx
│   ├── screens/
│   │   ├── DashboardScreen.tsx
│   │   ├── StoreScreen.tsx
│   │   ├── ScannerScreen.tsx
│   │   └── LabScreen.tsx
│   ├── store/
│   │   └── gameStore.ts
│   ├── types/
│   │   └── stocklings.ts
│   ├── styles/
│   │   └── global.css
│   └── App.tsx
├── index.js
├── app.json
├── package.json
├── tsconfig.json
├── babel.config.js
├── tailwind.config.js
└── .nativewindrc.json
```

## Key Technology Differences

| Aspect | Web | Mobile |
|--------|-----|--------|
| Framework | React | React Native |
| Build | Vite | Expo |
| Routing | React Router tabs | Bottom tab bar |
| Animations | Framer Motion | Moti |
| Styling | Tailwind CSS | NativeWind |
| Icons | Lucide React | Emojis |
| State | useState + hooks | Zustand |
| Toast/Alerts | Sonner | (Custom implementation ready) |

## Setup & Running

### Prerequisites
```bash
npm install -g expo-cli
```

### Install Dependencies
```bash
cd frontend_react_native
npm install
```

### Run Development
```bash
npm start
```

Scan QR code with:
- **iOS**: Built-in Camera app
- **Android**: Expo Go app

### Build Native
```bash
npm run ios      # iOS
npm run android  # Android
```

## Features Implemented

✅ **Dashboard**
- View team of Stocklings
- Storm alerts and protection
- Heal injured stocklings

✅ **Scanner**
- Brand scanning UI
- Progress bar
- Confetti animation (ready with expo-av)

✅ **Store**
- Purchase potions and snacks
- Inventory display
- Coin balance

✅ **Lab**
- Archetype information
- Team composition stats
- Trait display

✅ **Gameplay Mechanics**
- Diversification shield system
- Storm damage system
- Coin and inventory management
- Health/confidence tracking

## What's Different from Web

### Mobile-Specific Changes
1. **No Camera API yet** - Scanner uses mock brands (integrate `expo-camera` for real scanning)
2. **Tab Navigation** - Mobile-friendly bottom tabs instead of horizontal router
3. **Touch-optimized** - Larger touch targets, mobile-friendly spacing
4. **Emoji Icons** - Using emojis instead of Lucide icons
5. **Responsive** - Adapts to different screen sizes automatically

### Missing Web Features (Easy to Add)
- Actual camera/barcode scanning
- Push notifications (Expo Notifications)
- Sound effects (Expo AV)
- Persistent storage (AsyncStorage)
- Dark mode toggle (already styled for dark)

## Next Steps

### Short Term
1. Install dependencies: `npm install`
2. Run: `npm start`
3. Test on iOS/Android with Expo Go

### Medium Term
1. Add `expo-camera` for real brand scanning
2. Implement `AsyncStorage` for game state persistence
3. Add sound effects with `expo-av`
4. Test on physical devices

### Long Term
1. EAS Build for production releases
2. Backend integration
3. Multiplayer features
4. Push notifications

## Migration Notes

### Code Reuse
- ✅ All type definitions copied as-is
- ✅ Game logic and constants reused
- ✅ Styling adapted but similar approach

### What Required Changes
- ✅ Web components → React Native components
- ✅ HTML → React Native primitives
- ✅ CSS classes → NativeWind classNames
- ✅ Framer Motion → Moti
- ✅ Router → Tab-based navigation
- ✅ Lucide icons → Emojis

## Troubleshooting

### Modules Not Found
```bash
npm install
npm start -- --clear
```

### NativeWind Not Working
```bash
npm install nativewind
npm start -- --clear
```

### Port Already in Use
```bash
npm start -- --port 19000
```

## File Mappings (Web → Mobile)

| Web | Mobile |
|-----|--------|
| `frontend/src/app/App.tsx` | `frontend_react_native/src/App.tsx` |
| `frontend/src/app/components/*` | `frontend_react_native/src/components/*` |
| (UI + tabs combined) | `frontend_react_native/src/screens/*` |
| React hooks | `frontend_react_native/src/store/gameStore.ts` |
| Types | `frontend_react_native/src/types/*` (same) |

## Support & Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **NativeWind**: https://www.nativewind.dev
- **Moti**: https://moti.fyi

---

**Version**: 1.0.0  
**Status**: Ready for development  
**Last Updated**: 2026-01-31
