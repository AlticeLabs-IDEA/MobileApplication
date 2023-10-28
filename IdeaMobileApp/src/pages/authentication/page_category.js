// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Svg, Path } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2, OptionButton_v1 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function CategoryScreen({ route, navigation }) {
    const { userID, back } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const { categories, categoriesColors, toShow, colorToShow } = route.params;
    const [category, setCategory] = useState("")
    const [colorCategory, setColorCategory] = useState()
    const [nextCategory, setNextCategory] = useState("")
    const [previousCategory, setPreviousCategory] = useState("")
    const [previousColor, setPreviousColor] = useState()
    const [nextColor, setNextColor] = useState()

    // * saber se o user utiliza o ar condicionado
    const [airQuestion1, setAirQuestion1] = useState(false)
    const [airAnswers1, setAirAnswers1] = useState([false, false, false, false])
    // * saber se o user pode abrir as janelas
    const [airQuestion2, setAirQuestion2] = useState(false)
    const [airAnswers2, setAirAnswers2] = useState([false, false, false])

    // * saber que equipamentos ele utiliza
    const [energyDevices, setEnergyDevices] = useState([])

    // * saber a distância do utilizador ao trabalho
    const [movementQuestion1, setMovementQuestion1] = useState('min_range_1')
    const [movementAnswers1, setMovementAnswers1] = useState([false, false, false, false])
    // * saber se o utilizador possui alguma condição que o limite de caminhar
    const [physicalCondition, setPhysicalCondition] = useState(false)
    const [movementAnswers2, setMovementAnswers2] = useState([false, false])
    // * saber a distância do rés do chão ao posto de trabalho do utilizador
    const [movementQuestion3, setMovementQuestion3] = useState('min_range_1')
    const [movementAnswers3, setMovementAnswers3] = useState([false, false])

    // * saber que tipo de separação ele pode fazer no local de trabalho
    const [recycleMaterials, setRecycleMaterials] = useState([])

    // * saber se o utilizador bebe água ou não
    const [waterQuestion1, setWaterQuestion1] = useState(false)
    const [waterAnswers1, setWaterAnswers1] = useState([false, false])

    const removeFromArray = (element, array) => {
        return (array.filter(item => item !== element));
    }

    const heightAnimated = useSharedValue(300);

    const AnimatedPath = Animated.createAnimatedComponent(Path);
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);

    const firstWaveProps = useAnimatedProps(() => {
        return {
            d: `
            M -50 ${heightAnimated.value / 10 * 9 - 10}
            Q ${CONST.screenWidth / 4} ${heightAnimated.value / 5 * 4 - 10} ${CONST.screenWidth / 2} ${heightAnimated.value / 5 * 4}
            Q ${CONST.screenWidth / 4 * 3 + 25} ${heightAnimated.value / 10 * 9} ${CONST.screenWidth + 50} ${heightAnimated.value / 10 * 7}
            T ${CONST.screenWidth} 0
            T 0 0
            Z
        `,
        };
    });

    const secondWaveProps = useAnimatedProps(() => {
        return {
            d: `
                M 0 ${heightAnimated.value / 10 * 7.5}
                Q ${CONST.screenWidth / 4} ${heightAnimated.value / 10 * 9 + 10} ${CONST.screenWidth / 2} ${heightAnimated.value / 5 * 4}
                Q ${CONST.screenWidth / 4 * 3} ${heightAnimated.value / 5 * 3} ${CONST.screenWidth + 10} ${heightAnimated.value / 10 * 8}
                T ${CONST.screenWidth} 0
                T 0 0
                Z
            `,
        };
    });

    const findNext = (nowIndex, all) => {
        const nextTrueIndex = all.findIndex((value, index) => index > nowIndex && value === true);
        if (nextTrueIndex !== -1) {
            console.log("Index of next true:", nextTrueIndex);
            if (nextTrueIndex == 1) {
                setNextColor(categoriesColors[1])
                return "energy"
            }
            if (nextTrueIndex == 2) {
                setNextColor(categoriesColors[2])
                return "movement"
            }
            if (nextTrueIndex == 3) {
                setNextColor(categoriesColors[3])
                return "recycle"
            }
            setNextColor(categoriesColors[4])
            return "water"
        } else {
            console.log("No more true values after the first occurrence.");
            return "None"
        }
    }

    const findPrevious = (nowIndex, all) => {
        const previousTrueIndex = all.slice(0, nowIndex).lastIndexOf(true);
        if (previousTrueIndex !== -1) {
            console.log("Index of previous true:", previousTrueIndex);
            if (previousTrueIndex === 1) {
                setPreviousColor(categoriesColors[1]);
                return "energy";
            }
            if (previousTrueIndex === 2) {
                setPreviousColor(categoriesColors[2]);
                return "movement";
            }
            if (previousTrueIndex === 3) {
                setPreviousColor(categoriesColors[3]);
                return "recycle";
            }
            setPreviousColor(categoriesColors[0]);
            return "air";
        } else {
            console.log("No previous true values before the current index.");
            return "None";
        }
    }

    const previousToShow = (now, all) => {
        switch (now) {
            case "air":
                return findPrevious(0, all)
            case "energy":
                return findPrevious(1, all)
            case "movement":
                return findPrevious(2, all)
            case "recycle":
                return findPrevious(3, all)
            case "water":
                return findPrevious(4, all)
        }
    }

    const nextToShow = (now, all) => {
        switch (now) {
            case "air":
                return findNext(0, all)
            case "energy":
                return findNext(1, all)
            case "movement":
                return findNext(2, all)
            case "recycle":
                return findNext(3, all)
            case "water":
                return findNext(4, all)
        }
    }

    const whichColor = (color, category) => {
        switch (category) {
            case "air":
                switch (color) {
                    case 2:
                        return CONST.purple
                    case 3:
                        return CONST.grayishPurple
                    case 4:
                        return CONST.darkPurple
                    default:
                        return CONST.softPurple
                }
            case "energy":
                switch (color) {
                    case 2:
                        return CONST.yellow
                    case 3:
                        return CONST.grayishYellow
                    case 4:
                        return CONST.darkYellow
                    default:
                        return CONST.softYellow
                }
            case "movement":
                switch (color) {
                    case 2:
                        return CONST.pink
                    case 3:
                        return CONST.grayishPink
                    case 4:
                        return CONST.darkPink
                    default:
                        return CONST.softPink
                }
            case "recycle":
                switch (color) {
                    case 2:
                        return CONST.green
                    case 3:
                        return CONST.grayishGreen
                    case 4:
                        return CONST.darkGreen
                    default:
                        return CONST.softGreen
                }
            case "water":
                switch (color) {
                    case 2:
                        return CONST.blue
                    case 3:
                        return CONST.grayishBlue
                    case 4:
                        return CONST.darkBlue
                    default:
                        return CONST.softBlue
                }
            default:
                return CONST.secondaryGray
        }
    }

    const whichCategory = (value) => {
        switch (value) {
            case "air":
                return ("Climatização");
            case "water":
                return ("Recursos Hídricos");
            case "energy":
                return ("Energia elétrica");
            case "movement":
                return ("Mobilidade");
            case "recycle":
                return ("Reciclagem");
            default:
                return ("")
        }
    }

    const getCurrentDate = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const storeData = async () => {
        if (back==='profile') {
            const firestore_user_doc = firebase.firestore().collection("users").doc(userID);
            const doc = await firestore_user_doc.get();
            const userDoc = doc.data()
            userDoc.initial_questions = {
                'air': airQuestion1,
                'windows': airQuestion2, 
                'drink_water': waterQuestion1,
                'devices': energyDevices,
                'distance': movementQuestion1,
                'elevator': movementQuestion3,
                'recycle': recycleMaterials,

            }
            try {
                const jsonDoc = JSON.stringify(userDoc);
                await AsyncStorage.setItem('userDoc', jsonDoc);
                await AsyncStorage.removeItem(getCurrentDate())
              } catch (e) {
                console.log(e.message)
              }
        } else {
            
        }
        navigation.navigate(back==='profile' ? "Tabbar" : "Login", { 'userID': userID, 'firstTime': back==='profile' ? false : true })

      };
    

    const submitAnswers = (value) => {
        const firestore_user_doc = firebase.firestore().collection("users").doc(userID);
        switch (value) {
            case "air":
                if (airAnswers1.includes(true) && (airAnswers2.includes(true) || !airQuestion1)) {
                    firestore_user_doc.update({
                        'initial_questions.air': airQuestion1,
                        'initial_questions.windows': airQuestion2,
                    });
                    if (!airQuestion1) {
                        firestore_user_doc.update({
                            'active_categories.air': 0
                        });
                    }
                    setModalVisible(true)
                    return true
                }
                Alert.alert("Erro", "Responda a todas as perguntas.");
                return false
            case "water":
                if (waterAnswers1.includes(true)) {
                    firestore_user_doc.update({
                        'initial_questions.drink_water': waterQuestion1,
                    });
                    setModalVisible(true)
                    return true
                }
                Alert.alert("Erro", "Responda a todas as perguntas.");
                return false;
            case "energy":
                firestore_user_doc.update({
                    'initial_questions.devices': energyDevices,
                });
                if (energyDevices.length === 0) {
                    firestore_user_doc.update({
                        'active_categories.energy': 0
                    });
                }
                setModalVisible(true)
                return true
            case "movement":
                if (movementAnswers1.includes(true) && movementAnswers2.includes(true) && movementAnswers3.includes(true)) {
                    // ? se ele tem alguma condição física que o limita de caminhar, o range não vai ser 3 - 2 - 1 e sim 3 - 2
                    if (physicalCondition) {
                        setMovementQuestion1('min_range_2')
                    }
                    firestore_user_doc.update({
                        'initial_questions.distance': movementQuestion1,
                        'initial_questions.elevator': movementQuestion3,
                    });
                    setModalVisible(true)
                    return true
                }
                Alert.alert("Erro", "Responda a todas as perguntas.");
                return false
            case "recycle":
                firestore_user_doc.update({
                    'initial_questions.recycle': recycleMaterials,
                });
                setModalVisible(true)
                return true
            default:
                return ("")
        }
    }

    useEffect(() => {
        setCategory(whichCategory(toShow))
        setColorCategory(whichColor(colorToShow, toShow))
        setNextCategory(nextToShow(toShow, categories))
        setPreviousCategory(previousToShow(toShow, categories))
        console.log(nextCategory)
    }, [toShow, colorToShow, nextCategory])


    return (
        <SafeAreaProvider style={{ backgroundColor: CONST.lightWhite }}>
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
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={styles.normalText}>
                                    <Text style={{ fontFamily: 'K2D-SemiBold', color: CONST.mainGreen }}>Parabéns!</Text>
                                    {"\n"} {"\n"}Configuraste com sucesso esta área!
                                </Text>
                            </View>
                            <View style={{ width: '30%', alignItems: 'center' }}>
                                <FontAwesome5 name="seedling" size={CONST.heading4} color={CONST.mainGreen} />
                            </View>
                        </View>
                        <Pressable
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                {
                                    nextCategory !== "None" ?
                                        navigation.navigate("Category", {
                                            'back' : back,
                                            'userID': userID,
                                            "categories": categories,
                                            "categoriesColors": categoriesColors,
                                            "colorToShow": nextColor,
                                            "toShow": nextCategory
                                        })
                                        :
                                        storeData()

                                }
                            }} >
                            <PrimaryButton_v1 text={"Continuar"} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <AnimatedSvg
                width={CONST.screenWidth}
                height={heightAnimated.value}
                viewBox={`0 0 ${CONST.screenWidth} ${heightAnimated.value}`}
            >
                <AnimatedPath
                    animatedProps={firstWaveProps}
                    fill={colorCategory}
                    style={{ opacity: 0.5 }}
                    transform="translate(0, 0)"
                />
                <AnimatedPath
                    animatedProps={secondWaveProps}
                    fill={colorCategory}
                    transform="translate(0, 0)"
                />
                <Text style={[styles.indicatorTitle, { color: CONST.lightWhite, paddingTop: CONST.layoutPaddingVertical, paddingLeft: CONST.layoutPaddingLateral, paddingRight: CONST.layoutPaddingLateral }]}>
                    Configuração de perfil {">"} {category}
                </Text>
                <Text style={[styles.descriptionText, { color: CONST.lightWhite }]}>
                    {toShow == "air" ? "Esta área é diretamente afetada pelo uso de equipamentos de climatização e o impacto que isto tem na tua pegada ecológica."
                        : toShow == "energy" ? "Esta área é diretamente afetada por atitudes relacionadas com o consumo excessivo e o desperdício energético."
                            : toShow == "movement" ? "Esta área é diretamente afetada por atitudes relacionadas com as deslocações que fazes durante um dia de trabalho."
                                : toShow == "recycle" ? "Esta área é diretamente afetada por atitudes de manipulação de resíduos, para ter ou não, um comportamento sustentável."
                                    : "Esta área é diretamente afetada por atitudes relacionadas com os teus consumos de água ao longo do dia."
                    }
                </Text>
            </AnimatedSvg>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                {
                    toShow === "air" ?
                        <>
                            <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                        No teu local de trabalho, o ar condicionado costuma estar:
                                    </Text>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly", marginBottom: 10 }}>
                                        <Pressable onPress={() => {
                                            if (airAnswers1[0]) {
                                                setAirAnswers1([false, false, false, false])
                                                setAirQuestion1(false)
                                            } else {
                                                setAirAnswers1([true, false, false, false])
                                                setAirQuestion1(true)
                                            }
                                        }}>
                                            <OptionButton_v1 text={'Sempre ligado'} color={airAnswers1[0] ? colorCategory : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            setAirQuestion1(false)
                                            if (airAnswers1[1]) {
                                                setAirAnswers1([false, false, false, false])
                                            } else {
                                                setAirAnswers1([false, true, false, false])
                                            }
                                        }}>
                                            <OptionButton_v1 text={'Nunca ligado'} color={airAnswers1[1] ? colorCategory : CONST.secondaryGray} />
                                        </Pressable>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly", marginTop: 10 }}>
                                        <Pressable onPress={() => {
                                            if (airAnswers1[2]) {
                                                setAirAnswers1([false, false, false, false])
                                                setAirQuestion1(false)

                                            } else {
                                                setAirAnswers1([false, false, true, false])
                                                setAirQuestion1(true)
                                            }
                                        }}>
                                            <OptionButton_v1 text={'Raramente ligado'} color={airAnswers1[2] ? colorCategory : CONST.secondaryGray} />
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            if (airAnswers1[3]) {
                                                setAirAnswers1([false, false, false, false])
                                                setAirQuestion1(false)

                                            } else {
                                                setAirAnswers1([false, false, false, true])
                                                setAirQuestion1(true)
                                            }
                                        }}>
                                            <OptionButton_v1 text={'Intercalado'} color={airAnswers1[3] ? colorCategory : CONST.secondaryGray} />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            {airQuestion1 ?
                                <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                            No teu local de trabalho, há a possibilidade de arejar o ambiente abrindo as janelas?
                                        </Text>

                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly", marginBottom: 10 }}>
                                            <Pressable onPress={() => {
                                                if (airAnswers2[0]) {
                                                    setAirAnswers2([false, false, false])
                                                    setAirQuestion2(false)

                                                } else {
                                                    setAirAnswers2([true, false, false])
                                                    setAirQuestion2(true)

                                                }
                                            }}>
                                                <OptionButton_v1 text={'Sim'} color={airAnswers2[0] ? colorCategory : CONST.secondaryGray} />
                                            </Pressable>
                                            <Pressable onPress={() => {
                                                if (airAnswers2[1]) {
                                                    setAirAnswers2([false, false, false])
                                                    setAirQuestion2(false)

                                                } else {
                                                    setAirAnswers2([false, true, false])
                                                    setAirQuestion2(true)
                                                }
                                            }}>
                                                <OptionButton_v1 text={'Às vezes'} color={airAnswers2[1] ? colorCategory : CONST.secondaryGray} />
                                            </Pressable>
                                            <Pressable onPress={() => {
                                                setAirQuestion2(false)
                                                if (airAnswers2[2]) {
                                                    setAirAnswers2([false, false, false])
                                                } else {
                                                    setAirAnswers2([false, false, true])
                                                }
                                            }}>
                                                <OptionButton_v1 text={'Não'} color={airAnswers2[2] ? colorCategory : CONST.secondaryGray} />
                                            </Pressable>
                                        </View>

                                    </View>
                                </View>
                                :
                                <></>
                            }
                        </>
                        :
                        toShow === "energy" ?
                            <>
                                <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                            Seleciona os equipamentos que costumas utilizar com frequência no teu local de trabalho:
                                        </Text>
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('heater')) {
                                                            setEnergyDevices(removeFromArray('heater', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'heater'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Aquecedor'} color={energyDevices.includes('heater') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('coffee_machine')) {
                                                            setEnergyDevices(removeFromArray('coffee_machine', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'coffee_machine'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Cafeteira'} color={energyDevices.includes('coffee_machine') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('lamp')) {
                                                            setEnergyDevices(removeFromArray('lamp', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'lamp'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Candeeiro'} color={energyDevices.includes('lamp') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('computer')) {
                                                            setEnergyDevices(removeFromArray('computer', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'computer'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Computador'} color={energyDevices.includes('computer') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('printer')) {
                                                            setEnergyDevices(removeFromArray('printer', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'printer'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Impressora'} color={energyDevices.includes('printer') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('fridge')) {
                                                            setEnergyDevices(removeFromArray('fridge', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'fridge'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Frigorífico'} color={energyDevices.includes('fridge') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('microwave')) {
                                                            setEnergyDevices(removeFromArray('microwave', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'microwave'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Microondas'} color={energyDevices.includes('microwave') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('monitor')) {
                                                            setEnergyDevices(removeFromArray('monitor', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'monitor'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Monitor'} color={energyDevices.includes('monitor') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('projector')) {
                                                            setEnergyDevices(removeFromArray('projector', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'projector'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Projetor'} color={energyDevices.includes('projector') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('hand_dryer')) {
                                                            setEnergyDevices(removeFromArray('hand_dryer', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'hand_dryer'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={"Secadora"} color={energyDevices.includes('hand_dryer') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('television')) {
                                                            setEnergyDevices(removeFromArray('television', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'television'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={'Televisão'} color={energyDevices.includes('television') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable
                                                    style={{ marginBottom: 10 }}
                                                    onPress={() => {
                                                        if (energyDevices.includes('fan')) {
                                                            setEnergyDevices(removeFromArray('fan', energyDevices))
                                                        } else {
                                                            setEnergyDevices(energyDevices => [...energyDevices, 'fan'])
                                                        }
                                                    }}>
                                                    <OptionButton_v1 text={"Ventoinha"} color={energyDevices.includes('fan') ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                            :
                            toShow === "movement" ?
                                <>
                                    <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                                A distância da tua casa ao teu local de trabalho é cerca de:
                                            </Text>
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Pressable
                                                        style={{ marginBottom: 10 }}
                                                        onPress={() => {
                                                            setMovementQuestion1('min_range_1')
                                                            if (movementAnswers1[0]) {
                                                                setMovementAnswers1([false, false, false, false])
                                                            } else {
                                                                setMovementAnswers1([true, false, false, false])
                                                            }
                                                        }}>
                                                        <OptionButton_v1 text={'< 05 km'} color={movementAnswers1[0] ? colorCategory : CONST.secondaryGray} />
                                                    </Pressable>
                                                    <Pressable
                                                        style={{ marginBottom: 10 }}
                                                        onPress={() => {
                                                            setMovementQuestion1('min_range_1')
                                                            if (movementAnswers1[2]) {
                                                                setMovementAnswers1([false, false, false, false])
                                                            } else {
                                                                setMovementAnswers1([false, false, true, false])
                                                            }
                                                        }}>
                                                        <OptionButton_v1 text={'10 ~ 25 km'} color={movementAnswers1[2] ? colorCategory : CONST.secondaryGray} />
                                                    </Pressable>
                                                </View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Pressable
                                                        style={{ marginBottom: 10 }}
                                                        onPress={() => {
                                                            if (movementAnswers1[1]) {
                                                                setMovementAnswers1([false, false, false, false])
                                                                setMovementQuestion1('min_range_1')
                                                            } else {
                                                                setMovementAnswers1([false, true, false, false])
                                                                setMovementQuestion1('min_range_2')
                                                            }
                                                        }}>
                                                        <OptionButton_v1 text={'05 ~ 10 km'} color={movementAnswers1[1] ? colorCategory : CONST.secondaryGray} />
                                                    </Pressable>
                                                    <Pressable
                                                        style={{ marginBottom: 10 }}
                                                        onPress={() => {
                                                            if (movementAnswers1[3]) {
                                                                setMovementAnswers1([false, false, false, false])
                                                                setMovementQuestion1('min_range_1')
                                                            } else {
                                                                setMovementAnswers1([false, false, false, true])
                                                                setMovementQuestion1('min_range_2')
                                                            }
                                                        }}>
                                                        <OptionButton_v1 text={'> 25 km'} color={movementAnswers1[3] ? colorCategory : CONST.secondaryGray} />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                                Tens algum tipo de limitação física para caminhar?
                                            </Text>
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly", marginBottom: 10 }}>
                                                <Pressable onPress={() => {
                                                    if (movementAnswers2[0]) {
                                                        setMovementAnswers2([false, false])
                                                        setPhysicalCondition(false)

                                                    } else {
                                                        setMovementAnswers2([true, false])
                                                        setPhysicalCondition(true)
                                                    }
                                                }}>
                                                    <OptionButton_v1 text={'Sim, tenho'} color={movementAnswers2[0] ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                                <Pressable onPress={() => {
                                                    setPhysicalCondition(false)
                                                    if (movementAnswers2[1]) {
                                                        setMovementAnswers2([false, false])
                                                    } else {
                                                        setMovementAnswers2([false, true])
                                                    }
                                                }}>
                                                    <OptionButton_v1 text={'Não tenho'} color={movementAnswers2[1] ? colorCategory : CONST.secondaryGray} />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                                O teu posto no teu local de trabalho localiza-se a quantos andares de distância do rés do chão?
                                            </Text>
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Pressable
                                                        style={{ marginBottom: 10 }}
                                                        onPress={() => {
                                                            setMovementQuestion3('min_range_1')
                                                            if (movementAnswers3[0]) {
                                                                setMovementAnswers3([false, false])
                                                            } else {
                                                                setMovementAnswers3([true, false])
                                                            }
                                                        }}>
                                                        <OptionButton_v1 text={'Entre 0 e 2'} color={movementAnswers3[0] ? colorCategory : CONST.secondaryGray} />
                                                    </Pressable>
                                                </View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Pressable
                                                        style={{ marginBottom: 10 }}
                                                        onPress={() => {
                                                            if (movementAnswers3[1]) {
                                                                setMovementAnswers3([false, false])
                                                                setMovementQuestion3('min_range_1')
                                                            } else {
                                                                setMovementAnswers3([false, true])
                                                                setMovementQuestion3('min_range_2')
                                                            }
                                                        }}>
                                                        <OptionButton_v1 text={'3 ou mais'} color={movementAnswers3[1] ? colorCategory : CONST.secondaryGray} />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>
                                :
                                toShow === "recycle" ?
                                    <>
                                        <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                                    Que tipo(s) de separação de lixo é possível realizares no teu local de trabalho?
                                                </Text>
                                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-around" }}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                if (recycleMaterials.includes('lamps')) {
                                                                    setRecycleMaterials(removeFromArray('lamps', recycleMaterials))
                                                                } else {
                                                                    setRecycleMaterials(recycleMaterials => [...recycleMaterials, 'lamps'])
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Lâmpadas'} color={recycleMaterials.includes('lamps') ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                if (recycleMaterials.includes('paper')) {
                                                                    setRecycleMaterials(removeFromArray('paper', recycleMaterials))
                                                                } else {
                                                                    setRecycleMaterials(recycleMaterials => [...recycleMaterials, 'paper'])
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Papel'} color={recycleMaterials.includes('paper') ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>

                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                if (recycleMaterials.includes('batteries')) {
                                                                    setRecycleMaterials(removeFromArray('batteries', recycleMaterials))
                                                                } else {
                                                                    setRecycleMaterials(recycleMaterials => [...recycleMaterials, 'batteries'])
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Pilhas'} color={recycleMaterials.includes('batteries') ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>
                                                    </View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                if (recycleMaterials.includes('glass')) {
                                                                    setRecycleMaterials(removeFromArray('glass', recycleMaterials))
                                                                } else {
                                                                    setRecycleMaterials(recycleMaterials => [...recycleMaterials, 'glass'])
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Vidro'} color={recycleMaterials.includes('glass') ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                if (recycleMaterials.includes('plastic')) {
                                                                    setRecycleMaterials(removeFromArray('plastic', recycleMaterials))
                                                                } else {
                                                                    setRecycleMaterials(recycleMaterials => [...recycleMaterials, 'plastic'])
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Plástico'} color={recycleMaterials.includes('plastic') ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                    :
                                    <>
                                        <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                                    Tens o hábito de beber água durante o dia?
                                                </Text>
                                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                if (waterAnswers1[0]) {
                                                                    setWaterAnswers1([false, false])
                                                                    setWaterQuestion1(false)
                                                                } else {
                                                                    setWaterAnswers1([true, false])
                                                                    setWaterQuestion1(true)
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Sim, tenho'} color={waterAnswers1[0] ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>
                                                    </View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                setWaterQuestion1(false)
                                                                if (waterAnswers1[1]) {
                                                                    setWaterAnswers1([false, false])
                                                                } else {
                                                                    setWaterAnswers1([false, true])
                                                                }
                                                            }}>
                                                            <OptionButton_v1 text={'Não tenho'} color={waterAnswers1[1] ? colorCategory : CONST.secondaryGray} />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                }
            </ScrollView>
            <View style={[styles.doubleButtonsView, { paddingBottom: CONST.layoutPaddingVertical }]}>
                <Pressable
                    onPress={() => {
                        {
                            previousCategory !== "None" ?
                                navigation.navigate("Category", {
                                    'back': back,
                                    'userID': userID,
                                    "categories": categories,
                                    "categoriesColors": categoriesColors,
                                    "colorToShow": previousColor,
                                    "toShow": previousCategory
                                })
                                :
                                back==='profile'?
                                navigation.navigate("Tabbar")
                                :
                                navigation.navigate("Configuration", { 'userID': userID })
                        }
                    }}
                    style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v2 text={"\u0020\u0020Voltar\u0020\u0020"} />
                </Pressable>
                <Pressable
                    onPress={() => {
                        submitAnswers(toShow)
                    }}
                    style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v1 text={"Submeter"} />
                </Pressable>
            </View>
        </SafeAreaProvider>
    )
}