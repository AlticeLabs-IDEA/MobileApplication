//IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View, Modal, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// IMPORT COMPONENTS

import {
  AirIcon,
  RecycleIcon,
  WaterIcon,
  EnergyIcon,
  MovementIcon,
} from "../../components/icons.js";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [airCategory, setAirCategory] = useState(false);
  const [energyCategory, setEnergyCategory] = useState(false);
  const [movementCategory, setMovementCategory] = useState(false);
  const [recycleCategory, setRecycleCategory] = useState(false);
  const [waterCategory, setWaterCategory] = useState(false);
  const [areaToShow, setAreaToShow] = useState("");
  const [colorAir, setColorAir] = useState(0);
  const [colorWater, setColorWater] = useState(0);
  const [colorEnergy, setColorEnergy] = useState(0);
  const [colorMovement, setColorMovement] = useState(0);
  const [colorRecycle, setColorRecycle] = useState(0);
  const [textToast, setTextToast] = useState("");

  useEffect(() => {}, [
    textToast,
    airCategory,
    energyCategory,
    movementCategory,
    recycleCategory,
    waterCategory,
    areaToShow,
    colorAir,
    colorEnergy,
    colorWater,
    colorRecycle,
    colorMovement,
  ]);

  const activateCategory = (category) => {
    switch (category) {
      case "air":
        if (airCategory) {
          setAirCategory(false);
          setTextToast("Categoria climatização desativada!");
          // ToastAndroid.show('Categoria climatização desativada!', ToastAndroid.SHORT);
        } else {
          setAirCategory(true);
          setTextToast("Categoria climatização ativada!");
          // ToastAndroid.show('Categoria climatização ativada!', ToastAndroid.SHORT);
        }
        return;
      case "water":
        if (waterCategory) {
          setWaterCategory(false);
          setTextToast("Categoria recursos hídricos desativada!");
          // ToastAndroid.show('Categoria recursos hídricos desativada!', ToastAndroid.SHORT);
        } else {
          setWaterCategory(true);
          setTextToast("Categoria recursos hídricos ativada!");
          // ToastAndroid.show('Categoria recursos hídricos ativada!', ToastAndroid.SHORT);
        }
        return;
      case "energy":
        if (energyCategory) {
          setEnergyCategory(false);
          setTextToast("Categoria energia elétrica desativada!");
          // ToastAndroid.show('Categoria energia elétrica desativada!', ToastAndroid.SHORT);
        } else {
          setEnergyCategory(true);
          setTextToast("Categoria energia elétrica ativada!");
          // ToastAndroid.show('Categoria energia elétrica ativada!', ToastAndroid.SHORT);
        }
        return;
      case "movement":
        if (movementCategory) {
          setMovementCategory(false);
          setTextToast("Categoria mobilidade desativada!");
          // ToastAndroid.show('Categoria mobilidade desativada!', ToastAndroid.SHORT);
        } else {
          setMovementCategory(true);
          setTextToast("Categoria mobilidade ativada!");
          // ToastAndroid.show('Categoria mobilidade ativada!', ToastAndroid.SHORT);
        }
        return;
      case "recycle":
        if (recycleCategory) {
          setRecycleCategory(false);
          setTextToast("Categoria reciclagem desativada!");
          // ToastAndroid.show('Categoria reciclagem desativada!', ToastAndroid.SHORT);
        } else {
          setRecycleCategory(true);
          setTextToast("Categoria reciclagem ativada!");
          // ToastAndroid.show('Categoria reciclagem ativada!', ToastAndroid.SHORT);
        }
        return;
    }
  };

  return (
    <SafeAreaProvider style={[styles.mainContainer]}>
      <StatusBar style={"dark"} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {areaToShow == "air" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable onPress={() => setColorAir(1)}>
                    <AirIcon
                      color={
                        colorAir == 1 || colorAir == 0
                          ? CONST.softPurple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorAir(2)}>
                    <AirIcon
                      color={
                        colorAir == 2 || colorAir == 0
                          ? CONST.purple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorAir(3)}>
                    <AirIcon
                      color={
                        colorAir == 3 || colorAir == 0
                          ? CONST.grayishPurple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorAir(4)}>
                    <AirIcon
                      color={
                        colorAir == 4 || colorAir == 0
                          ? CONST.darkPurple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    width: "100%",
                    marginTop: CONST.descriptionTextMargin,
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.normalText, { marginBottom: 0 }]}>
                    Categoria:{" "}
                  </Text>
                  <AirLabel
                    color={
                      colorAir == 1 || colorAir == 0
                        ? CONST.softPurple
                        : colorAir == 2
                        ? CONST.purple
                        : colorAir == 3
                        ? CONST.grayishPurple
                        : CONST.darkPurple
                    }
                  />
                </View>
              </>
            ) : areaToShow == "energy" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable onPress={() => setColorEnergy(1)}>
                    <EnergyIcon
                      color={
                        colorEnergy == 1 || colorEnergy == 0
                          ? CONST.softYellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorEnergy(2)}>
                    <EnergyIcon
                      color={
                        colorEnergy == 2 || colorEnergy == 0
                          ? CONST.yellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorEnergy(3)}>
                    <EnergyIcon
                      color={
                        colorEnergy == 3 || colorEnergy == 0
                          ? CONST.grayishYellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorEnergy(4)}>
                    <EnergyIcon
                      color={
                        colorEnergy == 4 || colorEnergy == 0
                          ? CONST.darkYellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    width: "100%",
                    marginTop: CONST.normalTextMargin,
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.normalText, { marginBottom: 0 }]}>
                    Categoria:{" "}
                  </Text>
                  <EnergyLabel
                    color={
                      colorEnergy == 1 || colorEnergy == 0
                        ? CONST.softYellow
                        : colorEnergy == 2
                        ? CONST.yellow
                        : colorEnergy == 3
                        ? CONST.grayishYellow
                        : CONST.darkYellow
                    }
                  />
                </View>
              </>
            ) : areaToShow == "movement" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable onPress={() => setColorMovement(1)}>
                    <MovementIcon
                      color={
                        colorMovement == 1 || colorMovement == 0
                          ? CONST.softPink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorMovement(2)}>
                    <MovementIcon
                      color={
                        colorMovement == 2 || colorMovement == 0
                          ? CONST.pink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorMovement(3)}>
                    <MovementIcon
                      color={
                        colorMovement == 3 || colorMovement == 0
                          ? CONST.grayishPink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorMovement(4)}>
                    <MovementIcon
                      color={
                        colorMovement == 4 || colorMovement == 0
                          ? CONST.darkPink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    width: "100%",
                    marginTop: CONST.normalTextMargin,
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.normalText, { marginBottom: 0 }]}>
                    Categoria:{" "}
                  </Text>
                  <MovementLabel
                    color={
                      colorMovement == 1 || colorMovement == 0
                        ? CONST.softPink
                        : colorMovement == 2
                        ? CONST.pink
                        : colorMovement == 3
                        ? CONST.grayishPink
                        : CONST.darkPink
                    }
                  />
                </View>
              </>
            ) : areaToShow == "recycle" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable onPress={() => setColorRecycle(1)}>
                    <RecycleIcon
                      color={
                        colorRecycle == 1 || colorRecycle == 0
                          ? CONST.softGreen
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorRecycle(2)}>
                    <RecycleIcon
                      color={
                        colorRecycle == 2 || colorRecycle == 0
                          ? CONST.green
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorRecycle(3)}>
                    <RecycleIcon
                      color={
                        colorRecycle == 3 || colorRecycle == 0
                          ? CONST.grayishGreen
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorRecycle(4)}>
                    <RecycleIcon
                      color={
                        colorRecycle == 4 || colorRecycle == 0
                          ? CONST.darkGreen
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    width: "100%",
                    marginTop: CONST.normalTextMargin,
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.normalText, { marginBottom: 0 }]}>
                    Categoria:{" "}
                  </Text>
                  <RecycleLabel
                    color={
                      colorRecycle == 1 || colorRecycle == 0
                        ? CONST.softGreen
                        : colorRecycle == 2
                        ? CONST.green
                        : colorRecycle == 3
                        ? CONST.grayishGreen
                        : CONST.darkGreen
                    }
                  />
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable onPress={() => setColorWater(1)}>
                    <WaterIcon
                      color={
                        colorWater == 1 || colorWater == 0
                          ? CONST.softBlue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorWater(2)}>
                    <WaterIcon
                      color={
                        colorWater == 2 || colorWater == 0
                          ? CONST.blue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorWater(3)}>
                    <WaterIcon
                      color={
                        colorWater == 3 || colorWater == 0
                          ? CONST.grayishBlue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => setColorWater(4)}>
                    <WaterIcon
                      color={
                        colorWater == 4 || colorWater == 0
                          ? CONST.darkBlue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    width: "100%",
                    marginTop: CONST.normalTextMargin,
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.normalText, { marginBottom: 0 }]}>
                    Categoria:{" "}
                  </Text>
                  <WaterLabel
                    color={
                      colorWater == 1 || colorWater == 0
                        ? CONST.softBlue
                        : colorWater == 2
                        ? CONST.blue
                        : colorWater == 3
                        ? CONST.grayishBlue
                        : CONST.darkBlue
                    }
                  />
                </View>
              </>
            )}
            <Pressable
              style={{ marginTop: CONST.titlePageMargin }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <PrimaryButton_v1 text={"Guardar alterações"} />
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.indicatorTitle}>Perfil de José</Text>
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
              Escolhe as áreas para ser desafiado. Um clique prolongado permite
              definir o tom para essa área.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              onLongPress={() => {
                setAreaToShow("air");
                setModalVisible(true);
                setAirCategory(true);
              }}
              onPress={() => activateCategory("air")}
            >
              <AirIcon
                color={
                  airCategory
                    ? colorAir == 0 || colorAir == 1
                      ? CONST.softPurple
                      : colorAir == 2
                      ? CONST.purple
                      : colorAir == 3
                      ? CONST.grayishPurple
                      : CONST.darkPurple
                    : CONST.secondaryGray
                }
              />
            </Pressable>
            <Pressable
              onLongPress={() => {
                setAreaToShow("energy");
                setModalVisible(true);
                setEnergyCategory(true);
              }}
              onPress={() => activateCategory("energy")}
            >
              <EnergyIcon
                color={
                  energyCategory
                    ? colorEnergy == 0 || colorEnergy == 1
                      ? CONST.softYellow
                      : colorEnergy == 2
                      ? CONST.yellow
                      : colorEnergy == 3
                      ? CONST.grayishYellow
                      : CONST.darkYellow
                    : CONST.secondaryGray
                }
              />
            </Pressable>
            <Pressable
              onLongPress={() => {
                setAreaToShow("movement");
                setModalVisible(true);
                setMovementCategory(true);
              }}
              onPress={() => {
                activateCategory("movement");
              }}
            >
              <MovementIcon
                color={
                  movementCategory
                    ? colorMovement == 0 || colorMovement == 1
                      ? CONST.softPink
                      : colorMovement == 2
                      ? CONST.pink
                      : colorMovement == 3
                      ? CONST.grayishPink
                      : CONST.darkPink
                    : CONST.secondaryGray
                }
              />
            </Pressable>
            <Pressable
              onLongPress={() => {
                setAreaToShow("recycle");
                setModalVisible(true);
                setRecycleCategory(true);
              }}
              onPress={() => activateCategory("recycle")}
            >
              <RecycleIcon
                color={
                  recycleCategory
                    ? colorRecycle == 0 || colorRecycle == 1
                      ? CONST.softGreen
                      : colorRecycle == 2
                      ? CONST.green
                      : colorRecycle == 3
                      ? CONST.grayishGreen
                      : CONST.darkGreen
                    : CONST.secondaryGray
                }
              />
            </Pressable>
            <Pressable
              onLongPress={() => {
                setAreaToShow("water");
                setModalVisible(true);
                setWaterCategory(true);
              }}
              onPress={() => activateCategory("water")}
            >
              <WaterIcon
                color={
                  waterCategory
                    ? colorWater == 0 || colorWater == 1
                      ? CONST.softBlue
                      : colorWater == 2
                      ? CONST.blue
                      : colorWater == 3
                      ? CONST.grayishBlue
                      : CONST.darkBlue
                    : CONST.secondaryGray
                }
              />
            </Pressable>
          </View>
        </View>
        <Text
          style={{
            marginBottom: CONST.boxCardMargin,
            marginTop: 0,
            alignSelf: "center",
          }}
        >
          {textToast}
        </Text>
        <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
        <Pressable style={{ flexDirection: "row", justifyContent: "space-between" }}>
               <Text
            style={[
              styles.normalText,
              { fontFamily: "K2D-SemiBold", marginBottom: 0 },
            ]}
          >
            Editar dados pessoais
          </Text> 
          <FontAwesome name="angle-right" size={CONST.heading6} color="black" />
            </Pressable>
            <Pressable style={{ flexDirection: "row", justifyContent: "space-between" }}>
               <Text
            style={[
              styles.normalText,
              { fontFamily: "K2D-SemiBold", marginBottom: 0 },
            ]}
          >
            Editar palabra passe
          </Text> 
          <FontAwesome name="angle-right" size={CONST.heading6} color="black" />
            </Pressable>
            <Pressable style={{ flexDirection: "row", justifyContent: "space-between" }}>
               <Text
            style={[
              styles.normalText,
              { fontFamily: "K2D-SemiBold", marginBottom: 0 },
            ]}
          >
            Apagar conta
          </Text> 
          <FontAwesome name="angle-right" size={CONST.heading6} color="black" style={[{fontFamily: "K2D-SemiBold"}]} />
            </Pressable>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
