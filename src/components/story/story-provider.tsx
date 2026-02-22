'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { StoryPhase } from '@/lib/types';

interface StoryContextValue {
  phase: StoryPhase;
  phaseState: Record<string, unknown>;
  chapterCompleted: boolean;
  loading: boolean;
  refreshStory: () => Promise<void>;
}

const StoryContext = createContext<StoryContextValue>({
  phase: 0,
  phaseState: {},
  chapterCompleted: false,
  loading: true,
  refreshStory: async () => {},
});

export function useStory() {
  return useContext(StoryContext);
}

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<StoryPhase>(0);
  const [phaseState, setPhaseState] = useState<Record<string, unknown>>({});
  const [chapterCompleted, setChapterCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshStory = useCallback(async () => {
    try {
      const res = await fetch('/api/story/progress');
      if (!res.ok) return;
      const data = await res.json();
      setPhase(data.phase as StoryPhase);
      setPhaseState(data.phaseState || {});
      setChapterCompleted(data.chapterCompleted || false);
    } catch {
      // Silently fail — story is non-essential
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStory();
  }, [refreshStory]);

  return (
    <StoryContext.Provider value={{ phase, phaseState, chapterCompleted, loading, refreshStory }}>
      {children}
    </StoryContext.Provider>
  );
}
