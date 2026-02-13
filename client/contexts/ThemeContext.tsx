/**
 * ThemeContext
 * Provides theme switching functionality via CSS custom property swapping
 * Themes are loaded dynamically by injecting/removing <link> tags
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AVAILABLE_THEMES, DEFAULT_THEME, getThemeById, type Theme } from './theme-registry';

interface ThemeContextValue {
  currentTheme: Theme['id'];
  currentThemeData: Theme | undefined;
  availableThemes: Theme[];
  switchTheme: (themeId: Theme['id']) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'ld-theme';

/**
 * Load theme CSS files dynamically using inheritance model
 * Base theme is always loaded first, then theme-specific overrides
 */
function loadThemeCSS(theme: Theme): Promise<void> {
  return new Promise((resolve, reject) => {
    // Remove existing theme override links (but keep base)
    const existingOverrides = document.querySelectorAll('link[data-theme-override]');
    existingOverrides.forEach(link => link.remove());

    // Ensure base theme is loaded (if not already)
    const baseTheme = AVAILABLE_THEMES.find(t => t.id === 'base');
    if (!baseTheme) {
      reject(new Error('Base theme not found'));
      return;
    }

    const existingBase = document.querySelectorAll('link[data-theme-base]');

    // Load base theme if not already loaded
    if (existingBase.length === 0) {
      const basePrimitiveLink = document.createElement('link');
      basePrimitiveLink.rel = 'stylesheet';
      basePrimitiveLink.href = baseTheme.primitiveCSS;
      basePrimitiveLink.setAttribute('data-theme-base', 'primitive');

      const baseSemanticLink = document.createElement('link');
      baseSemanticLink.rel = 'stylesheet';
      baseSemanticLink.href = baseTheme.semanticCSS;
      baseSemanticLink.setAttribute('data-theme-base', 'semantic');

      document.head.appendChild(basePrimitiveLink);
      document.head.appendChild(baseSemanticLink);
    }

    // If selecting base theme, we're done
    if (theme.id === 'base') {
      resolve();
      return;
    }

    // Load theme override files (these override base tokens)
    const primitiveLink = document.createElement('link');
    primitiveLink.rel = 'stylesheet';
    primitiveLink.href = theme.primitiveCSS;
    primitiveLink.setAttribute('data-theme-override', 'primitive');
    primitiveLink.setAttribute('data-theme-id', theme.id);

    const semanticLink = document.createElement('link');
    semanticLink.rel = 'stylesheet';
    semanticLink.href = theme.semanticCSS;
    semanticLink.setAttribute('data-theme-override', 'semantic');
    semanticLink.setAttribute('data-theme-id', theme.id);

    let primitiveLoaded = false;
    let semanticLoaded = false;
    let hasError = false;

    const checkBothLoaded = () => {
      if (primitiveLoaded && semanticLoaded && !hasError) {
        resolve();
      }
    };

    const handleError = (error: Event) => {
      if (!hasError) {
        hasError = true;
        console.error('Failed to load theme override CSS:', error);
        reject(new Error(`Failed to load theme overrides: ${theme.name}`));
      }
    };

    primitiveLink.onload = () => {
      primitiveLoaded = true;
      checkBothLoaded();
    };

    primitiveLink.onerror = handleError;

    semanticLink.onload = () => {
      semanticLoaded = true;
      checkBothLoaded();
    };

    semanticLink.onerror = handleError;

    // Append override links to head (after base)
    document.head.appendChild(primitiveLink);
    document.head.appendChild(semanticLink);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default
  const [currentTheme, setCurrentTheme] = useState<Theme['id']>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && AVAILABLE_THEMES.some(t => t.id === stored)) {
        return stored as Theme['id'];
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    return DEFAULT_THEME;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Switch theme function
  const switchTheme = useCallback((themeId: Theme['id']) => {
    const theme = getThemeById(themeId);
    if (!theme) {
      console.error(`Theme not found: ${themeId}`);
      return;
    }

    setIsLoading(true);

    loadThemeCSS(theme)
      .then(() => {
        setCurrentTheme(themeId);
        
        // Persist to localStorage
        try {
          localStorage.setItem(THEME_STORAGE_KEY, themeId);
        } catch (error) {
          console.warn('Failed to save theme to localStorage:', error);
        }
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Theme loading failed:', error);
        setIsLoading(false);
        
        // Fallback to default theme on error
        if (themeId !== DEFAULT_THEME) {
          const defaultTheme = getThemeById(DEFAULT_THEME);
          if (defaultTheme) {
            loadThemeCSS(defaultTheme).catch(console.error);
          }
        }
      });
  }, []);

  // Load initial theme on mount
  useEffect(() => {
    const theme = getThemeById(currentTheme);
    if (theme) {
      setIsLoading(true);
      loadThemeCSS(theme)
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error('Initial theme loading failed:', error);
          setIsLoading(false);
        });
    }
  }, []); // Only run once on mount

  const currentThemeData = getThemeById(currentTheme);

  const value: ThemeContextValue = {
    currentTheme,
    currentThemeData,
    availableThemes: AVAILABLE_THEMES,
    switchTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
