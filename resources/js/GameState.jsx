import { create } from 'zustand'

export const useGameStore = create((set) => ({
    imageSrc: "",
    switch_image: (by) => set({ imageSrc: by }),
    isLoading: false,
    switch_loading: (by) => set({isLoading: by})
}))

