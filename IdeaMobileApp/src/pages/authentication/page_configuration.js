// IMPORT LIBRARIES
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal } from "react-native";
import { useEffect, useState } from "react";
import { BackHandler } from 'react-native';
import firebase from "../../../config/firebase.js";

// IMPORT COMPONENTS
import { AirIcon, RecycleIcon, WaterIcon, EnergyIcon, MovementIcon } from "../../components/icons.js";
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";
import { AirLabel, EnergyLabel, MovementLabel, RecycleLabel, WaterLabel } from "../../components/labels.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function ConfigurationScreen({ route, navigation }) {
    const { userID } = route.params;
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

    // * prevent user back to register page, the user is already registered and we don't want double the account
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
    }, [textToast, airCategory, energyCategory, movementCategory, recycleCategory, waterCategory, areaToShow, colorAir, colorEnergy, colorWater, colorRecycle, colorMovement])

    // * update field "active_categories" from userID document
    const updateUserCollection = () => {
        const firestore_user_doc = firebase.firestore().collection("users").doc(userID);

        firestore_user_doc.update({
            active_categories: {
                'air': colorAir,
                'water': colorWater,
                'energy': colorEnergy,
                'recycle': colorRecycle,
                'movement': colorMovement,
            }
        });

        navigation.navigate("Category", {
            "userID": userID,
            "categories": [airCategory, energyCategory, movementCategory, recycleCategory, waterCategory],
            "categoriesColors": [colorAir, colorEnergy, colorMovement, colorRecycle, colorWater],
            "colorToShow": airCategory ? colorAir : energyCategory ? colorEnergy : movementCategory ? colorMovement : recycleCategory ? colorRecycle : waterCategory ? colorWater : CONST.secondaryGray,
            "toShow": airCategory ? "air" : energyCategory ? "energy" : movementCategory ? "movement" : recycleCategory ? "recycle" : waterCategory ? "water" : "none"
        })
    }

    const activateCategory = (category) => {
        switch (category) {
            case "air":
                if (airCategory) {
                    setAirCategory(false)
                    setColorAir(0)
                    setTextToast('Categoria climatização desativada!')
                } else {
                    setAirCategory(true)
                    setColorAir(1)
                    setTextToast('Categoria climatização ativada!')
                }
                return
            case "water":
                if (waterCategory) {
                    setWaterCategory(false)
                    setColorWater(0)
                    setTextToast('Categoria recursos hídricos desativada!')
                } else {
                    setWaterCategory(true)
                    setColorWater(1)
                    setTextToast('Categoria recursos hídricos ativada!')
                }
                return
            case "energy":
                if (energyCategory) {
                    setEnergyCategory(false)
                    setColorEnergy(0)
                    setTextToast('Categoria energia elétrica desativada!')
                } else {
                    setEnergyCategory(true)
                    setColorEnergy(1)
                    setTextToast('Categoria energia elétrica ativada!')
                }
                return
            case "movement":
                if (movementCategory) {
                    setMovementCategory(false)
                    setColorMovement(0)
                    setTextToast('Categoria mobilidade desativada!')
                } else {
                    setMovementCategory(true)
                    setColorMovement(1)
                    setTextToast('Categoria mobilidade ativada!')
                }
                return
            case "recycle":
                if (recycleCategory) {
                    setRecycleCategory(false)
                    setColorRecycle(0)
                    setTextToast('Categoria reciclagem desativada!')
                } else {
                    setRecycleCategory(true)
                    setColorRecycle(1)
                    setTextToast('Categoria reciclagem ativada!')
                }
                return
        }
    }

    return (
        <SafeAreaProvider style={[styles.mainContainer, { paddingBottom: CONST.layoutPaddingVertical }]}>
            <StatusBar style={"dark"} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {areaToShow == "air" ?
                            <><View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <Pressable onPress={() => setColorAir(1)}>
                                    <AirIcon color={colorAir == 1 || colorAir == 0 ? CONST.softPurple : CONST.secondaryGray} />
                                </Pressable>
                                <Pressable onPress={() => setColorAir(2)}>
                                    <AirIcon color={colorAir == 2 || colorAir == 0 ? CONST.purple : CONST.secondaryGray} />
                                </Pressable>
                                <Pressable onPress={() => setColorAir(3)}>
                                    <AirIcon color={colorAir == 3 || colorAir == 0 ? CONST.grayishPurple : CONST.secondaryGray} />
                                </Pressable>
                                <Pressable onPress={() => setColorAir(4)}>
                                    <AirIcon color={colorAir == 4 || colorAir == 0 ? CONST.darkPurple : CONST.secondaryGray} />
                                </Pressable>
                            </View>
                                <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: CONST.descriptionTextMargin, flexDirection: 'row' }}>
                                    <Text style={[styles.normalText, { marginBottom: 0 }]}>Categoria:  </Text>
                                    <AirLabel color={colorAir == 1 || colorAir == 0 ? CONST.softPurple :
                                        colorAir == 2 ? CONST.purple : colorAir == 3 ? CONST.grayishPurple : CONST.darkPurple} />
                                </View>
                            </>
                            : areaToShow == "energy" ?
                                <>
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <Pressable onPress={() => setColorEnergy(1)}>
                                            <EnergyIcon color={colorEnergy == 1 || colorEnergy == 0 ? CONST.softYellow : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => setColorEnergy(2)}>
                                            <EnergyIcon color={colorEnergy == 2 || colorEnergy == 0 ? CONST.yellow : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => setColorEnergy(3)}>
                                            <EnergyIcon color={colorEnergy == 3 || colorEnergy == 0 ? CONST.grayishYellow : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => setColorEnergy(4)}>
                                            <EnergyIcon color={colorEnergy == 4 || colorEnergy == 0 ? CONST.darkYellow : CONST.secondaryGray} />
                                        </Pressable>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: CONST.normalTextMargin, flexDirection: 'row' }}>
                                        <Text style={[styles.normalText, { marginBottom: 0 }]}>Categoria:  </Text>
                                        <EnergyLabel color={colorEnergy == 1 || colorEnergy == 0 ? CONST.softYellow :
                                            colorEnergy == 2 ? CONST.yellow : colorEnergy == 3 ? CONST.grayishYellow : CONST.darkYellow} />
                                    </View>
                                </>
                                : areaToShow == "movement" ?
                                    <><View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <Pressable onPress={() => setColorMovement(1)}>
                                            <MovementIcon color={colorMovement == 1 || colorMovement == 0 ? CONST.softPink : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => setColorMovement(2)}>
                                            <MovementIcon color={colorMovement == 2 || colorMovement == 0 ? CONST.pink : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => setColorMovement(3)}>
                                            <MovementIcon color={colorMovement == 3 || colorMovement == 0 ? CONST.grayishPink : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => setColorMovement(4)}>
                                            <MovementIcon color={colorMovement == 4 || colorMovement == 0 ? CONST.darkPink : CONST.secondaryGray} />
                                        </Pressable>
                                    </View>
                                        <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: CONST.normalTextMargin, flexDirection: 'row' }}>
                                            <Text style={[styles.normalText, { marginBottom: 0 }]}>Categoria:  </Text>
                                            <MovementLabel color={colorMovement == 1 || colorMovement == 0 ? CONST.softPink :
                                                colorMovement == 2 ? CONST.pink : colorMovement == 3 ? CONST.grayishPink : CONST.darkPink} />
                                        </View>
                                    </>
                                    : areaToShow == "recycle" ?
                                        <><View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <Pressable onPress={() => setColorRecycle(1)}>
                                                <RecycleIcon color={colorRecycle == 1 || colorRecycle == 0 ? CONST.softGreen : CONST.secondaryGray} />
                                            </Pressable>
                                            <Pressable onPress={() => setColorRecycle(2)}>
                                                <RecycleIcon color={colorRecycle == 2 || colorRecycle == 0 ? CONST.green : CONST.secondaryGray} />
                                            </Pressable>
                                            <Pressable onPress={() => setColorRecycle(3)}>
                                                <RecycleIcon color={colorRecycle == 3 || colorRecycle == 0 ? CONST.grayishGreen : CONST.secondaryGray} />
                                            </Pressable>
                                            <Pressable onPress={() => setColorRecycle(4)}>
                                                <RecycleIcon color={colorRecycle == 4 || colorRecycle == 0 ? CONST.darkGreen : CONST.secondaryGray} />
                                            </Pressable>
                                        </View>
                                            <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: CONST.normalTextMargin, flexDirection: 'row' }}>
                                                <Text style={[styles.normalText, { marginBottom: 0 }]}>Categoria:  </Text>
                                                <RecycleLabel color={colorRecycle == 1 || colorRecycle == 0 ? CONST.softGreen :
                                                    colorRecycle == 2 ? CONST.green : colorRecycle == 3 ? CONST.grayishGreen : CONST.darkGreen} />
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                                <Pressable onPress={() => setColorWater(1)}>
                                                    <WaterIcon color={colorWater == 1 || colorWater == 0 ? CONST.softBlue : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable onPress={() => setColorWater(2)}>
                                                    <WaterIcon color={colorWater == 2 || colorWater == 0 ? CONST.blue : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable onPress={() => setColorWater(3)}>
                                                    <WaterIcon color={colorWater == 3 || colorWater == 0 ? CONST.grayishBlue : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable onPress={() => setColorWater(4)}>
                                                    <WaterIcon color={colorWater == 4 || colorWater == 0 ? CONST.darkBlue : CONST.secondaryGray} />
                                                </Pressable>
                                            </View>
                                            <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: CONST.normalTextMargin, flexDirection: 'row' }}>
                                                <Text style={[styles.normalText, { marginBottom: 0 }]}>Categoria:  </Text>
                                                <WaterLabel color={colorWater == 1 || colorWater == 0 ? CONST.softBlue :
                                                    colorWater == 2 ? CONST.blue : colorWater == 3 ? CONST.grayishBlue : CONST.darkBlue} />
                                            </View>
                                        </>
                        }
                        <Pressable
                            style={{ marginTop: CONST.titlePageMargin }}
                            onPress={() => setModalVisible(!modalVisible)} >
                            <PrimaryButton_v1 text={"Guardar alterações"} />
                        </Pressable>
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
                        Para tal, clica no ícone das áreas que queres. {"\n"}
                        Através de um clique prolongado, podes ainda alterar o tom da área.
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable
                            onLongPress={() => {
                                setAreaToShow("air")
                                setModalVisible(true)
                                setAirCategory(true)
                            }}
                            onPress={() => activateCategory("air")}>
                            <AirIcon color={airCategory ? ((colorAir == 0 || colorAir == 1) ? CONST.softPurple :
                                colorAir == 2 ? CONST.purple : colorAir == 3 ? CONST.grayishPurple : CONST.darkPurple)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onLongPress={() => {
                                setAreaToShow("energy")
                                setModalVisible(true)
                                setEnergyCategory(true)
                            }}
                            onPress={() => activateCategory("energy")}>
                            <EnergyIcon color={energyCategory ? ((colorEnergy == 0 || colorEnergy == 1) ? CONST.softYellow :
                                colorEnergy == 2 ? CONST.yellow : colorEnergy == 3 ? CONST.grayishYellow : CONST.darkYellow)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onLongPress={() => {
                                setAreaToShow("movement")
                                setModalVisible(true)
                                setMovementCategory(true)
                            }}
                            onPress={() => { activateCategory("movement") }}>
                            <MovementIcon color={movementCategory ? ((colorMovement == 0 || colorMovement == 1) ? CONST.softPink :
                                colorMovement == 2 ? CONST.pink : colorMovement == 3 ? CONST.grayishPink : CONST.darkPink)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onLongPress={() => {
                                setAreaToShow("recycle")
                                setModalVisible(true)
                                setRecycleCategory(true)
                            }}
                            onPress={() => activateCategory("recycle")}>
                            <RecycleIcon color={recycleCategory ? ((colorRecycle == 0 || colorRecycle == 1) ? CONST.softGreen :
                                colorRecycle == 2 ? CONST.green : colorRecycle == 3 ? CONST.grayishGreen : CONST.darkGreen)
                                : CONST.secondaryGray} />
                        </Pressable>
                        <Pressable
                            onLongPress={() => {
                                setAreaToShow("water")
                                setModalVisible(true)
                                setWaterCategory(true)
                            }}
                            onPress={() => activateCategory("water")}>
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
                        navigation.navigate("Tabbar", { 'userID': userID })
                    }}
                    style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v2 text={"Mais tarde"} />
                    {/* <PrimaryButton_v2 text={"\u0020\u0020Voltar\u0020\u0020"} /> */}
                </Pressable>
                <Pressable
                    onPress={() => {
                        {
                            (airCategory || energyCategory || movementCategory || recycleCategory || waterCategory) ?
                                updateUserCollection()
                                :
                                navigation.navigate("Tabbar", { 'userID': userID })
                        }

                    }}
                    style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v1 text={"\u0020Continuar\u0020"} />
                </Pressable>
            </View>
        </SafeAreaProvider>
    )
}