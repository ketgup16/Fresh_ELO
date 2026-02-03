---
title: Checkbox
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Checkboxes allow users to make a selection of one or multiple options from a list. They are not for mutually exclusive choices.

## Rules
- **MUST** use the Living Design Checkbox component.
- **MUST** provide an accessible label (visible label or accessible name).
- **MUST** support indeterminate state where partial selection needs to be represented.
- **MUST NOT** use Checkbox for mutually exclusive choices; use [Radios](/components/radio/) instead.

## States
- Unchecked
- Checked
- Indeterminate (partial selection)
- Disabled (when applicable)

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import * as React from "react";
import { Checkbox } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

export function CheckboxExamples() {
  const [all, setAll] = React.useState(false);
  const [items, setItems] = React.useState<Record<string, boolean>>({
    apples: false,
    oranges: true,
  });

  const checkedCount = Object.values(items).filter(Boolean).length;
  const isIndeterminate = checkedCount > 0 && checkedCount < Object.keys(items).length;
  const isChecked = checkedCount === Object.keys(items).length;

  React.useEffect(() => {
    setAll(isChecked);
  }, [isChecked]);

  return (
    <>
      <Checkbox
        // Adapt prop names to your actual API:
        // checked={isChecked}
        // indeterminate={isIndeterminate}
        // onCheckedChange={(next) => ...}
        // label="Select all"
        checked={all}
        indeterminate={isIndeterminate}
        onCheckedChange={(next: boolean) => {
          setAll(next);
          setItems((prev) =>
            Object.fromEntries(Object.keys(prev).map((k) => [k, next])),
          );
        }}
        label="Select all"
      />

      <Checkbox
        checked={items.apples}
        onCheckedChange={(next: boolean) => setItems((p) => ({ ...p, apples: next }))}
        label="Apples"
      />

      <Checkbox
        checked={items.oranges}
        onCheckedChange={(next: boolean) => setItems((p) => ({ ...p, oranges: next }))}
        label="Oranges"
      />
    </>
  );
}
```

## Usage
Use when you have a list of options which are not mutually exclusive. Use indeterminate state to represent partial selection (neither checked nor unchecked).

## Examples

## Best practices
### Use when
- Use when you have a list of options which are not mutually exclusive.
- Use when creating forms on a full page, modal, or side panel.
- Use when filtering data on a page, menu, or within a component.
- Use when creating lists with sub-selections or parent-child relationships.
- Use when a user needs to indicate consent on a Terms & Conditions form.

### Don't use when
- Don’t use when only one item can be selected from a list. Use [Radios](/components/radio/) instead.

### Do
Do let text wrap beneath the Checkbox so the control and label are top-aligned.

### Don't
Don't vertically center wrapped text with the Checkbox.

## Placement
Checkboxes can be placed in forms on a full page, in modals, or on side panels. Checkboxes are also placed for filtering data either on a page, in a menu, or within a component.

## Anatomy

1. Input
2. Text label (optional)

## Accessibility
- By default, the Checkbox uses the text label to explain the value the Checkbox is controlling.
- The default text label implemented from the component may be omitted if nearby text clearly acts as a label instead. A screen reader prop must be provided using the id of the labeling element instead.
- In certain cases, a visible text label isn't needed (for example in a Data Table). If a visible label isn't specified, a hidden screen reader label must be provided to the Checkbox for accessibility.

## Token usage
- Prefer component defaults (Checkbox should be token-wired for color, radius, typography, spacing).
- Only use tokens for layout around the Checkbox (spacing/gaps), not for restyling the Checkbox.


