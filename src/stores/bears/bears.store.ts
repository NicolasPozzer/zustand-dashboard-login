import { create } from "zustand"

interface Osos {
    id: number
    name: string
}

type BearState = {
    blackBear: number
    polarBear: number
    pandaBear: number
    
    osos: Osos[]

    incrementBlack: (numero: number) => void
    incrementPolar: (numero: number) => void
    incrementPanda: (numero: number) => void
    deleteBlackBears: () => void
    deletePolarBears: () => void
    deletePandaBears: () => void

    actualizarSiHayNuevos: () => void
    addBear: () => void
}

export const useBearState = create<BearState>((set) => ({
    blackBear: 0,
    polarBear: 0,
    pandaBear: 0,


    osos: [{id: 1, name: 'Oso #1'}],

    incrementBlack: (numero: number) => {
        set((state) => {
            const newState = state.blackBear + numero
            return {blackBear: newState}
        })
    },
    incrementPolar: (numero: number) => {
        set((state) => {
            const newState = state.polarBear + numero
            return {polarBear: newState}
        })
    },
    incrementPanda: (numero: number) => {
        set((state) => {
            const newState = state.pandaBear + numero
            return {pandaBear: newState}
        })
    },
    
    deleteBlackBears: () => {
        set((state) => {
            state.blackBear = 0
            state.osos = []
            return {blackBear: state.blackBear,}
        })
    },
    deletePolarBears: () => {
        set((state) => {
            state.polarBear = 0
            return {polarBear: state.polarBear}
        })
    },
    deletePandaBears: () => {
        set((state) => {
            state.pandaBear = 0
            return {pandaBear: state.pandaBear}
        })
    },

    actualizarSiHayNuevos: () => {
        set((state) => {
            const newState = [...state.osos]
            return {osos: newState}
        })
    },

    addBear: () => {
        set((state) => {
            const os: Osos = {id: state.osos.length + 1,
                                name: `Oso #${state.osos.length + 1}`}
            const newState = [...state.osos, os]
            return { osos: newState}
        })
    }
}))