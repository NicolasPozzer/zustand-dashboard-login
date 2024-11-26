import { create } from "zustand"

type Oso = {
    id: number
    name: string
}

interface BearState {
    blackBear: number
    polarBear: number
    pandaBear: number
    
    osos: Oso[]
    totalOsos: number

    incrementBlack: (numero: number) => void
    incrementPolar: (numero: number) => void
    incrementPanda: (numero: number) => void
    deleteBlackBears: () => void
    deletePolarBears: () => void
    deletePandaBears: () => void

    actualizarSiHayNuevos: () => void
    addBear: () => void
    clearBears: () => void;
    totalBears: () => void;

    computed: {
        computedTotalBears: number;
    }

    //total bears pero con propiedades computadas

}

export const useBearState = create<BearState>((set, get) => ({
    blackBear: 0,
    polarBear: 0,
    pandaBear: 0,


    osos: [],

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
            const os: Oso = {id: state.osos.length + 1,
                                name: `Oso #${state.osos.length + 1}`}
            const newState = [...state.osos, os]
            return { osos: newState}
        })
    },

    clearBears: () =>{
        set({
            osos: [],
        })
    },


    //MODO TOSCO DE CONTAR Y PASAR DATOS DE UN STORE A LAS PAGINAS(NECESITA useEffect para actualizar)
    totalOsos: 0,
    totalBears: () => {
        let catOsos = get().osos.length;
        let suma = 0;

        suma = catOsos + get().blackBear + get().pandaBear + get().polarBear;
        set({ totalOsos: suma });
    },

    //MODO EFICIENTE DE CONTAR Y PASAR DATOS DE UN STORE A LAS PAGINAS(No necesita nada mas, solo llamar en cualquier pagina)
    computed: {
        get computedTotalBears(): number {
            return get().blackBear + get().polarBear + get().osos.length + get().pandaBear;
        }
    },

}))