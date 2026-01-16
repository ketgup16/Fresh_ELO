---
title: Button
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Buttons trigger actions. They are used throughout the UI in places like dialogs, modals, forms, cards, and toolbars.

## Rules
- **MUST** use the Living Design Button component.
- **MUST** choose a documented variant (primary/secondary/tertiary/link, etc.).
- **MUST** choose a documented size (names may differ in your API).
- **MUST** support focus-visible and disabled states.
- **MUST NOT** create new button styles via custom CSS.
- **MUST NOT** apply shadows or effects to the Button container.
- **MUST NOT** use ghost buttons (see-through/undocumented styles).
- **MUST NOT** use two destructive Buttons together.
- **MUST NOT** use a destructive Button for a positive action.

## Usage
Use when adding interaction to key behaviors and features, including:
- Confirming or submitting information entered in a form
- Canceling an action
- Resetting a form or dataset
- Closing a container or section
- Opening a Popover
- Moving forward or backward through a stepper workflow
- Creating an object within a group
- Applying a non-critical action to a dataset

## Variants (examples — adapt to your API)
- Primary
- Secondary
- Tertiary
- Link Button
- Destructive (if supported)

## Size
Buttons should use documented sizes only (names may differ in your API).

## States
- Default
- Hover/active
- Focus-visible
- Disabled

## Accessibility
- Use `button` semantics.
- Ensure accessible name matches visible label.
- If the button is icon-only, **MUST** provide an accessible name (e.g., `aria-label`).

## Token usage
- Prefer component defaults (Button should be token-wired for color, typography, spacing, radius).
- Only use tokens for layout around the Button (spacing/gaps), not for restyling the Button.

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import { Button } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

export function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      {/* If your API supports destructive: */}
      {/* <Button variant="destructive">Delete</Button> */}
    </>
  );
}
```

## Best practices
### Use when
- Use when adding interaction to key behaviors and features.
- Use when confirming or submitting information entered in a form.
- Use when canceling an action.
- Use when resetting a form or dataset.
- Use when closing a container or section.
- Use when opening a Popover.
- Use when moving forward or backward through a stepper workflow.
- Use when creating an object within a group.
- Use when applying a non-critical action to a dataset.

### Don't use when
- Don't apply any shadows or effects to the Button container.
- Don't use ghost Buttons (see-through/undocumented styles).
- Don't use two destructive Buttons together.
- Don't use a destructive Button for a positive action.

## Placement
- Do use the same Button size for adjacent Buttons.
- Do place primary Buttons to the right within a group of Buttons.

## Content strategy
The text label should tell the user what action they're about to take.

- Don't use "Learn more" or "More details" (too vague).
- People mostly look at the first 2 words, so start with the most important words.

## Anatomy
1. Container
2. Leading icon (optional)
3. Text label
4. Trailing icon (optional)

