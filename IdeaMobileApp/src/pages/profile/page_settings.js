// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

// IMPORT COMPONENTS
import {
  PrimaryButton_v1,
  PrimaryButton_v2,
} from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";

export default function Settings({ route, navigation }) {
  const { editingData } = route.params;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


  // Run the function whenever the infoType prop changes
  useEffect(() => {
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
          </View>
        ) : (
          <View style={[styles.cardBox]}>
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
            navigation.navigate("Profile")
          }}
          style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
          <PrimaryButton_v1 text={"Submeter"} />
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}
