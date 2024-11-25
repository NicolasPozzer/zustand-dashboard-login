
// url back
import {User} from "./User.ts";
import {create} from "zustand";
import axios from "axios";

const apiURL = "url backend"//process.env.NEXT_PUBLIC_API_URL;

// store methods
interface UserStore {
  users: User[];
  fetchUsers: () => void;
  addUser: (user: User) => void;
  deleteUser: (user: User) => void;
  editUser: (user: User) => void;
}

// usos del store
export const useUserStore = create<UserStore>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await axios.get(`${apiURL}/users/list`);
      set({users: response.data});
    } catch (error) {
      console.error("Error fetching users",error);
    }
  },
  addUser: async (user) => {
    try {
      const response = await axios.post(`${apiURL}/users/create`, user);
      set((state) => ({users: [...state.users, response.data]}));
    }catch (error) {
      console.error("Error adding user",error);
    }
  },
  deleteUser: async (user) => {
    try {
      await axios.delete(`${apiURL}/users/delete/${user.id}`);
      set((state) => ({
        users: state.users.filter((item) => item.id !== user.id),}));
    } catch (error) {
      console.error("Error deleting user",error);
    }
  },
  editUser: async (user) => {
    try {
      // Envía el usuario al backend con axios.put
      const response = await axios.put(`${apiURL}/users/edit/${user.id}`, user);

      // Actualiza el estado con la respuesta del backend
      set((state) => ({
        users: state.users.map((item) =>
          item.id === user.id ? { ...item, ...response.data } : item
        ),
      }));
    } catch (error) {
      console.error("Error editing user", error);
    }
  }

}))
