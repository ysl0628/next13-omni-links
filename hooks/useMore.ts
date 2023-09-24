import { create } from 'zustand'

interface MoreStore {
  open: boolean
  toggle: () => void
}

export const useMore = create<MoreStore>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open }))
}))
