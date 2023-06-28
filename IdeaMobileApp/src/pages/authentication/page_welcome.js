// IMPORT LIBRARIES
import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// IMPORT COMPONENTS
import {  PrimaryButton_v1, PrimaryButton_v2 } from '../../components/buttons';


export default function WelcomeScreen({navigation}) {
    return (
     <SafeAreaProvider style={{justifyContent: 'center', alignItems: 'center'}}>
            <PrimaryButton_v1 text={"Efetuar login"} />
            <PrimaryButton_v2 text={"Criar nova conta"} />
     </SafeAreaProvider>
    )
}