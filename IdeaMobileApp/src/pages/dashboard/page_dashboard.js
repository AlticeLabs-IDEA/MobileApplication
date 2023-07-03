// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// IMPORT COMPONENTS
import { EmailInputLogin, PasswordInputLogin } from "../../components/inputs.js";
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"


export default function DashboardScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaProvider style={styles.mainContainer}>
            <StatusBar style={"dark"} />
          
        </SafeAreaProvider>
    )
}