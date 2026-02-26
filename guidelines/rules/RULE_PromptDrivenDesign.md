---
title: Prompt-Driven Design Generation
scope: rule
status: stable
owner: design-system
last_updated: 2025-02-26
---

## Purpose

A practical rulebook for generating new pages, features, and UI patterns via text prompt — covering both **what to write in a prompt** (for designers and PMs) and **how to interpret and execute a prompt** (for AI agents).

---

## Part 1 — Writing Good Design Prompts

### The Minimal Viable Prompt

A prompt must answer four questions to produce correct output:

1. **What** — the page, section, or component being built
2. **Who sees it** — the user context (customer, associate, admin)
3. **What it contains** — key data, actions, or states
4. **How it fits** — where it lives in the navigation shell

```
// Too vague — produces generic output
"Add an order card"

// Too detailed — brittle, gets stuck on specifics
"Make a flex container with 16px padding, 1px border #E3E4E5..."

// Just right — answers all four questions
"Add an order card for the Purchase History page that shows
fulfillment type (curbside, delivery, shipping), a status heading,
a 4-step progress tracker, product thumbnails, and action buttons.
Shipping orders show a 'Buy again' primary action. All cards have
a 'Start a return' footer link."
```

### Prompt Anatomy

Structure prompts in this order for best results:

```
[Page context] > [Component name] > [States/variants] > [Content] > [Actions] > [Edge cases]
```

**Example:**
```
On the Purchase History page [context],
add an InlineAdBanner component [component]
that appears between the 3rd and 4th order cards [placement].
It has a 50% image panel on the left and 50% text panel on the right [layout].
The text panel shows an eyebrow, a headline, a body line, and a CTA button [content].
On mobile (under 480px) it stacks with image on top [responsive].
Use secondary button for CTA. [action variant]
```

### State Prompting

Always name the states you need. The AI will not invent states unless asked.

| Instead of... | Say... |
|---|---|
| "make a button" | "make a button with default, hover, focus, disabled, and loading states" |
| "add an alert" | "add an info alert for normal state, and a warning alert for the delayed state" |
| "show the order status" | "show three order status variants: Delivered (success), Delayed (warning), Cancelled (neutral)" |

### Referencing Existing Patterns

Name existing components and pages to anchor the new design:

```
// Anchors to existing navigation structure
"Add a Subscriptions section to AccountSideNav below Messages,
following the same SideNavigationItem pattern as the other nav items."

// Anchors to existing card pattern
"Add a new card to the order list using the same OrderCard layout —
same border, padding, footer — but replace the progress tracker with
a single status text line."
```

### Responsive Prompts

Always specify what changes at each breakpoint:

```
"Desktop: two-column layout with side nav 248px wide, main content fills remaining space.
Tablet (1024px): hide side nav, show back link instead.
Mobile (480px): stack order meta vertically, action buttons become full-width."
```

### Color and Token Prompts

Never specify hex values. Use semantic role descriptions instead:

```
// Wrong — hardcodes a color
"Make the eyebrow text #001e60"

// Correct — describes the semantic role
"Make the eyebrow text use the brand-bold text color (darkest brand navy)"

// Correct — names the token explicitly
"Use var(--ld-semantic-color-text-brand-bold) for the eyebrow"
```

---

## Part 2 — AI Agent Execution Protocol

When an AI agent receives a design prompt, it must follow this sequence:

### Step 1: Read Before Touching Anything

Before writing a single line of code:
- Read the target page file in full
- Read the existing CSS module in full
- Read any component files that will be modified or composed
- Check `guidelines/rules/RULES_INDEX.md` for applicable rules

```
// Always do this before modifying a page
Read: client/pages/walmart/PurchaseHistory.tsx
Read: client/pages/walmart/PurchaseHistory.module.css
```

### Step 2: Search for Existing Components

Before creating anything, search in this order:

1. `client/components/ui/` — LD 3.5 components (uppercase)
2. `client/components/walmart/` — existing page-level components
3. `guidelines/components/` — documented patterns

If a matching component exists, **use it**. Only create new files when no equivalent exists.

### Step 3: Map Design Intent to Tokens

Convert every visual property to a semantic token before writing CSS:

| Design intent | Token |
|---|---|
| Primary text | `--ld-semantic-color-text` |
| Secondary / subtle text | `--ld-semantic-color-text-subtle` |
| Brand blue text | `--ld-semantic-color-text-brand` |
| Dark navy brand text | `--ld-semantic-color-text-brand-bold` |
| Page background | `--ld-semantic-color-fill-surface-primary` |
| Subtle gray background | `--ld-semantic-color-fill-subtle` |
| Card border | `--ld-semantic-color-separator` |
| Divider line | `--ld-semantic-color-separator` |
| Primary action fill | `--ld-semantic-color-action-fill-primary` |
| Top nav background | `--ld-semantic-color-top-nav-fill` |
| Success text | `--ld-semantic-color-text-positive` |
| Warning text | `--ld-semantic-color-text-warning` |
| Error text | `--ld-semantic-color-text-negative` |

### Step 4: Select Components Using the Decision Tree

```
Need a button?
  └─ Use <Button variant="primary|secondary|tertiary|destructive" size="small|medium|large">

Need a link?
  └─ Use <Link href="..." underline> — never <a> tags

Need a status badge?
  └─ Use <Tag variant="..." color="..."> — never custom <span>

Need an icon?
  └─ Search client/components/icons/ first (303 icons)
  └─ Only create new if nothing matches

Need a card?
  └─ Use <Card> + <CardHeader> + <CardContent> from @/components/ui/Card
  └─ For order/purchase cards: compose from scratch with CSS module

Need form inputs?
  └─ <TextField>, <TextArea>, <Select>, <Checkbox>, <Radio> — never raw <input>

Need a modal/dialog?
  └─ Use <Modal> from @/components/ui/Modal or <dialog> from @/components/ui/dialog

Need a navigation panel?
  └─ Use <SideNavigation> + <SideNavigationItem> — never custom nav lists

Need expandable sections?
  └─ Use <Collapsible> from @/components/ui/collapsible

Need a progress indicator?
  └─ Use <ProgressTracker> for step-based flows
  └─ Use <ProgressIndicator> for percentage/bar progress
```

### Step 5: Build the File Structure

For any new feature, follow this structure:

```
client/
  components/walmart/[feature]/
    ComponentName.tsx          # Main component
    ComponentName.module.css   # Scoped styles (tokens only, no hex)
    SubComponent.tsx           # Break complex JSX into sub-files
    SubComponent.module.css
  pages/walmart/
    PageName.tsx               # Route-level page component
    PageName.module.css        # Page layout styles
```

Rule: If a component's JSX is more than ~80 lines or has more than 3 distinct sections, break it into sub-components.

### Step 6: CSS Module Rules

Every CSS module must:
- Use only `var(--ld-semantic-color-*)` and `var(--ld-primitive-*)` tokens
- Never contain a hex value (e.g., `#0071DC`) as a final value — only as a fallback inside `var()`
- Use 8px multiples for spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48
- Include media queries for 1024px, 768px, and 480px breakpoints
- Use `!important` only to override Builder.io editor-injected inline styles

```css
/* Correct CSS module structure */
.card {
  background: var(--ld-semantic-color-fill-surface-primary, #fff);
  border: 1px solid var(--ld-semantic-color-separator, #E3E4E5);
  border-radius: var(--ld-primitive-scale-borderradius-100, 8px);
  padding: 16px;
  font-family: var(--ld-semantic-font-family-sans, 'Everyday Sans UI', sans-serif);
}

@media (max-width: 768px) {
  .card {
    padding: 12px;
  }
}
```

---

## Part 3 — Named Page Patterns

These are the canonical page structures used in this project. Reference them when prompting for new pages.

### Pattern A: Account Page Layout

Used for: Purchase History, Wallet, Messages, Addresses, Settings

```
┌─────────────────────────────────────────────┐
│  DesktopHeader (top nav, full width)         │
├─────────────────────────────────────────────┤
│  Breadcrumb row (Account / Page name)        │
│  Horizontal Divider                          │
│  SkylineBanner (optional ad banner)          │
├───────────┬─────────────────────────────────┤
│ SideNav   │  Main content area              │
│ 248px     │  (flex: 1, scrolls with page)   │
│ (border-  │                                 │
│ right)    │  PageTitle (h1, 24px/700)       │
│           │  Filters row                    │
│           │  Content list or grid           │
│           │  Pagination                     │
└───────────┴─────────────────────────────────┘
```

**Key CSS rules:**
```css
.body { display: flex; align-items: stretch; }
.nav { width: 248px; flex-shrink: 0; border-right: 1px solid var(--ld-semantic-color-separator); }
.main { flex: 1; min-width: 0; }
```

**When prompting:**
```
"Add a [page name] page using the Account page layout pattern.
Side nav shows AccountSideNav. Main content area has a breadcrumb
(Account / [Page name]), a SkylineBanner, a page title, and [content]."
```

### Pattern B: Order Card

Used for: purchase history items, reorder items

```
┌─────────────────────────────────────────────────┐
│ [AmendsBanner — only if editing window open]     │
├──────────────────────────────┬──────────────────┤
│ LEFT COLUMN (flex: 1)        │ RIGHT COLUMN     │
│                              │ (action buttons) │
│ [Icon 64x64] [Label]         │ [Primary Btn]   │
│             [Location]       │ [Secondary Btn] │
│                              │                 │
│ Status heading (32px/700)    │                 │
│ ProgressTracker (4 steps)    │                 │
│ Alert (return notice)        │                 │
│ Product thumbnails (48x48)   │                 │
├──────────────────────────────┴──────────────────┤
│ Divider                                          │
│ [Start a return link]     [Order total $X.XX]   │
└─────────────────────────────────────────────────┘
```

**When prompting:**
```
"Add an order card for [order type: curbside|delivery|shipping|store].
Status: [Delivered|Preparing|On the way|Delayed].
Products: [list]. Actions: [Buy again (primary), Track package (secondary)].
Show return link in footer."
```

### Pattern C: Side Navigation with Collapsible Sections

Used for: AccountSideNav, Settings menus

```
┌──────────────────┐
│ [Icon] Greeting  │  ← User header (WalmartPlusLogo + name)
│ Member since XXXX│  ← Brand-bold color
├──────────────────┤
│ ▼ Account        │  ← Collapsible trigger (SpotIcon + label)
│   Home           │  ← SideNavigationItem
│   Purchase history│
│   ...            │
├──────────────────┤
│ ▼ Settings       │  ← Collapsible trigger
│   [Group title]  │  ← NavGroup title (bold, 16px)
│   Item           │  ← SideNavigationItem (14px)
│   Item           │
│   [Group title]  │
│   Item           │
├──────────────────┤
│ Sign Out         │  ← signOutRow button
└──────────────────┘
```

**Collapsible header rules:**
- Zero horizontal padding: `padding: 12px 0`
- Group titles: `font-size: var(--ld-semantic-font-body-medium-size, 1rem)` (16px), bold
- Nav items: 14px via SideNavigationItem component
- Collapsible label: same size as group titles (16px/bold)
- Color: `--ld-semantic-color-fill-brand-bold` for Settings label; default text for Account

### Pattern D: Banner / Promotional Card

Used for: InlineAdBanner, SkylineBanner, ReviewPromptBanner

```
┌──────────────────────────────────────────┐
│ [Image/Illustration 50%] │ [Text 50%]   │
│                          │ Eyebrow      │
│                          │ Headline     │
│                          │ Body text    │
│                          │ [CTA Button] │
└──────────────────────────────────────────┘
```

**CSS rule:**
```css
.left  { flex: 0 0 50%; }
.right { flex: 0 0 50%; }
@media (max-width: 480px) {
  .left  { flex: 0 0 60%; }
  .right { flex: 0 0 40%; }
}
```

**Eyebrow/headline color:** `--ld-semantic-color-text-brand-bold` (not plain `text-brand`)

### Pattern E: Review Prompt Carousel

```
┌──────────────────────────────────────────────────┐
│ [CTA Card 300px fixed] [Product] [Product] ...   │
│   Illustration (abs)    Card     Card            │
│   "Review your recent   flex:1   flex:1          │
│    purchases"                                    │
└──────────────────────────────────────────────────┘
Pagination dots below on mobile
```

**Key measurements:**
- CTA card: `width: 300px; flex-shrink: 0`
- Product cards: `flex: 1 1 0` (equal width, fill remaining)
- Illustration: `position: absolute; right: 0; bottom: 0; width: 110px`

---

## Part 4 — Token Quick Reference for Prompts

Use these descriptions in prompts instead of hex values:

| Description | Token name to use in prompt |
|---|---|
| Walmart blue (links, icons) | "brand text color" or "text-brand" |
| Dark navy (eyebrows, Settings label) | "brand-bold text color" or "text-brand-bold" |
| Primary action (buttons) | "action primary fill" |
| Page white background | "surface primary" |
| Light gray hover/background | "fill-subtle" |
| Border / divider line | "separator" |
| Top nav background | "top-nav-fill" |
| Body copy (dark) | "primary text" |
| Secondary text (gray) | "subtle text" |
| Small gray text | "subtlest text" |
| Success green | "positive text" |
| Warning amber | "warning text" |
| Error red | "negative text" |
| Member since / badge blue | "brand-bold text color" (not action blue) |

---

## Part 5 — Common Prompt Mistakes to Avoid

### Mistake 1: Describing pixels instead of design intent

```
// Wrong
"make the text 14px and #74767C with 1px underline"

// Right
"make it body-small size with subtle text color and underline"
```

### Mistake 2: Not specifying which variant/state

```
// Wrong
"add a banner"

// Right
"add an info Alert for the normal return notice,
and a warning Alert when the order is delayed"
```

### Mistake 3: Mixing layout and styling in one sentence

```
// Hard to parse
"make a blue card with padding and a right-side image that has a rounded border"

// Clearer — separate structure from style
"card layout: image on right (200px), text on left (flex: 1).
Card style: white background, 1px separator border, 8px border radius.
Image style: object-fit cover, rounded only on the right corners."
```

### Mistake 4: Not specifying the page context

```
// Wrong — AI doesn't know where this lives
"add a filter dropdown"

// Right
"add a filter dropdown to the PurchaseHistoryFilters component,
above the order list, between the date range picker and the order count"
```

### Mistake 5: Asking for a new component when one already exists

```
// Wrong — forces creation of a duplicate
"create a breadcrumb component"

// Right
"use the existing Breadcrumb component with items: Account > Purchase History"
```

---

## Part 6 — Prompt Templates

Copy, fill in the blanks, and use these as starting points.

### New Page

```
Create a new [page name] page at route /walmart/[route].

Layout: Account page pattern (AccountSideNav left, main content right).
Breadcrumb: Account / [Page name].
Page title: "[Title]" (h1, 24px bold).

Main content:
- [Section 1: describe]
- [Section 2: describe]

Actions:
- [Primary action: label + what it does]
- [Secondary action: label + what it does]

States:
- Empty: show ContentMessage with "[message]"
- Loading: show Skeleton placeholders
- Error: show Alert variant="error" with "[message]"

Responsive:
- 1024px: [what changes]
- 768px: hide side nav, stack content vertically
- 480px: [what changes]
```

### New Card Component

```
Create an [Name]Card component at client/components/walmart/[feature]/[Name]Card.tsx.

Layout: [horizontal|vertical|grid].
Left side: [describe left column content].
Right side: [describe right column content, or "none"].

Content:
- [Field 1]: [token or description]
- [Field 2]: [token or description]
- Footer: [link text] on left, [info text] on right

Actions: [list of buttons with variant and label]

Props interface:
- [propName]: [type] — [description]

States: [default | loading | error | empty]
Responsive: [what changes on mobile]
```

### New Navigation Section

```
Add a [Section name] collapsible section to AccountSideNav.

Position: below [existing section name].

Structure:
- Trigger: SpotIcon with [IconName], label "[Section name]"
- Group "[Group title 1]":
  - [Nav item label] → path: /[path]
  - [Nav item label] → path: /[path]
- Group "[Group title 2]":
  - [Nav item label] → path: /[path]

Label color: [brand-bold for Settings-like sections | default text for Account-like]
```

### New Banner / Promotional Component

```
Create an [Name]Banner component.

Layout: [50/50 | 60/40 | image-only | text-only] split.
Left: [image description or illustration path].
Right:
  - Eyebrow: "[text]" — brand-bold text color
  - Headline: "[text]" — brand-bold text color, [size]
  - Body: "[text]" — primary text
  - CTA: Button variant="[primary|secondary]" "[label]"

Background: [subtle gray | white | brand fill]
Border radius: 8px.
Responsive: at 480px [describe mobile behavior].
```

---

## Summary Checklist

Before submitting a design prompt, confirm:

- [ ] Named the page or component context
- [ ] Described all states (default, loading, error, empty)
- [ ] Specified all interactive variants (hover, focus, disabled)
- [ ] Used role descriptions for color (not hex values)
- [ ] Specified responsive behavior at 1024px and 480px
- [ ] Referenced existing components by name when composing
- [ ] Listed all props/data fields the component needs
- [ ] Specified action button variants (primary/secondary/tertiary)

After code is generated, verify:

- [ ] No hex colors in CSS (only `var()` with hex fallback)
- [ ] No raw `<button>`, `<a>`, `<input>` (use LD components)
- [ ] No `max-width` constraint on page containers
- [ ] All breakpoints covered (1024, 768, 480)
- [ ] Component files are reasonably sized (split if >80 lines JSX)
- [ ] Dev server compiles clean (no TypeScript errors)
