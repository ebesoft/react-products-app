import { productsApi } from "../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}


const returnUserToken = ( data: AuthResponse ): {
    user: User, 
    token: string
} => {
    
    // Option 1.
    //const { id, email, fullName, isActive, roles, token } = data
    //const user: User = {
    //    id,
    //    email,
    //    fullName,
    //    isActive,
    //    roles
    //}

    // Option 2.
    const { token, ...user } = data

    return {
        user,
        token
    }
    
}


export const authRegister = async( email: string, password: string, fullName: string ) => {
    
    email = email.toLowerCase()

    try {
        const { data } = await productsApi.post<AuthResponse>(`/auth/register`, {
            email,
            password,
            fullName
        })

        return returnUserToken( data )
    } catch (error) {
        //throw new Error(' User and/or password not valid')
        return null
    }

}


export const authLogin = async( email: string, password: string ) => {

    email = email.toLowerCase()

    try {
        const { data } = await productsApi.post<AuthResponse>(`/auth/login`, {
            email,
            password
        })

        return returnUserToken( data )
    } catch (error) {
        //throw new Error(' User and/or password not valid')
        return null
    }
}

export const authCheckStatus = async() => {
    try {
        const { data } = await productsApi.get<AuthResponse>(`/auth/check-status`)
        return returnUserToken( data )
    } catch (error) {
        return null
        //throw new Error('User not logged in')
    }

}

