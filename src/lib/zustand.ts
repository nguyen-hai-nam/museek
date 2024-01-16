import { create } from 'zustand'

import { User } from '@/schemas/users'

export interface Store {
    user: User | null
    // eslint-disable-next-line no-unused-vars
    setUser: (user: User | null) => void
    removeUser: () => void
    roleOptions: { id: string; name: string }[]
    // eslint-disable-next-line no-unused-vars
    setRoleOptions: (roleOptions: { id: string; name: string }[]) => void
}

export const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    removeUser: () => set({ user: null }),
    roleOptions: [],
    setRoleOptions: (roleOptions: { id: string; name: string }[]) => set({ roleOptions }),
}))