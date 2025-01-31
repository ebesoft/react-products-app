import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { Redirect, Stack } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

const CheckAuthenticationLayout = () => {

    const backgroundColor = useThemeColor({}, 'background') 
    const { status, checkStatus } = useAuthStore()

    useEffect(() => {
        checkStatus()
    }, [])

    if( status === 'checking' ){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5
            }}>
                <ActivityIndicator />
            </View>
        )
    }

    if( status === 'unauthenticated' ){
        // TODO: Guardar ruta del usuario en el storage.
        return <Redirect href="/auth/login" />
    }

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                contentStyle: {
                    backgroundColor: backgroundColor,
                }
            }}
        >
            <Stack.Screen 
                name="(home)/index" 
                options={{
                    title: 'Products',
                    headerLeft: () => <LogoutIconButton />,
                }} 
            />
        </Stack>
    )
}

export default CheckAuthenticationLayout