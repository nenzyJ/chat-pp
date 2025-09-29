import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggin: false,
    onlineUsers: [], // Масив ID користувачів, які онлайн

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
        } catch (error) {
            console.log("Error checking auth:", error)
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },


    signup: async(data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data})

            //toast success
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            
        } finally {
            set({isSigningUp: false})
        }
    },
    login: async(data) => {
        set({isLoggin: true})
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data})

            //toast success
            toast.success("Logged In successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            
        } finally {
            set({isLoggin: false})
        }
    },
    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error("Error loggining out")
            
        }
    },
    updateProfile: async (profilePicData) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", profilePicData)
            set({authUser: res.data})
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile")
        }   
    },
    
    setOnlineUsers: (users) => set({onlineUsers: users})
 }))