/**
 * LayoutSettingsContext
 *
 * Stores project-level layout preferences that persist across sessions.
 * Currently tracks `mobileFooter` — which component to render at mobile
 * breakpoints: the native-style BottomNav or the mobile-web MwebFooter.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export type MobileFooterMode = 'native' | 'mweb';

interface LayoutSettingsContextValue {
  /** Which footer/nav renders on mobile breakpoints in the Walmart app */
  mobileFooter: MobileFooterMode;
  setMobileFooter: (mode: MobileFooterMode) => void;
}

const LayoutSettingsContext = createContext<LayoutSettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'wcp-mobile-footer-mode';

function readStoredMode(): MobileFooterMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'mweb' || stored === 'native') return stored;
  } catch {
    // localStorage unavailable (SSR, private mode, etc.)
  }
  return 'native'; // default: native BottomNav
}

export function LayoutSettingsProvider({ children }: { children: React.ReactNode }) {
  const [mobileFooter, setMobileFooterState] = useState<MobileFooterMode>(readStoredMode);

  const setMobileFooter = useCallback((mode: MobileFooterMode) => {
    setMobileFooterState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LayoutSettingsContext.Provider value={{ mobileFooter, setMobileFooter }}>
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings(): LayoutSettingsContextValue {
  const ctx = useContext(LayoutSettingsContext);
  if (!ctx) throw new Error('useLayoutSettings must be used inside <LayoutSettingsProvider>');
  return ctx;
}
