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
 * Base theme is loaded statically via global.css
 * This function only manages theme OVERRIDE files
 */
function loadThemeCSS(theme: Theme): Promise<void> {
  return new Promise((resolve, reject) => {
    // Remove existing theme override links
    const existingOverrides = document.querySelectorAll('link[data-theme-override]');
    console.log(`🗑️ Removing ${existingOverrides.length} existing override link(s)`);
    existingOverrides.forEach(link => link.remove());

    // If selecting base theme, just remove overrides (base already loaded via global.css)
    if (theme.id === 'base') {
      console.log('✅ Base theme selected - using static base CSS (no overrides)');
      resolve();
      return;
    }

    console.log(`📥 Loading override CSS for theme: ${theme.name}`);
    console.log(`  - Primitive: ${theme.primitiveCSS}`);
    console.log(`  - Semantic: ${theme.semanticCSS}`);

    // Add cache-busting timestamp to ensure fresh CSS loads
    const cacheBust = `?v=${Date.now()}`;

    // Load theme override files (these override base tokens)
    const primitiveLink = document.createElement('link');
    primitiveLink.rel = 'stylesheet';
    primitiveLink.href = theme.primitiveCSS + cacheBust;
    primitiveLink.setAttribute('data-theme-override', 'primitive');
    primitiveLink.setAttribute('data-theme-id', theme.id);

    const semanticLink = document.createElement('link');
    semanticLink.rel = 'stylesheet';
    semanticLink.href = theme.semanticCSS + cacheBust;
    semanticLink.setAttribute('data-theme-override', 'semantic');
    semanticLink.setAttribute('data-theme-id', theme.id);

    console.log(`🔗 Creating link tags with cache-bust: ${cacheBust}`);

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
        const target = error.target as HTMLLinkElement;
        console.error('❌ Failed to load theme override CSS:', {
          href: target?.href,
          error: error,
        });
        console.error('💡 Check Network tab for 404 errors');
        reject(new Error(`Failed to load theme overrides: ${theme.name}`));
      }
    };

    primitiveLink.onload = () => {
      console.log('✅ Primitive override CSS loaded');
      primitiveLoaded = true;
      checkBothLoaded();
    };

    primitiveLink.onerror = handleError;

    semanticLink.onload = () => {
      console.log('✅ Semantic override CSS loaded');
      semanticLoaded = true;
      checkBothLoaded();
    };

    semanticLink.onerror = handleError;

    // Append override links to head (after base from global.css)
    console.log('📌 Appending override <link> tags to document head');
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

    console.log(`🎨 Switching theme to: ${theme.name} (${themeId})`);
    setIsLoading(true);

    loadThemeCSS(theme)
      .then(() => {
        console.log(`✅ Theme loaded successfully: ${theme.name}`);
        console.log(`🎨 Primary button color should now be:`,
          themeId === 'base' ? '#0053e2 (Walmart blue)' : '#002e99 (Navy blue)');

        // Force a small delay and reflow to ensure CSS is fully applied
        setTimeout(() => {
          // Force browser to recalculate styles
          document.body.offsetHeight;

          setCurrentTheme(themeId);

          // Persist to localStorage
          try {
            localStorage.setItem(THEME_STORAGE_KEY, themeId);
          } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
          }

          setIsLoading(false);

          // Log computed style for debugging
          const computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--ld-semantic-color-action-fill-primary').trim();
          console.log(`🔍 Computed primary color after switch:`, computedColor || 'NOT FOUND');

          // Check if override files are in the DOM
          const overrideLinks = document.querySelectorAll('link[data-theme-override]');
          console.log(`🔗 Override links in DOM:`, overrideLinks.length);
          overrideLinks.forEach(link => {
            console.log(`  - ${link.getAttribute('data-theme-override')}:`, (link as HTMLLinkElement).href);
          });
        }, 100);
      })
      .catch((error) => {
        console.error('❌ Theme loading failed:', error);
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

  // Load initial theme on mount (if not base, since base is already in global.css)
  useEffect(() => {
    const theme = getThemeById(currentTheme);
    if (theme && theme.id !== 'base') {
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
