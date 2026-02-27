---
title: Design System Rules Index
scope: rule
status: stable
owner: design-system
last_updated: 2025-02-26
---

## Purpose

Quick reference for all mandatory design system rules and enforcement policies.

## Critical Rules (ALWAYS ENFORCE)

### 0.5 — Ask Before You Build (MANDATORY — NO EXCEPTIONS)
**File**: `guidelines/AGENTS.md` → "MANDATORY PRE-TASK PROTOCOL"

**When**: Before writing ANY code for a design or UI request

**Key Requirements**:
- ✅ ALWAYS ask the designer/requester the relevant pre-launch questions FIRST
- ✅ Select only the question categories that apply to the task (don't dump the full list)
- ✅ Wait for answers before implementing
- ✅ If told "just go ahead," document the assumptions and use defaults from `RULE_PromptDrivenDesign.md`
- ❌ NEVER assume breakpoints, animation feel, navigation behavior, token mapping, or tap target requirements
- ❌ NEVER start coding a carousel without asking about auto-advance, shadow clipping, and touch targets
- ❌ NEVER start coding navigation without asking which tab is active and whether animation precedes routing

**Question categories by task type**:

| Task | Ask about |
|---|---|
| New page / layout | Breakpoints, tokens, states, data freshness |
| Carousel / scroll list | Shadow clipping, auto-advance, touch targets |
| Tabs / nav / buttons | Active state per page, navigation route + delay |
| Animation / transition | Feel (spring? ease? instant?), duration, timing |
| Data / content update | Year in dates?, real vs randomized names/addresses |

---

### 0. Dev Server Health Check
**File**: `RULE_DevServerHealthCheck.md`

**When**: After completing ANY code changes

**Key Requirements**:
- ✅ ALWAYS check dev server logs after finishing changes
- ✅ ALWAYS restart if compilation errors are found
- ✅ NEVER wait for the user to report a blank page
- ✅ Verify clean startup after any restart

---

### 1. Tag and OLQTag Components
**File**: `RULE_TagComponents.md`

**When**: Any status label, category badge, or percentage-coded quality indicator

**Key Requirements**:
- ALWAYS use `Tag` from `@/components/ui/tag` for status/category labels
- ALWAYS use `OLQTag` from `@/components/ui/olq-tag` for percentage quality indicators
- NEVER write a custom `getXStyle()` function returning inline background/color values
- NEVER hard-code OLQ color thresholds — built into `OLQTag`

**Quick Check**:
```tsx
// WRONG
const getOLQStyle = (olq: string) => ({ backgroundColor: '#FBD0CC', ... });
<div style={getOLQStyle(item.olq)}>{item.olq}</div>

// CORRECT
import { OLQTag } from '@/components/ui/olq-tag';
<OLQTag percentage={85} />
```

---

### 3. Design System Enforcement (Tokens + Icons)
**File**: `RULE_DesignSystemEnforcement.md`

**When**: ALL code - components, pages, styles, and designs

**Key Requirements**:
- ✅ NEVER use hard-coded hex colors, spacing, or values
- ✅ NEVER create inline SVG icons
- ✅ NEVER use external icon libraries (react-icons, heroicons)
- ✅ ALWAYS use semantic design tokens (624 tokens available)
- ✅ ALWAYS use icons from centralized library (303 icons)
- ✅ ALWAYS use LD components (Button, not inline styled buttons)

**Quick Check**:
```tsx
/* ❌ WRONG */
<button style={{ backgroundColor: '#0071DC', padding: '16px' }}>
  <svg><path d="..."/></svg>
</button>

/* ✅ CORRECT */
import { Button } from '@/components/ui/Button';
import { Search } from '@/components/icons';
<Button variant="primary" leading={<Search />}>Click</Button>
```

**New Icon Requirements**:
- ✅ Square linecap (`strokeLinecap="square"`)
- ✅ 1.5px stroke width
- ✅ 20x20 viewBox
- ✅ currentColor for theming

---

### 4. Icon Usage and Management
**File**: `RULE_IconUsage.md`

**When**: Adding icons to designs, Builder.io imports, new components

**Key Requirements**:
- ✅ ALWAYS search 304 existing icons first
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
- 303 icons available across 15+ categories
- Core library: `client/components/icons/`
- Custom icons: `client/components/icons-custom/`

---

### 5. LinkButton and Spot Icon Usage
**File**: `RULE_LinkButtonAndSpotIcon.md`

**When**: Adding link-styled buttons or icon indicators to todo items, action rows, or cards

**Key Requirements**:
- ✅ ALWAYS use `LinkButton` from `@/components/ui/LinkButton` — never custom inline link buttons
- ✅ ALWAYS use round Spot Icon pattern (brand-subtle background, `borderRadius: 50%`) — never square placeholders
- ❌ NEVER override LinkButton color or weight with custom CSS
- ❌ NEVER use blue bold text for link buttons (LD 3.5 uses regular weight, black text)

**Quick Check**:
```tsx
/* ❌ WRONG */
<button style={{ color: '#0053E2', fontWeight: 700, textDecoration: 'underline' }}>Link</button>

/* ✅ CORRECT */
import { LinkButton } from '@/components/ui/LinkButton';
<LinkButton>Link</LinkButton>
```

---

### 6. Figma Exportable Asset Extraction
**File**: `RULE_FigmaAssetExtraction.md` 🆕

**When**: Implementing Figma designs, extracting assets from design files

**Key Requirements**:
- ✅ ONLY extract assets marked as "exportable" in Figma
- ✅ Use exact names provided by designer
- ✅ Preserve specified file formats (SVG, PNG, WebP)
- ❌ NEVER extract every visible image/graphic
- ❌ NEVER rename assets without approval
- ❌ NEVER convert formats arbitrarily

**Quick Check**:
```tsx
/* ✅ CORRECT - Exportable assets with semantic names */
associate-waving.svg
network-issue.svg
associate-glasses.svg

/* ❌ WRONG - Auto-generated or non-exportable */
Rectangle 123.png
Untitled.jpg
temp-image-xyz.webp
```

**Asset Organization**:
```
public/
  illustrations/  # Production illustrations (exportable)
  icons/         # Production icons (exportable)
  images/        # Production images (exportable)
```

---

### 7. Guidelines Page Sync
**File**: `RULE_GuidelinesPageSync.md`

**When**: After ANY change to files in the `guidelines/` directory

**Key Requirements**:
- ✅ ALWAYS update `client/pages/component-library/GuidelinesDocIndex.tsx` when adding/removing/renaming guideline files
- ✅ Add new entries with `name`, `path`, and `purpose` to the correct section in `docSections`
- ✅ Remove entries for deleted files
- ✅ Keep the Documentation Index tab on the Guidelines page in sync with actual files

---

## Component and Layout Rules

### 8. Component Reuse Policy
**Reference**: `design-system/ComponentReference.md`

**When**: Creating any new UI component

**Key Requirements**:
- Search `client/components/ui/` for custom components FIRST
- Use Living Design 3.5 components (Button, Tag, ButtonGroup, etc.)
- Never create custom buttons with inline styles
- Consolidate duplicates immediately

**Component Priority**:
1. Living Design 3.5 components (`client/components/ui/` with uppercase)
2. Shadcn/Radix components (lowercase names)
3. Custom components (only if no equivalent exists)

---

### 9. Responsive Layout and Page Structure
**File**: `RULE_ResponsiveLayout.md`

**When**: Creating ANY new page, view, or layout component

**Key Requirements**:
- ✅ MUST use standard shell (DesktopHeader + SubNav + scrollable main)
- ✅ MUST fill full available width within the shell (no max-width constraints)
- ✅ MUST use standard breakpoints: 1024px, 768px, 480px
- ✅ MUST reduce padding at each breakpoint (32 → 24 → 16 → 12)
- ✅ MUST stack multi-column layouts at 768px
- ✅ MUST reduce grid columns at 1024px and 768px
- ✅ MUST scale page title to 24px at 768px
- ✅ MUST stack form rows vertically at 768px
- ✅ MUST use 8px spacing multiples
- ❌ NEVER invent new breakpoints
- ❌ NEVER omit responsive media queries from grids or multi-column layouts

**Quick Check**:
```css
/* ❌ WRONG — max-width constrains content, no breakpoints */
.page { max-width: 1280px; margin: 0 auto; padding: 40px 60px; }
.grid { grid-template-columns: repeat(4, 1fr); }

/* ✅ CORRECT — Full width within shell, responsive */
.page { width: 100%; padding: 24px 32px; }
.grid { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .page { padding: 16px; } .grid { grid-template-columns: 1fr; } }
```

---

### 10. SVG Asset Management, Reuse, and Accessibility
**File**: `RULE_SVGAssets.md`

**When**: Any SVG illustration is needed, added, or referenced

**Key Requirements**:
- ✅ ALWAYS check `public/illustrations/` for an existing match before generating a new image
- ✅ ALWAYS tell the user which illustration was chosen and list 2–4 alternatives by filename — never silently pick one
- ✅ ONLY generate a new image if the Figma design specifies something not in the folder, or the user explicitly requests it
- ✅ ALWAYS provide `alt` text on every `<img>` using an illustration — the SVG files have NO embedded `<title>` elements
- ✅ Use `alt=""` + `aria-hidden="true"` only when the illustration is purely decorative
- ✅ ALWAYS host SVG illustrations locally — never reference CDN URLs with `?format=webp` or `?width=` params
- ✅ Fulfillment/category pictograms render at 64×64px
- ❌ NEVER generate a new illustration when a semantically matching one already exists locally
- ❌ NEVER omit `alt` on an `<img>` tag
- ❌ NEVER use the filename as alt text (e.g. `alt="Toys.svg"`)
- ❌ NEVER commit download scripts to source control

**Illustration Folders**:
```
public/illustrations/
  mono-large/          # Large mono category illustrations
  mono-small/          # Small mono category illustrations
  spot-illustration/   # Character/scene illustrations (associate-waving, network-issue, etc.)
```

**Quick Check**:
```html
<!-- ❌ WRONG — generating new when existing matches -->
<!-- Toys.svg already exists locally! -->
<Media type="gen-image" query="toys illustration" />

<!-- ✅ CORRECT — reuse existing, with proper alt -->
<img src="/illustrations/mono-large/Toys.svg" alt="Toys" width="64" height="64" />

<!-- ✅ CORRECT — decorative spot illustration -->
<img src="/illustrations/spot-illustration/associate-waving.svg" alt="" aria-hidden="true" width="160" height="160" />

<!-- ❌ WRONG — CDN re-encodes SVG as WebP → blurry, and no alt -->
<img src="https://cdn.builder.io/.../icon?format=webp&width=800" />
```

---

### 11. Card Meta Layout — Icon + Stacked Text Pattern
**File**: `RULE_CardMetaLayout.md`

**When**: Building any card with a type icon, primary label, and secondary detail (location, seller, sublabel)

**Key Requirements**:
- ✅ Secondary text MUST be nested **inside** the chip text column, NOT a sibling of the chip
- ✅ Use `flex-direction: column` on the text container
- ✅ Use `align-items: center` on the chip row (icon vertically centers with text block)
- ✅ Use `gap: 2px` between primary and secondary label
- ❌ NEVER place secondary details as siblings of the type chip

**Quick Check**:
```tsx
// ❌ WRONG — location disconnected from icon
<span className={styles.chip}><img/><span>Curbside pickup</span></span>
<span className={styles.location}>Carrollton Supercenter...</span>

// ✅ CORRECT — location stacked under label, inside chip
<span className={styles.chip}>
  <img/>
  <span className={styles.chipText}>
    <span>Curbside pickup</span>
    <span className={styles.location}>Carrollton Supercenter...</span>
  </span>
</span>
```

---

### 12a. Accessibility — Never Disable Buttons
**Scope**: ALL interactive components, modals, forms, and CTAs

**When**: Any time a button's action depends on state (form validity, unsaved changes, selection, etc.)

**Key Requirements**:
- ✅ ALWAYS keep buttons enabled — use visual cues (label changes) instead of `disabled`
- ✅ If nothing actionable has happened yet, show a neutral label ("Done", "Close") that safely dismisses
- ✅ If an action becomes available, change the label to reflect it ("Save changes", "Confirm", etc.)
- ✅ Use `aria-describedby` or helper text to explain _why_ an action isn't ready, if needed
- ❌ NEVER add `disabled` to a button because state hasn't changed yet
- ❌ NEVER show a button that does nothing (grayed-out, cursor-not-allowed) — remove it or change its label

**Quick Check**:
```tsx
// ❌ WRONG — blocks keyboard users, confuses screen readers
<Button variant="primary" disabled={!hasChanges}>Save changes</Button>

// ✅ CORRECT — always enabled, label reflects state
<Button variant="primary" onClick={() => hasChanges ? save() : dismiss()}>
  {hasChanges ? 'Save changes' : 'Done'}
</Button>
```

**Why this matters**:
- Disabled buttons can't receive focus — screen readers and keyboard users can't reach them
- Users with cognitive disabilities can't tell *why* the button is inactive without extra context
- LD 3.5 accessible design principle: interactive elements must always be reachable

---

### 12. Panel Design Requirements
**File**: `Panel.md`

**When**: Creating any panel, drawer, or sidebar component

**Key Requirements**:
- ✅ MUST be resizable (min: 420px, max: 800px)
- ✅ MUST have resize handle with visual indicator
- ✅ MUST persist width to localStorage
- ✅ MUST be responsive for small screens

**Reference Implementation**: `client/components/RecommendationsPanel.tsx`

---

### 13. Prompt-Driven Design Generation
**File**: `RULE_PromptDrivenDesign.md`

**When**: Writing any design prompt OR implementing a design from a text prompt

**Key Requirements**:
- ✅ Prompts must answer: What, Who, What it contains, How it fits
- ✅ Always name states (loading, empty, error) in the prompt
- ✅ Use semantic role descriptions for color (never hex values in prompts)
- ✅ Reference existing components by name to anchor the design
- ✅ AI agents must read existing files before touching any code
- ✅ Use existing icons (303 available) — never create new icons unless explicitly asked
- ❌ NEVER create a new component without searching existing ones first
- ❌ NEVER specify hex values in prompts — describe the semantic role instead

**Quick Check**:
```
// Wrong prompt
"make the eyebrow #001e60 with font-size 14px"

// Correct prompt
"make the eyebrow use brand-bold text color, body-small size"
```

**Prompt Templates**: New Page, New Card, New Nav Section, New Banner — all in the rule file.

---

## Design System Resources

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

## Common Violations to Avoid

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

## Pre-Implementation Checklist

Before creating ANY new component, icon, or design:

- [ ] Searched existing components in `client/components/ui/`
- [ ] Searched all 303 icons at `/component-library#icons`
- [ ] Checked relevant guideline docs in `guidelines/`
- [ ] Verified no duplicates exist
- [ ] Confirmed using semantic design tokens only
- [ ] All interactive states included (hover, focus, active, disabled)
- [ ] Follows LD 3.5 specifications

---

## Quick Links

| Resource | Location |
|----------|----------|
| Component API Reference | `guidelines/design-system/ComponentReference.md` |
| Design System Enforcement | `guidelines/rules/RULE_DesignSystemEnforcement.md` |
| Icon Usage Rule | `guidelines/rules/RULE_IconUsage.md` |
| Token Documentation | `guidelines/design-system/DesignTokens.md` |
| Component Library | `/component-library` |
| Icon Library (303 icons) | `/component-library#icons` |
| Primitive Tokens | `styles/primitive.css` |
| Semantic Tokens | `styles/semantic.css` |
| Component Guidelines | `guidelines/components/` (40+ files) |

---

## Workflow for New Designs

### From Builder.io Plugin

1. **Analyze** imported Figma design
2. **Map** colors → existing semantic tokens
3. **Map** icons → existing icon library (303 icons)
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

## Success Criteria

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
