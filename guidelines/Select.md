---
title: Select
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Choose one value from a list.

## Rules
- **MUST** use the Living Design Select component.
- **MUST** provide a label and handle error state via documented API.
- **MUST** support error/validation states using documented APIs.
- **SHOULD** use native select where possible for accessibility unless your system defines a custom combobox.

## States
- Default
- Focus-visible
- Disabled
- Error
- Magic (AI-selected)

## Sizes
Select should support documented sizes (names may differ in your API).

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import * as React from "react";
import { Select } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

export function SelectExample() {
  const [value, setValue] = React.useState<string>("");

  return (
    <Select
      label="Country"
      // Common Select props (adapt names to your actual API):
      // value={value}
      // onValueChange={setValue}
      // helperText="Choose your shipping destination."
      // errorMessage="Please select a country."
      // disabled={false}
      // leadingIcon={<GlobeIcon />} // 24x24, non-interactive
      // size="sm" | "md" | "lg"
      // state="default" | "magic" // Magic = AI-selected state
      value={value}
      onValueChange={setValue}
    >
      {/* If your API uses children options, it may look like: */}
      {/* <Select.Option value="">Select option…</Select.Option> */}
      {/* <Select.Option value="us">United States</Select.Option> */}
      {/* <Select.Option value="ca">Canada</Select.Option> */}
    </Select>
  );
}
```

## Usage
Use when selecting a single option from a list of options.

### Disabled
Disabled Select is unable to accept user input. It may require prior information or data to become enabled.

### Error
Error state displays when the selected value doesn't pass validation. Error messages replace helper text with additional instructions.

### Helper text
Helper text adds context to the Select's options and clarifies its use within a form.

### Leading icon
Leading icons can be used to provide additional context for the Select. Only 24x24px (medium sized) non-interactive icons can be used as a leading icon.

### Magic
The Magic state is used when AI has automatically selected an option. It provides clear visual feedback to users that the selection was AI-generated. Once a user changes the selected option, the Select should be set to the default state to indicate manual selection.

The Magic state's colors will respond to the super agent theme of Sparky, Squiggly, Marty, or Wibey.

## Best practices
### Use when
- Use when users need to choose a single option from a list of options in a form.
- Use when a user must choose from a familiar list of options, such states, provinces, or countries.

### Don’t use when
- Don’t use when there are less than four options. Use a [Form Group](/components/form-group/) with [Radio](/components/radio/) instead.
- Don’t use when a user needs to choose multiple options at the same time. Use a [Form Group](/components/form-group/) with [Checkbox](/components/checkbox/) instead.
- Don't use when there are many options as scrolling through them may overwhelm the user. (This is a general rule. Use your best judgement on whether the number of options is overwhelming.)

## Content strategy
The Text label should clearly provide instruction for the field, such as "Select option..." or "Select issue...". Add additional copy using the Helper Text if more context is needed.

When an error occurs, make sure the copy clearly explains what happened and how to fix or what to do next.

## Anatomy

1. Text label
2. Leading icon (optional)
3. Value
4. Icon
5. Container
6. Helper text (optional)

## Behavior
### Displaying list of options
When open, Select's affordance for picking an option is based on platform-specific native control:

- Android: a [Picker](https://developer.android.com/guide/topics/ui/controls/pickers) control
- iOS: a [Picker](https://developer.apple.com/design/human-interface-guidelines/ios/controls/pickers/) control
- Web: the browser's native [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) menu

## Accessibility
- If custom, must follow combobox/listbox ARIA patterns correctly.
- Label must be associated to the control (`label` + `id` or equivalent).
- Errors must be announced and associated (`aria-invalid`, `aria-describedby`) when applicable.

## Token usage
- Prefer component defaults (Select should be token-wired for color, radius, typography, spacing).
- Only use tokens for layout around the Select (spacing/gaps), not for restyling the Select.


