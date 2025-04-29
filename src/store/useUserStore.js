import { create } from 'zustand'

export const useStore = create((set) => ({
  userId: null,
  nickname: '',
  image: '',
  role: '',
  setUser: (userId, nickname, image, role) => set({ userId, nickname, image, role }),
}))
