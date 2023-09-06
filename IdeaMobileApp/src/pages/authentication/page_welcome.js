// IMPORT LIBRARIES
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuth } from "firebase/auth";
import firebase from "../../../config/firebase.js";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2 } from '../../components/buttons';

export default function WelcomeScreen({ navigation }) {

    useEffect(() => {
        checkIsLogged()
    }, [])

    const storeData = async (doc, id) => {
        try {
          const jsonDoc = JSON.stringify(doc);
          await AsyncStorage.setItem('userDoc', jsonDoc);
          await AsyncStorage.setItem('userID', id);
        } catch (e) {
          // saving error
        }
      };

    const checkIsLogged = async () => {
        const auth = getAuth();
        console.log(auth.currentUser)
        if (auth.currentUser !== null) {
            const firestore_user_doc = firebase.firestore().collection("users").doc(auth.currentUser.uid);
            const doc = await firestore_user_doc.get();
            console.log('User is logged in');
            storeData(doc.data(), auth.currentUser.uid)
            navigation.navigate("Tabbar")
        }
    }

    return (
        <SafeAreaProvider style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => {
                    navigation.navigate("Login")
                }}>
                <PrimaryButton_v1 text={"Efetuar login"} />
            </Pressable>
            <Pressable
                onPress={() => {
                    navigation.navigate("Register")
                }}>
                <PrimaryButton_v2 text={"Criar nova conta"} />
            </Pressable>
        </SafeAreaProvider>
    )
}