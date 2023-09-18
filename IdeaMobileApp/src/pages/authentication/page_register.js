// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, Modal, Image, ScrollView, Text, View, TextInput, Alert, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import firebase from "../../../config/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

// ? TO REMOVE BEFORE MAIN
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [department, setDepartment] = useState('')
    const [departmentName, setDepartmentName] = useState('')
    const [departments, setDepartments] = useState([])
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // *firebase store
    const firestore_users = firebase.firestore().collection("users");
    const firestore_departments = firebase.firestore().collection("departments");

    // * Function to store data in asyncStorage to persistence
    const storeData = async (id) => {
        try {
            await AsyncStorage.setItem('userID', id);
        } catch (e) {
            console.log(e.message)
        }
    };

    // *firebase authentication
    const auth = getAuth();

    // *function to save user in authentication store and save user data in collection users 
    const handleSignUp = () => {
        let currentDate = new Date()
        createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
            .then((userCredential) => {
                firestore_users.doc(userCredential.user.uid).set({
                    name: name,
                    email: email.trim().toLowerCase(),
                    uid: userCredential.user.uid,
                    department: department,
                    department_name: departmentName,
                    created: currentDate,
                    last_conection: currentDate,
                    points: 0,
                    active_categories: { 'air': 0, 'water': 0, 'energy': 0, 'recycle': 0, 'movement': 0 },
                    points_categories: { 'air': 0, 'water': 0, 'energy': 0, 'recycle': 0, 'movement': 0 },
                    memorized_answers: { 'air' : [], 'energy': [], 'movement': [], 'recycle': [], 'water': []},
                    admin: false,
                    authorized: false,
                });

                console.log(userCredential.user)
                storeData(userCredential.user.uid)
                setLoading(false)
                navigation.navigate("Configuration")
            })
            .catch((error) => {
                // Alert.alert("Erro", error.message);
                Alert.alert("Erro", "Impossível registar utilizador.");
                setLoading(false)
            });
    };

    // *function to verify if user filled out all fields first before sign up
    const checkData = () => {
        if (name.length === 0 || department.length === 0 || password.length === 0 || passwordConfirm.length === 0 || email.length === 0) {
            Alert.alert("Erro", "Preencha todos os campos.");
            setLoading(false)
            return null;
        }
        if (password !== passwordConfirm) {
            Alert.alert("Erro", "As palavras-passe devem ser iguais.");
            setLoading(false)
            return null;
        }
        handleSignUp();
    }

    const getDepartmentsFromFirebase = async () => {
        firestore_departments.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return ({ label: doc.data().description, value: doc.id })
                // return { id: doc.id, ...doc.data() }
            })
            setDepartments(tempDoc)
            // return (tempDoc)
        })
    }

    useEffect(() => {
        (getDepartmentsFromFirebase())
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
    }, [visible])

    return (
        <SafeAreaProvider style={[styles.mainContainer, { paddingBottom: 0 }]}>
            <StatusBar style={"dark"} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    setLoading(!loading);
                }}>
                <View style={styles.centeredView}>
                    <View style={{ bottom: CONST.screenHeight / 2, zIndex: 1000, left: CONST.screenWidth / 2.5, position: 'absolute' }}>
                        <Image source={require('../../assets/images/loading_bolt_blue.gif')} resizeMode="contain" style={{ tintColor: 'white', height: 80, width: 80 }} />
                    </View>
                </View>
            </Modal>
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
                    <View style={{ flexDirection: 'column', marginBottom: open ? 220 : 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <DropDownPicker
                                open={open}
                                value={department}
                                items={departments}
                                setOpen={setOpen}
                                setValue={setDepartment}
                                setItems={setDepartments}
                                style={styles.inputField}
                                dropDownContainerStyle={[styles.inputField, { height: 200 }]}
                                textStyle={[styles.normalText, { fontFamily: 'K2D-Regular', marginBottom: 0 }]}
                                maxHeight={200}
                                placeholder="Departamento"
                                placeholderStyle={{ color: CONST.neutralGray }}
                                theme="LIGHT"
                                closeOnBackPressed={true}
                                onSelectItem={(item) => {setDepartmentName(item.label)}}
                                listMode="SCROLLVIEW"
                                zIndex={10000}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[styles.inputField, { width: '100%' }]}
                                value={password}
                                onChangeText={(text) => { setPassword(text) }}
                                placeholder={'Palavra-passe (Min. 6 caracteres)'}
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
                        onValueChange={() => {
                            setChecked(!isChecked)
                            if (!isChecked) {
                                setVisible(false)
                            }
                        }}
                        color={isChecked ? CONST.mainGray : undefined}
                        onChange={() => {
                            setChecked(!isChecked)
                        }}
                    />
                    <Text style={[styles.normalText, { marginBottom: 0, paddingLeft: CONST.labelPaddingLateral }]}>Declaro que li e concordo com os termos de utilização.</Text>
                </View>
                {visible ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: CONST.layoutPaddingLateral, marginRight: CONST.layoutPaddingLateral, marginTop: CONST.boxCardMargin }}>
                        <Text style={[styles.subText, { color: CONST.mainRed }]}>Para criar conta na aplicação IDEA precisa de ler e concordar com os termos de utilização.</Text>
                    </View>
                    :
                    <></>}
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
                            setLoading(true)
                            isChecked ?
                                checkData()
                                :
                                setVisible(true)
                        }}
                        style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v1 text={"Continuar"} />
                    </Pressable>
                </View>
            </ScrollView>

        </SafeAreaProvider>
    )
}