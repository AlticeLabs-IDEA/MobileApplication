//IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View, Modal, Image, Pressable, Alert, BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT COMPONENTS
import { AirIcon, RecycleIcon, WaterIcon, EnergyIcon, MovementIcon } from "../../components/icons.js";
import { AirLabel, EnergyLabel, MovementLabel, RecycleLabel, WaterLabel } from "../../components/labels.js";
import { PrimaryButton_v1 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";
import SettingsScreen from "./page_settings.js";

export default function Profile({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  //* vars to indicate which categories are active
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

  const [userName, setUserName] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const [userDep, setUserDep] = useState(null);
  const [userDepName, setUserDepName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userOrg, setUserOrg] = useState("Altice Labs"); // TODO: get from db

  const [userID, setUserID] = useState()
  const [userDOC, setUserDOC] = useState()

  const getDocumentInfo = async (doc) => {
    setUserFullName(doc.name)
    setUserName(doc.name.match(/\S+/)[0])
    setUserDep(doc.department)
    setUserDepName(doc.department_name)
    setUserEmail(doc.email)
    if (doc.active_categories.air !== 0) {
      setAirCategory(true)
    }
    if (doc.active_categories.water !== 0) {
      setWaterCategory(true)
    }
    if (doc.active_categories.energy !== 0) {
      setEnergyCategory(true)
    }
    if (doc.active_categories.movement !== 0) {
      setMovementCategory(true)
    }
    if (doc.active_categories.recycle !== 0) {
      setRecycleCategory(true)
    }
    setColorAir(doc.active_categories.air)
    setColorWater(doc.active_categories.water)
    setColorRecycle(doc.active_categories.recycle)
    setColorMovement(doc.active_categories.movement)
    setColorEnergy(doc.active_categories.energy)
    setLoading(false)
  }

  const storeData = async (doc) => {
    try {
      const jsonDoc = JSON.stringify(doc);
      await AsyncStorage.setItem('userDoc', jsonDoc);
    } catch (e) {
      console.log(e.message)
    }
  };

  const getData = async () => {
    try {
      const jsonDoc = await AsyncStorage.getItem('userDoc');
      const id = await AsyncStorage.getItem('userID');
      setUserDOC(jsonDoc != null ? JSON.parse(jsonDoc) : null);
      setUserID(id != null ? id : null)
      getDocumentInfo(JSON.parse(jsonDoc))
    } catch (e) {
      console.log(e.message)
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData()
    }, [userName, userDep, userEmail, userDepName])
  );


  useEffect(() => {
    getData()
  }, [userName, userDep, userDepName, userEmail])

  const activateCategory = async (category) => {
    const firestore_user_doc = firebase.firestore().collection("users").doc(userID);

    switch (category) {
      case "air":
        if (airCategory) {
          setAirCategory(false)
          setColorAir(0)
          firestore_user_doc.update({ 'active_categories.air': 0 })
          setTextToast('Categoria climatização desativada!')
        } else {
          setAirCategory(true)
          setColorAir(1)
          firestore_user_doc.update({ 'active_categories.air': 1 })
          setTextToast('Categoria climatização ativada!')
        }
        break
      case "water":
        if (waterCategory) {
          setWaterCategory(false)
          setColorWater(0)
          firestore_user_doc.update({ 'active_categories.water': 0 })
          setTextToast('Categoria recursos hídricos desativada!')
        } else {
          setWaterCategory(true)
          setColorWater(1)
          firestore_user_doc.update({ 'active_categories.water': 1 })
          setTextToast('Categoria recursos hídricos ativada!')
        }
        break
      case "energy":
        if (energyCategory) {
          setEnergyCategory(false)
          setColorEnergy(0)
          firestore_user_doc.update({ 'active_categories.energy': 0 })
          setTextToast('Categoria energia elétrica desativada!')
        } else {
          setEnergyCategory(true)
          setColorEnergy(1)
          firestore_user_doc.update({ 'active_categories.energy': 1 })
          setTextToast('Categoria energia elétrica ativada!')
        }
        break
      case "movement":
        if (movementCategory) {
          setMovementCategory(false)
          setColorMovement(0)
          firestore_user_doc.update({ 'active_categories.movement': 0 })
          setTextToast('Categoria mobilidade desativada!')
        } else {
          setMovementCategory(true)
          setColorMovement(1)
          firestore_user_doc.update({ 'active_categories.movement': 1 })
          setTextToast('Categoria mobilidade ativada!')
        }
        break
      case "recycle":
        if (recycleCategory) {
          setRecycleCategory(false)
          setColorRecycle(0)
          firestore_user_doc.update({ 'active_categories.recycle': 0 })
          setTextToast('Categoria reciclagem desativada!')
        } else {
          setRecycleCategory(true)
          setColorRecycle(1)
          firestore_user_doc.update({ 'active_categories.recycle': 1 })
          setTextToast('Categoria reciclagem ativada!')
        }
        break
    }

    const doc = await firestore_user_doc.get();
    storeData(doc.data())

  }

  const updateUserCollection = async (category, value) => {
    const firestore_user_doc = firebase.firestore().collection("users").doc(userID);

    switch (category) {
      case "air":
        firestore_user_doc.update({ 'active_categories.air': value })
        break
      case "water":
        firestore_user_doc.update({ 'active_categories.water': value })
        break
      case "energy":
        firestore_user_doc.update({ 'active_categories.energy': value })
        break
      case "movement":
        firestore_user_doc.update({ 'active_categories.movement': value })
        break
      case "recycle":
        firestore_user_doc.update({ 'active_categories.recycle': value })
        break
    }

    const doc = await firestore_user_doc.get();
    storeData(doc.data())
  }

  const auth = getAuth();

  const logoutUser = () => {
    signOut(auth).then(() => {
      navigation.navigate("Welcome")
    }).catch((error) => {
      Alert.alert("Erro", "Impossível realizar o logout do utilizador.");
    });
  }

  return (
    <SafeAreaProvider style={[styles.mainContainer]}>
      <StatusBar style={"dark"} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
        <View style={styles.centeredViewDarker}>
          <View style={{ bottom: CONST.screenHeight / 2, zIndex: 1000, left: CONST.screenWidth / 2.5, position: 'absolute' }}>
            <Image source={require('../../assets/images/loading_bolt_blue.gif')} resizeMode="contain" style={{ tintColor: 'white', height: 80, width: 80 }} />
          </View>
        </View>
      </Modal>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={[styles.indicatorTitle]}>Perfil de {userName}</Text>
        <Pressable onPress={() => logoutUser()}>
          <FontAwesome name="sign-out" size={CONST.heading6} color={CONST.mainGray} style={{ paddingRight: CONST.backgroundLateral }} />
        </Pressable>
      </View>
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
            <Pressable
              style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingBottom: CONST.titlePageMargin / 2 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome name="close" size={CONST.heading6} color={CONST.mainGray} />
            </Pressable>
            {areaToShow == "air" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable onPress={() => {
                    setColorAir(1)
                    updateUserCollection('air', 1)
                  }}>
                    <AirIcon
                      color={
                        colorAir == 1 || colorAir == 0
                          ? CONST.softPurple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorAir(2)
                    updateUserCollection('air', 2)
                  }}>
                    <AirIcon
                      color={
                        colorAir == 2 || colorAir == 0
                          ? CONST.purple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorAir(3)
                    updateUserCollection('air', 3)
                  }}>
                    <AirIcon
                      color={
                        colorAir == 3 || colorAir == 0
                          ? CONST.grayishPurple
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorAir(4)
                    updateUserCollection('air', 4)
                  }}>
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
                    marginTop: CONST.normalTextMargin * 3 / 2,
                    marginBottom: CONST.normalTextMargin,
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
                  <Pressable onPress={() => {
                    setColorEnergy(1)
                    updateUserCollection('energy', 1)
                  }}>
                    <EnergyIcon
                      color={
                        colorEnergy == 1 || colorEnergy == 0
                          ? CONST.softYellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorEnergy(2)
                    updateUserCollection('energy', 2)
                  }}>
                    <EnergyIcon
                      color={
                        colorEnergy == 2 || colorEnergy == 0
                          ? CONST.yellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorEnergy(3)
                    updateUserCollection('energy', 3)
                  }}>
                    <EnergyIcon
                      color={
                        colorEnergy == 3 || colorEnergy == 0
                          ? CONST.grayishYellow
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorEnergy(4)
                    updateUserCollection('energy', 4)
                  }}>
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
                    marginTop: CONST.normalTextMargin * 3 / 2,
                    marginBottom: CONST.normalTextMargin,
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
                  <Pressable onPress={() => {
                    setColorMovement(1)
                    updateUserCollection('movement', 1)
                  }}>
                    <MovementIcon
                      color={
                        colorMovement == 1 || colorMovement == 0
                          ? CONST.softPink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorMovement(2)
                    updateUserCollection('movement', 2)
                  }}>
                    <MovementIcon
                      color={
                        colorMovement == 2 || colorMovement == 0
                          ? CONST.pink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorMovement(3)
                    updateUserCollection('movement', 3)
                  }}>
                    <MovementIcon
                      color={
                        colorMovement == 3 || colorMovement == 0
                          ? CONST.grayishPink
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorMovement(4)
                    updateUserCollection('movement', 4)
                  }}>
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
                    marginTop: CONST.normalTextMargin * 3 / 2,
                    marginBottom: CONST.normalTextMargin,
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
                  <Pressable onPress={() => {
                    setColorRecycle(1)
                    updateUserCollection('recycle', 1)
                  }}>
                    <RecycleIcon
                      color={
                        colorRecycle == 1 || colorRecycle == 0
                          ? CONST.softGreen
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorRecycle(2)
                    updateUserCollection('recycle', 2)
                  }}>
                    <RecycleIcon
                      color={
                        colorRecycle == 2 || colorRecycle == 0
                          ? CONST.green
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorRecycle(3)
                    updateUserCollection('recycle', 3)
                  }}>
                    <RecycleIcon
                      color={
                        colorRecycle == 3 || colorRecycle == 0
                          ? CONST.grayishGreen
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorRecycle(4)
                    updateUserCollection('recycle', 4)
                  }}>
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
                    marginTop: CONST.normalTextMargin * 3 / 2,
                    marginBottom: CONST.normalTextMargin,
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
                  <Pressable onPress={() => {
                    setColorWater(1)
                    updateUserCollection('water', 1)
                  }}>
                    <WaterIcon
                      color={
                        colorWater == 1 || colorWater == 0
                          ? CONST.softBlue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorWater(2)
                    updateUserCollection('water', 2)
                  }}>
                    <WaterIcon
                      color={
                        colorWater == 2 || colorWater == 0
                          ? CONST.blue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorWater(3)
                    updateUserCollection('water', 3)
                  }}>
                    <WaterIcon
                      color={
                        colorWater == 3 || colorWater == 0
                          ? CONST.grayishBlue
                          : CONST.secondaryGray
                      }
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    setColorWater(4)
                    updateUserCollection('water', 4)
                  }}>
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
                    marginTop: CONST.normalTextMargin * 3 / 2,
                    marginBottom: CONST.normalTextMargin,
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
          </View>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin, flexDirection: 'column' }]}>
          <View style={{ marginBottom: CONST.boxCardMargin }}>
            <Text style={[styles.welcomeProfileText, { marginBottom: 0 }]}>
              Prazer em ver-te, {userName}!
            </Text>
            <Text style={[styles.subText, { marginBottom: 0 }]}>
              {userDepName}
            </Text>
            <Text style={[styles.subText, { marginBottom: 0 }]}>
              {userOrg}
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: CONST.neutralGray, marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin - CONST.inputPaddingLateral, marginLeft: CONST.boxPadding * 2, marginRight: CONST.boxPadding * 2 }}>
          </View>
          <View style={{ marginTop: CONST.boxCardMargin }}>
          <Pressable onPress={() => { navigation.navigate("Settings", { 'userID' : userID, 'editingData': 'userInfo', 'email': userEmail, 'name': userFullName, 'department': userDep, 'departmentName': userDepName }) }} style={[styles.sectionRedirect, { borderBottomColor: "#DDD", borderBottomWidth: 1 }]}>
            {/* <Pressable onPress={() => { <SettingsScreen userID= {userID} editingData='userInfo' email={userEmail} name={userFullName} department={userDep} /> }} style={[styles.sectionRedirect, { borderBottomColor: "#DDD", borderBottomWidth: 1 }]}> */}
              <Text style={[styles.normalText, { fontFamily: "K2D-SemiBold", marginBottom: 0 }]}>
                Editar dados pessoais
              </Text>
              <FontAwesome name="angle-right" size={CONST.heading6} color={CONST.mainGray} />
            </Pressable>
            <Pressable onPress={() => { navigation.navigate("Settings", { 'userID' : userID, 'editingData': 'userPassword', 'email': userEmail }) }} style={[styles.sectionRedirect, { borderBottomColor: "#DDD", borderBottomWidth: 1 }]}>
              <Text style={[styles.normalText, { fontFamily: "K2D-SemiBold", marginBottom: 0 }]}>
                Editar palavra passe
              </Text>
              <FontAwesome name="angle-right" size={CONST.heading6} color={CONST.mainGray} />
            </Pressable>
            <Pressable onPress={() => {
              navigation.navigate("Category", {
                "back" : 'profile',
                "userID": userID,
                "categories": [airCategory, energyCategory, movementCategory, recycleCategory, waterCategory],
                "categoriesColors": [colorAir, colorEnergy, colorMovement, colorRecycle, colorWater],
                "colorToShow": airCategory ? colorAir : energyCategory ? colorEnergy : movementCategory ? colorMovement : recycleCategory ? colorRecycle : waterCategory ? colorWater : CONST.secondaryGray,
                "toShow": airCategory ? "air" : energyCategory ? "energy" : movementCategory ? "movement" : recycleCategory ? "recycle" : waterCategory ? "water" : "none"
              })
            }} style={[styles.sectionRedirect, { paddingBottom: 0 }]}>
              <Text style={[styles.normalText, { fontFamily: "K2D-SemiBold", marginBottom: 0 }]}>
                Editar configuração inicial
              </Text>
              <FontAwesome name="angle-right" size={CONST.heading6} color={CONST.mainGray} />
            </Pressable>
          </View>
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.normalText}>
            <Text style={{ fontFamily: 'K2D-SemiBold' }}>Editar áreas desafiadas {"\n"}{"\n"}</Text>
            Nesta secção podes editar as áreas a que desejas ser desafiado! {"\n"}
            Para tal, clica prolongadamente no ícone das áreas que queres. 
            Através de um clique rápido, podes ainda alterar o tom da área.
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable
              onPress={() => {
                setAreaToShow("air")
                setModalVisible(true)
                setAirCategory(true)
              }}
              onLongPress={() => {
                activateCategory("air")
              }}>
              <AirIcon color={airCategory ? ((colorAir == 0 || colorAir == 1) ? CONST.softPurple :
                colorAir == 2 ? CONST.purple : colorAir == 3 ? CONST.grayishPurple : CONST.darkPurple)
                : CONST.secondaryGray} />
            </Pressable>
            <Pressable
              onPress={() => {
                setAreaToShow("energy")
                setModalVisible(true)
                setEnergyCategory(true)
              }}
              onLongPress={() => {
                activateCategory("energy")
              }}>
              <EnergyIcon color={energyCategory ? ((colorEnergy == 0 || colorEnergy == 1) ? CONST.softYellow :
                colorEnergy == 2 ? CONST.yellow : colorEnergy == 3 ? CONST.grayishYellow : CONST.darkYellow)
                : CONST.secondaryGray} />
            </Pressable>
            <Pressable
              onPress={() => {
                setAreaToShow("movement")
                setModalVisible(true)
                setMovementCategory(true)
              }}
              onLongPress={() => {
                activateCategory("movement")
              }}>
              <MovementIcon color={movementCategory ? ((colorMovement == 0 || colorMovement == 1) ? CONST.softPink :
                colorMovement == 2 ? CONST.pink : colorMovement == 3 ? CONST.grayishPink : CONST.darkPink)
                : CONST.secondaryGray} />
            </Pressable>
            <Pressable
              onPress={() => {
                setAreaToShow("recycle")
                setModalVisible(true)
                setRecycleCategory(true)
              }}
              onLongPress={() => {
                activateCategory("recycle")
              }}>
              <RecycleIcon color={recycleCategory ? ((colorRecycle == 0 || colorRecycle == 1) ? CONST.softGreen :
                colorRecycle == 2 ? CONST.green : colorRecycle == 3 ? CONST.grayishGreen : CONST.darkGreen)
                : CONST.secondaryGray} />
            </Pressable>
            <Pressable
              onPress={() => {
                setAreaToShow("water")
                setModalVisible(true)
                setWaterCategory(true)
              }}
              onLongPress={() => {
                activateCategory("water")
              }}>
              <WaterIcon color={waterCategory ? ((colorWater == 0 || colorWater == 1) ? CONST.softBlue :
                colorWater == 2 ? CONST.blue : colorWater == 3 ? CONST.grayishBlue : CONST.darkBlue)
                : CONST.secondaryGray} />
            </Pressable>
          </View>
        </View>
        <Text style={styles.toastText}>
          {textToast}
        </Text>

      </ScrollView>
    </SafeAreaProvider>
  );
}
