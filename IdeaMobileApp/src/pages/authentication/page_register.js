// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

// IMPORT COMPONENTS
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
    const [isChecked, setChecked] = useState(false);

    return (
        <SafeAreaProvider style={[styles.mainContainer, { paddingBottom: 0 }]}>
            <StatusBar style={"dark"} />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.indicatorTitle}>
                    Registo
                </Text>
            </ScrollView>

            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={[styles.descriptionText, { marginBottom: CONST.descriptionTextMargin }]}>
                    Bem-vindo à aplicação IDEA! {"\n"}Para criar uma nova conta precisamos que introduzas algumas informações sobre ti.{"\n"}
                    Preenche todos os campos com cuidado. {"\n"}Posteriormente, podes editar a informação que inserires sempre que quiseres no teu perfil.
                </Text>

                <View style={[styles.cardBox]}>

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
                    {/* <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={code}
                                onChangeText={(text) => { setCode(text) }}
                                placeholder={'Código'}
                                placeholderTextColor={CONST.neutralGray}
                            />
                        </View>
                    </View> */}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: CONST.layoutPaddingLateral, marginRight: CONST.layoutPaddingLateral, marginTop: CONST.boxCardMargin }}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? CONST.mainGray : undefined}
                        onChange={() => {setChecked(!isChecked)}}
                    />
                    <Text style={[styles.normalText, {marginBottom: 0, paddingLeft: CONST.labelPaddingLateral}]}>Declaro que li e concordo com os termos de utilização.</Text>
                </View>
                <View style={[styles.doubleButtonsView, { backgroundColor: CONST.lightWhite, marginTop: CONST.layoutPaddingVertical, marginBottom: CONST.layoutPaddingVertical }]}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Welcome")
                        }}
                        style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v2 text={"\u0020\u0020Voltar\u0020\u0020"} />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Configuration")
                        }}
                        style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v1 text={"Continuar"} />
                    </Pressable>
                </View>
            </ScrollView>

        </SafeAreaProvider>
    )
}