import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AirLabel, EnergyLabel, MovementLabel, RecycleLabel, WaterLabel } from "../../components/labels.js";

import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";
import { AddButton } from "../../components/buttons.js";

export default function Records({ navigation}) {
  //const { category, activeCategories } = route.params;
  //console.log(activeCategories.length)
  const [colors, setColors]= useState ([CONST.purple, CONST.yellow, CONST.pink, CONST.green, CONST.blue])

  //const pickDate = new Date();

  return (
    <SafeAreaProvider style={[styles.mainContainer]}>
      <StatusBar style={"dark"} />
      <View>
        <Text style={styles.indicatorTitle}>Histórico de Atividades</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.descriptionText}>
          Aqui podes visualizar o histórico dos teus comportamentos
          sustentáveis!
        </Text>
        <View style={styles.cardBox}>
          <View
            style={{
              flexDirection: "column",
              marginBottom: CONST.inputFieldMargin,
            }}
          >
            <Text
              style={[
                styles.normalText,
                { marginBottom: 0, textAlign: "left" },
              ]}
            >
              Para editar ou remover uma atividade basta pressionar
              continuamente alguns segundos.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderColor: "#DDD",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              width: "100%",
            }}
          >
            <View>
              <Text
                style={[
                  styles.normalText,
                  { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                ]}
              >
                Escolhe o dia a ser apresentado.{" "}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  styles.normalText,
                  { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                ]}
              >
                14/07
              </Text>
              <FontAwesome5
                name="calendar-alt"
                size={CONST.heading5}
                color={CONST.mainGray}
              />
            </View>
          </View>
        </View>
        <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
          <View>
            <View style={{ flexDirection: 'row'}}>
              <AirLabel color={colors[0]} />
            </View>
            <View>
            <Text
                style={[
                  styles.normalText,
                  { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                ]}
              >
              O  ar condicionado esteve ligado?
              </Text>
              <Text
                style={[
                  styles.normalText,
                  { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                ]}
              >
              Nunca.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
          <View>
            <View style={{ flexDirection: 'row'}}>
              <EnergyLabel color={colors[1]} />
            </View>
            <View>
            <Text
                style={[
                  styles.normalText,
                  { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                ]}
              >
              As luzes estiveram desligadas?
              </Text>
              <Text
                style={[
                  styles.normalText,
                  { fontFamily: 'K2D-SemiBold', marginBottom: 0},
                ]}
              >
              Sempre.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
          <View>
            <View style={{ flexDirection: 'row'}}>
              <MovementLabel color={colors[2]} />
            </View>
            <View>
            <Text
                style={[
                  styles.normalText,
                  { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                ]}
              >
              A tua deslocação para o trabalho foi como?
              </Text>
              <Text
                style={[
                  styles.normalText,
                  { fontFamily: 'K2D-SemiBold', marginBottom: 0},
                ]}
              >
              Viatura Partilhada.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
