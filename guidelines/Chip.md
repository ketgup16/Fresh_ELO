---
title: Chip
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Chips represent selectable, compact labels used to categorize content and (optionally) filter a list or dataset.

## Rules
- **MUST** use the Living Design Chip component.
- **MUST** use Chips only for **selectable** items (Chips are not static labels).
- **MUST** keep Chip height consistent; the label **MUST NOT** wrap to multiple lines.
- **SHOULD** use Chips when the set of options is small and easy to scan.
- **MUST NOT** use Chips for navigation. Use [Button](/components/button/) or [Link](/components/link) instead.
- **MUST NOT** use Chips in place of the [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Use [Tab Navigation](/components/tab-navigation/) instead.

## Usage
Use Chips to:
- Differentiate content mapped to multiple categories (e.g., tags).
- Filter data by selecting one or more categories (e.g., “Open”, “Closed”, “Assigned to me”).

Chips typically appear as a set/list; selecting Chip(s) updates the filtered items.

## Anatomy
1. Container
2. Leading icon (optional)
3. Text label
4. Trailing icon (optional)

## Variants
Use documented variants only (names differ by implementation). Common patterns:
- **Filter chips**: selection toggles whether the category is active (single-select or multi-select).
- **With icons**: optional leading and/or trailing icons to clarify meaning.

## States
- Default
- Hover/active (web)
- Focus-visible
- Selected/checked
- Disabled

## Behavior
### Selection
- Chips can support **multi-select** (recommended) to filter multiple categories at once.
- If you need to force exactly **one** selection from a set, consider [Radio](/components/radio/) instead.

### Responsiveness
When there are more Chips than can fit in the available space, Chips can wrap onto additional lines.

### Icons (leading and trailing)
Chip allows optional leading and trailing icons. Both icons are static (not tied to selected state). If you need dynamic icons, update the icon props when selection changes.

## Accessibility
- Implement interactive Chips with **button semantics** (or your component’s equivalent).
- **Keyboard**: Tab moves focus between Chips; Enter/Space toggles selection.
- **Selected state**: expose selection via `aria-pressed` (toggle button) or documented equivalent.
- **Grouping**: if Chips are a set, provide a group label (visible heading or `aria-label`/`aria-labelledby` on the container).
- **Focus**: focus-visible styling must be present and meet contrast requirements.

## Token usage
- Prefer component defaults (Chip should be token-wired for color, typography, spacing, and radius).
- Only use tokens for layout around the Chip set (gaps/wrapping), not for restyling individual Chips.

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import * as React from "react";
import { Chip } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

type FilterKey = "all" | "open" | "closed" | "assigned";

const OPTIONS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "closed", label: "Closed" },
  { key: "assigned", label: "Assigned to me" },
];

export function ChipFiltersExample() {
  const [selected, setSelected] = React.useState<FilterKey[]>(["all"]);

  function toggle(key: FilterKey) {
    setSelected((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      // Optional: keep “All” mutually exclusive with other filters.
      if (key === "all") return ["all"];
      return next.filter((k) => k !== "all");
    });
  }

  return (
    <div aria-label="Filters" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {OPTIONS.map((opt) => (
        <Chip
          key={opt.key}
          // Common Chip props (adapt names to your actual API):
          // selected={selected.includes(opt.key)}
          // onPress={() => toggle(opt.key)}
          // disabled={false}
          selected={selected.includes(opt.key)}
          onPress={() => toggle(opt.key)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}
```

## Best practices
### Use when
- Use when there is a small number of items and the user can select one or more.

### Don’t use when
- Don’t use when there are many Chips; a large quantity will be difficult for users to process. Consider using [Select](/components/select) instead.
- Don’t use when selecting a single option from a set of options. Consider using [Radio](/components/radio/) instead.
- Don’t use for navigation. Consider [Button](/components/button/) or [Link](/components/link) instead.
- Don’t use in place of the [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Consider [Tab Navigation](/components/tab-navigation/) instead.
- Don’t use when the items are not selectable. Chips always allow for selection.

## Do / Don’t
### Do
- Do extend a Chip horizontally if the label is longer (keep height consistent).
- Do use icons intentionally to reinforce the meaning of a Chip.

### Don’t
- Don’t vertically wrap the label in the Chip (this changes height and harms scanability).
- Don’t mix small and large Chips within the same set.

