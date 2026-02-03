---
title: React Component Guidelines for Living Design
scope: react
status: active
owner: design-system
last_updated: 2026-01-12
---

# React Component Guidelines

This is the **delegator/index** for all React-specific Living Design guidelines. These rules help agents and developers use Living Design components correctly in React applications.

## Quick Reference

### 🚫 Critical Rules (MUST follow)

1. **Never use `@private` components** - See [Component Visibility](./component-visibility.md)
2. **Always use typography components** - See [Typography](./typography.md)
3. **Never bypass token system** - See [Tokens](./tokens.md)

### 📚 Detailed Guidelines

- **[Component Visibility & Access](./component-visibility.md)**
  - Rules about `@private` components
  - What components can and cannot be used directly
  - How to check component visibility

- **[Typography Components](./typography.md)** ⭐ **REQUIRED READING**
  - Display, Heading, Body, and Caption components
  - Props API (`size`, `weight`, `as`)
  - Usage rules and examples
  - Common patterns
  - Responsive behavior

- **[Icon Button](./icon-button.md)**
  - IconButton component with lucide-react icons
  - Size prop mapping (xsmall, small, medium, large)
  - Icon sizing requirements
  - Accessibility requirements
  - Common patterns

- **[Token System](./tokens.md)**
  - Why tokens exist
  - Why you shouldn't use them directly
  - Token naming conventions
  - Guidance for component authors

## Common Questions

### Q: Can I use plain `<p>` or `<h1>` tags?
**A:** No. Always wrap them in Living Design typography components. See [Typography](./typography.md).

### Q: Can I use Tailwind typography classes like `text-lg` or `font-bold`?
**A:** No. Use typography component props instead. See [Typography](./typography.md).

### Q: I found a component but it's marked `@private`. Can I use it?
**A:** No. Find the public API that provides that functionality. See [Component Visibility](./component-visibility.md).

### Q: Can I reference CSS variables directly in my code?
**A:** No. Use the component props API. See [Tokens](./tokens.md).

## Integration with Main Guidelines

These React-specific guidelines extend the main Living Design guidelines:

- Start with the [main Guidelines.md](../Guidelines.md) for overall design system rules
- Use these React guidelines for implementation details
- Refer to component-specific docs in `/guidelines/components/` for individual component usage

## File Organization

```
/guidelines/
├── Guidelines.md                    # Main design system overview
├── Guidelines-react.md              # This delegator file (symlink/alias to react/index.md)
└── react/
    ├── index.md                     # This file
    ├── component-visibility.md      # @private rules
    ├── typography.md                # Typography components
    ├── icon-button.md               # IconButton component
    └── tokens.md                    # Token system
```

## For Agents

When you need React-specific guidance:
1. Start here for quick reference
2. Follow links to detailed topic files
3. Always check component visibility before using a component
4. Default to typography components for all text rendering