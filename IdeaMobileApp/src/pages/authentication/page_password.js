// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Alert, TextInput } from "react-native";
import { useState } from "react";
import firebase from "../../../config/firebase.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"


export default function PasswordScreen({ navigation }) {
    const [email, setEmail] = useState('')

    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(email.trim().toLowerCase())
        .then(() => {
            Alert.alert("Sucesso", "E-mail enviado com sucesso.");
            navigation.navigate("Login")
        })
        .catch((error) => {
            Alert.alert("Erro", "Impossível encontrar utilizador.");
        });
    }

    return (
        <SafeAreaProvider style={[styles.mainContainer, {paddingBottom: CONST.layoutPaddingVertical}]}>
            <StatusBar style={"dark"} />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.indicatorTitle}>
                    Recuperação de palavra-passe
                </Text>
                <Text style={styles.descriptionText}>
                    Não te preocupes, há sempre forma de recuperar a tua palavra-passe. {"\n"}Introduz o teu e-mail e iremos enviar-te informações para redefinires a tua palavra-passe.
                </Text>
                <View style={styles.cardBox}>
                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={email}
                                onChangeText={(text) => { setEmail(text) }}
                                placeholder={'E-mail'}
                                placeholderTextColor={CONST.neutralGray}
                            />
                        </View>
                    </View>

                </View>

            </ScrollView>
                <View style={[styles.doubleButtonsView, { backgroundColor: CONST.lightWhite }]}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Login")
                        }}
                        style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v2 text={"Voltar"} />
                    </Pressable>
                    <Pressable 
                        onPress={() => changePassword()}
                        style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v1 text={"Enviar"} />
                    </Pressable>
                </View>
        </SafeAreaProvider>
    )
}