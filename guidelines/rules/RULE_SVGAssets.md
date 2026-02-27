---
title: SVG Asset Management and Local Hosting
scope: rule
status: stable
owner: design-system
last_updated: 2025-05-27
---

## Purpose

Ensure all SVG illustration assets are hosted locally to prevent CDN compression artifacts, dependency on external auth-gated URLs, and format degradation. This rule covers pictogram/illustration SVGs distinct from icon components.

---

## Rule Statement (NO EXCEPTIONS)

> **All SVG illustration assets MUST be downloaded and stored locally in `/public/assets/illustrations/`. Never reference CDN URLs with image transformation query parameters (`?format=webp`, `?width=...`, `?height=...`) for SVG files.**

---

## Asset Directory Structure

```
public/
  assets/
    illustrations/
      mono-small/         # Mono pictograms — max 64×64 display size
        fulfillment-pickup.svg
        fulfillment-delivery.svg
        fulfillment-shipping.svg
        fulfillment-store.svg
        fuel.svg
        plant.svg
        ...
    products/             # Product images (raster, locally hosted)
    asset-library.json    # Centralized asset catalog
```

---

## SVG vs WebP — Never Confuse the Two

SVG files served from CDNs are often intercepted and re-encoded as WebP via URL parameters. This produces blurry, pixelated results at non-standard sizes.

| Situation | Correct approach |
|---|---|
| SVG icon / pictogram from CDN | Download locally, serve as `.svg` |
| SVG with `?format=webp` in URL | Strip the params — use the raw URL or download locally |
| Product photo (raster) from CDN | Download locally as `.jpg`/`.png` or accept raster quality |
| Builder.io TEMP illustration URL | Download locally; TEMP URLs may expire |

```html
<!-- ❌ WRONG — CDN transforms SVG to WebP → blurry at 64px -->
<img src="https://cdn.builder.io/api/v1/image/assets%2F.../fuel?format=webp&width=800&height=1200" />

<!-- ✅ CORRECT — Local SVG, crisp at any size -->
<img src="/assets/illustrations/mono-small/fuel.svg" />
```

---

## Fulfillment Icon Sizing Rule

Fulfillment / order-type icons (pickup, delivery, shipping, store) must be rendered at **64×64px**. At smaller sizes the pictogram becomes illegible; at larger sizes it overwhelms the card layout.

```tsx
// ✅ CORRECT
<img
  src="/assets/illustrations/mono-small/fulfillment-pickup.svg"
  alt=""
  aria-hidden="true"
  width={64}
  height={64}
/>

// ❌ WRONG — too small, and using CDN with webp transform
<img
  src="https://cdn.builder.io/...?format=webp&width=800&height=1200"
  width={24}
  height={24}
/>
```

---

## Asset Library Catalog

Every locally hosted illustration must be registered in `public/assets/asset-library.json`:

```json
{
  "fulfillment-icons": {
    "fulfillment-pickup": {
      "path": "/assets/illustrations/mono-small/fulfillment-pickup.svg",
      "alt": "Curbside pickup fulfillment icon",
      "usage": "Curbside pickup order type indicator in order cards"
    }
  },
  "pictograms-mono-small": {
    "fuel": {
      "path": "/assets/illustrations/mono-small/fuel.svg",
      "alt": "Fuel station pictogram",
      "usage": "Fuel-related services or promotions"
    }
  }
}
```

**Rules for the catalog:**
- `path` must always be a `/public`-relative path (starting with `/assets/`)
- No CDN `url` fields — local paths only
- `alt` must be descriptive but concise
- `usage` explains where and when to use the asset

---

## Downloading SVGs Programmatically

When CDN blocks `curl`, `wget`, or Python requests (common due to Referer/User-Agent header checks), use a Node.js CommonJS script:

```js
// scripts/download-assets.cjs   ← NOTE: .cjs extension required if package.json has "type": "module"
const https = require('https');
const fs = require('fs');
const path = require('path');

const ASSETS = [
  {
    url: 'https://cdn.builder.io/api/v1/image/assets%2F.../fuel.svg',
    dest: 'public/assets/illustrations/mono-small/fuel.svg',
  },
  // ...
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  for (const asset of ASSETS) {
    fs.mkdirSync(path.dirname(asset.dest), { recursive: true });
    await download(asset.url, asset.dest);
    console.log(`Downloaded: ${asset.dest}`);
  }
}

main();
```

Run with: `node scripts/download-assets.cjs`

**Important**: Delete the script after use. Do not commit download scripts to source control.

---

## CDN URL Parameter Stripping

When using a CDN URL for an SVG, always strip image transformation params before using or downloading:

```
// Raw CDN URL (may include webp transform)
https://cdn.builder.io/api/v1/image/assets%2F<project>%2F<hash>?format=webp&width=800&height=1200

// Stripped URL (serves native SVG)
https://cdn.builder.io/api/v1/image/assets%2F<project>%2F<hash>
```

---

## Checklist Before Shipping

- [ ] All SVG illustrations are in `/public/assets/illustrations/`
- [ ] No CDN URLs with `?format=webp` params for SVGs anywhere in code
- [ ] Fulfillment icons rendered at 64×64
- [ ] All assets registered in `asset-library.json` with local paths only
- [ ] No temporary download scripts committed

---

---

## Illustration Reuse-First Policy (NO EXCEPTIONS)

> **Before generating a new image or illustration, ALWAYS check whether a matching asset already exists in `public/illustrations/`.**

### Folder Structure

```
public/illustrations/
  mono-large/          # Large mono-style category illustrations
  mono-small/          # Small mono-style category illustrations
  spot-illustration/   # Spot / character illustrations (associate-waving, network-issue, etc.)
```

### Decision Tree

When an illustration is needed for a component or page, follow this order:

1. **Check `public/illustrations/`** — search all subfolders for an asset matching the name or visual concept (e.g. "Toys", "Grocery", "Delivery")
2. **Use the existing asset** if a match is found — reference it with a local path
3. **Only generate a new image if**:
   - The Figma design specifies an image that does not exist in the folder, **or**
   - The user explicitly requests a new / different image

### Examples

```tsx
// ✅ CORRECT — reuse existing illustration
<img src="/illustrations/mono-large/Delivery.svg" alt="Delivery" width={64} height={64} />

// ❌ WRONG — generating a new image when Delivery.svg already exists
<Media type="gen-image" query="delivery truck illustration" />

// ✅ CORRECT — generate only when Figma specifies something not in the folder
// (Figma has a unique custom banner image that has no match locally)
<img src="https://api.builder.io/api/v1/image/assets/TEMP/abc123" alt="Summer sale banner" />
```

### Naming Match Logic

When searching for an existing illustration, match on:
- **Exact filename** (case-insensitive): `Toys.svg` matches a need for a "toys" illustration
- **Semantic similarity**: `Grocery.svg` and `Groceries.svg` both exist — pick the closest match
- **Folder appropriateness**: use `mono-large` for large hero contexts, `mono-small` for inline/card contexts, `spot-illustration` for character/scene illustrations

---

## Alt Text Requirements

> **None of the SVG files in `public/illustrations/` contain embedded `<title>` elements. Alt text MUST always be provided by the consuming code.**

### Rules

- ✅ ALWAYS provide `alt` on every `<img>` tag using an illustration SVG
- ✅ Use descriptive alt text that communicates the illustration's meaning in context
- ✅ Use `alt=""` + `aria-hidden="true"` only when the illustration is purely decorative and the surrounding text already conveys the full meaning
- ❌ NEVER omit `alt` — an `<img>` without `alt` is an accessibility violation
- ❌ NEVER use the filename as alt text (e.g. `alt="Toys.svg"` is wrong)

### Examples

```tsx
// ✅ CORRECT — meaningful alt text
<img src="/illustrations/mono-large/Toys.svg" alt="Toys" width={64} height={64} />

// ✅ CORRECT — decorative, text already describes the section
<img
  src="/illustrations/spot-illustration/associate-waving.svg"
  alt=""
  aria-hidden="true"
  width={160}
  height={160}
/>

// ❌ WRONG — no alt attribute
<img src="/illustrations/mono-large/Grocery.svg" width={64} height={64} />

// ❌ WRONG — filename used as alt text
<img src="/illustrations/mono-large/Grocery.svg" alt="Grocery.svg" />
```

### Alt Text by Folder

| Folder | Context | Alt text guidance |
|---|---|---|
| `mono-large` | Hero / section headers | Describe the category: `"Grocery"`, `"Electronics"` |
| `mono-small` | Inline cards / chips | Describe concisely: `"Toys"`, `"Pet care"` |
| `spot-illustration` | Decorative scenes | Usually `alt=""` + `aria-hidden="true"` unless it conveys meaning not in surrounding text |

---

## Related Rules

- [RULE_FigmaAssetExtraction](./RULE_FigmaAssetExtraction.md)
- [RULE_IconUsage](./RULE_IconUsage.md)

---

**Last Updated**: 2025-02-27
**Status**: Active — Hard Rule
**Applies To**: All illustration/pictogram SVG assets
