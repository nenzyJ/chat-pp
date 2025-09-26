import {create} from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {name: "doue", _id: 123, age: 21},
    isLoading: false,
    isLoggedIn: false,
    login: () => {
        console.log("loginned in")
        set({isLoggedIn: true, isLoading: true})
    }
}))