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


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.mainContainer,{height: CONST.screenHeight + CONST.layoutPaddingVertical/2, paddingBottom: CONST.layoutPaddingVertical}]}>
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
                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
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

                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={password}
                                onChangeText={(text) => { setPassword(text) }}
                                placeholder={'Palavra-passe'}
                                placeholderTextColor={CONST.neutralGray}
                                secureTextEntry={!showPassword}
                            />
                            <Pressable
                                style={{ position: 'absolute', right: 0, padding: 18, zIndex: 100 }}
                                onPress={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                {showPassword ?
                                    <FontAwesome name="eye-slash" size={18} color={CONST.mainGray} />
                                    :
                                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />}
                            </Pressable>
                        </View>
                    </View>

                    <Pressable onPress={() => navigation.navigate("Password")}>
                    <Text style={styles.recoverPassword}>
                        Esqueceste a tua palavra-passe?
                    </Text>
                    </Pressable>
                </View>

            </ScrollView>
                <View style={[styles.doubleButtonsView, { backgroundColor: CONST.lightWhite }]}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Welcome")
                        }}
                        style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v2 text={"Voltar"} />
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            navigation.navigate("Tabbar")
                        }}
                        style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v1 text={"Entrar"} />
                    </Pressable>
                </View>
        </View>
    )
}