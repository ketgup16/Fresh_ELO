import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';

export type ActiveAgent = 'squiggly' | 'marty' | 'sidekick';

interface AgentContextValue {
  activeAgent: ActiveAgent;
  setActiveAgent: (agent: ActiveAgent) => void;
}

const AgentContext = createContext<AgentContextValue | undefined>(undefined);

interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [activeAgent, setActiveAgentState] = useState<ActiveAgent>(() => {
    try {
      const saved = localStorage.getItem('ai-agent-preference');
      if (saved === 'marty' || saved === 'squiggly' || saved === 'sidekick') return saved;
    } catch {
      // ignore
    }
    return 'squiggly';
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai-agent-preference', activeAgent);
    } catch {
      // ignore
    }
  }, [activeAgent]);

  const value = useMemo<AgentContextValue>(
    () => ({ activeAgent, setActiveAgent: setActiveAgentState }),
    [activeAgent],
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
