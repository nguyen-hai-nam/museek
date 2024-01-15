import { create } from 'zustand'

import { User } from '@/schemas/users'

export interface Store {
    user: User | null
    // eslint-disable-next-line no-unused-vars
    setUser: (user: User | null) => void
    removeUser: () => void
}

export const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    removeUser: () => set({ user: null })
}))