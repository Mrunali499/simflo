# Simflo - Coding Rules & Guidelines

This document contains coding standards, patterns, and rules to follow when working on the Simflo project.

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [File & Folder Structure](#file--folder-structure)
3. [TypeScript Rules](#typescript-rules)
4. [Component Guidelines](#component-guidelines)
5. [Styling with NativeWind](#styling-with-nativewind)
6. [Navigation & Routing](#navigation--routing)
7. [Imports & Exports](#imports--exports)
8. [Naming Conventions](#naming-conventions)
9. [UI Components Usage](#ui-components-usage)
10. [Platform-Specific Code](#platform-specific-code)
11. [Performance Best Practices](#performance-best-practices)

---

## Project Architecture

### Core Principles

1. **Expo Managed Workflow** - This is NOT a bare React Native project
2. **File-based Routing** - Use Expo Router for navigation
3. **Component-first Design** - Reusable components in `components/ui/`
4. **NativeWind Styling** - Tailwind CSS classes for styling
5. **TypeScript Strict Mode** - Always use proper types

---

## File & Folder Structure

### Rules

```
app/                    # ONLY for route screens
components/ui/          # ONLY for reusable UI components
components/             # Custom app-specific components (create as needed)
constants/              # Configuration values, themes, constants
hooks/                  # Custom React hooks
lib/                    # Utility functions
services/               # API calls, external services (create as needed)
types/                  # TypeScript type definitions (create as needed)
```

### Guidelines

| Type | Location | Example |
|------|----------|---------|
| Screens/Pages | `app/` | `app/profile.tsx` |
| Reusable UI | `components/ui/` | `components/ui/button.tsx` |
| App Components | `components/` | `components/header.tsx` |
| Hooks | `hooks/` | `hooks/use-auth.ts` |
| Utils | `lib/` | `lib/utils.ts` |
| Constants | `constants/` | `constants/theme.ts` |
| API Services | `services/` | `services/api.ts` |
| Types | `types/` | `types/user.ts` |

---

## TypeScript Rules

### Required Practices

```typescript
// GOOD: Always define types
interface UserProps {
  name: string;
  age: number;
  isActive?: boolean;
}

// BAD: Avoid 'any'
const user: any = {}; // Never do this

// GOOD: Use type inference where possible
const count = 10; // TypeScript infers 'number'

// GOOD: Export types separately
export type { UserProps };
```

### Type Definitions

```typescript
// Props types - use 'interface' for component props
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  onPress?: () => void;
  children: React.ReactNode;
}

// Use React.ComponentProps for extending native components
type TextProps = React.ComponentProps<typeof RNText> & {
  variant?: 'h1' | 'h2' | 'p';
};
```

---

## Component Guidelines

### Component Structure

```typescript
// Standard component template
import { cn } from '@/lib/utils';
import { View, Pressable } from 'react-native';

interface ComponentNameProps {
  className?: string;
  // ... other props
}

function ComponentName({ className, ...props }: ComponentNameProps) {
  return (
    <View className={cn('base-classes', className)} {...props}>
      {/* Content */}
    </View>
  );
}

export { ComponentName };
export type { ComponentNameProps };
```

### Rules

1. **Always use functional components** - No class components
2. **Always forward className** - Allow style overrides via `className` prop
3. **Use the `cn()` utility** - For merging Tailwind classes
4. **Export component and types** - Named exports preferred
5. **Props spreading** - Spread remaining props to root element

---

## Styling with NativeWind

### Basic Usage

```typescript
// Import the cn utility
import { cn } from '@/lib/utils';

// GOOD: Use Tailwind classes
<View className="flex-1 bg-background p-4">
  <Text className="text-lg font-bold text-foreground">Hello</Text>
</View>

// GOOD: Conditional classes
<View className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-primary',
  isDisabled && 'opacity-50'
)}>
```

### Class Merging with `cn()`

```typescript
// Always use cn() for combining classes
import { cn } from '@/lib/utils';

// GOOD
<View className={cn('base-styles', props.className)} />

// BAD - Don't concatenate strings
<View className={`base-styles ${props.className}`} />
```

### Platform-Specific Styles

```typescript
import { Platform } from 'react-native';

// GOOD: Use Platform.select for platform differences
const styles = cn(
  'base-class',
  Platform.select({
    web: 'hover:bg-accent cursor-pointer',
    ios: 'active:bg-accent',
    android: 'active:bg-accent',
  })
);
```

### Tailwind Class Order

Follow this order for consistency:
1. Layout (flex, grid, position)
2. Sizing (w, h, min, max)
3. Spacing (m, p, gap)
4. Typography (text, font)
5. Visual (bg, border, shadow)
6. Interactive (hover, active, focus)

```typescript
// GOOD: Organized classes
<View className="flex-1 flex-row items-center justify-center w-full h-12 p-4 gap-2 bg-primary rounded-lg" />
```

---

## Navigation & Routing

### Expo Router Rules

```typescript
// File: app/index.tsx -> Route: /
// File: app/about.tsx -> Route: /about
// File: app/user/[id].tsx -> Route: /user/:id
// File: app/(tabs)/_layout.tsx -> Tab navigation

// Layout file
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
```

### Navigation

```typescript
import { Link, useRouter } from 'expo-router';

// Declarative navigation
<Link href="/about">Go to About</Link>

// Programmatic navigation
const router = useRouter();
router.push('/about');
router.replace('/home');
router.back();
```

---

## Imports & Exports

### Import Order

```typescript
// 1. React/React Native
import * as React from 'react';
import { View, Text, Platform } from 'react-native';

// 2. Third-party libraries
import { cva, type VariantProps } from 'class-variance-authority';

// 3. Expo packages
import { Link } from 'expo-router';

// 4. Internal imports (use @ alias)
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
```

### Path Aliases

Always use `@/` alias for internal imports:

```typescript
// GOOD
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// BAD
import { cn } from '../../../lib/utils';
```

### Export Pattern

```typescript
// Named exports (preferred)
export { ComponentName };
export type { ComponentNameProps };

// Re-exports from index files
export * from './button';
export * from './input';
```

---

## Naming Conventions

### Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `button.tsx`, `alert-dialog.tsx` |
| Hooks | kebab-case with `use-` prefix | `use-color-scheme.ts` |
| Utils | kebab-case | `utils.ts` |
| Constants | kebab-case | `theme.ts` |
| Types | kebab-case | `user-types.ts` |

### Code

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button`, `AlertDialog` |
| Functions | camelCase | `handlePress`, `fetchData` |
| Variables | camelCase | `isLoading`, `userName` |
| Constants | SCREAMING_SNAKE_CASE | `API_URL`, `MAX_ITEMS` |
| Types/Interfaces | PascalCase | `UserProps`, `ButtonVariant` |
| Hooks | camelCase with `use` prefix | `useColorScheme` |

---

## UI Components Usage

### Using CVA (Class Variance Authority)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

// Define variants
const buttonVariants = cva(
  'base-classes rounded-md font-medium', // Base styles
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-white',
        outline: 'border border-input bg-background',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Use in component
type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

function Button({ variant, size, className }: ButtonProps) {
  return (
    <Pressable className={cn(buttonVariants({ variant, size }), className)} />
  );
}
```

### Text Component Usage

```typescript
import { Text } from '@/components/ui/text';

// Use variants for semantic text
<Text variant="h1">Heading</Text>
<Text variant="p">Paragraph text</Text>
<Text variant="muted">Muted text</Text>
```

### Available UI Components

| Component | Import |
|-----------|--------|
| Accordion | `@/components/ui/accordion` |
| Alert | `@/components/ui/alert` |
| AlertDialog | `@/components/ui/alert-dialog` |
| Avatar | `@/components/ui/avatar` |
| Badge | `@/components/ui/badge` |
| Button | `@/components/ui/button` |
| Card | `@/components/ui/card` |
| Checkbox | `@/components/ui/checkbox` |
| Dialog | `@/components/ui/dialog` |
| DropdownMenu | `@/components/ui/dropdown-menu` |
| Input | `@/components/ui/input` |
| Label | `@/components/ui/label` |
| Popover | `@/components/ui/popover` |
| Progress | `@/components/ui/progress` |
| RadioGroup | `@/components/ui/radio-group` |
| Select | `@/components/ui/select` |
| Separator | `@/components/ui/separator` |
| Skeleton | `@/components/ui/skeleton` |
| Switch | `@/components/ui/switch` |
| Tabs | `@/components/ui/tabs` |
| Text | `@/components/ui/text` |
| Textarea | `@/components/ui/textarea` |
| Toggle | `@/components/ui/toggle` |
| Tooltip | `@/components/ui/tooltip` |

---

## Platform-Specific Code

### Using Platform.select()

```typescript
import { Platform } from 'react-native';

// For styles
const styles = cn(
  'common-styles',
  Platform.select({
    web: 'web-specific-styles hover:bg-accent',
    ios: 'ios-specific-styles',
    android: 'android-specific-styles',
    default: 'fallback-styles',
  })
);

// For values
const fontFamily = Platform.select({
  ios: 'system-ui',
  android: 'Roboto',
  web: 'Inter, system-ui',
});
```

### Platform-Specific Files

```
component.tsx         # Shared/default implementation
component.ios.tsx     # iOS-specific
component.android.tsx # Android-specific
component.web.tsx     # Web-specific
```

---

## Performance Best Practices

### Memoization

```typescript
import { memo, useCallback, useMemo } from 'react';

// Memoize expensive components
const ExpensiveComponent = memo(function ExpensiveComponent() {
  return <View />;
});

// Memoize callbacks
const handlePress = useCallback(() => {
  // handler logic
}, [dependencies]);

// Memoize computed values
const computedValue = useMemo(() => {
  return expensiveComputation(data);
}, [data]);
```

### Lists

```typescript
import { FlatList } from 'react-native';

// GOOD: Use FlatList for long lists
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// BAD: Don't map large arrays in JSX
{items.map(item => <ItemComponent key={item.id} item={item} />)}
```

### Animations

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

// Use Reanimated for smooth animations
const offset = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));
```

---

## Do's and Don'ts Summary

### DO

- Use TypeScript strict mode
- Use `cn()` for class merging
- Use path aliases (`@/`)
- Follow component structure template
- Use Expo Router for navigation
- Use NativeWind for styling
- Use Platform.select() for platform differences
- Memoize expensive operations
- Use FlatList for lists

### DON'T

- Don't use `any` type
- Don't concatenate className strings manually
- Don't use relative imports (`../../../`)
- Don't use inline styles (use Tailwind classes)
- Don't use class components
- Don't ignore TypeScript errors
- Don't modify files in `node_modules/`
- Don't commit `.env` files

---

## Quick Reference

### Common Imports

```typescript
// Utils
import { cn } from '@/lib/utils';

// UI Components
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

// Navigation
import { Link, useRouter } from 'expo-router';

// Platform
import { Platform, View, Pressable } from 'react-native';

// Variants
import { cva, type VariantProps } from 'class-variance-authority';
```

### Component Boilerplate

```typescript
import { cn } from '@/lib/utils';
import { View } from 'react-native';

interface MyComponentProps {
  className?: string;
  children?: React.ReactNode;
}

function MyComponent({ className, children, ...props }: MyComponentProps) {
  return (
    <View className={cn('flex-1', className)} {...props}>
      {children}
    </View>
  );
}

export { MyComponent };
export type { MyComponentProps };
```
