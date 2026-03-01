# Plan: Token Compliance + Responsive Breakpoints for WCP Components

## Overview

A full audit of `client/components/walmart/` and `client/pages/walmart/` surfaced three categories of violations that prevent components from theming correctly and responding to breakpoints. This plan remediates all of them in prioritized phases.

---

## What was found (audit summary)

| Violation type | Scope |
|---|---|
| Hard-coded hex fallback values in `var(--token, #HEX)` | 40+ CSS files |
| Inline `style={{}}` with hex color fallbacks in TSX | 15+ component files |
| Hard-coded `px` font-size and spacing values | Widespread |
| Missing `@media` rules at 768px and 480px | Most CSS modules |
| Raw `<button>` / `<a>` instead of LD `Button` / `Link` / `IconButton` | ~20 components |
| Literal hex in Tailwind classnames (`text-[#E11900]`, `bg-[#00A862]`) | ProductCardGrid/List, PharmacyDelivery, CameraModal |
| Literal hex fills inside inline SVGs | DesktopFooter, MwebFooter, SkylineBanner |
| `flagColor: "#0E002E"` hard-coded in data arrays | CerealSearchResults, DressesSearchResults, SearchResults |

---

## Phase 1 — Critical: Inline hex + Tailwind hex classes (highest theming risk)

These files bypass the token system completely because inline styles and Tailwind classes are not overridden by theme CSS.

### 1.1 DesktopHeader.tsx + DesktopHeader.module.css
- **Inline style** on the search wrapper uses `backgroundColor: 'white'` and `borderColor: 'var(..., #0053E2)'`
- Remove fallback hex values from `var()` calls in the CSS module
- Replace the inline style with a CSS module class (e.g., `.searchFocused`) using `--ld-semantic-color-action-focus-outline`
- Replace inline `color` on the X icon (`style={{ color: 'var(..., #2E2F32)' }}`) with a CSS class

### 1.2 DesktopSearchTypeahead.tsx
- `onMouseOver` / `onMouseOut` handlers set `e.currentTarget.style.backgroundColor` directly — move hover styles to CSS module with `:hover` pseudo-class
- Inline `borderColor: 'var(..., #0053E2)'` → CSS module class using `--ld-semantic-color-action-focus-outline`
- Separator `<div style={{ height: '1px', background: 'var(..., #E3E4E5)' }}` → use `--ld-semantic-color-separator` via className

### 1.3 DesktopGICDropdown.tsx
- Inline `style={{ backgroundColor: 'var(..., #0053E2)' }}` → CSS module class using `--ld-semantic-color-action-fill-primary`
- SVG paths with `fill="black"` → use `fill="currentColor"` or `var(--ld-semantic-color-text)`
- SVG stroke with literal `#FFC836` → `var(--ld-semantic-color-rating-fill, #FFC220)`

### 1.4 ProductCardGrid.tsx + ProductCardList.tsx
- `style={{ backgroundColor: flagColor || "#0E002E" }}` — remove the `"#0E002E"` default; define a CSS custom property for flag background color (e.g., `--wcp-color-flag-default`) in the component CSS
- `text-[#E11900]` Tailwind classes for heart fill → replace with CSS module class using `--ld-semantic-color-text-negative`
- `text-[var(--..., #2A8703)]` → move to CSS module using `--ld-semantic-color-text-positive`
- Hard-coded data arrays (`flagColor: "#0E002E"`) in CerealSearchResults, DressesSearchResults, SearchResults → use a named constant mapped to a token name (or remove the color from the data and apply it in CSS)

### 1.5 PharmacyDelivery.tsx
- `from-[#00A862] to-[#007A47]` gradient in Tailwind → extract to a CSS module class using `--ld-semantic-color-text-positive` range tokens or a dedicated gradient token
- `bg-[#F0FFF9]` and `text-[#00A862]` → CSS module classes using `--ld-semantic-color-fill-accent-green-subtle` and `--ld-semantic-color-text-positive`
- `hover:bg-[#F0FFF9]` → CSS module `:hover` using token

### 1.6 CameraModal.tsx
- `bg-black`, `bg-blue-600`, `hover:bg-blue-700`, `text-white`, `border-white/30` — all are Tailwind non-token utilities
- Rewrite to use CSS module with LD semantic tokens for background, text, and border colors
- Replace raw `<button>` elements with LD `Button` (`variant="primary"` for "Use Photo", `variant="secondary"` for "Retake")

### 1.7 DesktopFooter.tsx + MwebFooter.tsx
- Inline SVG `fill="#002E99"` and `fill="white"` → replace with `fill="currentColor"` and control color via CSS `color` token on the parent
- Raw `<a>` anchors → replace with LD `Link` component

### 1.8 SkylineBanner.tsx
- Inline SVG `stroke="#74767C"` → use `stroke="currentColor"` with CSS token on parent

---

## Phase 2 — High: CSS module token replacement

Strip hex fallbacks from `var(--token, #HEX)` patterns across all module CSS files. These fallbacks mask theming failures — when a token is missing, the fallback hex prevents detection.

**Rule**: Keep fallbacks only where a token truly may not be defined (e.g., custom WCP tokens). For standard LD tokens, remove the hex fallback or replace with another token reference.

Files to update (in order of impact):
1. `DesktopHeader.module.css` — 6 fallback hex values
2. `AccountDropdown.module.css` — 6 fallback hex values
3. `BottomNav.module.css` — literal `white`, `black`, `rgba(255,255,255,x)` in CSS
4. `SubNav.module.css` — `#EBF1FF` fallback
5. `DepartmentsDropdown.module.css` — multiple fallback hex + `background: white`
6. `ServicesDropdown.module.css` — same pattern
7. `ReorderDropdown.module.css` — same pattern
8. `MoreLinksDropdown.module.css` — same pattern
9. `MobileHeader.module.css` — `#0071DC`, `#fff`, `#74767C` fallbacks
10. `MwebFooter.module.css` — `#fff`, `#0053e2` fallbacks
11. `DesktopFooter.module.css` — `#E9F1FE`, `#002E99`, `#0053e2` fallbacks
12. `WCPFlag.module.css` — many variant-specific hex fallbacks
13. `SearchBar.module.css` — rainbow gradient hex stops (document as intentional decorative or tokenize)
14. `OrderStatusBanner.module.css`
15. `PurchaseHistory.module.css` — keyframe glow uses `#1A7A34` (canonical glow per RULE_AnimationAndMotion — keep as-is per the rule)
16. `WCPCountryCodePhoneInput.module.css`
17. `WCPCountrySelectBottomSheet.module.css`
18. `AddToCart.module.css`
19. `JumpRightBackIn.module.css`
20. `NewArrivalsCarousel.module.css`

**Standard token replacement mapping:**

| Old fallback | Correct token |
|---|---|
| `#fff` / `#ffffff` / `white` | `--ld-semantic-color-surface` |
| `#2E2F32` / `#2e2f32` | `--ld-semantic-color-text` |
| `#74767C` | `--ld-semantic-color-text-subtle` |
| `#0071DC` / `#0053E2` | `--ld-semantic-color-action-fill-primary` |
| `#001E60` | `--ld-semantic-color-text-brand-bold` |
| `#F2F2F2` / `#F1F1F2` / `#F8F8F8` | `--ld-semantic-color-fill-subtle` |
| `#E3E4E5` | `--ld-semantic-color-separator` |
| `#EA1100` | `--ld-semantic-color-text-negative` |
| `#EBF1FF` | `--ld-semantic-color-fill-brand-subtle` |
| `#00A862` | `--ld-semantic-color-text-positive` |

---

## Phase 3 — High: Add missing responsive breakpoints

Standard breakpoints are `1024px`, `768px`, `480px`. Most CSS modules only include the 1024px breakpoint and are missing 768px and 480px rules.

**For each file, add responsive behavior appropriate to the component:**

### Shell / Nav components (1024px already present, add 768px)
- `DesktopHeader.module.css` — reduce search padding at 768px
- `SubNav.module.css` — hide secondary links, reduce padding at 768px
- `BottomNav.module.css` — already hides at 1024px; no further breakpoints needed

### Dropdown components (no breakpoints present)
- `AccountDropdown.module.css` — add `@media (max-width: 768px)` to shift to full-width sheet behavior
- `DepartmentsDropdown.module.css`, `ServicesDropdown.module.css`, `ReorderDropdown.module.css`, `MoreLinksDropdown.module.css` — same pattern

### Product cards (missing 480px)
- `NewArrivalsCarousel.module.css` — add 480px tile size adjustments
- `JumpRightBackIn.module.css` — add 480px tile overflow behavior

### Footer components (1024px present, add 768px/480px)
- `DesktopFooter.module.css` — already hides at 1024px; no further breakpoints needed
- `MwebFooter.module.css` — add 768px column collapse if needed

### Form / Input components (no breakpoints)
- `WCPCountryCodePhoneInput.module.css` — add 480px full-width mode
- `WCPCountrySelectBottomSheet.module.css` — add 768px height adjustments
- `AddToCart.module.css` — add 480px size adjustments

### WCPFlag (no breakpoints needed — purely presentational size)

**Standard breakpoint structure to add per file:**
```css
@media (max-width: 1024px) {
  /* tablet adjustments */
}

@media (max-width: 768px) {
  /* small tablet adjustments */
}

@media (max-width: 480px) {
  /* phone adjustments */
}
```

---

## Phase 4 — Medium: Replace raw HTML elements with LD components

### Raw `<button>` → LD `Button` or `IconButton`

| Component | Raw element | Replacement |
|---|---|---|
| `AccountDropdown.tsx` | Menu item `<button>` | Keep as `<button role="menuitem">` (acceptable for ARIA menus) |
| `AccountDropdown.tsx` | Trigger `<button>` | LD `Button variant="tertiary"` or keep if no visible label |
| `AddToCart.tsx` | Stepper `<button>` controls | LD `IconButton` |
| `BottomNav.tsx` | Tab buttons | Keep as `<button>` (custom nav pattern, ARIA roles needed) |
| `DepartmentsDropdown.tsx` | Trigger `<button>` | LD `Button variant="tertiary"` |
| `JumpRightBackIn.tsx` | Heart `<button>` | LD `IconButton` |
| `SearchFilterBar.tsx` | Chip controls | LD `Button variant="secondary" size="small"` |
| `MobileTopNav.tsx` | Search/menu triggers | LD `IconButton` |

### Raw `<a>` → LD `Link`

| Component | Raw element | Replacement |
|---|---|---|
| `DesktopFooter.tsx` | All footer links | LD `Link variant="subtle"` |
| `MwebFooter.tsx` | All footer links | LD `Link variant="subtle"` |
| `DesktopHeader.tsx` | Logo anchor | LD `Link` or keep with `navigate()` pattern |
| `MobileHeader.tsx` | Logo anchor, cart | LD `Link` |
| `SubNavButton.tsx` | `<a href={href}>` | LD `Link` |
| `PromoBanner.tsx` | `<a href="#">` | LD `Link` or `LinkButton` |

---

## Phase 5 — Verification: Theme compliance check

After each phase, run the automated checks:

```bash
# Zero hardcoded hex in CSS
grep -rn "#[0-9a-fA-F]\{6\}\|#[0-9a-fA-F]\{3\}" client/components/walmart/ client/pages/walmart/ --include="*.css"

# Zero primitive color tokens in component CSS
grep -rn "ld-primitive-color-" client/components/walmart/ client/pages/walmart/ --include="*.css"

# Zero inline hex in TSX
grep -rn "backgroundColor: '#\|color: '#\|background: '#" client/components/walmart/ client/pages/walmart/ --include="*.tsx"
```

Then manually verify:
1. Switch to **Bodega (green)** theme — brand fills on header, SubNav, and banners must turn green
2. Switch to **Walmart Legacy** theme — verify correct rendering
3. Resize to 768px — verify layout changes for all updated components
4. Resize to 480px — verify layout changes for all updated components

---

## Execution order

| Phase | Files | Priority |
|---|---|---|
| 1.1 DesktopHeader inline styles | `DesktopHeader.tsx` + `DesktopHeader.module.css` | P0 |
| 1.2 DesktopSearchTypeahead inline handlers | `DesktopSearchTypeahead.tsx` | P0 |
| 1.3 DesktopGICDropdown inline + SVG fills | `DesktopGICDropdown.tsx` | P0 |
| 1.4 ProductCard hex in data + Tailwind hex | `ProductCardGrid.tsx`, `ProductCardList.tsx`, search result pages | P0 |
| 1.5 PharmacyDelivery Tailwind hex classes | `PharmacyDelivery.tsx` | P1 |
| 1.6 CameraModal Tailwind + raw buttons | `CameraModal.tsx` | P1 |
| 1.7 Footer SVG fills + raw links | `DesktopFooter.tsx`, `MwebFooter.tsx` | P1 |
| 1.8 SkylineBanner SVG stroke | `SkylineBanner.tsx` | P1 |
| 2 CSS module hex fallback cleanup | All 20 module.css files | P1 |
| 3 Add 768px + 480px breakpoints | All module.css files missing breakpoints | P2 |
| 4 Replace raw HTML elements | ~10 component files | P2 |
| 5 Theme compliance verification | All updated files | Final |

---

## What is NOT in scope

- **BottomNav tab animation** — the translateX indicator uses dynamic inline style (acceptable per Rule 17)
- **PurchaseHistory cardGlow keyframe** — `#1A7A34` and `rgba(26,122,52,0.30)` are the canonical glow per `RULE_AnimationAndMotion.md`; leave as-is
- **SearchBar rainbow gradient** — intentionally decorative; document as a named gradient token or leave as-is with a comment
- **WCPFlag variant colors** — many are intentional brand identity colors (country flags); these may need to stay as literal hex with explicit documentation
- **AccountDropdown menu item `<button>` elements** — ARIA `role="menuitem"` requires a native button or anchor; do not swap for LD Button which would break ARIA patterns
