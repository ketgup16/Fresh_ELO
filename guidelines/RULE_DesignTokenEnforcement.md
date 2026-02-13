# RULE: Design Token Enforcement

**CRITICAL RULE - ALWAYS ENFORCE**

## When This Rule Applies

This rule **MUST** be enforced when:

1. ✅ User imports designs from Builder.io Figma plugin
2. ✅ User requests AI to generate new designs or components
3. ✅ User asks to create new UI elements or pages
4. ✅ User requests styling changes or updates
5. ✅ Any new CSS or component styles are being written

## Mandatory Requirements

### 1. **NEVER Use Hard-Coded Values**

All colors, spacing, typography, and border radius values **MUST** use design tokens.

```css
/* ❌ FORBIDDEN */
.element {
  color: #0053e2;
  background: white;
  padding: 16px;
  font-size: 16px;
  border-radius: 8px;
}

/* ✅ REQUIRED */
.element {
  color: var(--ld-semantic-color-action-fill-primary);
  background: var(--ld-semantic-color-surface);
  padding: var(--ld-primitive-scale-space-200);
  font-size: var(--ld-semantic-font-body-medium-size);
  border-radius: var(--ld-primitive-scale-border-radius-100);
}
```

### 2. **NEVER Create New Tokens**

**DO NOT** create custom CSS variables. All necessary tokens exist in:
- `styles/primitive.css` - Primitive tokens (colors, spacing, typography scales)
- `styles/semantic.css` - Semantic tokens (context-aware usage)

```css
/* ❌ FORBIDDEN */
:root {
  --my-custom-color: #1a73e8;
  --my-spacing: 24px;
}

/* ✅ REQUIRED */
/* Use existing tokens - they are comprehensive and cover all use cases */
```

### 3. **ALWAYS Use Semantic Tokens**

For colors and text, use semantic tokens (NOT primitive tokens).

```css
/* ❌ WRONG - Using primitive tokens directly */
.button {
  background: var(--ld-primitive-color-blue-100);
  color: var(--ld-primitive-color-white);
}

/* ✅ CORRECT - Using semantic tokens */
.button {
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-on-fill-primary);
}
```

### 4. **ALWAYS Include Interactive States**

For interactive elements (buttons, links, inputs), include all state variants.

```css
/* ✅ REQUIRED - All states defined */
.button {
  background-color: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-on-fill-primary);
}

.button:hover {
  background-color: var(--ld-semantic-color-action-fill-primary-hovered);
}

.button:focus {
  background-color: var(--ld-semantic-color-action-fill-primary-focused);
  outline: 2px solid var(--ld-semantic-color-action-focus-outline);
}

.button:active {
  background-color: var(--ld-semantic-color-action-fill-primary-pressed);
}

.button:disabled {
  background-color: var(--ld-semantic-color-action-fill-primary-disabled);
  color: var(--ld-semantic-color-action-text-on-fill-primary-disabled);
  cursor: not-allowed;
}
```

## Token Categories Reference

### Colors
- **Actions/Buttons**: `--ld-semantic-color-action-fill-{variant}-{state}`
  - Variants: `primary`, `secondary`, `tertiary`, `negative`
  - States: `hovered`, `focused`, `pressed`, `disabled`

- **Text**: `--ld-semantic-color-text-{purpose}`
  - Purpose: `text`, `subtle`, `subtlest`, `inverse`, `brand`, `info`, `positive`, `negative`, `warning`

- **Backgrounds**: `--ld-semantic-color-fill-{purpose}-{emphasis}`
  - Purpose: `accent-blue`, `accent-green`, `accent-red`, `info`, `positive`, `negative`, `warning`
  - Emphasis: base or `subtle`

- **Borders**: `--ld-semantic-color-border-{purpose}-{emphasis}`
  - Purpose: `accent-blue`, `info`, `positive`, `negative`, `warning`
  - Emphasis: base or `bold`

### Typography
- **Font Family**: 
  - `--ld-semantic-font-family-sans` (Everyday Sans UI + fallbacks)
  - `--ld-semantic-font-family-mono` (Everyday Sans Mono + fallbacks)

- **Font Sizes**: `--ld-semantic-font-{style}-{size}-size`
  - Style: `display`, `heading`, `body`, `caption`
  - Size: `large`, `medium`, `small`

- **Line Heights**: `--ld-semantic-font-{style}-{size}-line-height`

### Spacing
- **Space Scale**: `--ld-primitive-scale-space-{size}`
  - Sizes: `25` (2px), `50` (4px), `100` (8px), `150` (12px), `200` (16px), `250` (20px), `300` (24px), `400` (32px), `500` (40px), `600` (48px), `700` (56px), `800` (64px), `900` (72px), `1000` (80px)

### Border Radius
- **Radius Scale**: `--ld-primitive-scale-border-radius-{size}`
  - Sizes: `25` (2px), `50` (4px), `100` (8px), `200` (16px), `300` (24px), `400` (32px), `round` (pill shape)

## Common Token Mappings

### Buttons

| Button Type | Fill Token | Text Token | Border Token |
|-------------|------------|------------|--------------|
| Primary | `--ld-semantic-color-action-fill-primary` | `--ld-semantic-color-action-text-on-fill-primary` | N/A |
| Secondary | `--ld-semantic-color-action-fill-secondary` | `--ld-semantic-color-action-text-on-fill-secondary` | `--ld-semantic-color-action-border-secondary` |
| Tertiary | `--ld-semantic-color-action-fill-tertiary` | `--ld-semantic-color-action-text-on-fill-tertiary` | `--ld-semantic-color-action-border-tertiary` |
| Destructive | `--ld-semantic-color-action-fill-negative` | `--ld-semantic-color-action-text-on-fill-negative` | N/A |

### Alert/Notice Variants

| Variant | Fill Token | Border Token | Text Token |
|---------|------------|--------------|------------|
| Info | `--ld-semantic-color-fill-info-subtle` | `--ld-semantic-color-border-info` | `--ld-semantic-color-text-on-fill-info-subtle` |
| Success | `--ld-semantic-color-fill-positive-subtle` | `--ld-semantic-color-border-positive` | `--ld-semantic-color-text-on-fill-positive-subtle` |
| Error | `--ld-semantic-color-fill-negative-subtle` | `--ld-semantic-color-border-negative` | `--ld-semantic-color-text-on-fill-negative-subtle` |
| Warning | `--ld-semantic-color-fill-warning-subtle` | `--ld-semantic-color-border-warning` | `--ld-semantic-color-text-on-fill-warning-subtle` |

### Form Inputs

| Property | Token |
|----------|-------|
| Background | `--ld-semantic-color-field-fill` |
| Border | `--ld-semantic-color-field-border` |
| Border (hover) | `--ld-semantic-color-field-border-hovered` |
| Border (focus) | `--ld-semantic-color-field-border-focused` |
| Border (error) | `--ld-semantic-color-field-border-negative` |
| Text | `--ld-semantic-color-field-text-on-fill` |
| Placeholder | `--ld-semantic-color-field-text-subtle-on-fill` |

## Builder.io Import Workflow

When processing designs from Builder.io:

1. **Analyze** the Figma design values
2. **Map** each value to the closest semantic token
3. **Generate** CSS using ONLY design tokens
4. **Verify** no hard-coded values exist
5. **Add** all interactive states (hover, focus, active, disabled)

## Validation Checklist

Before considering code complete, verify:

- [ ] Zero hard-coded color values (`#000000`, `rgb()`, `hsl()`, etc.)
- [ ] Zero hard-coded spacing values (`16px`, `1rem`, etc.)
- [ ] Zero hard-coded font sizes or line heights
- [ ] Zero new CSS custom properties created
- [ ] All colors use semantic tokens (not primitive)
- [ ] All interactive elements have state variants
- [ ] All typography uses semantic font tokens
- [ ] All spacing uses primitive space scale tokens

## Error Messages

If violations are detected, respond with:

```
❌ Design Token Violation Detected

Hard-coded values found:
- Line 23: color: #0053e2; → USE: var(--ld-semantic-color-action-fill-primary)
- Line 24: padding: 16px; → USE: var(--ld-primitive-scale-space-200)

Please update to use design tokens. See guidelines/DesignTokens.md for reference.
```

## Additional Resources

- **Complete token documentation**: `guidelines/DesignTokens.md`
- **Primitive tokens**: `styles/primitive.css`
- **Semantic tokens**: `styles/semantic.css`
- **Component examples**: `client/components/ui/`

---

**ENFORCEMENT LEVEL**: CRITICAL - NO EXCEPTIONS

All generated code MUST comply with these rules. Code reviews MUST reject any violations.
