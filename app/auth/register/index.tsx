import ThemedButton from "@/presentation/theme/components/ThemedButton"
import ThemedLink from "@/presentation/theme/components/ThemedLink"
import { ThemedText } from "@/presentation/theme/components/ThemedText"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor"
import { ScrollView, KeyboardAvoidingView, useWindowDimensions, View } from "react-native"


const RegisterScreen = () => {
    const { height } = useWindowDimensions()
    const backgroundColor = useThemeColor({}, 'background')

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
                    />

                    <ThemedTextInput 
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon='mail-outline'
                    />

                    <ThemedTextInput 
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        icon="lock-closed-outline"
                        />
                </View>

                {/* Spacer*/}
                <View style={{ marginTop: 10 }} />

                {/* Boton*/}
                <ThemedButton 
                    icon="arrow-forward-outline"
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