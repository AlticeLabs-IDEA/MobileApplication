// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useState } from "react";
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
  console.log(editingData);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState("");

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

        <View style={[styles.cardBox]}>
          <View
            style={{ flexDirection: "column", marginBottom: 20, marginTop: 10 }}
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
            style={{ flexDirection: "column", marginBottom: 20, marginTop: 10 }}
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
            style={{ flexDirection: "column", marginBottom: 20, marginTop: 10 }}
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
              navigation.navigate("Configuration");
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
