import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter'
import axios from 'axios'
import { Platform } from 'react-native'
// TODO: conectar mediante envs vars, Android e IOS.

const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev'

export const API_URL = 
    (STAGE === 'prod') 
    ? process.env.EXPO_PUBLIC_API_URL 
    : (Platform.OS) === 'ios' 
    ? process.env.EXPO_PUBLIC_API_URL_IOS 
    : process.env.EXPO_PUBLIC_API_URL_ANDROID


const productsApi = axios.create({
    baseURL: API_URL
})

// TODO: implementar o interceptor de erros
productsApi.interceptors.request.use( async (config) => {
    
    // Verificar si el token existe en el secureStorage
    const token = await SecureStorageAdapter.getItem('token')
    
    // Si hay token guardado, agregarlo en el header
    if( token ){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export { productsApi }


