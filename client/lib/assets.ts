/**
 * Asset Library
 * Centralized access to all project images and icons
 */

export const assets = {
  dashboard: {
    screenshot: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc3a06f6f42ec4f12933aad1327cc0377',
    chart: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff5cdb3639c9b4824903691b17827989a',
  },
  
  icons: {
    calendar: 'https://api.builder.io/api/v1/image/assets/TEMP/d9a81b2a7bb3dfdd5e2c469c8253220e869a1119',
    chevronDown: 'https://api.builder.io/api/v1/image/assets/TEMP/ad9070864ceb13f3f71f85b6653ff2d30635be9f',
    alert: 'https://api.builder.io/api/v1/image/assets/TEMP/eba9c836fc8540b60609a632b74b284ef2c689b9',
    lightning: 'https://api.builder.io/api/v1/image/assets/TEMP/9c45272a9799064fc27164fd23ecbece5d885598',
  },
  
  productPreviews: {
    items: 'https://api.builder.io/api/v1/image/assets/TEMP/7455309de67a3c164e789c5cadc34c0c8b745dab',
  },
} as const;

export type AssetKey = keyof typeof assets;

/**
 * Get an asset URL with optional width parameter
 * @param path - Dot notation path to asset (e.g., 'icons.calendar')
 * @param width - Optional width for image optimization
 */
export function getAsset(path: string, width?: number): string {
  const keys = path.split('.');
  let value: any = assets;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  if (typeof value !== 'string') {
    console.warn(`Asset not found: ${path}`);
    return '';
  }
  
  if (width && value.includes('builder.io')) {
    return `${value}?width=${width}`;
  }
  
  return value;
}
