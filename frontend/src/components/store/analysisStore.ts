import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Analysis {
  id: string;
  timestamp: Date;
  messages: {
    type: 'user' | 'system';
    content: string;
    timestamp: Date;
  }[];
}

interface AnalysisStore {
  history: Analysis[];
  currentAnalysis: Analysis | null;
  addToHistory: (analysis: Analysis) => void;
  removeFromHistory: (id: string) => void;
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  clearCurrentAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set) => ({
      history: [],
      currentAnalysis: null,
      addToHistory: (analysis) =>
        set((state) => ({
          history: [...state.history, analysis],
        })),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((a) => a.id !== id),
        })),
      setCurrentAnalysis: (analysis) =>
        set(() => ({
          currentAnalysis: analysis,
        })),
      clearCurrentAnalysis: () =>
        set(() => ({
          currentAnalysis: null,
        })),
    }),
    {
      name: 'analysis-storage',
    }
  )
);