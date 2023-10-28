// IMPORT LIBRARIES
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal, Image } from "react-native";
import { useEffect, useState } from "react";
import { BackHandler } from 'react-native';
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


// IMPORT COMPONENTS
import { AirIcon, RecycleIcon, WaterIcon, EnergyIcon, MovementIcon } from "../../components/icons.js";
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";
import { AirLabel, EnergyLabel, MovementLabel, RecycleLabel, WaterLabel } from "../../components/labels.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function ConfigurationScreen({ navigation }) {
    const [userID, setUserID] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [airCategory, setAirCategory] = useState(false)
    const [energyCategory, setEnergyCategory] = useState(false)
    const [movementCategory, setMovementCategory] = useState(false)
    const [recycleCategory, setRecycleCategory] = useState(false)
    const [waterCategory, setWaterCategory] = useState(false)
    const [areaToShow, setAreaToShow] = useState("")
    const [colorAir, setColorAir] = useState(0)
    const [colorWater, setColorWater] = useState(0)
    const [colorEnergy, setColorEnergy] = useState(0)
    const [colorMovement, setColorMovement] = useState(0)
    const [colorRecycle, setColorRecycle] = useState(0)
    const [textToast, setTextToast] = useState("")
    const [loading, setLoading] = useState(true)
    const initial_questions= {"air": true, "devices": [], "distance": "min_range_1", "drink_water": true, "elevator": "min_range_1", "recycle": [], "windows": true}

    const storeData = async (doc) => {
        try {
            const jsonDoc = JSON.stringify(doc);
            console.log("doc----------------:", doc)
            await AsyncStorage.setItem('userDoc', jsonDoc);
        } 
        catch (e) {
            console.log(e.message)
        }
    };

    // * Function to get data in asyncStorage to persistence
    const getData = async () => {
        try {
            const id = await AsyncStorage.getItem('userID');
            setUserID(id != null ? id : null)
            console.log("its meeeeeeeeee-------------",id)
        } catch (e) {
            console.log(e.message)
        }
    };


    // * prevent user back to register page, the user is already registered and we don't want double the account
    useEffect(() => {
        getData()
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [textToast, airCategory, energyCategory, movementCategory, recycleCategory, waterCategory, areaToShow, colorAir, colorEnergy, colorWater, colorRecycle, colorMovement])

    // * update field "active_categories" from userID document
    // const updateUserCollection = async () => {
    //     const firestore_user_doc = firebase.firestore().collection("users").doc(userID);
    //     firestore_user_doc.update({
    //         active_categories: {
    //             'air': colorAir,
    //             'water': colorWater,
    //             'energy': colorEnergy,
    //             'recycle': colorRecycle,
    //             'movement': colorMovement,
    //         }
    //     });
    //     const doc = await firestore_user_doc.get();
    //     storeData(doc.data())
    // }

    const activateCategory = async (category) => {
        setLoading(true)
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
        setLoading(false)
    }

    const updateUserCollection = async (category, value) => {
        setLoading(true)
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
        setLoading(false)
    }

    const updateInitialQuetions = () => {
        const firestore_user_doc = firebase.firestore().collection("users").doc(userID);
        firestore_user_doc.update({
            "initial_questions" : initial_questions
        })
    }

    return (
        <SafeAreaProvider style={[styles.mainContainer, { paddingBottom: CONST.layoutPaddingVertical }]}>
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
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
                                    <Pressable onPress={() => {
                                        setColorAir(1)
                                        updateUserCollection('air', 1)
                                        setTextToast('Categoria cimatização ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria cimatização ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria cimatização ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria cimatização ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria energia elétrica ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria energia elétrica ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria energia elétrica ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria energia elétrica ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria mobilidade ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria mobilidade ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria mobilidade ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria mobilidade ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria reciclagem ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria reciclagem ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria reciclagem ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria reciclagem ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria recursos hídricos ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria recursos hídricos ativada!')
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria recursos hídricos ativada!')           
                                        setModalVisible(!modalVisible)
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
                                        setTextToast('Categoria recursos hídricos ativada!')
                                        setModalVisible(!modalVisible)
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
                        {/* <Pressable
                            style={{ marginTop: CONST.titlePageMargin }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }} >
                            <PrimaryButton_v1 text={"Guardar alterações"} />
                        </Pressable> */}
                    </View>
                </View>
            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.indicatorTitle}>
                    Configuração de perfil
                </Text>
                <Text style={styles.descriptionText}>
                    Vamos agora configurar o teu perfil. {"\n"}
                    Esta etapa permite-nos oferecer-te uma melhor experiência enquanto utilizas a aplicação IDEA, sendo essa a sua única finalidade.
                    {"\n"}Podes editar a tua configuração sempre que quiseres no teu perfil.
                    {"\n"}Este processo demora cerca de 2 a 3 minutos.
                </Text>
                <View style={styles.cardBox}>
                    <Text style={styles.normalText}>
                        O primeiro passo é escolheres as áreas a que desejas ser desafiado! {"\n"}
                        Para tal, clica prolongadamente no ícone das áreas que queres.
                        Através de um clique rápido, podes ainda alterar o tom da área.
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable
                            onPress={() => {
                                setAreaToShow("air")
                                updateUserCollection('air', 1)
                                setModalVisible(true)
                                setAirCategory(true)
                            }}
                            onLongPress={() => activateCategory("air")}>
                            <AirIcon color={airCategory ? ((colorAir == 0 || colorAir == 1) ? CONST.softPurple :
                                colorAir == 2 ? CONST.purple : colorAir == 3 ? CONST.grayishPurple : CONST.darkPurple)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                updateUserCollection('energy', 1)
                                setAreaToShow("energy")
                                setModalVisible(true)
                                setEnergyCategory(true)
                            }}
                            onLongPress={() => activateCategory("energy")}>
                            <EnergyIcon color={energyCategory ? ((colorEnergy == 0 || colorEnergy == 1) ? CONST.softYellow :
                                colorEnergy == 2 ? CONST.yellow : colorEnergy == 3 ? CONST.grayishYellow : CONST.darkYellow)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                updateUserCollection('movement', 1)
                                setAreaToShow("movement")
                                setModalVisible(true)
                                setMovementCategory(true)
                            }}
                            onLongPress={() => { activateCategory("movement") }}>
                            <MovementIcon color={movementCategory ? ((colorMovement == 0 || colorMovement == 1) ? CONST.softPink :
                                colorMovement == 2 ? CONST.pink : colorMovement == 3 ? CONST.grayishPink : CONST.darkPink)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                updateUserCollection('recycle', 1)
                                setAreaToShow("recycle")
                                setModalVisible(true)
                                setRecycleCategory(true)
                            }}
                            onLongPress={() => activateCategory("recycle")}>
                            <RecycleIcon color={recycleCategory ? ((colorRecycle == 0 || colorRecycle == 1) ? CONST.softGreen :
                                colorRecycle == 2 ? CONST.green : colorRecycle == 3 ? CONST.grayishGreen : CONST.darkGreen)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                updateUserCollection('water', 1)
                                setAreaToShow("water")
                                setModalVisible(true)
                                setWaterCategory(true)
                            }}
                            onLongPress={() => activateCategory("water")}>
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
            <View style={styles.doubleButtonsView}>
                <Pressable
                    onPress={() => {
                        updateInitialQuetions()
                        updateUserCollection()
                        navigation.navigate("Login")
                    }}
                    style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v2 text={"Mais tarde"} />
                </Pressable>
                <Pressable
                    onPress={() => {
                        updateInitialQuetions()
                        {
                            (airCategory || energyCategory || movementCategory || recycleCategory || waterCategory) ?
                                navigation.navigate("Category", {
                                    "userID": userID,
                                    "categories": [airCategory, energyCategory, movementCategory, recycleCategory, waterCategory],
                                    "categoriesColors": [colorAir, colorEnergy, colorMovement, colorRecycle, colorWater],
                                    "colorToShow": airCategory ? colorAir : energyCategory ? colorEnergy : movementCategory ? colorMovement : recycleCategory ? colorRecycle : waterCategory ? colorWater : CONST.secondaryGray,
                                    "toShow": airCategory ? "air" : energyCategory ? "energy" : movementCategory ? "movement" : recycleCategory ? "recycle" : waterCategory ? "water" : "none"
                                })
                                :

                                navigation.navigate("Login")
                        }

                    }}
                    style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v1 text={"\u0020Continuar\u0020"} />
                </Pressable>
            </View>
        </SafeAreaProvider>
    )
}