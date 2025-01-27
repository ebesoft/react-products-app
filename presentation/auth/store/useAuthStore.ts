import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  user?: User;


  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
    // Properties
    status: 'checking',
    token: undefined,
    user: undefined,

    // Actions
    login: async(email: string, password: string) => {
        return true;
    },
    checkStatus: async() => {
     
    },
    logout: async() => {
       
    }

}))
