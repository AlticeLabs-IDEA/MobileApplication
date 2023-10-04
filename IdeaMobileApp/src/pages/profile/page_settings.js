// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, TextInput, Alert, Modal } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, updateEmail, deleteUser, updatePassword } from "firebase/auth";
import DropDownPicker from 'react-native-dropdown-picker';

// IMPORT COMPONENTS
import {
  PrimaryButton_v1,
  PrimaryButton_v2,
  SecondaryButton_v1,
  SecondaryButton_v2,
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
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState('')

  const storeData = async (doc) => {
    try {
      const jsonDoc = JSON.stringify(doc);
      await AsyncStorage.setItem('userDoc', jsonDoc);
    } catch (e) {
      console.log(e.message)
    }
  };

  const getDepartmentsFromFirebase = async () => {
    const firestore_departments = firebase.firestore().collection("departments");
    firestore_departments.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return ({ label: doc.data().description, value: doc.id })
        // return { id: doc.id, ...doc.data() }
      })
      setDepartments(tempDoc)
      // return (tempDoc)
    })
  }

  // * Function to update the info saved in the firestore
  const submitUpdates = async () => {
    const firestore_user_doc = firebase.firestore().collection("users").doc(userID);
    const auth = getAuth();

    if (editingData === 'userInfo') {
      firestore_user_doc.update({
        'name': name,
        'department': department,
        'department_name': departmentName,
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
    if (password.length < 6) {
      Alert.alert("Erro", "A nova palavra-passe deve ter, no mínimo, 6 caracteres.")
      return false
    }
    return true
  }

  // Run the function whenever the infoType prop changes
  useEffect(() => {
    if (editingData === 'userInfo') {
      getDepartmentsFromFirebase()
      setOldEmail(route.params.email)
      setEmail(route.params.email)
      setOldDep(route.params.department)
      setName(route.params.name)
      setDepartment(route.params.department)
      setDepartmentName(route.params.departmentName)
    }

  }, []);

  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <StatusBar style={"dark"} />
      <View showsVerticalScrollIndicator={false}>
        <Text style={styles.indicatorTitle}>{editingData === "userInfo" ? "Editar dados pessoais" : "Editar palavra-passe"}</Text>
        <Text style={[styles.descriptionText]}>
          {editingData === "userInfo" ? "Nesta página podes alterar os teus dados pessoais.\nPara guardar as alterações, clica no botão Submeter após editares os campos que desejares.\nAlterações na secção Departamento estão dependentes de aprovação posterior." : "Nesta página podes alterar a tua palavra-passe.\nPara guardar as alterações, clica no botão Submeter após inserires a nova palavra-passe a respetiva confirmação."}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {editingData === "userInfo" ? (
          <>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'column', width: '100%' }}>
                    <Pressable
                      style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <FontAwesome name="close" size={CONST.heading6} color={CONST.mainGray} />
                    </Pressable>
                    <Text style={styles.normalText}>
                      Introduza o seu e-mail para concluir a ação.
                    </Text>
                    <TextInput
                      style={[styles.inputField]}
                      value={deleteAccount}
                      onChangeText={(text) => { setDeleteAccount(text) }}
                      placeholder={'E-mail'}
                      placeholderTextColor={CONST.neutralGray}
                    />
                  </View>
                  <Pressable
                    style={{ marginTop: CONST.inputFieldMargin }}
                    onPress={() => {
                      let auth = getAuth()
                      let email_user = auth.currentUser.email
                      if (email_user !== deleteAccount.trim().toLowerCase()) {
                        Alert.alert("Erro", "E-mail inválido.")
                      } else {
                        deleteUser(auth.currentUser).then(() => {
                          navigation.navigate("Welcome")
                        }).catch((error) => {
                          console.log(error.message)
                        });
                      }
                    }} >
                    <SecondaryButton_v1 text={"Apagar a conta"} color={CONST.mainRed} />
                  </Pressable>
                </View>
              </View>
            </Modal>
            <View style={[styles.cardBox, { marginBottom: 20 }]}>
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1, marginTop: 10 }]}>Nome</Text>
              <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                <TextInput
                  style={[styles.inputField, { width: '100%' }]}
                  value={name}
                  onChangeText={(text) => { setName(text) }}
                  placeholder={name}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
              <Text style={[styles.subText, { textAlign: 'left', paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1, marginTop: 10 }]}>E-mail</Text>
              <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                <TextInput
                  style={[styles.inputField, { width: '100%' }]}
                  value={email}
                  onChangeText={(text) => { setEmail(text) }}
                  placeholder={email}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
              <Text style={[styles.subText, { textAlign: 'left', marginTop: 10, paddingLeft: CONST.inputPaddingVertical, letterSpacing: 1 }]}>Departamento</Text>
              <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                <DropDownPicker
                  open={open}
                  value={department}
                  items={departments}
                  setOpen={setOpen}
                  setValue={setDepartment}
                  setItems={setDepartments}
                  style={styles.inputField}
                  dropDownContainerStyle={[styles.inputField, { height: 200, position: 'relative', top: -2, }]}
                  textStyle={[styles.normalText, { fontFamily: 'K2D-Regular', marginBottom: 0 }]}
                  maxHeight={200}
                  placeholder="Departamento"
                  placeholderStyle={{ color: CONST.neutralGray }}
                  theme="LIGHT"
                  closeOnBackPressed={true}
                  onSelectItem={(item) => { setDepartmentName(item.label) }}
                  listMode="SCROLLVIEW"
                  zIndex={10000}
                />
              </View>
            </View>
            <View style={[styles.cardBox, { marginBottom: 20 }]}>
              <Text style={styles.normalText}>
                <Text style={{ fontFamily: 'K2D-SemiBold' }}>Deseja apagar a sua conta? {"\n"}{"\n"}</Text>
                Esta ação é irreversível, não poderá recuperar os dados da sua conta após apagá-la.
              </Text>
              <Pressable onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <SecondaryButton_v2 text={"Apagar a conta"} color={CONST.mainRed} />
              </Pressable>
            </View>
          </>
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
