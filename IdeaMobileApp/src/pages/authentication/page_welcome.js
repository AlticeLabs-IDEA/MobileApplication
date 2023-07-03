// IMPORT LIBRARIES
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2 } from '../../components/buttons';


export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaProvider style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => {
                    navigation.navigate("Login")
                }}>
                <PrimaryButton_v1 text={"Efetuar login"} />
            </Pressable>
            <Pressable
                onPress={() => {
                    navigation.navigate("Register")
                }}>
                <PrimaryButton_v2 text={"Criar nova conta"} />
            </Pressable>
        </SafeAreaProvider>
    )
}