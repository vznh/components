# LED Icon

A customizable 5x5 LED grid icon component with hover animations built with React and Framer Motion.

## Installation

```bash
npm install led-icon
```

## Usage

```tsx
import { LEDIcon } from 'led-icon';

// Define your 5x5 matrix pattern (0 = dormant, 1 = active)
const aboutPattern = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0]
];

function App() {
  return (
    <LEDIcon 
      matrix={aboutPattern} 
      size={32} 
      animated={true} 
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `matrix` | `number[][]` | **required** | 5x5 matrix of 0s and 1s defining the pattern |
| `size` | `number` | `24` | Size in pixels, controls both grid and dot size |
| `animated` | `boolean` | `false` | Enable hover animations |

## Features

- **Pixel-perfect rendering** with consistent sizing across all dimensions
- **Hover animations** with diagonal fade-in effect from bottom-left to top-right
- **Customizable patterns** using 5x5 matrices
- **TypeScript support** with full type definitions
- **Zero dependencies** (except React and Framer Motion as peer dependencies)

## Animation Behavior

When `animated={true}` and on hover:
1. Active dots fade out quickly
2. Brief pause (configurable)
3. Active dots fade in diagonally from bottom-left to top-right

## Examples

### Letter Patterns

```tsx
// Letter "A"
const letterA = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0]
];

// Letter "R"
const letterR = [
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0]
];
```

### Different Sizes

```tsx
<LEDIcon matrix={pattern} size={16} />  // Small
<LEDIcon matrix={pattern} size={24} />  // Default
<LEDIcon matrix={pattern} size={48} />  // Large
<LEDIcon matrix={pattern} size={64} />  // Extra large
```

## Requirements

- React 18+
- Framer Motion 10+

## License

MIT