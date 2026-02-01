'use client';

import { create } from 'zustand';
import { BodySystem, Organ } from '@/types';

interface ExplorerState {
  activeSystem: BodySystem | null;
  selectedOrgan: Organ | null;
  xrayOpacity: number;
  isInfoCardOpen: boolean;

  // Actions
  setActiveSystem: (system: BodySystem | null) => void;
  setSelectedOrgan: (organ: Organ | null) => void;
  setXrayOpacity: (opacity: number) => void;
  openInfoCard: () => void;
  closeInfoCard: () => void;
  reset: () => void;
}

const initialState = {
  activeSystem: null,
  selectedOrgan: null,
  xrayOpacity: 1,
  isInfoCardOpen: false,
};

export const useExplorerStore = create<ExplorerState>()((set) => ({
  ...initialState,

  setActiveSystem: (system) => set({
    activeSystem: system,
    selectedOrgan: null,
    isInfoCardOpen: false,
  }),

  setSelectedOrgan: (organ) => set({
    selectedOrgan: organ,
    isInfoCardOpen: organ !== null,
  }),

  setXrayOpacity: (opacity) => set({ xrayOpacity: opacity }),

  openInfoCard: () => set({ isInfoCardOpen: true }),

  closeInfoCard: () => set({ isInfoCardOpen: false }),

  reset: () => set(initialState),
}));
