/**
 * LayoutSettingsContext
 *
 * Stores project-level layout preferences that persist across sessions.
 * Tracks platform (iOS / Android) for native app experience.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export type PlatformMode = 'ios' | 'android';

interface LayoutSettingsContextValue {
  /** Platform experience mode: iOS native or Android native */
  platform: PlatformMode;
  setPlatform: (mode: PlatformMode) => void;
}

const LayoutSettingsContext = createContext<LayoutSettingsContextValue | undefined>(undefined);

const PLATFORM_STORAGE_KEY = 'wcp-platform-mode';

function readStoredPlatform(): PlatformMode {
  try {
    const stored = localStorage.getItem(PLATFORM_STORAGE_KEY);
    if (stored === 'ios' || stored === 'android') return stored;
  } catch { /* ignore */ }
  return 'ios';
}

export function LayoutSettingsProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatformState] = useState<PlatformMode>(readStoredPlatform);

  const setPlatform = useCallback((mode: PlatformMode) => {
    setPlatformState(mode);
    try {
      localStorage.setItem(PLATFORM_STORAGE_KEY, mode);
    } catch { /* ignore */ }
  }, []);

  return (
    <LayoutSettingsContext.Provider value={{ platform, setPlatform }}>
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings(): LayoutSettingsContextValue {
  const ctx = useContext(LayoutSettingsContext);
  if (!ctx) throw new Error('useLayoutSettings must be used inside <LayoutSettingsProvider>');
  return ctx;
}
