import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useAuthStore } from "../store/useAuthStore"
import { Ionicons } from "@expo/vector-icons"


const LogoutIconButton = () => {

    const primaryColor = useThemeColor({}, 'primary')   
    const { logout } = useAuthStore()

    return (
        <TouchableOpacity
            onPress={logout}
            style={{ 
                marginRight: 8
            }}
        >
            <Ionicons name="log-out-outline" size={24} color={primaryColor} />
        </TouchableOpacity>
    )
}

export default LogoutIconButton