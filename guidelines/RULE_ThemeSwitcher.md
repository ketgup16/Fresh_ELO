# Theme Switcher System

## Overview

The theme switcher allows dynamic swapping of design token sets across the entire application. Themes modify CSS custom properties at the `:root` level, enabling visual customization without code changes to components.

**Key Features:**
- 🎨 **Dynamic Theme Switching** - Switch themes without page reload
- 💾 **Persistent Preference** - Theme choice saved to localStorage
- 🔄 **No Component Changes** - Components reference semantic tokens that update automatically
- 📦 **Extensible** - Easy to add new themes following documented procedures

---

## Architecture

### File Structure

```
styles/themes/
├── base/                      # Default theme (LD 3.5 + WCP)
│   ├── primitive.css         # Base primitive tokens
│   └── semantic.css          # Base semantic tokens + WCP extensions
├── walmart-b2b/              # B2B theme
│   ├── primitive.css         # B2B primitive tokens (mostly same as base)
│   └── semantic.css          # B2B semantic overrides (darker colors)
└── [future-theme]/           # Add new themes here
    ├── primitive.css
    └── semantic.css

client/contexts/
├── theme-registry.ts         # Theme metadata and configuration
└── ThemeContext.tsx          # React context for theme management

client/components/
└── ThemeSwitcher.tsx         # UI component for theme selection
```

### How It Works

1. **Theme Files**: Each theme has primitive.css and semantic.css files with `:root` CSS custom properties
2. **Dynamic Loading**: ThemeContext loads theme CSS by injecting `<link>` tags into document `<head>`
3. **Switching**: When switching themes, old theme links are removed and new ones are added
4. **Component Updates**: All components automatically update because they reference semantic tokens
5. **Persistence**: Theme choice is saved to localStorage as `ld-theme`

---

## Adding a New Theme

### Step 1: Create Theme Files

Create a new directory under `styles/themes/[theme-name]/`:

```bash
mkdir -p styles/themes/my-new-theme
```

Create two files:
- `primitive.css` - Primitive color scales and base values
- `semantic.css` - Semantic token mappings for components

**When to modify primitives:**
- Rarely needed unless introducing entirely new color palettes
- Most themes only modify semantic tokens

**When to modify semantics:**
- Most common place for theme customization
- Override action colors, text colors, surface colors, etc.

---

### Step 2: Define Primitive Tokens (primitive.css)

**Option A: Copy from Base (Recommended)**

```css
/**
 * My New Theme - Primitive Tokens
 * Generated on [Date]
 */

/* Copy content from styles/themes/base/primitive.css */
:root {
  /* Base colors */
  --ld-primitive-color-black: #000000;
  --ld-primitive-color-white: #ffffff;
  
  /* Only add/modify if you need different base colors */
  /* Example: Custom brand color */
  --ld-primitive-color-brand-primary: #FF6B00;
  
  /* Copy all other primitives from base... */
}
```

**Option B: Define Custom Primitives**

Only if your theme needs a completely different color palette:

```css
:root {
  /* Your custom primitive color scales */
  --my-theme-color-primary-100: #...;
  --my-theme-color-primary-200: #...;
  /* etc. */
}
```

---

### Step 3: Define Semantic Tokens (semantic.css)

**Structure:**

```css
/**
 * My New Theme - Semantic Tokens
 * Generated on [Date]
 * 
 * Description: [What this theme is for]
 * Base: Living Design 3.5 + [Extensions]
 */

:root {
  /* ========================================
     ACTION/INTERACTIVE COLORS (Buttons)
     ======================================== */
  
  /* Primary Button - CUSTOMIZE THIS */
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-blue-130, #002e99);
  --ld-semantic-color-action-fill-primary-hovered: var(--ld-primitive-color-blue-140, #002185);
  --ld-semantic-color-action-fill-primary-pressed: var(--ld-primitive-color-blue-150, #001270);
  
  /* Focus States - Should match primary */
  --ld-semantic-color-action-focus-outline: var(--ld-primitive-color-blue-130, #002e99);
  
  /* Text Colors - Customize for your brand */
  --ld-semantic-color-text-brand: var(--ld-primitive-color-blue-130, #002e99);
  --ld-semantic-color-text-activated: var(--ld-primitive-color-blue-160, #001e60);
  --ld-semantic-color-text-link: var(--ld-primitive-color-blue-130, #002e99);
  
  /* Border Colors */
  --ld-semantic-color-border-brand: var(--ld-primitive-color-blue-100, #0053e2);
  --ld-semantic-color-border-activated: var(--ld-primitive-color-blue-160, #001e60);
  
  /* Surface Colors */
  --ld-semantic-color-surface-overlay-brand: var(--ld-primitive-color-blue-10, #e9f1fe);
  
  /* Copy remaining tokens from base/semantic.css and customize as needed */
  /* ...non-brand tokens can inherit from base... */
}
```

---

### Step 4: Register Theme

Add to `client/contexts/theme-registry.ts`:

```typescript
export const AVAILABLE_THEMES: Theme[] = [
  {
    id: 'base',
    name: 'Walmart Connect',
    description: 'Default Walmart Connect Ad Center theme with Living Design 3.5 + WCP extensions',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/base/semantic.css',
    previewColor: '#0053e2',
  },
  {
    id: 'walmart-b2b',
    name: 'Walmart Business',
    description: 'Walmart Business B2B platform theme with darker, professional color palette',
    primitiveCSS: '/styles/themes/walmart-b2b/primitive.css',
    semanticCSS: '/styles/themes/walmart-b2b/semantic.css',
    previewColor: '#002e99',
  },
  // ADD YOUR NEW THEME HERE
  {
    id: 'my-new-theme',
    name: 'My Theme Display Name',
    description: 'Brief description of what this theme is for',
    primitiveCSS: '/styles/themes/my-new-theme/primitive.css',
    semanticCSS: '/styles/themes/my-new-theme/semantic.css',
    previewColor: '#FF6B00', // Preview color dot in UI
  },
];
```

**TypeScript Type Update:**

Update the `Theme` interface id type:

```typescript
export interface Theme {
  id: 'base' | 'walmart-b2b' | 'my-new-theme'; // Add your theme id here
  name: string;
  description: string;
  primitiveCSS: string;
  semanticCSS: string;
  previewColor?: string;
}
```

---

### Step 5: Testing Checklist

Before shipping your new theme, verify:

- [ ] **All components render correctly**
  - Navigate to `/component-library`
  - Switch to your new theme
  - Verify all sections display properly

- [ ] **Interactive states work**
  - Hover states visible
  - Focus states visible (tab through buttons)
  - Active/pressed states work
  - Disabled states look correct

- [ ] **No console errors**
  - No missing token warnings
  - No CSS loading errors

- [ ] **Text readability**
  - Text is readable on all backgrounds
  - Sufficient contrast (WCAG AA minimum)
  - Check with color contrast checker

- [ ] **Icons use currentColor**
  - Icons inherit text color properly
  - Icon colors update with theme

- [ ] **Button variants distinct**
  - Primary, secondary, tertiary buttons visually different
  - Destructive button clearly indicates danger

- [ ] **Brand consistency**
  - Primary button matches brand color
  - Brand text color consistent
  - Focus outlines match primary color

- [ ] **Persistence works**
  - Switch to theme
  - Reload page
  - Verify theme persists

---

## Token Override Principles

### Common Tokens to Override

**Primary Branding:**
- `--ld-semantic-color-action-fill-primary` - Primary button background
- `--ld-semantic-color-text-brand` - Brand text color
- `--ld-semantic-color-border-brand` - Brand border color
- `--ld-semantic-color-fill-brand` - Brand fill color
- `--ld-semantic-color-action-focus-outline` - Focus indicator

**Interactive States:**
- `--ld-semantic-color-action-fill-primary-hovered` - Primary button hover
- `--ld-semantic-color-action-fill-primary-pressed` - Primary button active
- `--ld-semantic-color-border-activated` - Activated border
- `--ld-semantic-color-text-activated` - Activated text

**Surface Overlays:**
- `--ld-semantic-color-surface-overlay-brand-subtle` - Subtle brand surface
- `--ld-semantic-color-fill-info` - Info background

### Rarely Override

These should remain consistent across themes:
- Spacing tokens (`--ld-semantic-spacing-*`)
- Typography tokens (`--ld-semantic-font-family-sans`)
- Border radius tokens (`--ld-semantic-border-radius-*`)
- Animation duration (`--ld-semantic-duration-*`)
- Structural tokens (elevation, z-index)

### Never Override

These are critical for accessibility:
- Focus outline visibility tokens (must be visible)
- Disabled state tokens (must show disabled state)
- Negative/error tokens (red should stay red)
- Positive/success tokens (green should stay green)

---

## Theme-Specific Extensions

You can add theme-specific tokens with custom prefixes:

**Example: WCP Extensions in Base Theme**

```css
/* WCP (Walmart Connect Platform) Extended Tokens */
--wcp-semantic-color-action-fill-primary-alt: var(--ld-primitive-color-spark-100, #ffc220);
--wcp-semantic-color-fill-savings-bold: var(--ld-primitive-color-red-100, #ea1100);
```

**Example: B2B Extensions**

```css
/* B2B-specific tokens */
--b2b-semantic-color-premium-surface: var(--ld-primitive-color-purple-10, #efebf2);
--b2b-semantic-color-enterprise-badge: var(--ld-primitive-color-cyan-100, #0076b3);
```

**Naming Convention:**

```
--[theme-prefix]-semantic-[category]-[name]
```

Examples:
- `--wcp-semantic-color-action-fill-primary-alt`
- `--b2b-semantic-color-surface-premium`
- `--dark-semantic-color-background-elevated`

---

## Example: Base vs B2B Comparison

| Token | Base Theme | B2B Theme | Impact |
|-------|-----------|-----------|--------|
| `action-fill-primary` | `#0053e2` (Walmart blue) | `#002e99` (Navy) | Primary buttons darker |
| `text-brand` | `#0053e2` (Walmart blue) | `#002e99` (Navy) | Brand text darker |
| `border-activated` | `#0053e2` (Walmart blue) | `#001e60` (Navy) | Active borders darker |
| `text-activated` | `#114ab6` (Blue) | `#001e60` (Navy) | Active text darker |
| `wcp-action-fill-primary-alt` | `#ffc220` (Spark yellow) | `#4dbdf5` (Cyan) | Alt button color |

---

## Troubleshooting

### Theme not switching

**Check:**
1. Is theme registered in `theme-registry.ts`?
2. Do CSS files exist at the specified paths?
3. Check browser console for 404 errors
4. Verify primitive and semantic paths are correct

**Fix:**
```typescript
// Correct paths start with /styles/
primitiveCSS: '/styles/themes/my-theme/primitive.css', // ✅
primitiveCSS: 'styles/themes/my-theme/primitive.css',  // ❌ Missing leading /
```

### Tokens not applying

**Check:**
1. Are tokens defined in `:root` selector?
2. Is CSS file loaded? (Check DevTools > Network tab)
3. Are tokens using correct naming convention?
4. Check for typos in token names

**Fix:**
```css
/* ✅ Correct */
:root {
  --ld-semantic-color-action-fill-primary: #002e99;
}

/* ❌ Wrong - missing :root */
--ld-semantic-color-action-fill-primary: #002e99;
```

### Colors not updating

**Check:**
1. Are components using semantic tokens (not hard-coded colors)?
2. Did you clear browser cache?
3. Is the old theme CSS still loaded?

**Fix:**
In component code:
```tsx
// ✅ Correct - uses semantic token
backgroundColor: 'var(--ld-semantic-color-action-fill-primary)'

// ❌ Wrong - hard-coded color
backgroundColor: '#0053e2'
```

### Theme persists incorrectly

**Check:**
1. localStorage key is `ld-theme`
2. Theme ID matches registry

**Fix:**
```javascript
// Clear localStorage if needed
localStorage.removeItem('ld-theme');
```

---

## Best Practices

### DO:

✅ **Test with all components** before shipping
✅ **Use semantic tokens** in component code, never primitives
✅ **Document your theme** with clear description and use case
✅ **Provide preview color** for UI indicator
✅ **Check accessibility** with contrast checkers
✅ **Follow naming conventions** for custom tokens
✅ **Keep spacing/typography consistent** across themes

### DON'T:

❌ **Override accessibility tokens** (focus, disabled states)
❌ **Use hard-coded colors** in components
❌ **Change structural tokens** (spacing, elevation)
❌ **Forget to test** interactive states
❌ **Skip contrast checking** for text readability
❌ **Break existing themes** when adding new ones
❌ **Use inline styles** that override semantic tokens

---

## Advanced: Dark Mode Example

If creating a dark mode theme:

```css
/**
 * Dark Mode Theme - Semantic Tokens
 */

:root {
  /* Invert backgrounds */
  --ld-semantic-color-background: var(--ld-primitive-color-gray-180, #171819);
  --ld-semantic-color-background-inverse: var(--ld-primitive-color-white, #ffffff);
  --ld-semantic-color-surface: var(--ld-primitive-color-gray-170, #232325);
  
  /* Adjust text for dark backgrounds */
  --ld-semantic-color-text: var(--ld-primitive-color-gray-10, #f1f1f2);
  --ld-semantic-color-text-subtle: var(--ld-primitive-color-gray-50, #babbbe);
  
  /* Keep brand colors recognizable but adjust for contrast */
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-blue-70, #4380ef);
  --ld-semantic-color-text-brand: var(--ld-primitive-color-blue-60, #5e93f3);
  
  /* Borders need to be lighter on dark backgrounds */
  --ld-semantic-color-border: var(--ld-primitive-color-gray-100, #74767c);
  --ld-semantic-color-border-subtle: var(--ld-primitive-color-gray-130, #515357);
}
```

---

## FAQ

**Q: Can I have more than 2 themes?**
A: Yes! Add as many themes as needed to `theme-registry.ts`. The UI will show all registered themes.

**Q: Do I need to create both primitive and semantic files?**
A: Yes, both are required. However, you can copy primitive.css from base if you don't need custom primitives.

**Q: Can themes share CSS files?**
A: No, each theme should have its own files for clean separation and easier maintenance.

**Q: How do I preview a theme during development?**
A: Navigate to `/component-library` and use the Theme dropdown in the header.

**Q: Can users switch themes on other pages besides Component Library?**
A: Yes! The theme applies globally. You can add ThemeSwitcher component to any page.

**Q: What happens if a token is missing in my theme?**
A: CSS will fall back to the fallback value in `var(--token-name, #fallback)` or show browser default.

**Q: Can I override spacing or font sizes per theme?**
A: Technically yes, but not recommended. Keep spacing/typography consistent for UX consistency.

---

## Resources

- **Living Design 3.5 Spec**: [Internal docs link]
- **Primitive Tokens Reference**: `styles/themes/base/primitive.css`
- **Semantic Tokens Reference**: `styles/themes/base/semantic.css`
- **Theme Registry**: `client/contexts/theme-registry.ts`
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Summary

**To add a new theme:**

1. Create theme directory: `styles/themes/[theme-name]/`
2. Copy and customize `primitive.css` and `semantic.css`
3. Register theme in `theme-registry.ts`
4. Test thoroughly on Component Library page
5. Verify accessibility and contrast
6. Ship! 🚀

The theme switcher system is designed to be simple, extensible, and maintainable. Follow these guidelines and you'll have a beautiful new theme in no time!
