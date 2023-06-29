// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View } from "react-native";

// IMPORT COMPONENTS
import { EmailInputLogin, PasswordInputLogin } from "../../components/inputs.js";
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"


export default function LoginScreen({ navigation }) {
    return (
        <SafeAreaProvider style={styles.mainContainer}>
            <StatusBar style={"dark"} />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.indicatorTitle}>
                    Login
                </Text>
                <Text style={styles.descriptionText}>
                    É bom ter-te de volta! {"\n"}Caso não te recordes, para entrares na aplicação IDEA só precisas de introduzir o teu e-mail e a respetiva palavra-passe. Até já!
                </Text>
                <View style={styles.cardBox}>
                    <EmailInputLogin />
                    <PasswordInputLogin />

                    <Text style={styles.recoverPassword}>
                        Esqueceste a tua palavra-passe?
                    </Text>
                </View>

            </ScrollView>
            <View style={styles.doubleButtonsView}>
                <Pressable 
                    onPress={() => {
                        navigation.navigate("Welcome")
                    }}
                    style={{right: 'auto', left: CONST.layoutPaddingLateral}}>
                    <PrimaryButton_v2 text={"Voltar"} />
                </Pressable>
                <Pressable style={{left: 'auto', right: CONST.layoutPaddingLateral}}>
                    <PrimaryButton_v1 text={"Entrar"} />
                </Pressable>
            </View>
        </SafeAreaProvider>
    )
}