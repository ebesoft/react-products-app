import { useAuthStore } from "@/presentation/auth/store/useAuthStore"
import ThemedButton from "@/presentation/theme/components/ThemedButton"
import ThemedLink from "@/presentation/theme/components/ThemedLink"
import { ThemedText } from "@/presentation/theme/components/ThemedText"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor"
import { router } from "expo-router"
import { useState } from "react"
import { ScrollView, KeyboardAvoidingView, useWindowDimensions, View, Alert } from "react-native"


const RegisterScreen = () => {
    const { height } = useWindowDimensions()
    const backgroundColor = useThemeColor({}, 'background')

    const [isPosting, setIsPosting] = useState(false)
    const { register } = useAuthStore()

    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: ''
    })

    const onRegister = async() => {

        const { email, password, fullName } = form

        console.log(email, password, fullName)

        if( email.length === 0 || password.length === 0 || fullName.length === 0 ){
            return
        }
        setIsPosting(true)

        const wasSuccessful = await register(email, password, fullName)

        setIsPosting(false)

        if( wasSuccessful ){
            router.replace('/')
            return
        }

        Alert.alert('Error', 'Email ya existe')

    }


    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                    backgroundColor: backgroundColor
                }}
            >
                <View style={{
                    paddingTop: height * 0.35,
                }}>
                    <ThemedText type="title">Crear cuenta</ThemedText>
                    <ThemedText style={{ color:'grey'}}>Por favor crea una cuenta para continuar</ThemedText>
                </View>

                <View style={{
                    paddingTop: 20
                }}
                >
                    {/* Nombre, email, password */}
                    <ThemedTextInput 
                        placeholder="Nombre completo"
                        autoCapitalize="words"
                        icon='person-outline'
                        value={ form.fullName }
                        onChangeText={(value) => setForm({ ...form, fullName: value })}
                    />

                    <ThemedTextInput 
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon='mail-outline'
                        value={ form.email }
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <ThemedTextInput 
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        icon="lock-closed-outline"
                        value={ form.password }
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        />
                </View>

                {/* Spacer*/}
                <View style={{ marginTop: 10 }} />

                {/* Boton*/}
                <ThemedButton
                    onPress={ onRegister } 
                    icon="arrow-forward-outline"
                    disabled={ isPosting }
                >
                    Crear cuenta
                </ThemedButton>

                {/* Spacer*/}
                <View style={{ marginTop: 50 }} />

                {/* Enlace de registro*/}

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ThemedText>Ya tienes cuenta?</ThemedText>
                    <ThemedLink 
                        href="/auth/login"
                        style={{ marginHorizontal: 5 }}
                    >
                        Ingresar
                    </ThemedLink>

                </View>
               
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen