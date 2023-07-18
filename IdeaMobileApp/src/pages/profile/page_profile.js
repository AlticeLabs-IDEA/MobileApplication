//IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View, Modal, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Calendar, LocaleConfig } from "react-native-calendars";

// IMPORT COMPONENTS
import {
  AirLabel,
  EnergyLabel,
  MovementLabel,
  RecycleLabel,
  WaterLabel,
} from "../../components/labels.js";
import {
  PrimaryButton_v1,
  PrimaryButton_v2,
} from "../../components/buttons.js";
// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";

export default function Profile() {
  return (
    <SafeAreaProvider style={[styles.mainContainer]}>
      <StatusBar style={"dark"} />
      <View>
        <Text style={styles.indicatorTitle}>Perfil de José</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
          <View
            style={{
              flexDirection: "column",
              marginBottom: CONST.inputFieldMargin,
            }}
          >
            <Text
              style={[
                styles.normalText,
                { fontFamily: "K2D-SemiBold", marginBottom: 0 },
              ]}
            >
              Bem-vindo José Silva!
            </Text>
            <Text style={[styles.smalltext, { marginBottom: 0 }]}>
              Departamento de Recursos Humanos.
            </Text>
            <Text style={[styles.smalltext, { marginBottom: 0 }]}>
              Altice Labs
            </Text>
          </View>
        </View>
        <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
          <View
            style={{
              flexDirection: "column",
              marginBottom: CONST.inputFieldMargin,
            }}
          >
            <Text
              style={[
                styles.normalText,
                { fontFamily: "K2D-SemiBold", marginBottom: 0 },
              ]}
            >
              Editar Áreas Desafiadas
            </Text>
            <Text style={[styles.normalText, { marginBottom: 0 }]}>
            Escolhe as áreas para ser desafiado. Um clique prolongado permite definir o tom para essa área.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
