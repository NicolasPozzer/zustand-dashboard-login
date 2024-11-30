import {createJSONStorage, StateStorage} from "zustand/middleware";

//Con esto guardamos en sessionStorage

const storageAPI: StateStorage = {
    getItem(name: string): string | Promise<string | null> | null {
        const data = sessionStorage.getItem(name);
        return data;
    },

    setItem(name: string, value: string): void {
        sessionStorage.setItem(name, value);
    },

    removeItem(name: string): void | Promise<void> {
        console.log('removeItem', name);
    }
}


//ahora reutilizamos "customSessionStorage" que esta aca abajo, en la parte que querramos
export const customSessionStorage = createJSONStorage(() => storageAPI);