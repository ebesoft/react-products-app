import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  user?: User;
  token?: string; // Agrega esta línea

  changeStatus: (token?: string, user?: User) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Properties
    status: 'checking',
    token: undefined,
    user: undefined,

    // Actions
    changeStatus: (token?: string, user?: User) => {
      if( !token || !user ){
        set({ 
          status: 'unauthenticated', 
          token: undefined, 
          user: undefined 
        })
        // TODO: llmar logout
        return false;
      }

      set({ 
        status: 'authenticated', 
        token, 
        user 
      })

      // TODO: guardar token en el secure storage.
      return true
    },

    login: async(email: string, password: string) => {
        const resp = await authLogin(email, password);
        return get().changeStatus(resp?.token, resp?.user);
    },

    checkStatus: async() => {

      const resp = await authCheckStatus();

      get().changeStatus(resp?.token, resp?.user);
     
    },
    
    logout: async() => {
      // clear token
      set({ 
        status: 'unauthenticated', 
        token: undefined, 
        user: undefined 
      })
    }

}))
