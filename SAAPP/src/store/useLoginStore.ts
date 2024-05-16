import { create } from "zustand";

interface IloginStore {
  user: string | null;
  isLoggedIn: boolean;
  login: (user: string) => void;
  logout: () => void;
}
export const useLoginStore = create<IloginStore>((set) => ({
  user: null,
  isLoggedIn: false, 
  login: (user:string) => {
    window.localStorage.removeItem("user_token");
    set({user, isLoggedIn: true})},
  logout: () => {set({ user: null, isLoggedIn: false})}
}))

  