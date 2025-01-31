import { ThemedText } from "@/presentation/theme/components/ThemedText"
import { View } from "react-native"


const HomeScreen = () => {
    return (
        <View style={{ paddingTop:100, paddingHorizontal: 20 }}>
            <ThemedText style={{ fontFamily: 'KanitBold' }}>Home Bold</ThemedText>
            <ThemedText style={{ fontFamily: 'KanitRegular' }}>Home Regular</ThemedText>
            <ThemedText style={{ fontFamily: 'KanitThin' }}>Home Thin</ThemedText>
        </View>
    )
}

export default HomeScreen