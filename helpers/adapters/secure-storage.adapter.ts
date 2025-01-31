import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'

export class SecureStorageAdapter {

    static async setItem(key: string, value: string) {
        try {
            return await SecureStore.setItemAsync(key, value)
        } catch (error) {
            Alert.alert('Error', 'Fallo al guardar')
        }
       
    }

    static async getItem(key: string) {
        try {
            return await SecureStore.getItemAsync(key)
        } catch (error) {
            Alert.alert('Error', 'Fallo al obtener el valor')
        }
       
    }

    static async removeItem(key: string) {
        try {
            return await SecureStore.deleteItemAsync(key)
        } catch (error) {
            Alert.alert('Error', 'Fallo al borrar el valor')
        }
    }

}