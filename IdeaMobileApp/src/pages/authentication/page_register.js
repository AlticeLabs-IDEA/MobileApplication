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


export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [department, setDepartment] = useState('')
    const [departments, setDepartments] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    return (
        <View style={[styles.mainContainer,{height: CONST.screenHeight + CONST.layoutPaddingVertical/2}]}>
            <StatusBar style={"dark"} />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.indicatorTitle}>
                    Registo
                </Text>
                <Text style={styles.descriptionText}>
                    Bem-vindo à aplicação IDEA! {"\n"}Para criar uma nova conta precisamos que introduzas algumas informações sobre ti.{"\n"}
                    Preenche todos os campos com cuidado. {"\n"}Posteriormente, podes editar a informação que inserires sempre que quiseres no teu perfil.    
                </Text>
                <View style={[styles.cardBox, {marginBottom: CONST.descriptionTextMargin}]}>
                
                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={name}
                                onChangeText={(text) => { setName(text) }}
                                placeholder={'Nome'}
                                placeholderTextColor={CONST.neutralGray}
                            />
                        </View>
                    </View>
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
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={department}
                                onChangeText={(text) => { setDepartment(text) }}
                                placeholder={'Departmento'}
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
                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={passwordConfirm}
                                onChangeText={(text) => { setPasswordConfirm(text) }}
                                placeholder={'Confirmação de palavra-passe'}
                                placeholderTextColor={CONST.neutralGray}
                                secureTextEntry={!showPasswordConfirm}
                            />
                            <Pressable
                                style={{ position: 'absolute', right: 0, padding: 18, zIndex: 100 }}
                                onPress={() => {
                                    setShowPasswordConfirm(!showPasswordConfirm)
                                }}>
                                {showPasswordConfirm ?
                                    <FontAwesome name="eye-slash" size={18} color={CONST.mainGray} />
                                    :
                                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />}
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={code}
                                onChangeText={(text) => { setCode(text) }}
                                placeholder={'Código'}
                                placeholderTextColor={CONST.neutralGray}
                            />
                        </View>
                    </View>
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
                    <Pressable style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v1 text={"Entrar"} />
                    </Pressable>
                </View>
        </View>
    )
}