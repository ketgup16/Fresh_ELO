# Plan: Migrate SHADCN/RADIX Components to LD 3.5 Tokens & Foundations

## Current State

All 6 components currently use Tailwind utility classes (`bg-accent`, `text-popover-foreground`, etc.) with some inline `var(--ld-semantic-...)` styles partially applied. The target pattern is **CSS modules with LD 3.5 semantic tokens exclusively**, matching the established pattern in `Menu.module.css`, `MenuItem.module.css`, and `Select.module.css`.

**Blast radius is low** — each component is only imported by its corresponding example file in `client/components/examples/`.

---

## Step 1: Dropdown Menu → LD 3.5 CSS Module

**File:** `client/components/ui/dropdown-menu.tsx`
**New file:** `client/components/ui/DropdownMenu.module.css`

Changes:
- Create `DropdownMenu.module.css` with LD 3.5 tokens for:
  - **Content overlay:** `--ld-semantic-color-surface-overlay`, `--ld-semantic-elevation-200`, `--ld-semantic-border-radius-large`
  - **Items:** `--ld-semantic-color-action-fill-transparent` (rest), `--ld-semantic-color-fill-hovered` (hover), `--ld-semantic-color-fill-focused` (focus), `--ld-semantic-color-surface-activated` (selected)
  - **Text:** `--ld-semantic-color-text`, `--ld-semantic-color-text-subtle` (labels/shortcuts)
  - **Typography:** `--ld-semantic-font-body-small-family/size/lineheight/weight`
  - **Separator:** `--ld-semantic-color-separator`
  - **Focus ring:** `--ld-semantic-color-action-focus-outline` with `--ld-semantic-scale-borderwidth-interactive-focused`
  - **Disabled:** `opacity: 0.4`, `pointer-events: none`
  - **Checkbox/Radio indicators:** icon sizing via `--ld-semantic-scale-icon-small`
- Update `dropdown-menu.tsx`: replace all Tailwind classes and inline styles with CSS module classes
- Update `client/components/examples/DropdownMenuExample.tsx` if any inline overrides exist

---

## Step 2: Context Menu → LD 3.5 CSS Module

**File:** `client/components/ui/context-menu.tsx`
**New file:** `client/components/ui/ContextMenu.module.css`

Changes:
- Nearly identical structure to Dropdown Menu (same Radix menu primitive pattern)
- Create `ContextMenu.module.css` using the same token set as Step 1
- Replace Tailwind classes and inline styles in `context-menu.tsx` with CSS module classes
- Update example file if needed

---

## Step 3: Menubar → LD 3.5 CSS Module

**File:** `client/components/ui/menubar.tsx`
**New file:** `client/components/ui/Menubar.module.css`

Changes:
- Create `Menubar.module.css` with LD 3.5 tokens for:
  - **Root bar:** `--ld-semantic-color-fill-primary` background, `--ld-semantic-color-border-subtlest` border, `--ld-primitive-scale-borderradius-50` radius
  - **Triggers:** `--ld-semantic-font-body-small-*` typography, `--ld-semantic-color-action-fill-transparent` (rest), `--ld-semantic-color-fill-hovered` (hover), `--ld-semantic-color-surface-activated` (open)
  - **Content/items/separators/labels:** Same token set as Dropdown Menu (shared overlay pattern)
  - **Focus ring:** Same `--ld-semantic-color-action-focus-outline` pattern
- Replace all Tailwind classes in `menubar.tsx` with CSS module classes
- Update example file

---

## Step 4: Command Menu → LD 3.5 CSS Module

**File:** `client/components/ui/command.tsx`
**New file:** `client/components/ui/Command.module.css`

Changes:
- Create `Command.module.css` with LD 3.5 tokens for:
  - **Container:** `--ld-semantic-color-surface-overlay`, `--ld-semantic-elevation-200`, `--ld-semantic-border-radius-large`
  - **Input:** `--ld-semantic-color-field-fill`, `--ld-semantic-color-field-text-onfill`, `--ld-semantic-color-field-border` (bottom border), `--ld-semantic-font-body-small-*` typography, placeholder via `--ld-semantic-color-text-subtle`
  - **Items:** Same interactive state tokens as menu items (transparent → hovered → focused → selected)
  - **Group headings:** `--ld-semantic-color-text-subtle`, `--ld-semantic-font-caption-*` typography
  - **Separator:** `--ld-semantic-color-separator`
  - **Empty state:** `--ld-semantic-color-text-subtle`
  - **Search icon:** `--ld-semantic-scale-icon-small`, `--ld-semantic-color-text-subtle`
- Replace Tailwind classes in `command.tsx` with CSS module classes
- The `CommandDialog` subcomponent wraps `dialog.tsx` — keep that Radix dialog wrapper but apply LD tokens to the command-specific parts
- Update example file

---

## Step 5: Navigation Menu → LD 3.5 CSS Module

**File:** `client/components/ui/navigation-menu.tsx`
**New file:** `client/components/ui/NavigationMenu.module.css`

Changes:
- Create `NavigationMenu.module.css` with LD 3.5 tokens for:
  - **Root:** `--ld-semantic-font-family-sans`
  - **Triggers:** `--ld-semantic-color-text` text, `--ld-semantic-color-action-fill-transparent` (rest), `--ld-semantic-color-fill-hovered` (hover), `--ld-semantic-color-surface-activated` (open state), `--ld-primitive-scale-borderradius-50` radius
  - **Viewport (content panel):** `--ld-semantic-color-surface-overlay`, `--ld-semantic-elevation-200`, `--ld-semantic-border-radius-large`
  - **Indicator arrow:** `--ld-semantic-color-surface-overlay` fill
  - **Focus ring:** `--ld-semantic-color-action-focus-outline`
  - **Links inside content:** `--ld-semantic-color-text`, `--ld-semantic-color-text-subtle` for descriptions
- Remove the CVA `navigationMenuTriggerStyle` function (replace with CSS module class)
- Replace all Tailwind classes and inline styles with CSS module classes
- Export a `navigationMenuTriggerClassName` or similar if external consumers use the trigger style
- Update example file

---

## Step 6: Pagination → LD 3.5 CSS Module

**File:** `client/components/ui/pagination.tsx`
**New file:** `client/components/ui/Pagination.module.css`

Changes:
- Pagination already partially aligns with LD (uses `buttonVariants` from the LD Button)
- Create `Pagination.module.css` with LD 3.5 tokens for:
  - **Nav container:** layout tokens only (flexbox)
  - **Page links:** Keep delegating to Button component tokens (already LD compliant), but replace Tailwind layout classes with CSS module classes
  - **Active page indicator:** `--ld-semantic-color-action-fill-primary` background, `--ld-semantic-color-action-text-on-fill-primary` text (or use Button variant="primary")
  - **Ellipsis:** `--ld-semantic-color-text-subtle`, icon sizing via `--ld-semantic-scale-icon-small`
  - **Previous/Next labels:** `--ld-semantic-font-body-small-*` typography
- Replace Tailwind layout classes with CSS module classes
- Continue using Button/IconButton components for the actual page links (no token duplication)
- Update example file

---

## Shared Token Reference (used across all 6 components)

| Purpose | LD 3.5 Token |
|---|---|
| Overlay background | `--ld-semantic-color-surface-overlay` |
| Text primary | `--ld-semantic-color-text` |
| Text subtle | `--ld-semantic-color-text-subtle` |
| Disabled text | `--ld-semantic-color-text-disabled` |
| Separator | `--ld-semantic-color-separator` |
| Elevation | `--ld-semantic-elevation-200` |
| Border radius | `--ld-semantic-border-radius-large` / `--ld-primitive-scale-borderradius-50` |
| Font family | `--ld-semantic-font-family-sans` |
| Font (body small) | `--ld-semantic-font-body-small-family/size/weight/lineheight` |
| Font (caption) | `--ld-semantic-font-caption-family/size/weight/lineheight` |
| Item rest fill | `--ld-semantic-color-action-fill-transparent` |
| Item hover fill | `--ld-semantic-color-fill-hovered` |
| Item focus fill | `--ld-semantic-color-fill-focused` |
| Item selected fill | `--ld-semantic-color-surface-activated` |
| Focus outline | `--ld-semantic-color-action-focus-outline` |
| Focus outline width | `--ld-semantic-scale-borderwidth-interactive-focused` |
| Disabled opacity | `0.4` |
| Icon small | `--ld-semantic-scale-icon-small` |
| Icon medium | `--ld-semantic-scale-icon-medium` |
| Spacing | `--ld-primitive-scale-space-50/100/150/200/300` |

---

## Execution Order & Rationale

1. **Dropdown Menu first** — it's the canonical menu overlay pattern; the CSS module created here becomes the template for Context Menu and Menubar
2. **Context Menu second** — nearly identical structure, reuses most of the Dropdown Menu CSS with minor differences
3. **Menubar third** — extends the menu pattern with a horizontal trigger bar
4. **Command Menu fourth** — unique input+list pattern but overlay tokens are shared
5. **Navigation Menu fifth** — different UX pattern (tab navigation with content panels) but shares overlay tokens
6. **Pagination last** — simplest change since it already delegates to the LD Button; mostly layout class migration

Each step is independent and can be reviewed/merged separately.
