import { create } from 'zustand'

export const useStore = create((set) => ({
  userId: null,
  nickname: '',
  image: '',
  setUser: (userId, nickname, image) => set({ userId, nickname, image }),
}))
