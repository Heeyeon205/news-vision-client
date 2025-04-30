import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      userId: null,
      nickname: '',
      image: '',
      role: '',
      setUser: (userId, nickname, image, role) =>
        set({ userId, nickname, image, role }),
      clearUser: () => set({ userId: null, nickname: '', image: '', role: '' }),
    }),
    {
      name: "user-storage",
    }
  )
);
