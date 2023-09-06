// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Image, Text, Modal, View, TextInput, Alert, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import firebase from "../../../config/firebase.js";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    // * Loading icon/gif showed when loading is true
    const [loading, setLoading] = useState(false);

    // * Function to store data in asyncStorage to persistence
    const storeData = async (doc, id) => {
        try {
          const jsonDoc = JSON.stringify(doc);
          await AsyncStorage.setItem('userDoc', jsonDoc);
          await AsyncStorage.setItem('userID', id);
        } catch (e) {
          console.log(e.message)
        }
      };

    // * function to see if email and password belong to a valid user
    const loginUser = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
        .then(async (userCredential) => {
            // Signed in 
            const firestore_user_doc = firebase.firestore().collection("users").doc(userCredential.user.uid);
            const doc = await firestore_user_doc.get();
            storeData(doc.data(), userCredential.user.uid)
            navigation.navigate("Tabbar")
        })
        .catch((error) => {
            Alert.alert("Erro", "Credenciais inválidas.");
            // Alert.alert("Erro", error);
            setLoading(false)
        });
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <View style={[styles.mainContainer,{height: CONST.screenHeight + CONST.layoutPaddingVertical/2, paddingBottom: CONST.layoutPaddingVertical}]}>
            <StatusBar style={"dark"} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    setLoading(!loading);
                }}>
            <View style={styles.centeredView}>
                <View style={{bottom: CONST.screenHeight/2, zIndex: 1000, left: CONST.screenWidth/2.5, position: 'absolute' }}>
                    <Image source={require('../../assets/images/loading_bolt_blue.gif')} resizeMode="contain" style={{ tintColor: 'white' ,height: 80, width: 80  }} />
                </View>
            </View>
            </Modal>
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
                            setLoading(true)
                            loginUser()
                        }}
                        style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                        <PrimaryButton_v1 text={"Entrar"} />
                    </Pressable>
                </View>
        </View>
    )
}