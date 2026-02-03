---
title: Icon Button
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Icon Buttons trigger an action or invoke navigation using an icon-only affordance. Use them when space is limited (e.g., toolbars) and the icon meaning is clear in context.

## Rules
- **MUST** use the Living Design Icon Button component.
- **MUST** provide an accessible name for every Icon Button (e.g., `aria-label` or documented equivalent).
- **MUST** choose documented `size` values only.
- **MUST** choose a documented `variant` only (shape/visual treatment per API).
- **MUST** ensure the icon communicates a universally understood action in context.
- **MUST NOT** use Icon Button when the action requires visual hierarchy (primary vs secondary). Use [Button](/components/button/) instead.
- **MUST NOT** use Icon Button for toggleable state (on/off). Use [Switch](/components/switch/) or [Chip](/components/chip/) instead.

## Usage
Icon Buttons are similar to [Button](/components/button/) but optimized for compact surfaces.

Because icon meaning can vary (even common icons like “x”), ensure there is enough surrounding context for the action to be understood.

Common use cases:
- Toolbars (grouped actions)
- Compact controls in dense layouts (tables, headers, cards)

## Anatomy
1. Container
2. Icon

## Variants
Use documented variants only (names differ by implementation). Common patterns include:
- **Shape**: circular vs square
- **Emphasis**: subtle vs strong (if supported)

### Size
Use documented size options only (for example: `sm`, `md`, `lg` or `small`, `medium`, `large` depending on your API).

## States
- Default
- Hover/active (web)
- Focus-visible
- Disabled

## Accessibility
- **MUST** provide an accessible name (e.g., `aria-label="Close"`). Screen readers announce this name.
- **MUST NOT** rely on tooltip text as the only accessible name.
- **Keyboard**: Icon Buttons must be reachable by Tab and activatable with Enter/Space (button semantics).
- If multiple Icon Buttons are grouped (e.g., a toolbar), **SHOULD** provide an accessible group label (`aria-label`/`aria-labelledby` on the container).

## Token usage
- Prefer component defaults (Icon Button should be token-wired for color, radius, spacing, elevation, and motion where applicable).
- Only use tokens for layout around Icon Buttons (spacing/gaps), not for restyling the component.

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import * as React from "react";
import { IconButton } from "REPLACE_ME_COMPONENT_IMPORT_PATH";
import * as Icon from "@livingdesign/icons";

export function IconButtonExamples() {
  return (
    <div aria-label="Editor toolbar" style={{ display: "flex", gap: 8 }}>
      <IconButton
        // Adapt prop names to your actual API:
        // aria-label="Close"
        // size="sm" | "md" | "lg"
        // variant="circle" | "square"
        aria-label="Close"
        size="md"
        variant="circle"
        onPress={() => {}}
      >
        <Icon.Close />
      </IconButton>

      <IconButton aria-label="Search" size="md" variant="circle" onPress={() => {}}>
        <Icon.Search />
      </IconButton>
    </div>
  );
}
```

## Best practices
### Use when
- Use when available screen space is limited.
- Use when building an application toolbar; grouped Icon Buttons make common actions easy to scan and use.

### Don’t use when
- Don’t use when the actions require visual hierarchy (primary/secondary). Use [Button](/components/button/) instead.
- Don’t use when the element represents toggleable state (on/off). Use a [Switch](/components/switch/) or [Chip](/components/chip/) instead.
- Don’t use when the icon does not communicate a universally understood action. Prefer a labeled [Button](/components/button/) instead.

## Do / Don’t
### Do
- Do use clear, common icons and place them in a context that makes the action unambiguous.
- Do add `aria-label` (or equivalent) to every Icon Button.
- Do group related Icon Buttons together (e.g., in a toolbar) and label the group when appropriate.

### Don’t
- Don’t ship icon-only actions that users can’t reliably interpret.
- Don’t use Icon Button when you need a text label to clarify the action.

