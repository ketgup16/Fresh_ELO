# Theme Inheritance Model

## Overview

This theme system uses a layered inheritance model where themes extend base themes and add overrides.

## Inheritance Structure

```
BASE THEME (ld- prefix)
├── LD 3.5 Core Tokens
└── Developer Tokens (included in base)
    │
    ├─→ WCP THEME (wcp- prefix)
    │   ├── Base tokens (inherited)
    │   ├── WCP-specific tokens
    │   └── Customer Overrides (persona)
    │       └─→ Used by: Walmart B2B
    │
    ├─→ DATA VENTURES THEME
    │   ├── Base tokens (inherited)
    │   └── Partner Overrides (persona)
    │
    └─→ STANDALONE THEMES (full override sets)
        ├── Sam's Club
        ├── Bodega
        ├── Walmart Legacy
        ├── Walmart W+
        ├── Cashi MX
        ├── Sparky
        └── Member's Mark
```

## Theme Personas

### Developer (in Base)
- **Target**: Internal developers and associates
- **Location**: `themes/base/` (ld- prefix)
- **Characteristics**: Standard Living Design 3.5 tokens
- **Magic gradient**: Uses green middle (#a4fb6c)

### Customer (in WCP)
- **Target**: External customers
- **Location**: Overrides in `themes/wcp/`
- **Inherits from**: Base (Developer)
- **Overrides**: Customer-specific UX adjustments

### Partner (in Data Ventures)
- **Target**: Partner portal users
- **Location**: Overrides in `themes/data-ventures/`
- **Inherits from**: Base (Developer)
- **Overrides**: Partner-specific brand colors and UX

## Active Themes

### Walmart B2B (Business)
- **Inherits from**: Base + WCP
- **File**: `themes/walmart-b2b/semantic.css`
- **Overrides**: 30 tokens (darker navy blue brand)
- **Use case**: Business/B2B experience

### WCP (Walmart Commerce Platform)
- **Inherits from**: Base (Developer)
- **File**: `themes/wcp/semantic.css`
- **Contains**: WCP tokens (wcp- prefix) + Customer overrides
- **Use case**: Commerce platform with customer persona

### Data Ventures
- **Inherits from**: Base (Developer)
- **File**: `themes/data-ventures/semantic.css`
- **Contains**: Partner overrides
- **Use case**: Data/analytics platform for partners

### Sam's Club
- **Inherits from**: Base
- **File**: `themes/sams-club/semantic.css`
- **Brand color**: Blue (#0062ad)
- **Font**: Gibson

### Bodega (Walmart Mexico)
- **Inherits from**: Base
- **File**: `themes/bodega/semantic.css`
- **Brand color**: Green (#2c981d)
- **Use case**: Mexico market

### Walmart Legacy
- **Inherits from**: Base
- **File**: `themes/walmart-legacy/semantic.css`
- **Brand color**: Classic Walmart blue (#0071dc)
- **Font**: Bogle (legacy font family)

### Walmart W+ (Plus)
- **Inherits from**: Base
- **File**: `themes/walmart-plus/semantic.css`
- **Warning colors**: Yellow-based instead of spark
- **Use case**: Walmart+ membership

### Cashi MX
- **Inherits from**: Base
- **File**: `themes/cashi-mx/semantic.css`
- **Brand color**: Purple (#6212b2)
- **Use case**: Mexico financial services

### Sparky (Internal)
- **Inherits from**: Base
- **File**: `themes/sparky/semantic.css`
- **Brand color**: Dark navy (#001e60)
- **Background**: Cyan subtle backgrounds
- **Use case**: Internal tools

### Member's Mark
- **Inherits from**: Base
- **File**: `themes/members-mark/semantic.css`
- **Brand color**: Dark gray (#283645)
- **Top nav**: Beige (#fcf6f0)
- **Use case**: Member's Mark private label

## Token Prefixes

### `ld-` (Living Design)
- Standard LD 3.5 tokens
- Available in ALL themes
- Example: `--ld-semantic-color-action-fill-primary`

### `wcp-` (Walmart Commerce Platform)
- Extended tokens for commerce features
- Available in: WCP, Walmart B2B, and WCP-derived themes
- Example: `--wcp-semantic-color-action-fill-primary-alt`

## Usage in Code

```tsx
// Components automatically use theme tokens via CSS variables
<Button variant="primary">
  {/* Uses --ld-semantic-color-action-fill-primary */}
  {/* In base: #0053e2 (Walmart blue) */}
  {/* In walmart-b2b: #002e99 (Navy) */}
  {/* In bodega: #2c981d (Green) */}
</Button>
```

## Adding a New Theme

1. Create directory: `themes/your-theme/`
2. Create `semantic.css` with ONLY overrides
3. Optionally create `primitive.css` if primitive colors differ
4. Add header comment explaining what overrides
5. Keep file <100 lines (if more, you're duplicating base)

Example:
```css
/**
 * Your Theme - Semantic Token Overrides
 * Inherits from: Base theme
 * Overrides: Brand colors only
 */

:root {
  /* Only override what changes */
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-purple-100, #6245b7);
  --ld-semantic-color-text-brand: var(--ld-primitive-color-purple-100, #6245b7);
  /* Everything else inherits from base */
}
```

## File Sizes

- **Base theme**: ~95KB (complete token set)
- **Override themes**: ~3-10KB each (only changes)
- **Total system**: ~150KB for all themes

---

Last updated: 2025-02-14
