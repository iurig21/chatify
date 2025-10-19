import {create} from 'zustand'
import { api } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,


    checkAuth: async () => {
        try {
            const res = await api.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.error("Error in checkAuth:",error)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        try {
            set({isSigningUp: true})

            const res = await api.post("/auth/signup",data)

            set({authUser: res.data})

            toast.success("Account created succesfully!");

        } catch (error) {
            console.error("Error signing up:",error)
            toast.error(error.response.data.message)
            set({authUser: null})
        }finally{
            set({isSigningUp:false})
        }
    }
}))