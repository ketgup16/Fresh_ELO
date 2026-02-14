---
title: Chip
scope: component
status: stable
owner: design-system
last_updated: 2025-02-13
---

## Purpose
Chips represent selectable, compact labels used to categorize content and (optionally) filter a list or dataset. They are interactive toggle buttons that visually indicate selection state.

**Square chips** (default) are used for general selections and categories. **Pill-shaped chips** are specifically designed for filtering use cases.

## Import

```tsx
import { Chip } from "@/components/ui/Chip";
```

## Rules
- **MUST** use the Living Design Chip component (`@/components/ui/Chip`).
- **MUST** use Chips only for **selectable** items (Chips are not static labels — use Tag for that).
- **MUST** keep Chip height consistent; the label **MUST NOT** wrap to multiple lines.
- **SHOULD** use Chips when the set of options is small and easy to scan.
- **MUST NOT** use Chips for navigation. Use Button or Link instead.
- **MUST NOT** use Chips in place of the Tabs pattern. Use Tab Navigation instead.

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Whether the chip is in selected/pressed state |
| `onSelectedChange` | `(selected: boolean) => void` | — | Callback when chip selection changes |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant |
| `variant` | `'default' \| 'primary'` | `'default'` | Visual variant (default = dark fill selected, primary = blue fill selected) |
| `shape` | `'square' \| 'pill'` | `'square'` | Shape variant (square = rounded corners for general use, pill = fully rounded for filters) |
| `iconLeading` | `React.ReactNode` | — | Optional leading icon/content |
| `iconTrailing` | `React.ReactNode` | — | Optional trailing icon/content |
| `disabled` | `boolean` | `false` | Whether the chip is disabled |
| `UNSAFE_className` | `string` | — | Escape hatch for additional CSS classes |
| `UNSAFE_style` | `React.CSSProperties` | — | Escape hatch for inline styles |

All standard `<button>` HTML attributes are also supported (except `className` and `style`).

## Shapes

### square (default)
Rounded corners (`border-radius: 6px`). Use for general selections, categories, and non-filter use cases.

### pill
Fully rounded (`border-radius: 9999px`). Use specifically for filter chips to visually distinguish filtering UI from other selection patterns.

## Variants

### default
Dark fill when selected using input tokens (`--ld-semantic-color-input-fill-activated`). Suitable for neutral filters.

### primary
Walmart blue fill when selected using action tokens (`--ld-semantic-color-action-fill-primary`). Suitable for primary/prominent selections.

## Sizes

| Size | Min Height | Font Size | Padding |
|------|-----------|-----------|---------|
| small | 32px | 14px | 4px 12px |
| medium | 36px | 14px | 6px 16px |
| large | 40px | 16px | 8px 20px |

## States
- **Default** — Unselected, ready for interaction
- **Hover** — Mouse over, subtle background change
- **Focus-visible** — Keyboard focus, visible outline ring
- **Pressed/Active** — Click/tap in progress
- **Selected** — Toggle ON state, inverted/filled colors
- **Disabled** — Non-interactive, reduced opacity

## Design Tokens Used

### Unselected State
| Property | Token |
|----------|-------|
| Background | `--ld-semantic-color-action-fill-secondary` |
| Border | `--ld-semantic-color-action-border-secondary` |
| Text | `--ld-semantic-color-action-text-on-fill-secondary` |

### Selected (default variant)
| Property | Token |
|----------|-------|
| Background | `--ld-semantic-color-input-fill-activated` |
| Border | `--ld-semantic-color-input-border-activated` |
| Text | `--ld-semantic-color-input-indicator-activated` |

### Selected (primary variant)
| Property | Token |
|----------|-------|
| Background | `--ld-semantic-color-action-fill-primary` |
| Border | `--ld-semantic-color-action-fill-primary` |
| Text | `--ld-semantic-color-action-text-on-fill-primary` |

### Focus
| Property | Token |
|----------|-------|
| Outline | `--ld-semantic-color-action-focus-outline` |

## Usage Examples

### Square chip (general selection)
```tsx
const [active, setActive] = React.useState(false);

<Chip selected={active} onSelectedChange={setActive}>
  Category
</Chip>
```

### Pill chip (for filters)
```tsx
const [active, setActive] = React.useState(false);

<Chip shape="pill" selected={active} onSelectedChange={setActive}>
  Filter
</Chip>
```

### Multi-select filter
```tsx
const [filters, setFilters] = React.useState({ open: false, closed: false });

<div role="group" aria-label="Status filters" style={{ display: 'flex', gap: 8 }}>
  <Chip
    shape="pill"
    selected={filters.open}
    onSelectedChange={(v) => setFilters(prev => ({ ...prev, open: v }))}
  >
    Open
  </Chip>
  <Chip
    shape="pill"
    selected={filters.closed}
    onSelectedChange={(v) => setFilters(prev => ({ ...prev, closed: v }))}
  >
    Closed
  </Chip>
</div>
```

### With icons
```tsx
import { Filter } from '@/components/icons';

<Chip shape="pill" iconLeading={<Filter />} selected>
  Filtered
</Chip>
```

### Single-select (radio-like)
```tsx
const [selected, setSelected] = React.useState('featured');
const categories = ['Featured', 'New', 'Sale'];

<div role="group" aria-label="Categories">
  {categories.map(cat => (
    <Chip
      key={cat}
      variant="primary"
      selected={selected === cat.toLowerCase()}
      onSelectedChange={() => setSelected(cat.toLowerCase())}
    >
      {cat}
    </Chip>
  ))}
</div>
```

## Accessibility
- Renders as `<button>` element for proper semantics.
- Uses `aria-pressed` to communicate selected state to screen readers.
- Tab navigates between chips; Space/Enter toggles selection (native button behavior).
- Focus-visible outline meets contrast requirements.
- Group chips with `role="group"` and `aria-label` on the container.

## Best Practices

### Use when
- A small number of filter options where users can toggle one or more.
- Category selection for content filtering.

### Don't use when
- Items are not selectable — use Tag instead.
- Too many items — use Select instead.
- Single exclusive selection from a set — consider Radio.
- Navigation — use Button or Link.
- Tab-based content switching — use Tabs.

## Component Hierarchy
- **Chip**: Interactive, selectable toggle buttons (this component)
- **Tag**: Static, non-interactive labels with optional dismiss
- **Badge**: Non-interactive count/status indicators
