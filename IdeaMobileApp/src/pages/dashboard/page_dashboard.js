// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "../../../config/firebase.js";
import { useFocusEffect } from '@react-navigation/native';

// IMPORT COMPONENTS
import { AirBox, EnergyBox, MovementBox, RecycleBox, WaterBox } from "../../components/areaBoxes.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"


export default function DashboardScreen({ navigation }) {
    const [valueDep, setValueDep] = useState(0)
    const [valueOrg, setValueOrg] = useState(0)
    const [valuePer, setValuePer] = useState(0)
    const [values, setValues] = useState([valueDep, valuePer, valueOrg]) // default is departamental, individual, empresarial
    const [selected, setSelected] = useState("personal")
    const [loadingBolt, setLoadingBolt] = useState(true);
    const [activeCategories, setActiveCategories] = useState({})
    const [inactiveCategories, setInactiveCategories] = useState({})
    const [todayDate, setTodayDate] = useState()

    const [userID, setUserID] = useState()
    const [userDOC, setUserDOC] = useState()
    const [authorized, setAuthorized] = useState(false)

    const messages = {
        "personal":
        {
            "green": "Os teus resultados estão positivos. Estás num bom caminho, continua assim!",
            "blue": "O teu esforço está a compensar! Com mais esforço obterás cada vez mais pontos.",
            "red": "Os resultados não estão muito positivos. Vamos mudar alguns hábitos?"
        },
        "departmental":
        {
            "green": "Os resultados do teu departamento estão positivos. A tua equipa está num bom caminho!",
            "blue": "Com mais trabalho de equipa, obterão mais pontos. Não desistam!",
            "red": "Os resultados não estão muito positivos. O espírito de equipa pode ser melhorado."
        },
        "organizational":
        {
            "green": "Os resultados da empresa revelam um bom grau de sustentabilidade. Parabéns!",
            "blue": "Estão num bom caminho! Mais um pouco de esforço e terão uma empresa mais verde.",
            "red": "Precisamos de mudar alguns comportamentos para obter mais pontos de sustentabilidade."
        }
    }

    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedDate = `${day}/${month}/${year}`;
        return (formattedDate);
    };

    const getData = async () => {
        try {
            const jsonDoc = await AsyncStorage.getItem('userDoc');
            const id = await AsyncStorage.getItem('userID');
            setUserDOC(jsonDoc != null ? JSON.parse(jsonDoc) : null);
            setUserID(id != null ? id : null)
            getValues(JSON.parse(jsonDoc), getCurrentDate())
            setActiveCategories(Object.fromEntries(Object.entries(JSON.parse(jsonDoc).active_categories).filter(([key, value]) => value !== 0)))
            setInactiveCategories(Object.fromEntries(Object.entries(JSON.parse(jsonDoc).active_categories).filter(([key, value]) => value === 0)))
        } catch (e) {
            console.log(e.message)
        }
    };

    const calculateDepartmentPoints = async (departmentData, doc, currentDate) => {
        const pointFields = ["air_points", "energy_points", "movement_points", "recycle_points", "water_points"];
        let department_points = 0;
        for (const field of pointFields) {
            department_points += ((currentDate in departmentData[field] ) ? departmentData[field][currentDate] : 0);
        }
        const firestore_user_collection = firebase.firestore().collection('users');
        const userQuerySnapshot = await firestore_user_collection.where('department', '==', departmentData.uid).get();
        const usersInDepartment = userQuerySnapshot.size;

        if (usersInDepartment === 0) {
            return 0
        }

        if (departmentData.uid === doc.department) {
            setValueDep(Math.round(department_points / (usersInDepartment * 5)))
        }
        return (Math.round(department_points / (usersInDepartment * 5)))
    }

    const calculateOrgPoints = async (doc, currentDate) => {
        // * function to get user organization because in user document we just have the department, but not the organization
        const firestore_department_doc = firebase.firestore().collection('departments').doc(doc.department)
        const department_doc = await firestore_department_doc.get()
        const organizationID = department_doc.data().organization

        // * calculate the org score
        const firestore_departments = firebase.firestore().collection('departments'); 
        const departments = await firestore_departments.where('organization', '==', organizationID).get();

        let totalPoints = 0

        for (const element of departments.docs) {
            const department = element.data();
            const department_score = await calculateDepartmentPoints(department, doc, currentDate)

            totalPoints += department_score
        }
        setValueOrg(Math.round(totalPoints / departments.size))
    }

    const getValues = (doc, currentDate) => {
        setValuePer(currentDate in doc.points ? doc.points[currentDate] : 0)
        if (doc.authorized) {
            setAuthorized(true)
            calculateOrgPoints(doc, currentDate)
        } else {
            setAuthorized(false)
            setValueDep(-1)
            setValueOrg(-1)
        }
        setLoadingBolt(false)
    }

    const getPositions = () => {
        if (selected === 'personal') {
            setValues([valueDep, valuePer, valueOrg])
        } else if (selected === 'departmental') {
            setValues([valueOrg, valueDep, valuePer])
        } else if (selected === 'organizational') {
            setValues([valuePer, valueOrg, valueDep])
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

    useFocusEffect(
        React.useCallback(() => {
            setLoadingBolt(true)
            getData()
            setTodayDate(getCurrentDate())
        }, [])
    );

    useEffect(() => {
        getPositions()
    }, [valueDep, valueOrg, valuePer, selected])

    return (
        <SafeAreaProvider style={styles.mainContainer}>
            <StatusBar style={"dark"} />
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.cardBox, { flexDirection: 'column' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: CONST.normalTextMargin }}>
                        <Pressable
                            onPress={() => {
                                if (selected === 'personal') {
                                    setSelected("organizational")
                                } else if (selected === 'departmental') {
                                    setSelected("personal")
                                } else if (selected === "organizational") {
                                    setSelected("departmental")
                                }
                            }}
                            style={{ padding: CONST.iconPadding }}>
                            <FontAwesome name="angle-left" size={CONST.heading6} color="black" />
                        </Pressable>
                        <Text style={[styles.normalText, { marginBottom: 0 }]}>{selected === 'personal' ? "Dados individuais" : selected === 'departmental' ? "Dados do departamento" : "Dados da empresa"}</Text>
                        <Pressable
                            onPress={() => {
                                if (selected === 'personal') {
                                    setSelected("departmental")
                                    getPositions()
                                } else if (selected === 'departmental') {
                                    setSelected("organizational")
                                    getPositions()
                                } else if (selected === "organizational") {
                                    setSelected("personal")
                                    getPositions()
                                }
                            }}
                            style={{ padding: CONST.iconPadding }}>
                            <FontAwesome name="angle-right" size={CONST.heading6} color="black" />
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: CONST.iconPadding }}>
                        {values && values.length > 0 ?
                            <>
                                <Pressable
                                    onPress={() => {
                                        if (selected === 'personal') {
                                            setSelected("departmental")
                                            getPositions()
                                        } else if (selected === 'departmental') {
                                            setSelected("organizational")
                                            getPositions()
                                        } else if (selected === "organizational") {
                                            setSelected("personal")
                                            getPositions()
                                        }
                                    }}>
                                    <CircularProgress
                                        value={(values[0] < 0) ? 100 : values[0]}
                                        maxValue={100}
                                        progressValueStyle={{ display: 'none' }}
                                        radius={CONST.screenWidth / 12}
                                        progressValueColor={CONST.mainGray}
                                        activeStrokeSecondaryColor={(values[0] < 0) ? CONST.neutralGray : (values[0] < 25) ? CONST.secondaryRed : (values[0] > 66) ? CONST.secondaryGreen : CONST.secondaryBlue}
                                        activeStrokeColor={(values[0] < 0) ? CONST.secondaryGray : (values[0] < 25) ? CONST.mainRed : (values[0] > 66) ? CONST.mainGreen : CONST.mainBlue}
                                        inActiveStrokeColor={CONST.neutralGray}
                                        inActiveStrokeOpacity={0.5}
                                        inActiveStrokeWidth={2}
                                        activeStrokeWidth={8}
                                        title={<><Text>{(values[0] < 0) ? "" : values[0]}</Text><FontAwesome5 name="seedling" size={CONST.smallText} color={(values[0] < 0) ? CONST.secondaryGray : (values[0] < 25) ? CONST.mainRed : (values[0] > 66) ? CONST.mainGreen : CONST.mainBlue} />
                                        </>}
                                        titleStyle={styles.progressBarText}
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        if (selected === 'personal') {
                                            setSelected("personal")
                                            getPositions()
                                        } else if (selected === 'departmental') {
                                            setSelected("departmental")
                                            getPositions()
                                        } else if (selected === "organizational") {
                                            setSelected("organizational")
                                            getPositions()
                                        }
                                    }}>
                                    <CircularProgress
                                        value={(values[1] < 0) ? 100 : values[1]}
                                        maxValue={100}
                                        progressValueStyle={{ display: 'none' }}
                                        radius={CONST.screenWidth / 5}
                                        progressValueColor={CONST.mainGray}
                                        activeStrokeColor={(values[1] < 0) ? CONST.secondaryGray : (values[1] < 25) ? CONST.mainRed : (values[1] > 66) ? CONST.mainGreen : CONST.mainBlue}
                                        activeStrokeSecondaryColor={(values[1] < 0) ? CONST.neutralGray : (values[1] < 25) ? CONST.secondaryRed : (values[1] > 66) ? CONST.secondaryGreen : CONST.secondaryBlue}
                                        inActiveStrokeColor={CONST.neutralGray}
                                        inActiveStrokeOpacity={0.5}
                                        inActiveStrokeWidth={4}
                                        activeStrokeWidth={12}
                                        title={(values[1] < 0) ?
                                            <>
                                                <Text style={{ fontSize: CONST.heading6 }}>Não</Text>
                                            </>
                                            :
                                            <>
                                                <Text>{values[1]} </Text><FontAwesome5 name="seedling" size={CONST.heading6} color={(values[1] < 0) ? CONST.secondaryGray : (values[1] < 25) ? CONST.mainRed : (values[1] > 66) ? CONST.mainGreen : CONST.mainBlue} />
                                            </>}
                                        titleStyle={styles.mainProgressBarText}
                                        subtitle={(values[1] < 0) ? 'autorizado' : 'pontos'}
                                        subtitleStyle={styles.mainProgressBarSubText}
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        if (selected === 'personal') {
                                            setSelected("organizational")
                                        } else if (selected === 'departmental') {
                                            setSelected("personal")
                                        } else if (selected === "organizational") {
                                            setSelected("departmental")
                                        }
                                    }}>
                                    <CircularProgress
                                        value={(values[2] < 0) ? 100 : values[2]}
                                        maxValue={100}
                                        progressValueStyle={{ display: 'none' }}
                                        radius={CONST.screenWidth / 12}
                                        progressValueColor={CONST.mainGray}
                                        activeStrokeColor={(values[2] < 0) ? CONST.secondaryGray : (values[2] < 25) ? CONST.mainRed : (values[2] > 66) ? CONST.mainGreen : CONST.mainBlue}
                                        activeStrokeSecondaryColor={(values[2] < 0) ? CONST.neutralGray : (values[2] < 25) ? CONST.secondaryRed : (values[2] > 66) ? CONST.secondaryGreen : CONST.secondaryBlue}
                                        inActiveStrokeColor={CONST.neutralGray}
                                        inActiveStrokeOpacity={0.5}
                                        inActiveStrokeWidth={2}
                                        activeStrokeWidth={8}
                                        title={<><Text>{(values[2] < 0) ? "" : values[2]} </Text><FontAwesome5 name="seedling" size={CONST.smallText} color={(values[2] < 0) ? CONST.secondaryGray : (values[2] < 25) ? CONST.mainRed : (values[2] > 66) ? CONST.mainGreen : CONST.mainBlue} />
                                        </>}
                                        titleStyle={styles.progressBarText}
                                    />
                                </Pressable>
                            </>
                            :
                            <></>
                        }
                    </View>
                    <View style={{
                        marginTop: CONST.normalTextMargin,
                        marginLeft: CONST.layoutPaddingLateral,
                        marginRight: CONST.layoutPaddingLateral,
                        borderTopWidth: 1,
                        borderColor: "#DDD",
                    }}>
                        {selected === "personal" ?
                            <Text style={[styles.subText, { paddingTop: CONST.cardBoxPaddingVertical }]}>
                                {(values[1] < 25) ? messages[selected]["red"] : (values[1] > 66) ? messages[selected]["green"] : messages[selected]["blue"]}
                            </Text>
                            : selected === 'departmental' ?
                                <Text style={[styles.subText, { paddingTop: CONST.cardBoxPaddingVertical }]}>
                                    {(values[1] < 25) ? messages[selected]["red"] : (values[1] > 66) ? messages[selected]["green"] : messages[selected]["blue"]}
                                </Text>
                                :
                                <Text style={[styles.subText, { paddingTop: CONST.cardBoxPaddingVertical }]}>
                                    {(values[1] < 25) ? messages[selected]["red"] : (values[1] > 66) ? messages[selected]["green"] : messages[selected]["blue"]}
                                </Text>
                        }
                    </View>
                </View>
                <View>
                    <Text style={[styles.normalText, { marginBottom: CONST.boxCardMargin, marginLeft: CONST.layoutPaddingLateral, marginTop: CONST.titlePageMargin * 2, fontFamily: 'K2D-SemiBold' }]}>Áreas desafiadas</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{ marginBottom: CONST.boxCardMargin / 2 }}>
                    {userDOC && activeCategories && Object.keys(activeCategories).length > 0 && Object.keys(activeCategories).sort().map((category, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    navigation.navigate("Details", { 'category': category, 'activeCategories': Object.keys(activeCategories).sort(), 'userDOC': userDOC })
                                }}
                                style={{ marginRight: CONST.layoutPaddingLateral - 10, marginLeft: CONST.layoutPaddingLateral - 10 }}>
                                {category === 'air' ?
                                    <AirBox color={whichColor(activeCategories[category], category)} points={todayDate in userDOC.points_categories.air ? userDOC.points_categories.air[todayDate] : 0} userCategory={true} />
                                    :
                                    category === 'energy' ?
                                        <EnergyBox color={whichColor(activeCategories[category], category)} points={todayDate in userDOC.points_categories.energy ? userDOC.points_categories.energy[todayDate] : 0} userCategory={true} />
                                        :
                                        category === 'movement' ?
                                            <MovementBox color={whichColor(activeCategories[category], category)} points={todayDate in userDOC.points_categories.movement ? userDOC.points_categories.movement[todayDate] : 0} userCategory={true} />
                                            :
                                            category === 'recycle' ?
                                                <RecycleBox color={whichColor(activeCategories[category], category)} points={todayDate in userDOC.points_categories.recycle ? userDOC.points_categories.recycle[todayDate] : 0} userCategory={true} />
                                                :
                                                <WaterBox color={whichColor(activeCategories[category], category)} points={todayDate in userDOC.points_categories.water ? userDOC.points_categories.water[todayDate] : 0} userCategory={true} />
                                }
                            </Pressable>
                        )
                    })}
                    {userDOC && inactiveCategories && Object.keys(inactiveCategories).length > 0 && Object.keys(inactiveCategories).sort().map((category, index) => {
                        return (
                            <View
                                key={index}
                                style={{ marginRight: CONST.layoutPaddingLateral, marginLeft: CONST.layoutPaddingLateral }}>
                                {category === 'air' ?
                                    <AirBox color={whichColor(inactiveCategories[category] + 4, category)} points={0} userCategory={false} />
                                    :
                                    category === 'energy' ?
                                        <EnergyBox color={whichColor(inactiveCategories[category] + 4, category)} points={0} userCategory={false} />
                                        :
                                        category === 'movement' ?
                                            <MovementBox color={whichColor(inactiveCategories[category] + 4, category)} points={0} userCategory={false} />
                                            :
                                            category === 'recycle' ?
                                                <RecycleBox color={whichColor(inactiveCategories[category] + 4, category)} points={0} userCategory={false} />
                                                :
                                                <WaterBox color={whichColor(inactiveCategories[category] + 4, category)} points={0} userCategory={false} />
                                }
                            </View>
                        )
                    })}
                </ScrollView>
            </ScrollView>


        </SafeAreaProvider>
    )
}