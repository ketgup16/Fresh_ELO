---
title: Breadcrumb
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Breadcrumbs are **secondary navigation** links that show a user's current location within a hierarchical information architecture. They provide context and allow users to move up to parent levels (or back through a hierarchy) without replacing primary navigation.

## Rules
- **MUST** use the Living Design Breadcrumb component.
- **MUST** treat Breadcrumbs as secondary navigation (do not replace primary nav with Breadcrumbs).
- **MUST** represent a hierarchy (not a flat set of unrelated links).
- **SHOULD** use Breadcrumbs only when the hierarchy is **more than 2 levels** and **fewer than 5 levels**.
- **SHOULD** keep labels short and scannable.
- **MUST NOT** place other content in the same horizontal row/space competing with the Breadcrumb on desktop; give it its own row.
- **SHOULD** handle long paths responsibly on small screens (see Mobile guidance).

## Usage
Use Breadcrumbs when:
- A product/experience has a large amount of content organized in a hierarchy
- Users benefit from understanding "where they are" relative to the information architecture
- Users need quick access to parent levels

Don't use Breadcrumbs when:
- The product only calls for a single level of navigation
- The "path" isn't truly hierarchical (choose another navigation pattern)

## Best practices
### Use when
- Use when content is organized into a hierarchy of more than two levels and fewer than five levels.

### Don't use when
- Don't use when a product only calls for a single level of navigation. Breadcrumbs are always secondary and should never entirely replace the primary navigation.

## Placement
### Desktop
- Place Breadcrumbs horizontally across the top of a page.
- Breadcrumbs **SHOULD** have their own row across the full width of the page/container.
- Don't place other elements in the same horizontal space as the Breadcrumb row (avoid crowding and truncation).

### Mobile
- Breadcrumbs may wrap to multiple lines on narrow screens; this is supported but can consume significant vertical space.
- **SHOULD** consider using page header navigation instead of Breadcrumbs when the path is long and likely to wrap.
- If wrapping occurs:
  - **MUST** start the wrapped line with a **link** (not a separator).
  - **MUST NOT** place a separator (e.g., "/") as the first character on a new line.

## Anatomy
1. Link
2. Separator

## Behavior
### Responsiveness
- Breadcrumbs should occupy the full available width of the container.
- Long Breadcrumb trails may wrap; wrapping behavior **MUST** remain readable:
  - Start wrapped lines with a link label.
  - Avoid visual clutter by keeping the Breadcrumb on its own row.

## Accessibility
- Use semantic navigation patterns (e.g., a `nav` landmark where applicable) and provide an accessible label (e.g., "Breadcrumb" / "Breadcrumb navigation") if your API requires it.
- Ensure each crumb link has an accessible name that matches its visible label.
- The current page/location **SHOULD** be indicated appropriately (e.g., rendered as text rather than a link, or using the component's "current" state).

## Token usage
- Prefer component defaults (Breadcrumb should be token-wired for color, typography, spacing).
- Only use tokens for layout around the Breadcrumb (page spacing), not for restyling the Breadcrumb.

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import * as React from "react";
import { Breadcrumb } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

export function BreadcrumbExample() {
  return (
    <Breadcrumb
      // Adapt to your API shape:
      items={[
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Subcategory", href: "/category/subcategory" },
        { label: "Current page" }, // current location (typically not a link)
      ]}
    />
  );
}
```

