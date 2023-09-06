// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, TextInput, Alert } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, updateEmail, EmailAuthProvider, updatePassword } from "firebase/auth";


// IMPORT COMPONENTS
import {
  PrimaryButton_v1,
  PrimaryButton_v2,
} from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";

export default function SettingsScreen({ route, navigation }) {
  const { editingData, userID } = route.params;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [oldEmail, setOldEmail] = useState("")
  const [oldDep, setOldDep] = useState("")
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const storeData = async (doc) => {
    try {
      const jsonDoc = JSON.stringify(doc);
      await AsyncStorage.setItem('userDoc', jsonDoc);
    } catch (e) {
      console.log(e.message)
    }
  };

  // * Function to update the info saved in the firestore
  const submitUpdates = async () => {
    const firestore_user_doc = firebase.firestore().collection("users").doc(userID);
    const auth = getAuth();

    if (editingData === 'userInfo') {
      firestore_user_doc.update({
        'name': name,
        'department': department,
        'email': email
      })
      if (oldEmail !== email) {
        updateEmail(auth.currentUser, email).then(() => {
        }).catch((error) => {
          console.log(error.message)
        });
      }
      if (oldDep !== department) {
        firestore_user_doc.update({
          'authorized': false
        })
      }
    } else if (editingData === 'userPassword') {
      if (checkPassword()) {
        updatePassword(auth.currentUser, password).then(() => { 
        }).catch((error) => {
          console.log(error.message)
        });
      }
    }
    const doc = await firestore_user_doc.get();
    storeData(doc.data());
    navigation.navigate("Profile");

  }

  const checkPassword = () => {
    if (password !== passwordConfirm) {
      Alert.alert("Erro", "As palavras-passe não coincidem.")
      return false
    }
    if (password.length < 6 ) {
      Alert.alert("Erro", "A nova palavra-passe deve ter, no mínimo, 6 caracteres.")
      return false
    }
    return true
  }

  // Run the function whenever the infoType prop changes
  useEffect(() => {
    if (editingData === 'userInfo') {
      setOldEmail(route.params.email)
      setEmail(route.params.email)
      setOldDep(route.params.department)
      setName(route.params.name)
      setDepartment(route.params.department)
    } 

  }, []);

  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <StatusBar style={"dark"} />
      <View>
        <Text style={styles.indicatorTitle}>{editingData === "userInfo" ? "Editar dados pessoais" : "Editar palavra-passe"}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.descriptionText}>
          {editingData === "userInfo" ? "Nesta página podes alterar os teus dados pessoais.\nPara guardar as alterações, clica no botão Submeter após editares os campos que desejares.\nAlterações na secção Departamento estão dependentes de aprovação posterior." : "Nesta página podes alterar a tua palavra-passe.\nPara guardar as alterações, clica no botão Submeter após inserires a nova palavra-passe a respetiva confirmação."}
        </Text>
        {editingData === "userInfo" ? (
          <View style={[styles.cardBox]}>
            <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1 }]}>Nome</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={[styles.inputField, { width: '100%' }]}
                  value={name}
                  onChangeText={(text) => { setName(text) }}
                  placeholder={name}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1 }]}>E-mail</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={[styles.inputField, { width: '100%' }]}
                  value={email}
                  onChangeText={(text) => { setEmail(text) }}
                  placeholder={email}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1 }]}>Departamento</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={[styles.inputField, { width: '100%' }]}
                  value={department}
                  onChangeText={(text) => { setDepartment(text) }}
                  placeholder={department}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.cardBox]}>
            <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1 }]}>Nova palavra-passe</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputField, { width: '100%' }]}
                  value={password}
                  onChangeText={(text) => { setPassword(text) }}
                  placeholder={'Nova palavra-passe'}
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
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1 }]}>Confirmar nova palavra-passe</Text>
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
          </View>
        )}
      </ScrollView>
      <View style={[styles.doubleButtonsView, { backgroundColor: CONST.lightWhite, marginBottom: CONST.boxCardMargin }]}>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile")
          }}
          style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
          <PrimaryButton_v2 text={"Cancelar"} />
        </Pressable>
        <Pressable
          onPress={() => {
            submitUpdates()
          }}
          style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
          <PrimaryButton_v1 text={"Submeter"} />
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}
