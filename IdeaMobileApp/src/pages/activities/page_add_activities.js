// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal, Alert, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Svg, Path } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from "expo-checkbox";

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2, OptionButton_v1 } from "../../components/buttons.js";
import { AirIcon, RecycleIcon, WaterIcon, EnergyIcon, MovementIcon } from "../../components/icons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function AddActivitiesScreen({ navigation }) {

    const [loadingBolt, setLoadingBolt] = useState(true);
    const [userID, setUserID] = useState()
    const [userDOC, setUserDOC] = useState()
    const [categories, setCategories] = useState({})
    const [toShow, setToShow] = useState('none')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalWithoutCat, setModalWithoutCat] = useState(false);
    const [modalWarningSubmit, setModalWarningSubmit] = useState(false);
    const [modalSubmit, setModalSubmit] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [category, setCategory] = useState("")
    const [airQuestions, setAirQuestions] = useState([])
    const [airAnswers, setAirAnswers] = useState([])
    const [waterQuestions, setWaterQuestions] = useState([])
    const [waterAnswers, setWaterAnswers] = useState([])
    const [energyQuestions, setEnergyQuestions] = useState([])
    const [energyAnswers, setEnergyAnswers] = useState([])
    const [movementQuestions, setMovementQuestions] = useState([])
    const [movementAnswers, setMovementAnswers] = useState([])
    const [recycleQuestions, setRecycleQuestions] = useState([])
    const [recycleAnswers, setRecycleAnswers] = useState([])
    const [initialQuestions, setInitialQuestions] = useState({})
    const [memorizedAnswers, setMemorizedAnswers] = useState({})
    const [showWarning, setShowWarning] = useState(null);
    const [userPoints, setUserPoints] = useState({})
    let airData = {}
    let energyData = {}
    let movementData = {}
    let recycleData = {}
    let waterData = {}
    let userScore = 0
    let airPointsTotal = 0
    let airPoints = 0
    let recyclePointsTotal = 0
    let recyclePoints = 0
    let energyPointsTotal = 0
    let energyPoints = 0
    let movementPointsTotal = 0
    let movementPoints = 0
    let waterPointsTotal = 0
    let waterPoints = 0

    // * saber que equipamentos ele utiliza
    const [energyDevices, setEnergyDevices] = useState([])

    // * function to get data from async storage
    const getData = async () => {
        try {
            const jsonDoc = await AsyncStorage.getItem('userDoc');
            const id = await AsyncStorage.getItem('userID');
            const warning = await AsyncStorage.getItem('submitWarning');
            setUserDOC(jsonDoc != null ? JSON.parse(jsonDoc) : null);
            setUserID(id != null ? id : null)
            setShowWarning(warning != null ? warning : null);
            getActiveCategories(JSON.parse(jsonDoc))
        } catch (e) {
            console.log(e.message)
        }
    };

    // * function to get the categories active and the first category to show
    const getActiveCategories = (doc) => {
        console.log("** ENTREI NO GET ACTIVE CATEGORIES")
        setInitialQuestions(doc.initial_questions)
        setMemorizedAnswers(doc.memorized_answers)
        setCategories(doc.active_categories)
        setEnergyDevices(doc.initial_questions.devices)
        setUserPoints(doc.points)

        if (categories['air'] !== 0) {
            setToShow('air')
            setCategory('de Climatização')
        } else if (categories['energy'] !== 0) {
            setToShow('energy')
            setCategory('de Energia Elétrica')
        } else if (categories['movement'] !== 0) {
            setToShow('movement')
            setCategory('de Mobilidade')
        } else if (categories['recycle'] !== 0) {
            setToShow('recycle')
            setCategory('de Reciclagem')
        } else if (categories['water'] !== 0) {
            setToShow('water')
            setCategory('de Recursos Hídricos')
        }
        console.log("categorias ativas", Object.values(doc.active_categories))
        if (Object.values(doc.active_categories).includes(1) || Object.values(doc.active_categories).includes(2) || Object.values(doc.active_categories).includes(3) || Object.values(doc.active_categories).includes(4)) {
            getQuestions(doc)
        } else {
            console.log("Não há")
            setModalWithoutCat(true)
        }
    }

    const answersInAsyncStorage = async () => {
        const formattedDate = getCurrentDate();
        try {
            const answers = await AsyncStorage.getItem(formattedDate);
            return (answers != null ? JSON.parse(answers) : null);
        } catch (e) {
            console.log(e.message)
            return null
        }
    }

    const calculateMaxOptionSum = (data) => {
        let maxSum = 0;

        data.forEach((item) => {
          const options = item.options;
          let maxOptionValue = 0;
      
          for (const key in options) {
            if (options.hasOwnProperty(key)) {
              const optionValue = options[key];
              if (optionValue > maxOptionValue) {
                maxOptionValue = optionValue;
              }
            }
          }
      
          maxSum += maxOptionValue;
        });
        console.log(maxSum)
        return maxSum;
      }

    // * function to get the questions from database and check if answers are saved before or not, in case async storage doesn't have the information, we will generate
    const getQuestions = async (doc) => {
        try {
            const answersAsync = await answersInAsyncStorage()

            const firestore_questions = firebase.firestore().collection("questions");
            firestore_questions.get().then((querySnapshot) => {
                const tempDoc = querySnapshot.docs.map((doc) => doc.data());

                const filteredAirData = (tempDoc.filter((data) => data.category === "AIR").sort((a, b) => a.id - b.id));

                const filteredEnergyData = (tempDoc.filter((data) => data.category === "ENERGY").sort((a, b) => a.id - b.id));
                const filteredMovementData = (tempDoc.filter((data) => data.category === "MOVEMENT").sort((a, b) => a.id - b.id));
                const filteredRecycleData = (tempDoc.filter((data) => data.category === "RECYCLE").sort((a, b) => a.id - b.id));
                const filteredWaterData = (tempDoc.filter((data) => data.category === "WATER").sort((a, b) => a.id - b.id));

                console.log("ANSWERS ASYNC: " , answersAsync)

                let initialAirAnswers;
                let deviceAnswers = {};
                let initialMovementAnswers;
                let initialRecycleAnswers;
                let initialWaterAnswers;

                if (answersAsync === null) {
                    initialAirAnswers = filteredAirData.map((data) => {
                        let airTemp = Array.from({ length: Object.keys(data.options).length }, () => false);
                        return airTemp;
                    });
                    if (doc.initial_questions.devices.length > 0) {
                        doc.initial_questions.devices.forEach((device) => {
                            const questionsWithDevice = filteredEnergyData.filter((question) =>
                                question.field.includes(device)
                            );
                            const deviceAnswersArray = questionsWithDevice.map((data) =>
                                Array.from({ length: Object.keys(data.options).length }, () => false)
                            );
                            deviceAnswers[device] = deviceAnswersArray;
                        });
                    }
                    deviceAnswers['geral'] = [false, false, false]
                    initialMovementAnswers = filteredMovementData.map((data) => {
                        let movementTemp = Array.from({ length: Object.keys(data.options).length }, () => false);
                        return movementTemp;
                    });
                    initialRecycleAnswers = filteredRecycleData.map((data) => {
                        let recycleTemp = Array.from({ length: Object.keys(data.options).length }, () => false);
                        return recycleTemp;
                    });
                    initialWaterAnswers = filteredWaterData.map((data) => {
                        let waterTemp = Array.from({ length: Object.keys(data.options).length }, () => false);
                        return waterTemp;
                    });
                } else {
                    initialAirAnswers = answersAsync[0]
                    deviceAnswers = answersAsync[1]
                    initialMovementAnswers = answersAsync[2]
                    initialRecycleAnswers = answersAsync[3]
                    initialWaterAnswers = answersAsync[4]

                }
                setAirAnswers(initialAirAnswers);
                setAirQuestions(filteredAirData);
                setEnergyAnswers(deviceAnswers);
                setEnergyQuestions(filteredEnergyData)
                setMovementAnswers(initialMovementAnswers);
                setMovementQuestions(filteredMovementData);
                setWaterAnswers(initialWaterAnswers);
                setWaterQuestions(filteredWaterData)
                setRecycleAnswers(initialRecycleAnswers);
                setRecycleQuestions(filteredRecycleData)

                airPointsTotal = calculateMaxOptionSum(filteredAirData);
                energyPointsTotal = calculateMaxOptionSum(filteredEnergyData);
                movementPointsTotal = calculateMaxOptionSum(filteredMovementData);
                energyPointsTotal = calculateMaxOptionSum(filteredEnergyData);
                waterPointsTotal = calculateMaxOptionSum(filteredWaterData);

                console.log(airPointsTotal, " - ", energyPointsTotal) // ! 
            });
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingBolt(false)
        }
    }

    const heightAnimated = useSharedValue(250);
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

    // * function to translate the device to portuguese to show in energy section
    const whichDevice = (dev) => {
        switch (dev) {
            case "heater":
                return 'AQUECEDOR'
            case "fan":
                return "VENTOINHA"
            case "printer":
                return "IMPRESSORA"
            case "computer":
                return "COMPUTADOR"
            case "monitor":
                return "MONITOR"
            case "projector":
                return "PROJETOR"
            case "fridge":
                return "FRIGORíFICO"
            case "microwave":
                return "MICROONDAS"
            case "coffee_machine":
                return "MÁQUINA DE CAFÉ"
            case "hand_dryer":
                return "SECADOR DE MÃOS"
            case "lamp":
                return "CANDEEIRO"
            case "television":
                return "TELEVISÃO"
        }
    }

    // * function to interperter which color should show
    const whichColor = (color, category) => {
        switch (category) {
            case "air":
                switch (color) {
                    case 1:
                        return CONST.softPurple
                    case 2:
                        return CONST.purple
                    case 3:
                        return CONST.grayishPurple
                    case 4:
                        return CONST.darkPurple
                    default:
                        return CONST.secondaryGray
                }
            case "energy":
                switch (color) {
                    case 1:
                        return CONST.softYellow
                    case 2:
                        return CONST.yellow
                    case 3:
                        return CONST.grayishYellow
                    case 4:
                        return CONST.darkYellow
                    default:
                        return CONST.secondaryGray
                }
            case "movement":
                switch (color) {
                    case 1:
                        return CONST.softPink
                    case 2:
                        return CONST.pink
                    case 3:
                        return CONST.grayishPink
                    case 4:
                        return CONST.darkPink
                    default:
                        return CONST.secondaryGray
                }
            case "recycle":
                switch (color) {
                    case 1:
                        return CONST.softGreen
                    case 2:
                        return CONST.green
                    case 3:
                        return CONST.grayishGreen
                    case 4:
                        return CONST.darkGreen
                    default:
                        return CONST.secondaryGray
                }
            case "water":
                switch (color) {
                    case 1:
                        return CONST.softBlue
                    case 2:
                        return CONST.blue
                    case 3:
                        return CONST.grayishBlue
                    case 4:
                        return CONST.darkBlue
                    default:
                        return CONST.secondaryGray
                }
            default:
                return CONST.secondaryGray
        }
    }

    // * function to check if user doesn't select two sub-options -> it's a filter function!
    const checkRules = () => {
        // ? there is some questions that activate sub questions but user can only submit one path/way
        // air first questions activate 2 sub questions:
        if (!airAnswers[0][0] && !airAnswers[0][1]) {
            airAnswers[1] = [false, false]
            airAnswers[2] = [false, false]
        }
        else if (airAnswers[0][0]) {
            airAnswers[1] = [false, false]
        } else {
            airAnswers[2] = [false, false]
        }
        // recycle second question activate a sub question
        if (recycleAnswers[1][0]) {
            recycleAnswers[2] = [false, false, false]
        }
        // recycle fourth question activate a sub question
        if (!recycleAnswers[3][1]) {
            recycleAnswers[4] = [false, false]
        }
        // water first question activate two sub questions
        if (waterAnswers[0][0]) {
            waterAnswers[1] = [false, false]
            waterAnswers[2] = [false, false]
        }
        // the number of answers depend on the number of questions, which, in turn, depends on the devices
        // the user can select the option yes for the question "did you use the device" and answer the subquestion but later can change the first answer to no
        // we don't want add points for the sub question if user change the option to no or if the option yes isn't selected
        for (const key in energyAnswers) {
            if (key !== 'geral') {
                if (!energyAnswers[key][0][1]) {
                    for (let i = 1; i < energyAnswers[key].length; i++) {
                        energyAnswers[key][i] = new Array(energyAnswers[key][i].length).fill(false);
                    }
                }
            }
        }
        calculateScore()
    }

    // * function to calculate the score
    const calculateScore = () => {
        // console.log("-----------> > air ", airAnswers)
        for (let i = 0; i < airAnswers.length; i++) {
            for (let j = 0; j < airAnswers[i].length; j++) {
                if (airAnswers[i][j] === true) {
                    let option = Object.keys(airQuestions[i].options).sort()[j]
                    let optionValue = airQuestions[i].options[option]
                    // console.log(option, "  ->  ", optionValue)
                    userScore = (userScore + optionValue)
                    airData[airQuestions[i].description] = option
                    break
                }
            }
        }
        // console.log("-----------> > water ", waterAnswers)
        for (let i = 0; i < waterAnswers.length; i++) {
            for (let j = 0; j < waterAnswers[i].length; j++) {
                if (waterAnswers[i][j] === true) {
                    let option = Object.keys(waterQuestions[i].options).sort()[j]
                    let optionValue = waterQuestions[i].options[option]
                    // console.log(option, "  ->  ", optionValue)
                    userScore = (userScore + optionValue)
                    waterData[waterQuestions[i].description] = option
                    break
                }
            }
        }
        // console.log("-----------> > recycle ", recycleAnswers)
        for (let i = 0; i < recycleAnswers.length; i++) {
            for (let j = 0; j < recycleAnswers[i].length; j++) {
                if (recycleAnswers[i][j] === true) {
                    let option = Object.keys(recycleQuestions[i].options).sort()[j]
                    let optionValue = recycleQuestions[i].options[option]
                    // console.log(option, "  ->  ", optionValue)
                    userScore = (userScore + optionValue)
                    recycleData[recycleQuestions[i].description] = option
                    break
                }
            }
        }
        // console.log("-----------> > movement ", movementAnswers)
        for (let i = 0; i < movementAnswers.length; i++) {
            for (let j = 0; j < movementAnswers[i].length; j++) {
                if (movementAnswers[i][j] === true) {
                    let option = Object.keys(movementQuestions[i].options).sort()[j]
                    let optionValue = movementQuestions[i].options[option]
                    // * the movement category has questions with adjustments that influence the min_range
                    // * we need check what is the min_range in elevator and distance and IF IS MIN_RANGE_2 we need do changes
                    if (((movementQuestions[i].adjustment === "elevator" && initialQuestions.elevator === "min_range_2") || (movementQuestions[i].adjustment === "distance" && initialQuestions.distance === "min_range_2")) && optionValue < 2) {
                        optionValue = 2
                    }
                    // console.log(option, "  ->  ", optionValue)
                    userScore = (userScore + optionValue)
                    movementData[movementQuestions[i].description] = option
                    break
                }
            }
        }
        // console.log("------------> > energy ", energyAnswers)
        const energyAnswersKeys = Object.keys(energyAnswers)
        for (let i = 0; i < energyAnswersKeys.length; i++) {
            let questionsForDevice = energyQuestions.filter(element => element.field.includes(energyAnswersKeys[i]))
            if (energyAnswersKeys[i] === "geral") {
                questionsForDevice = energyQuestions[0]
            }
            for (let j = 0; j < questionsForDevice.length; j++) {
                for (let k = 0; k < energyAnswers[energyAnswersKeys[i]][j].length; k++) {
                    if (energyAnswers[energyAnswersKeys[i]][j][k] === true) {
                        let option = Object.keys(questionsForDevice[j].options).sort()[k]
                        let optionValue = questionsForDevice[j].options[option]
                        userScore = (userScore + optionValue)
                        energyData[energyAnswersKeys[i] + ": " + questionsForDevice[j].description] = option
                        break
                    }
                }
            }
        }
        console.log(".... ", userScore)
        if (showWarning === null) {
            setModalWarningSubmit(true)
        } else {
            submitAnswers()
        }
    }

    const submitAnswers = async () => {
        console.log(airData)
        console.log(energyData)
        console.log(movementData)
        console.log(recycleData)
        console.log(waterData)
        let idDoc = userID.concat(getCurrentDate()).replace(/\//g, "-");
        const firestore_answers = firebase.firestore().collection("answers")
        firestore_answers.doc(idDoc).set({
            air: airData,
            energy: energyData,
            movement: movementData,
            recycle: recycleData,
            water: waterData,
        });
        const updatedPoints = { ...userPoints };
        updatedPoints[getCurrentDate()] = userScore;
        setUserPoints(updatedPoints);
        const firestore_user_doc = firebase.firestore().collection("users").doc(userID)
        firestore_user_doc.update({ 'points': updatedPoints })
        const doc = await firestore_user_doc.get();
        storeData(doc.data())
        navigation.navigate("Dashboard")
    }

    const storeData = async (doc) => {
        try {
            const jsonDoc = JSON.stringify(doc);
            await AsyncStorage.setItem('userDoc', jsonDoc);
        } catch (e) {
            console.log(e.message)
        }
    };

    // * function to send data to firebase collection answers
    const checkToSubmit = async () => {
        try {
            let idDoc = userID.concat(getCurrentDate()).replace(/\//g, "-");
            // * check if record has already be submited
            const firestore_answers_doc = firebase.firestore().collection("answers").doc(idDoc);
            const doc = await firestore_answers_doc.get();
            if (doc.exists) {
                setModalSubmit(true)
            } else {
                checkRules()
            }
        } catch (error) {
            console.error("Error checking document existence:", error);
        }
    }

    // TODO IN THIS PAGE:
    // MEMORIZED QUESTIONS

    // * function to save data in localStorage to edit later
    const saveData = async () => {
        const formattedDate = getCurrentDate();
        // * we save in localstorage the par key-value where key is the date and the value is a dict where key is the category and value the answers
        console.log(formattedDate)
        try {
            await AsyncStorage.setItem(formattedDate.toString(), JSON.stringify([airAnswers, energyAnswers, movementAnswers, recycleAnswers, waterAnswers]));
        } catch (e) {
            console.log(e.message)
        }
    }

    const updateAsyncToWarning = async () => {
        try {
            await AsyncStorage.setItem("submitWarning", "false");
            setShowWarning("false")
        } catch (e) {
            console.log(e.message)
        }
    }

    // * function to get the current date in format day/month/year
    const getCurrentDate = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoadingBolt(true)
            getData()
        }, [])
    );

    useEffect(() => {
    }, [toShow, airAnswers, movementAnswers, energyAnswers, recycleAnswers, waterAnswers, loadingBolt, modalWithoutCat])

    return (
        <SafeAreaProvider style={[styles.mainContainer, { paddingTop: 0 }]}>
            <StatusBar style={"light"} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={loadingBolt}
                onRequestClose={() => {
                    setLoadingBolt(!loadingBolt);
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
                            }} >
                            <PrimaryButton_v1 text={"Continuar"} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalSubmit}
                onRequestClose={() => {
                    setModalSubmit(!modalSubmit);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.normalText}>
                                <Text style={{ fontFamily: 'K2D-SemiBold', color: CONST.mainRed }}>Ups!</Text>
                                {"\n"} {"\n"}Parece que já submeteste um registo hoje. Volta amanhã para ganhares mais pontos.
                            </Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                setModalSubmit(!modalSubmit);
                                navigation.navigate("Dashboard")
                            }} >
                            <PrimaryButton_v1 text={"Compreendi"} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalWithoutCat}
                onRequestClose={() => {
                    setModalWithoutCat(!modalWithoutCat);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.normalText}>
                                <Text style={{ fontFamily: 'K2D-SemiBold', color: CONST.mainRed }}>Ups!</Text>
                                {"\n"} {"\n"}Ainda não tens nenhuma categoria ativa! Ativa primeiro as categorias para preencheres o relatório de registos.
                            </Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                setModalWithoutCat(!modalWithoutCat)
                                navigation.navigate("ProfileTab")
                            }} >
                            <PrimaryButton_v1 text={"Ativar"} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalWarningSubmit}
                onRequestClose={() => {
                    setModalWarningSubmit(!modalWarningSubmit);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.normalText}>
                                <Text style={{ fontFamily: 'K2D-SemiBold', color: CONST.mainBlue }}>Atenção!</Text>
                                {"\n"} {"\n"}A ação "Submeter" só pode ser efetuada uma vez por dia. Se ainda não preencheste todos os campos que desejas preencher, opta pela opção "Guardar".
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={() => { setChecked(!isChecked) }}
                                color={CONST.secondaryGray}
                                onChange={() => { setChecked(!isChecked) }}
                            />
                            <Text style={[styles.normalText, { color: CONST.secondaryGray, marginBottom: 0, paddingLeft: CONST.labelPaddingLateral }]}>Não voltar a mostrar.</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                setModalWarningSubmit(!modalWarningSubmit);
                                if (isChecked) {
                                    updateAsyncToWarning();
                                }
                            }} >
                            <PrimaryButton_v1 text={"Submeter"} />
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
                    fill={whichColor(categories[toShow], toShow)}
                    style={{ opacity: 0.5 }}
                    transform="translate(0, 0)"
                />
                <AnimatedPath
                    animatedProps={secondWaveProps}
                    fill={whichColor(categories[toShow], toShow)}
                    transform="translate(0, 0)"
                />
                <Text style={[styles.indicatorTitle, { color: CONST.lightWhite, paddingTop: CONST.layoutPaddingVertical, marginBottom: CONST.titlePageMargin }]}>
                    Atividades {category}
                </Text>
                <Text style={[styles.descriptionText, { color: CONST.lightWhite }]}>
                    Preenche o teu relatório diários com as atividades sustentáveis que tiveste ao longo do dia e assim ganhares pontos.
                </Text>
            </AnimatedSvg>
            <View style={{ positio: 'relative', top: -CONST.boxCardMargin, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: CONST.layoutPaddingLateral, paddingRight: CONST.layoutPaddingLateral }}>
                {categories['air'] !== 0 ?
                    <Pressable
                        onPress={() => {
                            setToShow('air')
                            setCategory('de Climatização')
                        }}>
                        <AirIcon color={(categories['air'] === 0 || toShow !== 'air') ? CONST.secondaryGray : whichColor(categories['air'], 'air')} />
                    </Pressable>
                    :
                    <View>
                        <AirIcon color={(categories['air'] === 0 || toShow !== 'air') ? CONST.secondaryGray : whichColor(categories['air'], 'air')} />
                    </View>
                }
                {categories['energy'] !== 0 ?
                    <Pressable
                        onPress={() => {
                            setToShow('energy')
                            setCategory('de Energia Elétrica')
                        }}>
                        <EnergyIcon color={(categories['energy'] === 0 || toShow !== 'energy') ? CONST.secondaryGray : whichColor(categories['energy'], 'energy')} />
                    </Pressable>
                    :
                    <View>
                        <EnergyIcon color={(categories['energy'] === 0 || toShow !== 'energy') ? CONST.secondaryGray : whichColor(categories['energy'], 'energy')} />
                    </View>
                }
                {categories['movement'] !== 0 ?
                    <Pressable
                        onPress={() => {
                            setToShow('movement')
                            setCategory('de Mobilidade')
                        }}>
                        <MovementIcon color={(categories['movement'] === 0 || toShow !== 'movement') ? CONST.secondaryGray : whichColor(categories['movement'], 'movement')} />
                    </Pressable>
                    :
                    <View>
                        <MovementIcon color={(categories['movement'] === 0 || toShow !== 'movement') ? CONST.secondaryGray : whichColor(categories['movement'], 'movement')} />
                    </View>
                }
                {categories['recycle'] !== 0 ?
                    <Pressable
                        onPress={() => {
                            setToShow('recycle')
                            setCategory('de Reciclagem')
                        }}>
                        <RecycleIcon color={(categories['recycle'] === 0 || toShow !== 'recycle') ? CONST.secondaryGray : whichColor(categories['recycle'], 'recycle')} />
                    </Pressable>
                    :
                    <View>
                        <RecycleIcon color={(categories['recycle'] === 0 || toShow !== 'recycle') ? CONST.secondaryGray : whichColor(categories['recycle'], 'recycle')} />
                    </View>
                }
                {categories['water'] !== 0 ?
                    <Pressable
                        onPress={() => {
                            setToShow('water')
                            setCategory('de Recursos Hídricos')
                        }}>
                        <WaterIcon color={(categories['water'] === 0 || toShow !== 'water') ? CONST.secondaryGray : whichColor(categories['water'], 'water')} />
                    </Pressable>
                    :
                    <View>
                        <WaterIcon color={(categories['water'] === 0 || toShow !== 'water') ? CONST.secondaryGray : whichColor(categories['water'], 'water')} />
                    </View>
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                {(toShow === 'air' && airQuestions && airQuestions.length > 0) ?
                    airQuestions.map((callbackfn, id) => {
                        const firstQuestion = 0
                        if (id === firstQuestion + 1 && !airAnswers[firstQuestion][1]) {
                            return (<View key={'air_' + id}></View>)
                        }
                        if (id === firstQuestion + 2 && !airAnswers[firstQuestion][0]) {
                            return (<View key={'air_' + id}></View>)
                        }
                        if (airQuestions[id].adjustment === 'air' && !initialQuestions.air) {
                            return (<View key={'air_' + id}></View>)
                        }
                        if (airQuestions[id].adjustment === 'windows' && !initialQuestions.windows) {
                            return (<View key={'air_' + id}></View>)
                        }
                        return (
                            <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                <View key={'air_' + id} style={{ flexDirection: 'column' }}>
                                    <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                        {airQuestions[id].description}
                                    </Text>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                        {Object.keys(airQuestions[id].options).sort().map((optionKey, idx) => {
                                            const viewElements = [];
                                            if (idx === 0 || idx === Math.round(Object.keys(airQuestions[id].options).length / 2)) {
                                                for (let i = idx; idx === 0 ? i < Math.round(Object.keys(airQuestions[id].options).length / 2) : i < Object.keys(airQuestions[id].options).length; i++) {
                                                    const key = Object.keys(airQuestions[id].options).sort()[i]
                                                    const option = airQuestions[id].options[key]
                                                    viewElements.push(
                                                        <Pressable style={{ marginBottom: 10 }} onPress={() => {
                                                            const updatedAnswers = [...airAnswers];
                                                            const falseAnswers = updatedAnswers[id].map(() => false);

                                                            if (!updatedAnswers[id][i]) {
                                                                falseAnswers[i] = true;
                                                            }

                                                            updatedAnswers[id] = falseAnswers;
                                                            setAirAnswers(updatedAnswers);
                                                        }}>
                                                            <OptionButton_v1 text={key} color={airAnswers[id][i] ? whichColor(categories[toShow], toShow) : CONST.secondaryGray} />
                                                        </Pressable>
                                                    )
                                                }
                                                return (
                                                    <View style={{ flexDirection: 'column', width: '45%' }}>
                                                        {viewElements}
                                                    </View>)
                                            } else {
                                                <View key={'air_' + id}></View>
                                            }
                                        })}
                                    </View>
                                </View>
                            </View>
                        )
                    }) :
                    (toShow === 'energy' && energyQuestions && energyQuestions.length > 0) ?
                        <View>
                            <Text style={[styles.subText, { fontFamily: 'K2D-SemiBold' }]}>GERAL</Text>
                            <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                        {energyQuestions[0].description}
                                    </Text>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                        {Object.keys(energyQuestions[0].options).sort().map((optionKey, idx) => {
                                            const viewElements = [];
                                            if (idx === 0 || idx === Math.round(Object.keys(energyQuestions[0].options).length / 2)) {
                                                for (let i = idx; idx === 0 ? i < Math.round(Object.keys(energyQuestions[0].options).length / 2) : i < Object.keys(energyQuestions[0].options).length; i++) {
                                                    const key = Object.keys(energyQuestions[0].options).sort()[i]
                                                    const option = energyQuestions[0].options[key]
                                                    viewElements.push(
                                                        <Pressable style={{ marginBottom: 10 }} onPress={() => {
                                                            const updatedAnswers = { ...energyAnswers };
                                                            const falseAnswers = updatedAnswers['geral'].map(() => false);

                                                            if (!updatedAnswers['geral'][i]) {
                                                                falseAnswers[i] = true;
                                                            }

                                                            updatedAnswers['geral'] = falseAnswers;
                                                            setEnergyAnswers(updatedAnswers);
                                                        }}>
                                                            <OptionButton_v1 text={key} color={energyAnswers['geral'][i] ? whichColor(categories[toShow], toShow) : CONST.secondaryGray} />
                                                        </Pressable>
                                                    )
                                                }
                                                return (
                                                    <View style={{ flexDirection: 'column', width: '45%' }}>
                                                        {viewElements}
                                                    </View>)
                                            } else {
                                                <View></View>
                                            }
                                        })}
                                    </View>
                                </View>
                            </View>
                            {energyDevices && energyDevices.length > 0 && energyDevices.map((callbackfn, index) => {
                                return (
                                    <View>
                                        <Text style={[styles.subText, { fontFamily: 'K2D-SemiBold' }]}>{whichDevice(energyDevices[index])}</Text>
                                        {energyQuestions.filter(element => element.field.includes(energyDevices[index])).map((callbackfn, id) => {
                                            if (id != 0 && !energyAnswers[energyDevices[index]][0][1]) {
                                                return (<View key={'energy_' + id}></View>)
                                            }
                                            return (
                                                <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                                    <View key={'energy_' + id} style={{ flexDirection: 'column' }}>
                                                        <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                                            {energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].description}
                                                        </Text>
                                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                                            {Object.keys(energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].options).sort().map((optionKey, idx) => {
                                                                const viewElements = [];
                                                                if (idx === 0 || idx === Math.round(Object.keys(energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].options).length / 2)) {
                                                                    for (let i = idx; idx === 0 ? i < Math.round(Object.keys(energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].options).length / 2) : i < Object.keys(energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].options).length; i++) {
                                                                        const key = Object.keys(energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].options).sort()[i]
                                                                        const option = energyQuestions.filter(element => element.field.includes(energyDevices[index]))[id].options[key]
                                                                        viewElements.push(
                                                                            <Pressable style={{ marginBottom: 10 }} onPress={() => {
                                                                                const updatedAnswers = { ...energyAnswers };
                                                                                const currentDeviceAnswers = updatedAnswers[energyDevices[index]][id];

                                                                                // Invertir a resposta para o índice 'i'
                                                                                currentDeviceAnswers[i] = !currentDeviceAnswers[i];

                                                                                for (let j = 0; j < currentDeviceAnswers.length; j++) {
                                                                                    if (j !== i) {
                                                                                        currentDeviceAnswers[j] = false;
                                                                                    }
                                                                                }

                                                                                setEnergyAnswers({ ...updatedAnswers });
                                                                            }}>
                                                                                <OptionButton_v1 text={key} color={energyAnswers[energyDevices[index]][id][i] ? whichColor(categories[toShow], toShow) : CONST.secondaryGray} />
                                                                            </Pressable>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <View style={{ flexDirection: 'column', width: '45%' }}>
                                                                            {viewElements}
                                                                        </View>)
                                                                } else {
                                                                    <View key={'energy__' + id}></View>
                                                                }
                                                            })}
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                )
                            })}
                        </View>
                        :
                        (toShow === 'movement' && movementQuestions && movementQuestions.length > 0) ?
                    movementQuestions.map((callbackfn, id) => (
                        <View style={[styles.cardBox, { marginBottom: 20 }]}>
                            <View key={'movement_' + id} style={{ flexDirection: 'column' }}>
                                <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                    {movementQuestions[id].description}
                                </Text>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                    {Object.keys(movementQuestions[id].options).sort().map((optionKey, idx) => {
                                        const viewElements = [];
                                        if (idx === 0 || idx === Math.round(Object.keys(movementQuestions[id].options).length / 2)) {
                                            for (let i = idx; idx === 0 ? i < Math.round(Object.keys(movementQuestions[id].options).length / 2) : i < Object.keys(movementQuestions[id].options).length; i++) {
                                                const key = Object.keys(movementQuestions[id].options).sort()[i]
                                                const option = movementQuestions[id].options[key]
                                                viewElements.push(
                                                    <Pressable style={{ marginBottom: 10 }} onPress={() => {
                                                        const updatedAnswers = [...movementAnswers];
                                                        const falseAnswers = updatedAnswers[id].map(() => false);

                                                        if (!updatedAnswers[id][i]) {
                                                            falseAnswers[i] = true;
                                                        }

                                                        updatedAnswers[id] = falseAnswers;
                                                        setMovementAnswers(updatedAnswers);
                                                    }}>
                                                        <OptionButton_v1 text={key} color={movementAnswers[id][i] ? whichColor(categories[toShow], toShow) : CONST.secondaryGray} />
                                                    </Pressable>
                                                )
                                            }
                                            return (
                                                <View style={{ flexDirection: 'column', width: '45%' }}>
                                                    {viewElements}
                                                </View>)
                                        } else {
                                            <View key={'movement_' + id}></View>
                                        }
                                    })}
                                </View>
                            </View>
                        </View>
                    )) : 
                    (toShow === 'recycle' && recycleQuestions && recycleQuestions.length > 0) ?
                    recycleQuestions.map((callbackfn, id) => {
                        const printerQuestion = 1
                        const bottleQuestion = 3

                        if (id === printerQuestion + 1 && !recycleAnswers[printerQuestion][1]) {
                            return (<View key={'recyle_' + id}></View>)
                        }
                        if (id === bottleQuestion + 1 && ((recycleAnswers[bottleQuestion][0] || (recycleAnswers[bottleQuestion][2]) || (!recycleAnswers[bottleQuestion][0] && !recycleAnswers[bottleQuestion][1] && !recycleAnswers[bottleQuestion][2])))) {
                            return (<View key={'recyle_' + id}></View>)
                        }
                        if (recycleQuestions[id].adjustment == "drink_water" && !initialQuestions.drink_water) {
                            return (<View key={'recyle_' + id}></View>)
                        }
                        if (recycleQuestions[id].adjustment == "recycle" && initialQuestions.recycle.length == 0) {
                            return (<View key={'recyle_' + id}></View>)
                        }
                        return (
                            <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                <View key={'recyle_' + id} style={{ flexDirection: 'column' }}>
                                    <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                        {recycleQuestions[id].description}
                                    </Text>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                                        {Object.keys(recycleQuestions[id].options).sort().map((optionKey, idx) => {
                                            const viewElements = [];

                                            if (idx === 0 || idx === Math.round(Object.keys(recycleQuestions[id].options).length / 2)) {
                                                for (let i = idx; idx === 0 ? i < Math.round(Object.keys(recycleQuestions[id].options).length / 2) : i < Object.keys(recycleQuestions[id].options).length; i++) {
                                                    const key = Object.keys(recycleQuestions[id].options).sort()[i];
                                                    const option = recycleQuestions[id].options[key];

                                                    const isOptionSelected = recycleAnswers[id][i];
                                                    const backgroundColor = isOptionSelected ? whichColor(categories[toShow], toShow) : CONST.secondaryGray;

                                                    viewElements.push(
                                                        <Pressable
                                                            style={{ marginBottom: 10 }}
                                                            onPress={() => {
                                                                const updatedAnswers = [...recycleAnswers];
                                                                const falseAnswers = updatedAnswers[id].map(() => false);

                                                                if (!updatedAnswers[id][i]) {
                                                                    falseAnswers[i] = true;
                                                                }

                                                                updatedAnswers[id] = falseAnswers;
                                                                setRecycleAnswers(updatedAnswers);
                                                            }}
                                                        >
                                                            <OptionButton_v1 text={key} color={backgroundColor} />
                                                        </Pressable>
                                                    );
                                                }

                                                return (
                                                    <View style={{ flexDirection: 'column', width: '45%' }}>
                                                        {viewElements}
                                                    </View>
                                                );
                                            } else {
                                                return null; // Retorna nulo para não renderizar nada
                                            }
                                        })}
                                    </View>
                                </View>
                            </View>
                        )
                    }) :
                    (toShow === 'water' && waterQuestions && waterQuestions.length > 0) ?
                    waterQuestions.map((callbackfn, id) => {
                        const firstQuestion = 0

                        if (id === firstQuestion + 1 && !waterAnswers[firstQuestion][1]) {
                            return (<View key={'water_' + id}></View>)
                        }
                        if (id === firstQuestion + 2 && !waterAnswers[firstQuestion][1]) {
                            return (<View key={'water_' + id}></View>)
                        }
                        return (
                            <View style={[styles.cardBox, { marginBottom: 20 }]}>
                                <View key={'water_' + id} style={{ flexDirection: 'column' }}>
                                    <Text style={[styles.normalText, { marginBottom: 20, fontFamily: 'K2D-SemiBold' }]}>
                                        {waterQuestions[id].description}
                                    </Text>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly" }}>
                                        {Object.keys(waterQuestions[id].options).sort().map((optionKey, idx) => {
                                            const viewElements = [];
                                            if (idx === 0 || idx === Math.round(Object.keys(waterQuestions[id].options).length / 2)) {
                                                for (let i = idx; idx === 0 ? i < Math.round(Object.keys(waterQuestions[id].options).length / 2) : i < Object.keys(waterQuestions[id].options).length; i++) {
                                                    const key = Object.keys(waterQuestions[id].options).sort()[i]
                                                    const option = waterQuestions[id].options[key]
                                                    viewElements.push(
                                                        <Pressable style={{ marginBottom: 10 }} onPress={() => {
                                                            const updatedAnswers = [...waterAnswers];
                                                            const falseAnswers = updatedAnswers[id].map(() => false);

                                                            if (!updatedAnswers[id][i]) {
                                                                falseAnswers[i] = true;
                                                            }

                                                            updatedAnswers[id] = falseAnswers;
                                                            setWaterAnswers(updatedAnswers);
                                                        }}>
                                                            <OptionButton_v1 text={key} color={waterAnswers[id][i] ? whichColor(categories[toShow], toShow) : CONST.secondaryGray} />
                                                        </Pressable>
                                                    )
                                                }
                                                return (
                                                    <View style={{ flexDirection: 'column', width: '45%' }}>
                                                        {viewElements}
                                                    </View>)
                                            } else {
                                                <View key={'water_' + id}></View>
                                            }
                                        })}
                                    </View>
                                </View>
                            </View>
                        )
                    })
                :
                <ActivityIndicator size="large" color={whichColor(categories[toShow], toShow)} style={{marginBottom: CONST.boxCardMargin, marginTop: CONST.boxCardMargin}} />}
                {modalWithoutCat ? <></> :
                    <View style={[styles.doubleButtonsView, { paddingBottom: CONST.layoutPaddingVertical / 2 }]}>
                        <Pressable
                            onPress={() => {
                                saveData()
                                navigation.navigate("Dashboard")
                            }}
                            style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                            <PrimaryButton_v2 text={" Guardar "} />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                checkToSubmit()
                                saveData()

                            }}
                            style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                            <PrimaryButton_v1 text={"Submeter"} />
                        </Pressable>
                    </View>
                }
            </ScrollView>
        </SafeAreaProvider >
    )
}