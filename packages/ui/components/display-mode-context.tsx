'use client';

import { createContext, type ReactNode, useContext } from 'react';

import useLocalState from 'utils/use-local-state';

export type DisplayMode = 'compact' | 'standard';

type DisplayModeContextType = {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
};

const DisplayModeContext = createContext<DisplayModeContextType | null>(null);

export const DisplayModeProvider = ({ children }: { children: ReactNode }) => {
  const [displayMode, setDisplayMode] = useLocalState<DisplayMode>(
    'pr-monitor-display-mode',
    'standard'
  );

  return (
    <DisplayModeContext.Provider value={{ displayMode, setDisplayMode }}>
      {children}
    </DisplayModeContext.Provider>
  );
};

export const useDisplayMode = () => {
  const context = useContext(DisplayModeContext);
  if (!context) {
    throw new Error('useDisplayMode must be used within a DisplayModeProvider');
  }
  return context;
};
