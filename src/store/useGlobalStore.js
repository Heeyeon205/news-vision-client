import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));
