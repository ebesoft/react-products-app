import { create } from "zustand"


interface TemporalCameraStore {
    selectedImage: string[]

    addSelectedImage: (image: string) => void

    clearImages: () => void
}


export const useCameraStore = create<TemporalCameraStore>()((set) => ({
    selectedImage: [],
    addSelectedImage: (image: string) => {
        set( (state) => ({ selectedImage: [ ...state.selectedImage, image ] }))
    },

    clearImages: () => set({ selectedImage: [] })
}))
