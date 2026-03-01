import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wcp-theme-editor-overrides';

export type TokenOverrides = Record<string, string>;

export interface ThemeEditorExport {
  theme: string;
  exportedAt: string;
  overrides: TokenOverrides;
}

function loadFromStorage(): TokenOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TokenOverrides;
  } catch {
    return {};
  }
}

function saveToStorage(overrides: TokenOverrides): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Storage unavailable — fail silently
  }
}

function applyOverride(token: string, value: string): void {
  document.documentElement.style.setProperty(token, value);
}

function removeOverride(token: string): void {
  document.documentElement.style.removeProperty(token);
}

function applyAllOverrides(overrides: TokenOverrides): void {
  Object.entries(overrides).forEach(([token, value]) => {
    applyOverride(token, value);
  });
}

function clearAllOverrides(overrides: TokenOverrides): void {
  Object.keys(overrides).forEach(removeOverride);
}

export function getCurrentValue(token: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function useThemeEditor() {
  const [overrides, setOverrides] = useState<TokenOverrides>(() => {
    const stored = loadFromStorage();
    // Apply stored overrides on init
    applyAllOverrides(stored);
    return stored;
  });

  const setOverride = useCallback((token: string, value: string) => {
    applyOverride(token, value);
    setOverrides(prev => {
      const next = { ...prev, [token]: value };
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetOverride = useCallback((token: string) => {
    removeOverride(token);
    setOverrides(prev => {
      const next = { ...prev };
      delete next[token];
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides(prev => {
      clearAllOverrides(prev);
      return {};
    });
    saveToStorage({});
  }, []);

  const exportJSON = useCallback((): string => {
    const payload: ThemeEditorExport = {
      theme: localStorage.getItem('ld-theme') ?? 'walmart',
      exportedAt: new Date().toISOString(),
      overrides,
    };
    return JSON.stringify(payload, null, 2);
  }, [overrides]);

  const importJSON = useCallback((jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString) as ThemeEditorExport;
      if (!parsed.overrides || typeof parsed.overrides !== 'object') {
        return { success: false, error: 'Invalid format: missing "overrides" object.' };
      }
      // Clear existing overrides first
      setOverrides(prev => { clearAllOverrides(prev); return {}; });

      // Validate and apply only --ld-semantic-* and --wcp-semantic-* tokens
      const valid: TokenOverrides = {};
      for (const [token, value] of Object.entries(parsed.overrides)) {
        if (
          (token.startsWith('--ld-semantic-') || token.startsWith('--wcp-semantic-')) &&
          typeof value === 'string'
        ) {
          valid[token] = value;
          applyOverride(token, value);
        }
      }

      setOverrides(valid);
      saveToStorage(valid);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Failed to parse JSON.' };
    }
  }, []);

  // Clean up inline overrides when component unmounts (optional: keep them persisted)
  // We intentionally do NOT clean up on unmount — overrides are CSS cascade additions

  return {
    overrides,
    setOverride,
    resetOverride,
    resetAll,
    exportJSON,
    importJSON,
    getCurrentValue,
  };
}
