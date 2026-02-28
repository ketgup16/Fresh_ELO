---
title: WCP Component Creation
scope: rule
status: stable
owner: design-system
last_updated: 2025-02-28
---

## Purpose

Define the difference between Living Design 3.5 (LD) components and Walmart Component Platform (WCP) components, and provide the correct creation workflow for each. This rule prevents agents from applying the full 10-step LD creation process to lightweight WCP components.

---

## LD vs WCP — What Is the Difference?

| | **LD Components** | **WCP Components** |
|---|---|---|
| **What they are** | Design-system primitives | Walmart product-level components |
| **Location** | `client/components/ui/` | `client/components/walmart/` |
| **Build on top of** | Nothing (they ARE the base) | LD primitives (`Button`, `Tag`, `IconButton`, etc.) |
| **Variant naming** | Action-intent: `primary`, `secondary`, `destructive` | Visual-theme: `default`, `brand`, `inverse` |
| **Requires sandbox entry** | Yes (`RULE_ComponentPropertyTester.md`) | No |
| **Requires 10-step LD process** | Yes (`RULE_CreateNewComponent.md`) | No |
| **Requires Component Library page** | Yes | Yes |
| **Requires i18n keys** | Yes | Yes |
| **Requires Overview.tsx entry** | Yes | Yes |

---

## Decision Tree — LD or WCP?

```
Is this a general-purpose design primitive (Button, Input, Tag, Spinner)?
  └─ YES → LD Component → Follow RULE_CreateNewComponent.md (10-step process)

Is this a Walmart-specific product component (Banner, Callout card, Promo strip)?
  └─ YES → WCP Component → Follow this rule (lightweight process below)
```

When in doubt: if the component contains business logic, Walmart-specific copy, or is only used in Walmart-facing pages (`client/pages/walmart/`), it is a WCP component.

---

## WCP Component Creation Checklist

### Step 1 — Check for existing components first

Before creating anything:
```bash
ls client/components/walmart/
grep -r "export.*function\|export.*const" client/components/walmart/
```

If a similar component exists, extend it with a new variant — do not create a duplicate.

### Step 2 — Create the component file

- Location: `client/components/walmart/ComponentName.tsx`
- Named export only — never `export default`
- PascalCase filename

```tsx
// client/components/walmart/BasicBanner.tsx
import styles from './BasicBanner.module.css';

export type BasicBannerVariant = 'default' | 'brand' | 'inverse';

interface BasicBannerProps {
  variant?: BasicBannerVariant;
  headline: string;
  onClick?: () => void;
}

export function BasicBanner({ variant = 'default', headline, onClick }: BasicBannerProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={[styles.banner, styles[variant]].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className={styles.headline}>{headline}</span>
    </Tag>
  );
}
```

### Step 3 — Create the CSS module

- Location: `client/components/walmart/ComponentName.module.css`
- All values MUST use LD semantic tokens — never hardcode hex colors, spacing, or font values
- Variant classes are applied by name (`styles.brand`, `styles.inverse`) — never use switch/if chains

```css
/* client/components/walmart/BasicBanner.module.css */

.banner {
  display: flex;
  align-items: center;
  padding: var(--ld-primitive-scale-space-400, 16px) var(--ld-primitive-scale-space-600, 24px);
  font-family: var(--ld-semantic-font-family-sans);
  border: none;
  width: 100%;
}

/* Variant: default */
.default {
  background: var(--ld-semantic-color-background-subtle);
  color: var(--ld-semantic-color-text);
}

/* Variant: brand */
.brand {
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-on-fill-primary);
}

/* Variant: inverse */
.inverse {
  background: var(--ld-semantic-color-background-inverse);
  color: var(--ld-semantic-color-text-inverse);
}
```

### Step 4 — Create the Component Library page

- Location: `client/pages/component-library/BasicBannerPage.tsx`
- Show all variants, all interactive states, and any required props
- Include i18n usage examples if the component has user-facing text

### Step 5 — Add a route

Add the Component Library page route to `client/App.tsx`:

```tsx
<Route path="/component-library/basic-banner" element={<BasicBannerPage />} />
```

### Step 6 — Add to Overview.tsx

Add a card entry in `client/pages/component-library/Overview.tsx` in the appropriate category section.

### Step 7 — Add i18n keys

Add all user-facing strings to the translation files (`en.json`, `es.json`, `fr.json`). See `RULE_Internationalization.md`.

### Step 8 — Update GuidelinesDocIndex.tsx

Per `RULE_GuidelinesPageSync.md`, add the new component to `client/pages/component-library/GuidelinesDocIndex.tsx` if a documentation file exists.

---

## Interactive vs Non-Interactive Pattern

WCP components that can be either clickable or static must render as the semantically correct element:

```tsx
// Render as <button> when onClick is provided (interactive, keyboard accessible)
// Render as <div> when onClick is absent (static display)
const Tag = onClick ? 'button' : 'div';
```

This ensures the component is keyboard accessible when interactive and avoids invalid ARIA semantics when static.

---

## Variant Class Composition Pattern

Always compose variant class names using array join — never use switch statements or if/else chains for CSS variant application:

```tsx
// ✅ CORRECT
className={[styles.banner, styles[variant]].filter(Boolean).join(' ')}

// ❌ WRONG — switch chain
let variantClass = '';
switch (variant) {
  case 'brand': variantClass = styles.brand; break;
  case 'inverse': variantClass = styles.inverse; break;
}
className={`${styles.banner} ${variantClass}`}
```

---

## What WCP Components Do NOT Need

- **No ComponentPropertyTester entry** — WCP components are not part of the LD sandbox
- **No 10-step LD process** — do not follow `RULE_CreateNewComponent.md` for WCP components
- **No Figma component spec** — WCP components are built from Figma designs, not published as LD primitives

---

## Quick Reference

| Requirement | Required for WCP? |
|---|---|
| Named export (no default export) | ✅ Yes |
| CSS module with LD tokens only | ✅ Yes |
| `default \| brand \| inverse` variant naming | ✅ Yes |
| Interactive/non-interactive `Tag` pattern | ✅ Yes |
| Array join for variant class composition | ✅ Yes |
| Component Library page + route | ✅ Yes |
| Overview.tsx entry | ✅ Yes |
| i18n keys for user-facing strings | ✅ Yes |
| ComponentPropertyTester sandbox entry | ❌ No |
| 10-step `RULE_CreateNewComponent.md` process | ❌ No |

---

## Enforcement Level

**HIGH** — Agents must check this rule before creating any Walmart-specific component. Skipping this rule results in either unnecessary overhead (full LD process for WCP) or missing required steps (no Component Library page, no i18n).
