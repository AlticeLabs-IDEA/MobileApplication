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
  const [isChecked, setChecked] = useState(false);
  const [isChecked_2, setChecked_2] = useState(false);
  const [isChecked_3, setChecked_3] = useState(false);
  const [isChecked_4, setChecked_4] = useState(false);

  //const [indicator, setIndicator] = useState("");
  //const [text, setText] = useState("");

  return (
    <SafeAreaProvider style={[styles.mainContainer, { paddingBottom: 0 }]}>
      <StatusBar style={"dark"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.indicatorTitle}>Editar dados pessoais</Text>
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            styles.descriptionText,
            { marginBottom: CONST.descriptionTextMargin },
          ]}
        >
          Aqui podes alterar o teu nome, e-mail e o departamento a que fazes
          parte.
          {"\n"}
          Seleciona um campo para ser alterado e depois submete a tua alteração.
        </Text>
        {editingData.includes("userInfo") ? (
          <View style={[styles.cardBox]}>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  placeholder={"Nome"}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  placeholder={"E-mail"}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={department}
                  onChangeText={(text) => {
                    setDepartment(text);
                  }}
                  placeholder={"Departmento"}
                  placeholderTextColor={CONST.neutralGray}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}

        {editingData.includes("passWord") ? (
          <View style={[styles.cardBox]}>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  placeholder={"Palavra-passe atual"}
                  placeholderTextColor={CONST.neutralGray}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    right: 0,
                    padding: 18,
                    zIndex: 100,
                  }}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <FontAwesome
                      name="eye-slash"
                      size={18}
                      color={CONST.mainGray}
                    />
                  ) : (
                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />
                  )}
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  placeholder={"Nova palavra-passe"}
                  placeholderTextColor={CONST.neutralGray}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    right: 0,
                    padding: 18,
                    zIndex: 100,
                  }}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <FontAwesome
                      name="eye-slash"
                      size={18}
                      color={CONST.mainGray}
                    />
                  ) : (
                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />
                  )}
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={passwordConfirm}
                  onChangeText={(text) => {
                    setPasswordConfirm(text);
                  }}
                  placeholder={"Confirmação nova palavra-passe"}
                  placeholderTextColor={CONST.neutralGray}
                  secureTextEntry={!showPasswordConfirm}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    right: 0,
                    padding: 18,
                    zIndex: 100,
                  }}
                  onPress={() => {
                    setShowPasswordConfirm(!showPasswordConfirm);
                  }}
                >
                  {showPasswordConfirm ? (
                    <FontAwesome
                      name="eye-slash"
                      size={18}
                      color={CONST.mainGray}
                    />
                  ) : (
                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
        {editingData.includes("deleteCount") ? (
          <View style={[styles.cardBox]}>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginRight: CONST.layoutPaddingLateral,
                  marginTop: CONST.boxCardMargin,
                  marginBottom: 5,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? CONST.mainGray : undefined}
                  onChange={() => {
                    setChecked(!isChecked);
                  }}
                />
                <Text
                  style={[
                    styles.normalText,
                    { marginBottom: 0, paddingLeft: CONST.labelPaddingLateral },
                  ]}
                >
                  Não dou muito uso a plataforma
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: CONST.layoutPaddingLateral,
                  marginBottom: 5,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked_2}
                  color={isChecked ? CONST.mainGray : undefined}
                  onChange={() => {
                    setChecked_2(!isChecked);
                  }}
                />
                <Text
                  style={[
                    styles.normalText,
                    { marginBottom: 0, paddingLeft: CONST.labelPaddingLateral },
                  ]}
                >
                  Não me identifico com a plataforma
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: CONST.layoutPaddingLateral,
                  marginBottom: 5,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked_3}
                  color={isChecked ? CONST.mainGray : undefined}
                  onChange={() => {
                    setChecked_3(!isChecked);
                  }}
                />
                <Text
                  style={[
                    styles.normalText,
                    { marginBottom: 0, paddingLeft: CONST.labelPaddingLateral },
                  ]}
                >
                  Tenho receios de privacidade
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: CONST.layoutPaddingLateral,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked_4}
                  color={isChecked ? CONST.mainGray : undefined}
                  onChange={() => {
                    setChecked_4(!isChecked);
                  }}
                />
                <Text
                  style={[
                    styles.normalText,
                    { marginBottom: 0, paddingLeft: CONST.labelPaddingLateral },
                  ]}
                >
                  Outro
                </Text>
              </View>
            </View>
            <Text style={[styles.normalText, { marginBottom: 0 }]}>
              Para apagar a tua conta IDEA
            </Text>
            <Text
              style={[
                styles.normalText,
                { fontFamily: "K2D-SemiBold", marginBottom: 0 },
              ]}
            >
              Insere a tua palavra passe
            </Text>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[styles.inputField, { width: "100%" }]}
                  value={passwordConfirm}
                  onChangeText={(text) => {
                    setPasswordConfirm(text);
                  }}
                  placeholder={"Palavra-passe"}
                  placeholderTextColor={CONST.neutralGray}
                  secureTextEntry={!showPasswordConfirm}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    right: 0,
                    padding: 18,
                    zIndex: 100,
                  }}
                  onPress={() => {
                    setShowPasswordConfirm(!showPasswordConfirm);
                  }}
                >
                  {showPasswordConfirm ? (
                    <FontAwesome
                      name="eye-slash"
                      size={18}
                      color={CONST.mainGray}
                    />
                  ) : (
                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
        <View
          style={[
            styles.doubleButtonsView,
            {
              backgroundColor: CONST.lightWhite,
              marginTop: CONST.layoutPaddingVertical,
              marginBottom: CONST.layoutPaddingVertical,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{ right: "auto", left: CONST.layoutPaddingLateral }}
          >
            <PrimaryButton_v2 text={"\u0020\u0020Cancelar\u0020\u0020"} />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{ left: "auto", right: CONST.layoutPaddingLateral }}
          >
            <PrimaryButton_v1 text={"Submeter"} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
