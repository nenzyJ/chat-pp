import {create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound: () => {
        const newValue = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", newValue.toString())
        set({isSoundEnabled: newValue})
    },
    setActiveTab: (tab) => set({activeTab: tab}),
    // preferred name
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    // backward compatibility for older components
    setSelectUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async() => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts: res.data});
        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({isUsersLoading: false});
        }

    },
    getMyChatPartners: async() => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },
    getMessagesByUserId: async(userId) => {
        set({ isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            toast.error(error.reponse?.data?.message || "Something went wrong")
        } finally {
            set({isMessagesLoading: false})
        }
    }
}))