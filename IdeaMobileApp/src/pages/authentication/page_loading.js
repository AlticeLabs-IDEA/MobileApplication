// IMPORT LIBRARIES
import { View, Image, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuth } from "firebase/auth";
import firebase from "../../../config/firebase.js";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2 } from '../../components/buttons.js';

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";

export default function LoadingScreen({ navigation }) {
   
    useEffect(() => {
        checkIsLogged()
    }, [])

    const storeData = async (doc, id) => {
        try {
            const jsonDoc = JSON.stringify(doc);
            await AsyncStorage.setItem('userDoc', jsonDoc);
            await AsyncStorage.setItem('userID', id);
        } catch (e) {
            console.log(error)
        }
    };

    const checkIsLogged = async () => {
        console.log("---------------------------------------->", firebase.auth())
        if (firebase.auth().currentUser !== null && firebase.auth().currentUser !== undefined) {
            const firestore_user_doc = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
            const doc = await firestore_user_doc.get();
            console.log('User is logged in');
            storeData(doc.data(), firebase.auth().currentUser.uid)
            navigation.navigate("Tabbar")
        }
        else {
            navigation.navigate("Welcome")
        }
    }

    return (
        <SafeAreaProvider style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground source={require('../../assets/images/background_image.png')} style={{ width: '100%', height: '100%' }} resizeMode="repeat">
                <View style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: '100%', height: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: CONST.navbarHeight }}>
                    <Image source={require('../../assets/images/black_logotipo.png')} resizeMode="contain" style={{ width: '40%' }} />
                </View>
            </ImageBackground>

        </SafeAreaProvider>


    )
}
