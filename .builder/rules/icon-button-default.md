# IconButton Default Variant Rule

## CRITICAL RULE: Always Use Ghost Variant for IconButton

When using IconButton components, ALWAYS use the `ghost` variant as the default unless explicitly specified otherwise.

## ✅ CORRECT - Use Ghost Variant

```tsx
// Default - Use ghost
<IconButton
  variant="ghost"
  size="medium"
  aria-label="Settings"
>
  <SettingsIcon />
</IconButton>

// Or rely on default (if ghost is the default prop)
<IconButton
  size="medium"
  aria-label="Menu"
>
  <MenuIcon />
</IconButton>
```

## ❌ WRONG - Don't Use Primary/Secondary Without Reason

```tsx
// Only use primary/secondary if explicitly requested
<IconButton
  variant="primary" // Don't use unless user asks
  aria-label="Settings"
>
  <SettingsIcon />
</IconButton>
```

## When to Use Each Variant

### Ghost (DEFAULT)
**Use for 99% of icon buttons**
- Navigation icons
- Toolbar icons
- Action icons in headers
- Settings/options icons
- Close/dismiss buttons
- Menu toggles

**Why ghost?**
- Minimal visual weight
- Doesn't compete with content
- Clean, modern appearance
- Better for dense UIs
- Matches LD 3.5 best practices

### Primary
**Only use when explicitly requested**
- Floating action buttons (rare)
- Main CTA as icon-only (very rare)
- User specifically says "make it primary"

### Secondary
**Only use when explicitly requested**
- Icon buttons that need more emphasis than ghost
- Secondary actions that need distinction
- User specifically requests secondary styling

### Destructive
**Use for destructive actions**
- Delete buttons
- Remove buttons
- Cancel/close important operations

## Examples

### Navigation Icon Button (Ghost)

```tsx
<IconButton
  variant="ghost"
  size="medium"
  onClick={handleMenu}
  aria-label="Open menu"
>
  <MenuIcon />
</IconButton>
```

### Settings Icon Button (Ghost)

```tsx
<IconButton
  variant="ghost"
  size="medium"
  onClick={() => navigate('/settings')}
  aria-label="Settings"
>
  <GearIcon />
</IconButton>
```

### Close Button (Ghost)

```tsx
<IconButton
  variant="ghost"
  size="small"
  onClick={onClose}
  aria-label="Close"
>
  <XIcon />
</IconButton>
```

### Delete Button (Destructive)

```tsx
<IconButton
  variant="destructive"
  size="medium"
  onClick={handleDelete}
  aria-label="Delete item"
>
  <TrashIcon />
</IconButton>
```

## Icon Sizes

Use these size guidelines:

| Size | Icon Dimensions | Use Case |
|------|----------------|----------|
| `small` | 16×16px | Compact toolbars, inline actions |
| `medium` | 20×20px | **Default** - Standard UI, navigation |
| `large` | 24×24px | Prominent actions, headers |

**Default**: Always use `medium` unless specific size is needed.

## Accessibility Requirements

ALL IconButtons must have `aria-label`:

```tsx
// ✅ CORRECT
<IconButton
  variant="ghost"
  aria-label="Edit item" // Required!
>
  <EditIcon />
</IconButton>

// ❌ WRONG - Missing aria-label
<IconButton variant="ghost">
  <EditIcon />
</IconButton>
```

## Common Patterns

### Toolbar Icons

```tsx
<div style={{ display: 'flex', gap: '8px' }}>
  <IconButton variant="ghost" size="medium" aria-label="Bold">
    <BoldIcon />
  </IconButton>
  <IconButton variant="ghost" size="medium" aria-label="Italic">
    <ItalicIcon />
  </IconButton>
  <IconButton variant="ghost" size="medium" aria-label="Underline">
    <UnderlineIcon />
  </IconButton>
</div>
```

### Navigation Icons

```tsx
<IconButton
  variant="ghost"
  size="medium"
  onClick={() => navigate('/dashboard')}
  aria-label="Dashboard"
>
  <HomeIcon />
</IconButton>
```

### Card Actions

```tsx
<div style={{ display: 'flex', gap: '4px' }}>
  <IconButton variant="ghost" size="small" aria-label="Edit">
    <EditIcon />
  </IconButton>
  <IconButton variant="ghost" size="small" aria-label="Duplicate">
    <CopyIcon />
  </IconButton>
  <IconButton variant="destructive" size="small" aria-label="Delete">
    <TrashIcon />
  </IconButton>
</div>
```

## Summary

**Golden Rules:**
1. ✅ Default variant: **ghost**
2. ✅ Default size: **medium**
3. ✅ Always include **aria-label**
4. ✅ Use destructive for delete/remove
5. ❌ Don't use primary/secondary without explicit reason

**Quick Reference:**
```tsx
// Standard icon button (use this 99% of the time)
<IconButton
  variant="ghost"
  size="medium"
  aria-label="Descriptive label"
>
  <Icon />
</IconButton>
```

---

**Status**: ACTIVE - Enforce on all new IconButton usage  
**Last Updated**: February 15, 2026  
**Scope**: All IconButton components across the application  
**Default**: variant="ghost", size="medium"
