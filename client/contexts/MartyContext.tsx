import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MartyContextValue {
  isMinimized: boolean;
  isDocked: boolean;
  initialPosition: { x: number; y: number };
  setIsMinimized: (minimized: boolean) => void;
  setIsDocked: (docked: boolean) => void;
  setInitialPosition: (pos: { x: number; y: number }) => void;
}

const MartyContext = createContext<MartyContextValue | undefined>(undefined);

interface MartyProviderProps {
  children: ReactNode;
}

export function MartyProvider({ children }: MartyProviderProps) {
  // Initialize state from localStorage or defaults
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('marty-minimized');
    return saved ? JSON.parse(saved) : false;
  });

  const [isDocked, setIsDocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('marty-docked');
    return saved ? JSON.parse(saved) : false;
  });

  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number }>(() => {
    const saved = localStorage.getItem('marty-position');
    if (saved) {
      return JSON.parse(saved);
    }
    // Safe window access - use default if window is not available
    const defaultX = typeof window !== 'undefined' ? window.innerWidth - 400 : 800;
    return { x: defaultX, y: 100 };
  });

  // Persist to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('marty-minimized', JSON.stringify(isMinimized));
  }, [isMinimized]);

  useEffect(() => {
    localStorage.setItem('marty-docked', JSON.stringify(isDocked));
  }, [isDocked]);

  useEffect(() => {
    localStorage.setItem('marty-position', JSON.stringify(initialPosition));
  }, [initialPosition]);

  const value: MartyContextValue = {
    isMinimized,
    isDocked,
    initialPosition,
    setIsMinimized,
    setIsDocked,
    setInitialPosition,
  };

  return (
    <MartyContext.Provider value={value}>
      {children}
    </MartyContext.Provider>
  );
}

export function useMarty() {
  const context = useContext(MartyContext);
  if (context === undefined) {
    throw new Error('useMarty must be used within a MartyProvider');
  }
  return context;
}
