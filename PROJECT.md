# Simflo - Project Documentation

## Overview

**Simflo** is a cross-platform mobile application built with **Expo** (managed React Native workflow). It supports iOS, Android, and Web platforms.

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Expo | ~54.0.32 |
| Runtime | React Native | 0.81.5 |
| UI Library | React | 19.1.0 |
| Language | TypeScript | ~5.9.2 |
| Routing | Expo Router | ~6.0.22 |
| Styling | NativeWind + Tailwind CSS | 4.2.1 / 3.4.19 |
| Navigation | React Navigation | 7.x |
| Animations | React Native Reanimated | ~4.1.1 |

---

## Project Structure

```
simflo/
├── app/                        # Routes (Expo Router - file-based routing)
│   ├── _layout.tsx             # Root layout with Stack navigation
│   ├── index.tsx               # Home screen (/)
│   └── about.tsx               # About screen (/about)
│
├── components/
│   └── ui/                     # Reusable UI components (Shadcn-style)
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       ├── text.tsx
│       ├── textarea.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
│
├── constants/
│   └── theme.ts                # Colors and Fonts configuration
│
├── hooks/
│   ├── use-color-scheme.ts     # Native color scheme hook
│   ├── use-color-scheme.web.ts # Web color scheme hook
│   └── use-theme-color.ts      # Theme color utility hook
│
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
│
├── scripts/
│   └── reset-project.js        # Project reset utility
│
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── components.json             # Shadcn CLI configuration
├── global.css                  # Global Tailwind imports
└── package.json                # Dependencies
```

---

## Dependencies

### Core Expo Packages

| Package | Purpose |
|---------|---------|
| `expo` | Main Expo SDK |
| `expo-router` | File-based routing system |
| `expo-constants` | Access device constants |
| `expo-font` | Load custom fonts |
| `expo-haptics` | Haptic/vibration feedback |
| `expo-image` | Optimized image component |
| `expo-linking` | Deep linking support |
| `expo-splash-screen` | Splash screen control |
| `expo-status-bar` | Status bar customization |
| `expo-web-browser` | In-app web browser |
| `expo-symbols` | SF Symbols for iOS |
| `expo-system-ui` | System UI configuration |

### Navigation

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Core navigation library |
| `@react-navigation/native-stack` | Native stack navigator |
| `@react-navigation/bottom-tabs` | Bottom tab navigator |
| `@react-navigation/elements` | Navigation UI elements |
| `react-native-gesture-handler` | Touch gesture support |
| `react-native-screens` | Native screen optimization |
| `react-native-safe-area-context` | Safe area insets |

### Styling

| Package | Purpose |
|---------|---------|
| `nativewind` | Tailwind CSS for React Native |
| `tailwindcss` | Utility-first CSS framework |
| `tailwind-merge` | Merge Tailwind classes intelligently |
| `class-variance-authority` | Component variant system |
| `clsx` | Conditional class names |

### UI Primitives (RN Primitives)

Accessible, unstyled UI primitives based on Radix UI:

- `@rn-primitives/accordion`
- `@rn-primitives/alert-dialog`
- `@rn-primitives/avatar`
- `@rn-primitives/checkbox`
- `@rn-primitives/collapsible`
- `@rn-primitives/context-menu`
- `@rn-primitives/dialog`
- `@rn-primitives/dropdown-menu`
- `@rn-primitives/hover-card`
- `@rn-primitives/label`
- `@rn-primitives/menubar`
- `@rn-primitives/popover`
- `@rn-primitives/progress`
- `@rn-primitives/radio-group`
- `@rn-primitives/select`
- `@rn-primitives/separator`
- `@rn-primitives/slot`
- `@rn-primitives/switch`
- `@rn-primitives/tabs`
- `@rn-primitives/toggle`
- `@rn-primitives/toggle-group`
- `@rn-primitives/tooltip`

### Icons

| Package | Purpose |
|---------|---------|
| `lucide-react-native` | Modern icon library |
| `@expo/vector-icons` | Expo's built-in icon set |

### Animations

| Package | Purpose |
|---------|---------|
| `react-native-reanimated` | High-performance animations |
| `react-native-worklets` | Worklet support for Reanimated |

---

## Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Lint code
npm run lint

# Reset project
npm run reset-project
```

---

## Configuration Files

### app.json (Expo Config)
- App name: "simflo"
- New Architecture: enabled
- iOS: Tablet support enabled
- Android: Adaptive icons, edge-to-edge mode
- Web: Static output

### babel.config.js
- Preset: `babel-preset-expo` with NativeWind JSX support
- Plugin: `react-native-reanimated/plugin`

### tailwind.config.js
- Content paths: `app/**/*`, `components/**/*`
- Default theme configuration

### tsconfig.json
- Extends: `expo/tsconfig.base`
- Strict mode: enabled
- Path alias: `@/*` → root directory

---

## Platforms Supported

| Platform | Support |
|----------|---------|
| iOS | Yes |
| Android | Yes |
| Web | Yes |

---

## Features

- Cross-platform (iOS, Android, Web)
- File-based routing with Expo Router
- 30+ pre-built UI components
- Dark/Light mode support
- NativeWind styling (Tailwind CSS)
- TypeScript for type safety
- High-performance animations with Reanimated
- Accessible components (ARIA support)
