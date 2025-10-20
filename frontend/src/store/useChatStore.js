import toast from "react-hot-toast";
import { api } from "../lib/axios.js";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled"),

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await api.get("/messages/contacts");

      set({ allContacts: res.data });
    } catch (error) {
      console.error("Error fetching contacts", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false });
    }
  },

  
  getMyChatPartners: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await api.get("/messages/chats");

      set({ chats: res.data });
    } catch (error) {
      console.error("Error fetching chats", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
      try {
        
        set({isMessagesLoading: true})

        const res = await api.get(`/messages/${userId}`)

        set({messages: res.data})

      } catch (error) {
        console.error("Error fetching messages:",error)
        toast.error(error?.response?.data?.message ?? "Error fetching messages")
      }finally{
        set({isMessagesLoading: false})
      }
  }

}));
