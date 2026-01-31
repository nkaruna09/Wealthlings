# React Native Conversion - Quick Reference

## 🎯 What Changed

### File Organization
```
Web: frontend/src/app/
Mobile: frontend_react_native/src/
  ├── screens/        (full-screen views)
  ├── components/     (reusable UI components)
  ├── store/          (Zustand state)
  ├── types/          (TypeScript types)
  ├── styles/         (global CSS)
  └── App.tsx         (root component)
```

## 🔄 Key Conversions

### 1. Router → Bottom Tab Navigation
```typescript
// Web
const [activeTab, setActiveTab] = useState('dashboard')
// Rendered inline tabs

// Mobile
const [activeTab, setActiveTab] = useState('dashboard')
// <BottomTabBar /> component
```

### 2. Component Imports
```typescript
// Web
import { AnimatePresence, motion as Motion } from 'framer-motion'

// Mobile
import { MotiView } from 'moti'
```

### 3. Styling
```tsx
// Web
<div className="p-6 bg-slate-800 rounded-lg">

// Mobile
<View className="p-6 bg-slate-800 rounded-lg">
```

### 4. Event Handlers
```tsx
// Web
<button onClick={handler}>Click</button>

// Mobile
<TouchableOpacity onPress={handler}>
  <Text>Click</Text>
</TouchableOpacity>
```

### 5. Lists
```tsx
// Web
{items.map(item => <div key={item.id}>{item}</div>)}

// Mobile
<FlatList
  data={items}
  renderItem={({ item }) => <View>{item}</View>}
  keyExtractor={item => item.id}
/>
```

## 🎨 Styling Comparison

| Web | Mobile |
|-----|--------|
| `<div>` | `<View>` |
| `<span>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` |
| `<input>` | `<TextInput>` |
| `<img>` | `<Image>` / `FastImage` |
| `className="..."` | `className="..."` (NativeWind) |

## 📦 State Management

### Zustand Store Pattern
```typescript
// src/store/gameStore.ts
export const useGameStore = create<GameState>((set) => ({
  stocklings: [],
  coins: 2450,
  
  addStockling: (stockling) => set((state) => ({
    stocklings: [stockling, ...state.stocklings]
  }))
}))

// Usage in component
const { stocklings, addStockling } = useGameStore()
```

## 🎬 Animation Comparison

### Framer Motion (Web) → Moti (Mobile)
```typescript
// Web
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
>

// Mobile
<MotiView
  from={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
>
```

## 🗂️ File Structure Guide

```
src/
├── App.tsx                          # Main app, tab routing
├── index.ts                         # Entry point
│
├── screens/                         # Full-screen views
│   ├── DashboardScreen.tsx
│   ├── StoreScreen.tsx
│   ├── ScannerScreen.tsx
│   └── LabScreen.tsx
│
├── components/                      # Reusable components
│   ├── StocklingCard.tsx
│   ├── StocklingVisual.tsx
│   ├── Scanner.tsx
│   └── BottomTabBar.tsx
│
├── store/                           # State management
│   └── gameStore.ts                 # Zustand store
│
├── types/                           # TypeScript definitions
│   └── stocklings.ts
│
└── styles/
    └── global.css                   # Global Tailwind styles
```

## 🚀 Common Tasks

### Add a New Component
```typescript
// src/components/NewComponent.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { MotiView } from 'moti'

interface Props {
  title: string
}

export const NewComponent: React.FC<Props> = ({ title }) => {
  return (
    <View className="p-4 bg-slate-800 rounded-lg">
      <Text className="text-white font-black">{title}</Text>
    </View>
  )
}
```

### Add a New Screen
```typescript
// src/screens/NewScreen.tsx
import React from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'

interface Props {
  onNavigate?: (tab: string) => void
}

export const NewScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1">
        <Text>New Screen Content</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
```

### Update Global State
```typescript
// In any component
const { coins, addCoins } = useGameStore()

const handleReward = () => {
  addCoins(100)  // Uses Zustand action
}
```

### Add Animation
```typescript
<MotiView
  from={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 500 }}
>
  <Text>Animated content</Text>
</MotiView>
```

## 🎯 Navigation Pattern

```typescript
// src/App.tsx
type TabType = 'dashboard' | 'store' | 'scanner' | 'lab'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen onNavigate={setActiveTab} />
      // ... other cases
    }
  }

  return (
    <View className="flex-1 bg-slate-950">
      {renderScreen()}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  )
}
```

## 🔍 Debugging

### View State in Store
```typescript
// In component
useEffect(() => {
  const subscription = useGameStore.subscribe(
    (state) => console.log('State:', state)
  )
  return () => subscription()
}, [])
```

### Check Props
```typescript
const ComponentDebug: React.FC<Props> = (props) => {
  console.log('Props:', props)
  // ...
}
```

### React Native Debugger
```bash
# Start debugger (Cmd+D on iOS simulator)
# or (Ctrl+M on Android emulator)
```

## 📱 Mobile-Specific Considerations

### Screen Dimensions
```typescript
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
```

### Safe Area
Always wrap screens with:
```typescript
import { SafeAreaView } from 'react-native-safe-area-context'

<SafeAreaView className="flex-1">
  {/* content */}
</SafeAreaView>
```

### Platform-Specific Code
```typescript
import { Platform } from 'react-native'

if (Platform.OS === 'ios') {
  // iOS-specific code
} else {
  // Android-specific code
}
```

## 🐛 Common Issues & Fixes

### TypeScript Errors
```bash
# Update tsconfig.json lib and jsx settings
npm start -- --clear
```

### Hot Reload Not Working
```bash
# Clear cache
npm start -- --clear

# Or restart
rm -rf .expo
npm start
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm start
```

## 📚 Component Cheat Sheet

### Core Components
- `View` - Container (like `<div>`)
- `Text` - Text display (like `<span>`)
- `ScrollView` - Scrollable container
- `FlatList` - Optimized list (like virtualized array)
- `TouchableOpacity` - Button/pressable (like `<button>`)
- `TextInput` - Text input (like `<input>`)
- `Image` - Image display (like `<img>`)
- `SafeAreaView` - Safe from notches/bars

### Styling
- `className` - NativeWind Tailwind classes
- `style` - Inline styles
- Layout: `flexbox` (default, no need for display: flex)
- Colors: Full Tailwind color palette
- Spacing: p-, m-, gap- (same as web)

## 🔗 Related Files

- **Configuration**: `app.json`, `babel.config.js`, `tailwind.config.js`
- **Package Info**: `package.json` (dependencies)
- **Type Definitions**: `src/types/stocklings.ts`
- **State**: `src/store/gameStore.ts`
- **Styling**: `src/styles/global.css`

## 💡 Tips

1. Use emoji icons instead of icon libraries
2. Keep components small and focused
3. Use Zustand for complex state
4. Test on real device, not just simulator
5. Use FlatList for long lists (performance)
6. Keep navigation simple for mobile UX

---

**Quick Links**:
- [README.md](./README.md) - Project overview
- [CONVERSION_GUIDE.md](./CONVERSION_GUIDE.md) - Detailed conversion info
- [SETUP.md](./SETUP.md) - Environment setup

**Need Help?**
- Check the web version: `frontend/src/`
- Check similar components for patterns
- Read Expo docs: https://docs.expo.dev
