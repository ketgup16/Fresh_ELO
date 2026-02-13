# Icon Button Component

## Overview

The `IconButton` component is used for actions represented by a single icon. It provides consistent sizing, styling, and interaction states for icon-only buttons.

## Component Reference

See `/components/ui/IconButton.tsx` for the complete implementation.

## Basic Usage

### Icon Requirements

- **MUST use `lucide-react` icons** as children
- The icon is passed as children, not via a prop
- Icon size must match the button size for proper visual alignment

### Import

```tsx
import { IconButton } from '@/components/ui/IconButton';
import { Search, Menu, X, Settings } from 'lucide-react';
```

## Size Prop and Icon Sizing

The `IconButton` component accepts a `size` prop with four values: `xsmall`, `small`, `medium`, and `large`.

**CRITICAL**: You must provide the appropriate `size` prop to the lucide-react icon to match the button size.

### Size Mapping

| Button Size | Icon Size (lucide-react) | Usage |
|-------------|--------------------------|-------|
| `xsmall`    | `size={16}`             | Compact UIs, inline actions |
| `small`     | `size={16}`             | Standard compact actions |
| `medium`    | `size={24}`             | Default size for most actions |
| `large`     | `size={32}`             | Prominent actions, hero sections |

## Examples

### Correct Usage

```tsx
// Small icon button
<IconButton size="small" aria-label="Search">
  <Search size={16} />
</IconButton>

// Medium icon button (default)
<IconButton size="medium" aria-label="Open menu">
  <Menu size={24} />
</IconButton>

// Large icon button
<IconButton size="large" aria-label="Close">
  <X size={32} />
</IconButton>

// Extra small icon button
<IconButton size="xsmall" aria-label="Settings">
  <Settings size={16} />
</IconButton>
```

### Incorrect Usage

```tsx
// ❌ Wrong: Icon size doesn't match button size
<IconButton size="large" aria-label="Search">
  <Search size={16} />
</IconButton>

// ❌ Wrong: Missing icon size
<IconButton size="medium" aria-label="Menu">
  <Menu />
</IconButton>

// ❌ Wrong: Using non-lucide icon
<IconButton size="medium" aria-label="Custom">
  <svg>...</svg>
</IconButton>

// ❌ Wrong: Missing aria-label
<IconButton size="medium">
  <Search size={24} />
</IconButton>
```

## Accessibility Requirements

### aria-label is REQUIRED

Icon buttons have no visible text, so they **MUST** include an `aria-label` to describe the action:

```tsx
<IconButton size="medium" aria-label="Open navigation menu">
  <Menu size={24} />
</IconButton>
```

### Alternative: aria-labelledby

If the button's purpose is described by nearby text, you can use `aria-labelledby`:

```tsx
<div>
  <span id="search-label">Search</span>
  <IconButton size="small" aria-labelledby="search-label">
    <Search size={16} />
  </IconButton>
</div>
```

## Common Patterns

### Navigation Actions

```tsx
<IconButton size="medium" aria-label="Go back">
  <ArrowLeft size={24} />
</IconButton>

<IconButton size="medium" aria-label="Open menu">
  <Menu size={24} />
</IconButton>
```

### Form Actions

```tsx
<IconButton size="small" aria-label="Clear input">
  <X size={16} />
</IconButton>

<IconButton size="small" aria-label="Search">
  <Search size={16} />
</IconButton>
```

### Toggle States

```tsx
// Use state to toggle icon
const [isOpen, setIsOpen] = useState(false);

<IconButton 
  size="medium" 
  aria-label={isOpen ? "Close panel" : "Open panel"}
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? <X size={24} /> : <Menu size={24} />}
</IconButton>
```

### With Disabled State

```tsx
<IconButton 
  size="medium"
  aria-label="Delete item"
  disabled={!canDelete}
>
  <Trash size={24} />
</IconButton>
```

## Quick Reference Table

| Button Size | Icon Size | Example |
|-------------|-----------|---------|
| `xsmall` | `16` | `<IconButton size="xsmall"><Icon size={16} /></IconButton>` |
| `small` | `16` | `<IconButton size="small"><Icon size={16} /></IconButton>` |
| `medium` | `24` | `<IconButton size="medium"><Icon size={24} /></IconButton>` |
| `large` | `32` | `<IconButton size="large"><Icon size={32} /></IconButton>` |

## Checklist

When using IconButton, ensure:

- [ ] Icon is from `lucide-react` package
- [ ] Icon size matches button size (see table above)
- [ ] `aria-label` or `aria-labelledby` is provided
- [ ] Button size is appropriate for the context
- [ ] Icon semantically represents the action
