/**
 * Theme Registry
 * Central registry for all available themes in the application
 */

export interface Theme {
  id: 'base' | 'walmart-b2b';
  name: string;
  description: string;
  primitiveCSS: string;
  semanticCSS: string;
  previewColor?: string; // Visual indicator color for UI
}

export const AVAILABLE_THEMES: Theme[] = [
  {
    id: 'base',
    name: 'Walmart Connect',
    description: 'Default Walmart Connect Ad Center theme with Living Design 3.5 + WCP extensions',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/base/semantic.css',
    previewColor: '#0053e2', // Walmart blue
  },
  {
    id: 'walmart-b2b',
    name: 'Walmart Business',
    description: 'Walmart Business B2B platform theme with darker, professional color palette',
    primitiveCSS: '/styles/themes/walmart-b2b/primitive.css',
    semanticCSS: '/styles/themes/walmart-b2b/semantic.css',
    previewColor: '#002e99', // Darker navy blue
  },
];

export const DEFAULT_THEME: Theme['id'] = 'base';

/**
 * Get theme by ID
 */
export function getThemeById(id: string): Theme | undefined {
  return AVAILABLE_THEMES.find(theme => theme.id === id);
}

/**
 * Validate theme ID
 */
export function isValidThemeId(id: string): id is Theme['id'] {
  return AVAILABLE_THEMES.some(theme => theme.id === id);
}
