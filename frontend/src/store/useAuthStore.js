import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { disconnect } from "mongoose";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingUp: false,
  isUpdatingProfile: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = await api.post("/auth/signup", data);

      set({ authUser: res.data });

      toast.success("Account created succesfully!");
      get().connectSocket();
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingUp: true });

      const res = await api.post("/auth/login", data);

      set({ authUser: res.data });

      get().connectSocket();

      toast.success("Logged succesfully!");
    } catch (error) {
      console.error("Error logging up:", error);
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isLoggingUp: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out succesfully!");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await api.put("/auth/update-profile", data);

      set({ authUser: res.data });
      toast.success("Profile pic updated succesfully!");
    } catch (err) {
      console.error("Error updating profile pic:", err);
      toast.error(err?.response?.data?.message ?? "Error updating profile pic");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, { withCredentials: true });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket.connected) get().socket.disconnect();
  },
}));
