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

## Related Rules

- [RULE_FigmaAssetExtraction](./RULE_FigmaAssetExtraction.md)
- [RULE_IconUsage](./RULE_IconUsage.md)

---

**Last Updated**: 2025-05-27
**Status**: Active — Hard Rule
**Applies To**: All illustration/pictogram SVG assets
