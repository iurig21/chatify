import toast from "react-hot-toast";
import { api } from "../lib/axios.js";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore.js";

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
      toast.error(error.response?.data?.message ?? "Error fetching contacts");
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
      toast.error(
        error.response?.data?.message ?? "Error fetching chat partners"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    try {
      set({ isMessagesLoading: true });

      const res = await api.get(`/messages/${userId}`);

      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data?.message ?? "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await api.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      //Remove optimisticMessage from the state on api call failure
      set({ messages: messages });
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message ?? "Error sending message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();

    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    socket.on("newMessage", (newMessage) => {

      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

      if(!isMessageSentFromSelectedUser) return

      const currentMessages = get().messages;

      set({ messages: [...currentMessages, newMessage] });
      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");

        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },
}));
