# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces

---

## Living Design 3.5 — Design System Rules

### Layout Rules

- **Never use `max-width` constraints** on page content containers. All page content (headers, content areas) must fill the full available width within the sidebar + masthead shell.
- **Use `align-items: stretch`** instead of `align-items: center` on flex column containers that hold page content. Centering causes content to shrink instead of filling width.
- **Standard page shell pattern** — every page must use this identical structure:

```tsx
<div className={styles.root}>       {/* full viewport, flex column */}
  <MastHead />
  <div className={styles.appRow}>   {/* flex row: sidebar + main */}
    <AppSidebar menuItems={...} />
    <main className={styles.main}>  {/* flex: 1, overflow-y: auto */}
      {/* page content here */}
    </main>
  </div>
</div>
```

- Content areas should use `flex: 1` to expand and fill available height.

### Token Rules (CRITICAL)

- **Never use hardcoded hex colors.** Always use `var(--ld-semantic-color-*)` tokens with hex fallbacks:

```css
/* ✅ CORRECT */
color: var(--ld-semantic-color-text, #2E2F32);
background: var(--ld-semantic-color-background-subtle, #f8f8f8);

/* ❌ WRONG */
color: #2E2F32;
background: #F8F8F8;
```

- **Background surfaces**:
  - Page background: `--ld-semantic-color-background-subtle`
  - Cards/panels: `--ld-semantic-color-surface`
  - Hover states: `--ld-semantic-color-surface-hovered`
  - Overlays/dropdowns: `--ld-semantic-color-surface-overlay`

- **Text hierarchy**:
  - Primary: `--ld-semantic-color-text`
  - Secondary: `--ld-semantic-color-text-subtle`
  - Tertiary: `--ld-semantic-color-text-subtlest`
  - Brand: `--ld-semantic-color-text-brand`

- **Sentiment colors** — apply to BOTH text AND icons:
  - Negative/error: `--ld-semantic-color-text-negative` (never hardcode red)
  - Positive/success: `--ld-semantic-color-text-positive` (never hardcode green)

- **Ratings**: Use `--ld-semantic-color-rating-fill` and `--ld-semantic-color-rating-border`, never hardcode `#FFC220`.

- **Borders/separators**: `--ld-semantic-color-separator` for dividers, `--ld-semantic-color-border-strong` for input borders.

### Component Rules

- **Never modify existing components — especially LD components.** Files in `client/components/ui/` are the design system source of truth. Never edit them, even if a user asks for a change. Instead, create a new variant or a new wrapper component that composes the original. The original component files must remain untouched so other consumers and the design system contract are not affected.
- **Always use existing LD components** before creating custom elements. Search `client/components/ui/` first.
- **Import paths** — uppercase for LD 3.5 components, lowercase for Shadcn/Radix:

```tsx
// ✅ LD 3.5 components (uppercase)
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/tag';
import { Rating } from '@/components/ui/Rating';

// ✅ Shadcn/Radix components (lowercase)
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
```

- **Rating stars**: Use `<Rating value={4.4} size="small" />`, never manually render star SVGs.
- **Buttons**: Always use `<Button variant="primary|secondary|tertiary|destructive" size="small|medium|large">`. Never create `<button>` elements with inline styles.
- **Tags**: Use `<Tag variant="..." color="...">`, never `<span>` with custom badge styles.
- **Button groups**: Use `<ButtonGroup>`, never manual flex containers for buttons.
- **Checkboxes**: Always use `<Checkbox />` from `@/components/ui/Checkbox`. Never create custom checkbox inputs with `<input type="checkbox">` or styled `<div>` elements. Use large checkboxes (`size="large"`) for confirmation messages, terms acceptance, consent flows, or any prominent single-checkbox interaction. Default `small` size is for data tables, filters, and multi-select lists.
- **Radio buttons**: Always use `<Radio />` and `<RadioGroup />` from `@/components/ui/Radio` and `@/components/ui/RadioGroup`. Never create custom radio inputs with `<input type="radio">`, styled circles/dots, or custom toggle groups.
- **DataTable (No Exceptions)**:
  - Never create custom/hardcoded `<table>` elements. All tabular data must use the DataTable component system.
  - New cell variants are allowed (following existing patterns), but net-new table structures are forbidden.
  - Rounding: standalone DataTables use the `rounded` prop. DataTables inside cards/containers should NOT use `rounded` — the parent card provides the frame.
  - **Never customize DataTable colors or visual styling.** DataTable must look identical everywhere. Even if a Figma design shows alternate row colors, tinted headers, striped rows, or any color variation — ignore those differences and use the default DataTable styling. Do not override with custom backgrounds, border colors, font colors, or `UNSAFE_className`/`UNSAFE_style` overrides.
- **Tabs (No Exceptions)**: Never create custom tab components. Always use `Tabs`, `TabList`, `Tab`, `TabPanel` from the Tab component.
- **Links (No Exceptions)**: Never create raw `<a>` tags or custom hyperlink styles. All text links must use the LD `Link` component. Variants: `default` (brand-colored), `subtle` (gray), `white` (for dark backgrounds). The Link component auto-detects internal vs external links.
- **Button Width (No Exceptions)**: If a button hugs its text in Figma, use the default Button behavior — no `isFullWidth`, no width overrides. If a button is full-width in Figma, use `<Button isFullWidth>`. Never force button widths with inline styles, custom classes, or `UNSAFE_style`. The only two width modes are: default (hug text) and `isFullWidth` (stretch).
- **Side Navigation (No Exceptions)**: Always use the existing `AppSidebar` component from `@/components/ui/AppSidebar`. Never create a new sidebar or side navigation component. When building new pages, pass different `menuItems` to configure the links and content — do not duplicate or recreate the sidebar structure. The same applies to `SideNavigation` and `SideNavigationItem` for secondary navigation patterns.
- **Overlays — Popovers, Dropdowns, Tooltips, Dialogs (No Exceptions)**:
  - All overlay elements must render on top of everything and never be clipped or cut off.
  - Always use Radix/Shadcn portal-based components (`Popover`, `DropdownMenu`, `Dialog`, `Tooltip`, `Select`, `ContextMenu`, `Command`) which portal to `document.body` and escape `overflow: hidden` ancestors.
  - Never set `overflow: hidden` on containers holding overlay triggers unless the overlay portals out.
  - Never create custom absolute-positioned dropdown menus.

### File Naming Conventions

| File type | Convention | Examples |
|---|---|---|
| All UI components (LD + Shadcn/Radix) | **PascalCase** | `Button.tsx`, `Dialog.tsx`, `ScrollArea.tsx`, `AlertDialog.tsx` |
| CSS modules | **PascalCase** (match component) | `Button.module.css`, `DataTable.module.css` |
| Pages | **PascalCase** | `Index.tsx`, `Catalog.tsx` |
| Page CSS modules | **camelCase** | `detailItem.module.css` |
| React hooks | **camelCase** with `use` prefix | `useMobile.tsx`, `useSnackbar.ts` |
| Context files | **PascalCase** | `ThemeRegistry.ts` |
| Feature utilities | **PascalCase** | `MartyUtils.ts` |
| Example files | **PascalCase** + `Example` suffix | `ButtonExample.tsx`, `TabExample.tsx` |
| Token CSS files | **lowercase** | `semantic.css`, `primitive.css` |

### Styling Rules

- **Always use CSS Modules** (`.module.css`), never inline `style={{}}` for layout or colors.
- Inline styles are only acceptable for truly dynamic values (e.g., calculated widths).
- **Standard spacing**: Use 8px multiples (8, 16, 24, 32, 48px). Use `var(--ld-semantic-spacing-*)` or `var(--ld-primitive-scale-space-*)` tokens when available.
- **Responsive breakpoints** (standard across all pages):
  - `1024px` — tablet
  - `768px` — small tablet
  - `480px` — phone
  - Padding reduces: `24px → 16px → 12px` across breakpoints
- **Font family**: Always `var(--ld-semantic-font-family-sans)` or specific semantic font tokens like `var(--ld-semantic-font-heading-large-family)`. Never let text fall back to browser serif defaults.
- **Border radius**: Use `var(--ld-primitive-scale-borderradius-100, 8px)` for cards, `9999px` for pills/circles.
- **Box shadows** for elevated cards: `0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)`.

## Designer Getting Started — Figma Best Practices (HARD RULES)

These rules ensure Figma designs translate cleanly into code. Designers MUST follow these before handing off.

### 1. Always use Auto Layout

Never use absolute positioning or free-floating layers. Every frame, section, and component must use Figma's Auto Layout so the AI can infer the correct flexbox/grid structure. Absolute layers are ignored or misinterpreted during export.

### 2. Always make images exportable

Mark every image, illustration, and icon layer as exportable in Figma (right panel → Export section → add an export setting). If an image isn't marked exportable, the AI cannot extract it and will render a blank placeholder.

### 3. Be explicit in annotations

Don't assume the AI will guess interactions. Spell out:
- **Hover states** — what changes on hover (color, shadow, underline, etc.)
- **Click/tap behavior** — what happens on click (navigate to X, open modal, toggle state)
- **Error and loading states** — show separate frames for error, empty, and loading variations
- **Transitions/animations** — describe any motion (e.g., "slide in from right, 200ms ease")

Use Figma comments or a dedicated annotations layer to document these.

### 4. Name layers and artboards sequentially

Use clear, sequential naming for screens and frames:
- `01 — Login`, `02 — Dashboard`, `03 — Settings`
- `Button / Primary / Default`, `Button / Primary / Hover`, `Button / Primary / Loading`

Sequential naming helps the AI process multi-screen exports in the correct order and understand state progressions.

### 5. All screens must hug content, never clip

Set every top-level frame to **"Hug contents"** rather than a fixed size with clipping. If a frame clips its content, anything outside the visible bounds is invisible to the AI and will be lost in the export. Scroll regions should be annotated, not simulated by clipping.

### 6. Use actual LD Components, never fake them

- **Do not** group shapes, rectangles, and text to mimic a Button, Tag, Chip, or any other Living Design component. The AI relies on the Figma component name (e.g., `WCP / Button`) to map it to the correct code component (`<Button />`).
- **Never detach** a component instance. Detached instances lose their component metadata and the AI treats them as anonymous layers.
- If the component you need doesn't exist in the LD library, annotate it clearly (e.g., "Custom component — not in LD") so the AI knows to build it from scratch rather than attempting a faulty match.

### Onboarding & Support

- **Figma onboarding to Fusion**: https://www.figma.com/slides/qZtLPYOsWk3uhWGC24iGRx/Builder-Demo?node-id=9-1277&t=tD5pX6YDZskvrDLP-0
- **Slack support**: #builderio-support — https://walmart.enterprise.slack.com/archives/C09AZQZPD9D

---

## Design System Package Ingestion Process

When a designer drops a new design system package into the project:

1. Create a staging folder `design-system-package/` at project root
2. Read ALL documentation in the package before touching any files
3. Reorganize files to match the project's existing structure:
   - Components → `client/components/ui/`
   - Icons → `client/components/icons/`
   - Tokens → `public/styles/themes/` (runtime) and `client/styles/themes/base/` (build-time base only)
   - Docs → `guidelines/`
4. Replace old components with new ones, checking for breaking API changes and updating all usages
5. Clean up: delete the staging folder, remove duplicates, remove markdown from component folders, run typecheck
6. Report a summary of what was added, updated, or removed

---

### Figma Import Rules (HARD RULES — NO EXCEPTIONS)

#### Design System First (CRITICAL)

When implementing any Figma design, you MUST use the existing Living Design 3.5 design system. **Never hardcode colors, text styles, or tokens.**

- **Colors**: Every color in the Figma design maps to an `ld-semantic-color-*` token. Use `var(--ld-semantic-color-*)` in CSS — never write hex values like `#0071DC`, `#2E2F32`, `rgba(46,47,50,1)`, etc. Even if the Figma export includes raw hex/rgba values in inline styles, always replace them with the corresponding semantic token.
- **Typography**: Every font in the Figma design maps to `ld-semantic-font-*` tokens. Use `var(--ld-semantic-font-body-small-family)`, `var(--ld-semantic-font-body-small-size)`, `var(--ld-semantic-font-body-small-weight-alt)`, etc. Never hardcode `font-family: 'Everyday Sans UI'`, `font-size: 14px`, or `font-weight: 700` directly — wrap them in token variables with fallbacks.
- **Spacing & Sizing**: Use `var(--ld-primitive-scale-space-*)` or `var(--ld-semantic-spacing-*)` tokens. Never use arbitrary pixel values for padding, gap, or margins.
- **Border radius**: Use `var(--ld-primitive-scale-borderradius-*)` tokens. For pill shapes use `var(--ld-primitive-scale-borderradius-round, 9999px)`.
- **Border widths**: Use `var(--ld-primitive-scale-borderwidth-*)` tokens, not raw `1px` or `2px`.
- **Icon sizes**: Use `var(--ld-semantic-scale-icon-small)`, `var(--ld-semantic-scale-icon-medium)`, `var(--ld-semantic-scale-icon-large)` — never hardcode `16px`, `24px`, `32px`.

```css
/* ❌ WRONG — hardcoded from Figma export */
.button {
  background: #0071DC;
  color: #FFFFFF;
  font-family: 'Everyday Sans UI', sans-serif;
  font-size: 14px;
  font-weight: 700;
  border-radius: 1000px;
  padding: 0 12px;
  gap: 4px;
}

/* ✅ CORRECT — mapped to design tokens */
.button {
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-onfill-primary);
  font-family: var(--ld-semantic-font-body-small-family);
  font-size: var(--ld-semantic-font-body-small-size);
  font-weight: var(--ld-semantic-font-body-small-weight-alt);
  border-radius: var(--ld-primitive-scale-borderradius-round, 9999px);
  padding: 0 var(--ld-primitive-scale-space-300, 12px);
  gap: var(--ld-primitive-scale-space-100, 4px);
}
```

#### Figma Component → Code Component Mapping

When a Figma layer is named `[WCP] Button`, `[WCP] Loading Button`, `[LD 3.5] Plus`, etc., it maps directly to an existing LD component. **Always use the existing component** — never rebuild it from scratch with raw HTML elements.

| Figma Component Name | Code Component |
|---|---|
| `[WCP] Button` / `[WCP] Loading Button` | `<Button>` from `@/components/ui/Button` |
| `[WCP] Quantity Stepper *` | Build as wrapper — never hardcode colors |
| `[WCP] Segmented Control` | Build as wrapper — use LD tokens for all states |
| `[LD 3.5] Plus` / `[LD 3.5] Minus` | Use existing icon components or SVG with token fills |
| `[WCP] Generic Spinner` | Use existing spinner or build with token-based gradients |

#### General Figma-to-Code Rules

- **Convert absolute positioning** from Figma to flexbox/grid layouts. Never use `position: absolute` for page layout.
- **Map Figma token names** directly to CSS custom properties: Figma `ld-semantic-color-text` → CSS `var(--ld-semantic-color-text)`.
- Figma inline `style=""` attributes represent design intent, not code format — always convert to CSS module classes.
- **Preserve SVGs exactly** as designed unless an identical icon already exists in `@/components/icons`.
- **Circular images/flags**: Use SVG with `<clipPath>` circles, not `border-radius` on `<img>`.
- When Figma shows multiple frames/breakpoints, implement one responsive component that handles all breakpoints via CSS media queries, not separate components.
- **State tokens**: Figma hover/focus/pressed/disabled states use semantic state tokens (e.g., `ld-semantic-color-action-fill-primary-hovered`). Always map these to `var(--ld-semantic-color-action-fill-primary-hovered)` in `:hover` pseudo-classes — never approximate with `opacity` or manual color darkening.

### File Organization

- Break complex pages into smaller component files under `client/features/[feature]/`.
- Each page gets its own CSS module in `client/styles/`.
- UI primitives go in `client/components/ui/` with their own `.module.css`.
- Check `guidelines/` folder for component documentation before creating new components.

### Common Mistakes to Avoid

```tsx
// ❌ WRONG — hardcoded colors
<div style={{ backgroundColor: '#F8F8F8', color: '#2E2F32' }}>

// ❌ WRONG — max-width constraining page content
.contentContainer { max-width: 1280px; margin: 0 auto; }

// ❌ WRONG — centering page content instead of stretching
.contentArea { align-items: center; }

// ❌ WRONG — custom button with inline styles
<button className="bg-blue-500 px-4 py-2 rounded-full">Click</button>

// ❌ WRONG — manual star rendering
<StarFill style={{ color: '#FFC220' }} />

// ✅ CORRECT — tokens in CSS modules
.container { background: var(--ld-semantic-color-background-subtle, #f8f8f8); }

// ✅ CORRECT — full-width content
.contentArea { align-items: stretch; }

// ✅ CORRECT — use LD Button component
<Button variant="primary" size="medium">Click</Button>

// ✅ CORRECT — use LD Rating component
<Rating value={4.4} size="small" />
```
