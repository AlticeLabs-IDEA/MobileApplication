// IMPORT LIBRARIES
import { Pressable, Image, StyleSheet, ImageBackground, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuth } from "firebase/auth";
import firebase from "../../../config/firebase.js";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2, SecondaryButton_v1 } from '../../components/buttons.js';

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";

export default function WelcomeScreen({ navigation }) {

    useEffect(() => {
    }, [])

    return (
        <SafeAreaProvider style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground source={require('../../assets/images/background_image.png')} style={{ width: '100%', height: '100%' }} resizeMode="repeat">
                <View style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: '100%', height: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: CONST.navbarHeight }}>
                    <Image source={require('../../assets/images/black_logotipo.png')} resizeMode="contain" style={{ width: '40%' }} />
                    <Text style={[styles.welcomeProfileText, { fontFamily: 'K2D-Regular', textShadowColor: CONST.pureWhite, textShadowRadius: 3, marginTop: 0 }]}>
                        Bem vinde à aplicação que coloca a sustentabilidade nas tuas mãos!
                    </Text>
                    <Pressable style={{ marginTop: CONST.layoutPaddingVertical * 2, flexDirection: 'row', justifyContent: 'center' }}
                        onPress={() => {
                            navigation.navigate("Onboarding")
                        }}>
                        <SecondaryButton_v1 color={CONST.mainGray} text={"Começar"} />
                    </Pressable>
                    <View style={{ position: 'absolute', bottom: CONST.navbarHeight / 4, zIndex: 1 }}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("Login")
                            }}>
                            <Text style={[styles.normalText, { textShadowColor: CONST.pureWhite, textShadowRadius: 3 }]}>Já tens uma conta? <Text style={{ fontFamily: 'K2D-SemiBold', textDecorationColor: CONST.mainGray, textDecorationLine: 'underline' }}>Faz login na app.</Text></Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>


        </SafeAreaProvider>


    )
}
