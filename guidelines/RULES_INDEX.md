# Design System Rules - Master Index

**Quick reference for all mandatory design system rules and enforcement policies**

---

## 🎯 Critical Rules (ALWAYS ENFORCE)

### 1. Design Token Enforcement
**File**: `RULE_DesignTokenEnforcement.md`

**When**: All new designs, Builder.io imports, AI-generated code

**Key Requirements**:
- ✅ NEVER use hard-coded colors, spacing, or typography
- ✅ NEVER create new CSS custom properties/tokens
- ✅ ALWAYS use semantic tokens (not primitive) for colors
- ✅ ALWAYS include interactive states (hover, focus, active, disabled)

**Quick Check**:
```css
/* ❌ WRONG */
.button { background: #0053e2; padding: 16px; }

/* ✅ CORRECT */
.button { 
  background: var(--ld-semantic-color-action-fill-primary);
  padding: var(--ld-primitive-scale-space-200);
}
```

---

### 2. Icon Usage and Management
**File**: `RULE_IconUsage.md`

**When**: Adding icons to designs, Builder.io imports, new components

**Key Requirements**:
- ✅ ALWAYS search 306 existing icons first
- ✅ NEVER create duplicate icons
- ✅ NEVER add to core `icons/` folder (use `icons-custom/` for new)
- ✅ ALWAYS check Component Library at `/component-library#icons`

**Quick Check**:
```tsx
/* ❌ WRONG - Creating duplicate */
// Don't create SearchIcon.tsx if Search.tsx exists!

/* ✅ CORRECT - Use existing */
import { Search } from '@/components/icons';
```

**Icon Library Stats**:
- 306 icons available across 15+ categories
- Core library: `client/components/icons/`
- Custom icons: `client/components/icons-custom/`

---

## 📚 Component Guidelines

### 3. Component Reuse Policy
**Reference**: Custom rules in system prompt

**When**: Creating any new UI component

**Key Requirements**:
- ✅ Search `client/components/ui/` before creating components
- ✅ Use Living Design 3.5 components (Button, Tag, ButtonGroup, etc.)
- ✅ Never create custom buttons with inline styles
- ✅ Consolidate duplicates immediately

**Component Priority**:
1. Living Design 3.5 components (`client/components/ui/` with uppercase)
2. Shadcn/Radix components (lowercase names)
3. Custom components (only if no equivalent exists)

---

### 4. Panel Design Requirements
**File**: `Panel.md`

**When**: Creating any panel, drawer, or sidebar component

**Key Requirements**:
- ✅ MUST be resizable (min: 420px, max: 800px)
- ✅ MUST have resize handle with visual indicator
- ✅ MUST persist width to localStorage
- ✅ MUST be responsive for small screens

**Reference Implementation**: `client/components/RecommendationsPanel.tsx`

---

## 🎨 Design System Resources

### Token Documentation
- **Primitive tokens**: `styles/primitive.css` (364 lines)
- **Semantic tokens**: `styles/semantic.css` (648 lines)
- **Token guide**: `DesignTokens.md` (776 lines)

### Component Documentation
- **Button**: `Button.md`
- **Badge**: `Badge.md`
- **Card**: `Card.md`
- **Tag**: `Tag.md`
- **Complete list**: 30+ component guides in `guidelines/`

### Visual Reference
- **Component Library**: `/component-library`
- **Sections**: Icons, Buttons, Badges, Breadcrumbs, Links, Icon Buttons, Cards

---

## 🚫 Common Violations to Avoid

### ❌ Violation #1: Hard-Coded Colors
```css
/* WRONG */
.element { background: #0053e2; color: white; }

/* CORRECT */
.element { 
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-on-fill-primary);
}
```

### ❌ Violation #2: Duplicate Icons
```tsx
/* WRONG */
// Creating UserIcon.tsx when User.tsx exists

/* CORRECT */
import { User } from '@/components/icons';
```

### ❌ Violation #3: Custom Buttons
```tsx
/* WRONG */
<button className="bg-blue-500 px-4 py-2 rounded-full">Click</button>

/* CORRECT */
import { Button } from '@/components/ui/Button';
<Button variant="primary">Click</Button>
```

### ❌ Violation #4: New Tokens
```css
/* WRONG */
:root {
  --my-custom-color: #1a73e8;
}

/* CORRECT */
/* Use existing tokens - they are comprehensive */
```

---

## 🔍 Pre-Implementation Checklist

Before creating ANY new component, icon, or design:

- [ ] Searched existing components in `client/components/ui/`
- [ ] Searched all 306 icons at `/component-library#icons`
- [ ] Checked relevant guideline docs in `guidelines/`
- [ ] Verified no duplicates exist
- [ ] Confirmed using semantic design tokens only
- [ ] All interactive states included (hover, focus, active, disabled)
- [ ] Follows LD 3.5 specifications

---

## 📖 Quick Links

| Resource | Location |
|----------|----------|
| Design Token Rule | `guidelines/RULE_DesignTokenEnforcement.md` |
| Icon Usage Rule | `guidelines/RULE_IconUsage.md` |
| Token Documentation | `guidelines/DesignTokens.md` |
| Component Library | `/component-library` |
| Icon Library (306 icons) | `/component-library#icons` |
| Primitive Tokens | `styles/primitive.css` |
| Semantic Tokens | `styles/semantic.css` |
| Component Guidelines | `guidelines/*.md` (30+ files) |

---

## 🚀 Workflow for New Designs

### From Builder.io Plugin

1. **Analyze** imported Figma design
2. **Map** colors → existing semantic tokens
3. **Map** icons → existing icon library (306 icons)
4. **Map** components → existing LD 3.5 components
5. **Generate** code using ONLY existing tokens and components
6. **Verify** no hard-coded values or duplicates
7. **Add** all interactive states

### From AI Generation

1. **Identify** design requirements
2. **Search** existing components and icons first
3. **Reuse** existing patterns and tokens
4. **Follow** LD 3.5 specifications exactly
5. **Validate** against rules before finalizing

---

## ✅ Success Criteria

Code is ready when:

- ✅ Zero hard-coded color values
- ✅ Zero hard-coded spacing values
- ✅ Zero new tokens created
- ✅ Zero duplicate components
- ✅ Zero duplicate icons
- ✅ All colors use semantic tokens
- ✅ All icons from existing library
- ✅ All interactive states included
- ✅ Follows LD 3.5 specifications

---

**ENFORCEMENT LEVEL**: CRITICAL - NO EXCEPTIONS

All rules are mandatory. Code reviews MUST reject any violations.
