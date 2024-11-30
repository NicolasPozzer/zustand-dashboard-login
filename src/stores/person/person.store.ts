import { type StateCreator, create} from "zustand";
import { persist } from "zustand/middleware";
import {customSessionStorage} from "../storages/session-storage.storage.ts";


interface PersonState {
    firstName: string;
    lastName: string;


}

interface Actions{
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

//Storage para separar el metodo y tener todo acomodado!
const storeApi: StateCreator<PersonState & Actions> = (set) => ({

        firstName: '',
        lastName: '',

        //Methods
        setFirstName: (value: string) => set(state => ({firstName: value})),

        setLastName: (value: string) => set(state => ({lastName: value})),
    })


export const usePersonStore = create<PersonState & Actions>()(
    persist(storeApi, {
        name: 'person-storage',
        storage: customSessionStorage,
    }),
);