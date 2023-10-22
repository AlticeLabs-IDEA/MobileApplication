// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Image, Modal, TextInput } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import firebase from "../../../config/firebase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart, ProgressChart } from "react-native-chart-kit";
import PieChart from 'react-native-pie-chart'
import { useFocusEffect } from '@react-navigation/native';

// IMPORT COMPONENTS
import { AirBox, EnergyBox, MovementBox, RecycleBox, WaterBox } from "../../components/areaBoxes.js";
import { AddButton } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function StatsScreen({ navigation }) {
    const [loadingBolt, setLoadingBolt] = useState(true);
    const [allCategories, setAllCategories] = useState(['air_points', 'energy_points', 'movement_points', 'recycle_points', 'water_points'])
    const [days, setDays] = useState([])
    const [daysLabel, setDaysLabel] = useState([])
    const scrollViewRef = useRef(null);
    const [avgPoints, setAvgPoints] = useState({})
    const [avgTotal, setAvgTotal] = useState()
    const [userID, setUserID] = useState()
    const [userDOC, setUserDOC] = useState()
    const [activeCategories, setActiveCategories] = useState([])
    const [statsMap, setStatsMaps] = useState({})
    const [colors, setColors] = useState([])
    const [area, setArea] = useState('personal')
    const [inactiveCategories, setInactiveCategories] = useState()
    const [authorized, setAuthorized] = useState(false)
    const [depsScoreCats, setDepsScoreCats] = useState({})
    const [userDepScore, setUserDepScore] = useState({})
    const [depsAvg, setDepsAvg] = useState({})
    const [depPointsAvg, setDepPointsAvg] = useState() // to show in the first box
    const [depSorted, setDepSorted] = useState({})
    const [depColors, setDepColors] = useState([])
    const [orgScoreTotal, setOrgScoreTotal] = useState() // to show in the first box
    const [orgCats, setOrgCats] = useState({})
    const [orgColors, setOrgColors] = useState([])
    const [orgDepsColors, setOrgDepsColors] = useState([])
    const [orgDepsSorted, setOrgDepsSorted] = useState({})
    const systemColors = ['red', 'pink', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'gray', 'brown']

    const calculateTheStatsMap = (temp) => {
        let total = Object.values(temp).reduce((ac, value) => ac + value, 0);
        const tempColors = []
        const updatedTempStats = Object.keys(temp).reduce((result, key, idx) => {
            tempColors.push(whichColor(key))
            result[key] = Math.round(temp[key] * 100 / total);
            return result;
        }, {});
        setStatsMaps(updatedTempStats)
        setColors(tempColors)
    }

    const getData = async (daysArray) => {
        try {
            const jsonDoc = await AsyncStorage.getItem('userDoc');
            const id = await AsyncStorage.getItem('userID');
            setUserDOC(jsonDoc != null ? JSON.parse(jsonDoc) : null);
            setUserID(id != null ? id : null)
            getDocumentInfo(JSON.parse(jsonDoc), daysArray)
        } catch (e) {
            console.log(e.message)
        }
    };

    const getDocumentInfo = async (doc, daysArray) => {
        if (doc.authorized) {
            setAuthorized(true)
        } else {
            setAuthorized(false)
        }

        const avgTemp = { ...avgPoints }; // * map to save the avg score per category
        let totalPoints = 0 // * variable to save the sum of avg score in all categories

        setActiveCategories(Object.keys(doc.active_categories).filter(key => doc.active_categories[key] > 0))
        setInactiveCategories(Object.keys(doc.active_categories).filter(key => doc.active_categories[key] == 0))

        // * loop to get the avg points per category and the total points
        for (const element of Object.keys(doc.active_categories).filter(key => doc.active_categories[key] > 0)) {
            const tempArray = []
            for (const d of daysArray) {
                tempArray.push(d in doc.points_categories[element] ? doc.points_categories[element][d] : 0)
            }
            avgTemp[element] = Math.round(tempArray.reduce((a, b) => a + b, 0) / daysArray.length)
            totalPoints += Math.round(tempArray.reduce((a, b) => a + b, 0) / daysArray.length)
        }

        // * sort in ascending order of values
        const sortedObj = Object.fromEntries(Object.entries(avgTemp).sort((a, b) => b[1] - a[1]));
        setAvgTotal(Math.round(totalPoints / Object.keys(doc.active_categories).filter(key => doc.active_categories[key] > 0).length))
        setAvgPoints(sortedObj)

        // * calculate the percentage contribution of each area to the pie chart
        calculateTheStatsMap(sortedObj)

        // ! organizational 
        calculateOrgPoints(doc, daysArray)

        setLoadingBolt(false)
    }

    const calculateOrgPoints = async (doc, daysArray) => {
        // * function to get user organization because in user document we just have the department, but not the organization
        const firestore_department_doc = firebase.firestore().collection('departments').doc(doc.department)
        const department_doc = await firestore_department_doc.get()
        const organizationID = department_doc.data().organization

        // * calculate the org score
        const cats = ["air_points", "energy_points", "movement_points", "recycle_points", "water_points"]
        const firestore_departments = firebase.firestore().collection('departments');
        const departments = await firestore_departments.where('organization', '==', organizationID).get();

        let deps_score_per_cat = {}

        for (const element of departments.docs) {
            const department = element.data();
            const tempArray = {}
            for (const c of cats) {
                for (const d of daysArray) {
                    tempArray[c] = (d in department[c] ? department[c][d] : 0)
                }
                deps_score_per_cat[department.name] = Object.fromEntries(Object.entries(tempArray).map(([key, value]) => [key, value / daysArray.length]));
            }
            // calculate the user department score
            if (department.uid === doc.department) {
                let depTotal = Object.values(tempArray).reduce((acc, value) => (acc + value), 0)
                let tempColors = []

                const filteredTempAvg = Object.fromEntries(Object.entries(tempArray).sort(([, a], [, b]) => b - a))

                const updatedDepScores = Object.keys(filteredTempAvg).reduce((result, key, idx) => {
                    tempColors.push(whichColor(key))
                    result[key] = Math.round(filteredTempAvg[key] * 100 / depTotal);
                    return result;
                }, {});
                setDepSorted(updatedDepScores)
                setDepColors(tempColors)
                const tempAvg = {}
                Object.keys(tempArray).map(key => { tempAvg[key] = Math.round(tempArray[key] / daysArray.length) })
                setUserDepScore(tempAvg)
                setDepPointsAvg(Math.round((Object.values(tempArray).reduce((acc, value) => (acc + value), 0)) / daysArray.length))
            }
        }
        setDepsScoreCats(deps_score_per_cat)
        console.log("deps_score_per_cate", deps_score_per_cat)

        const deps_score = Object.keys(deps_score_per_cat).reduce((result, department) => {
            const sum = cats.reduce((acc, point) => Math.round(acc + deps_score_per_cat[department][point]), 0);
            result[department] = sum;
            return result;
        }, {});

        setDepsAvg(deps_score);
        console.log("deps_score", deps_score)
        setOrgScoreTotal(Object.values(deps_score).reduce((acumulador, valor) => acumulador + valor, 0))

        let org_categories = { "air_points": 0, "energy_points": 0, "movement_points": 0, "recycle_points": 0, "water_points": 0 }
        for (const dep in deps_score_per_cat) {
            for (const c in org_categories) {
                org_categories[c] += deps_score_per_cat[dep][c];
            }
        }

        let orgTotal = Object.values(org_categories).reduce((acc, value) => (acc + value), 0)
        let orgTempColors = []

        const filteredTempOrg = Object.fromEntries(Object.entries(org_categories).sort(([, a], [, b]) => b - a))

        const updatedOrgScores = Object.keys(filteredTempOrg).reduce((result, key, idx) => {
            orgTempColors.push(whichColor(key))
            result[key] = Math.round(filteredTempOrg[key] * 100 / orgTotal);
            return result;
        }, {});

        setOrgCats(updatedOrgScores)
        setOrgColors(orgTempColors)

        let orgDepsTotal = Object.values(deps_score).reduce((acc, value) => (acc + value), 0)

        const filteredTempOrgDeps = Object.fromEntries(Object.entries(deps_score).sort(([, a], [, b]) => b - a))
        const orgDepsTempColors = []

        const updatedOrgDepsScores = Object.keys(filteredTempOrgDeps).reduce((result, key, idx) => {
            orgDepsTempColors.push(systemColors[(idx + 1) % systemColors.length ])
            result[key] = Math.round(filteredTempOrgDeps[key] * 100 / orgDepsTotal);
            return result;
        }, {});

        console.log(Object.fromEntries(Object.entries(updatedOrgDepsScores).sort(([, a], [, b]) => b - a)))
        console.log(orgDepsTempColors)
        setOrgDepsColors(orgDepsTempColors)
        setOrgDepsSorted(updatedOrgDepsScores)

    }


    const whichCategory = (value) => {
        switch (value) {
            case ("air"):
                return ("climatização");
            case ("water"):
                return ("recursos hídricos");
            case ("energy"):
                return ("energia elétrica");
            case ("movement"):
                return ("mobilidade");
            case ("recycle"):
                return ("reciclagem");
            case ("air_points"):
                return ("climatização");
            case ("water_points"):
                return ("recursos hídricos");
            case ("energy_points"):
                return ("energia elétrica");
            case ("movement_points"):
                return ("mobilidade");
            case ("recycle_points"):
                return ("reciclagem");
            default:
                return ("")
        }
    }

    const whichColor = (value) => {
        switch (value) {
            case ("air_points"):
                return CONST.softPurple
            case ("energy_points"):
                return CONST.softYellow
            case ("movement_points"):
                return CONST.softPink
            case ("recycle_points"):
                return CONST.softGreen
            case ("water_points"):
                return CONST.softBlue
            case ("air"):
                return CONST.softPurple
            case ("energy"):
                return CONST.softYellow
            case ("movement"):
                return CONST.softPink
            case ("recycle"):
                return CONST.softGreen
            case ("water"):
                return CONST.softBlue
            default:
                return CONST.secondaryGray
        }
    }

    function getDays() {
        const currentDate = new Date();
        const daysBefore = 6;
        const daysArray = [];
        const daysArray2 = [];

        for (let i = daysBefore; i >= 0; i--) {
            const d = new Date();
            d.setDate(currentDate.getDate() - i);
            const day = d.getDate();
            const month = d.getMonth() + 1; // Adding 1 to zero-based month
            const year = d.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            daysArray.push(formattedDate);
            daysArray2.push(`${day}/${month}`)
        }
        setDays(daysArray) // with year
        setDaysLabel(daysArray2) // without year
        getData(daysArray)
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoadingBolt(true)
            getDays();
        }, [])
    );

    useEffect(() => {

    }, [area, statsMap])

    return (
        <SafeAreaProvider style={[styles.mainContainer]}>
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
            <View style={{ height: CONST.screenHeight - 170 }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    ref={scrollViewRef}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e) => {
                        var x = e.nativeEvent.contentOffset.x;
                        if (x == 0) {
                            setArea("personal")
                        } else if ((x < CONST.screenWidth + 1)) {
                            setArea("departmental")
                        } else {
                            setArea("organizational")
                        }
                    }}>

                    {avgTotal && statsMap && Object.keys(statsMap).length > 0 && colors && Object.keys(statsMap).length === colors.length && avgPoints && Object.keys(avgPoints).length > 0 && activeCategories ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Gráficos estatísticos {'>'} Pessoais
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar estatísticas sobre os teus comportamentos sustentáveis por semana. Verifica a área em que realizaste mais desafios.</Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>Média de sustentabilidade em percentagem nos últimos sete dias: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: avgTotal < 25 ? CONST.mainRed : avgTotal > 66 ? CONST.mainGreen : CONST.mainBlue }]}>{avgTotal} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: CONST.neutralGray, height: 1, opacity: 0.5, marginTop: CONST.boxCardMargin }}>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de <Text style={{ fontFamily: 'K2D-SemiBold' }}>{whichCategory(Object.keys(avgPoints)[0])}</Text> foi a área que te rendeu mais pontos. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Distribuição dos teus contributos sustentáveis nos últimos sete dias</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        {statsMap && Object.keys(statsMap).length > 0 && colors && colors.length > 0 ?
                                            <PieChart
                                                widthAndHeight={CONST.screenWidth / 5 * 2}
                                                series={Object.values(statsMap)}
                                                sliceColor={colors}
                                                coverRadius={0.65}
                                                coverFill={'#FFF'}
                                            />
                                            :
                                            <></>
                                        }
                                    </View>
                                    <View
                                        style={{ marginTop: CONST.boxCardMargin, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {activeCategories && (activeCategories).length > 0 &&
                                            (activeCategories).sort().map((callback, idx) => {
                                                return (
                                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: CONST.boxCardMargin / 2, width: (CONST.screenWidth) / 5 }}>
                                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, fontSize: CONST.normalText }]}> {(statsMap)[activeCategories[idx]]}<Text style={{ fontSize: CONST.smallText, fontFamily: 'K2D-Regular', color: CONST.secondaryGray }}>%</Text></Text>
                                                        <View style={{ backgroundColor: whichColor(activeCategories[idx]), borderRadius: 20, height: 4, width: '50%' }} />
                                                        <Text style={[styles.subText, { fontSize: CONST.smallText }]}>{whichCategory(activeCategories[idx])}</Text>
                                                    </View>)
                                            })}

                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Progresso nas tuas áreas nos últimos sete dias</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        {avgPoints && Object.keys(avgPoints).length > 0
                                            && Object.keys(avgPoints).map((element, idx) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: CONST.boxCardMargin / 2, justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ width: '10%', alignItems: 'center', marginRight: CONST.iconPadding }}>
                                                                {element === 'energy' ? <FontAwesome name="bolt" size={CONST.heading6} color={whichColor(element)} />
                                                                    : <FontAwesome5 name={element === 'air' ? 'wind' : element === 'water' ? 'faucet' : element === 'movement' ? 'walking' : 'recycle'} size={CONST.heading6} color={whichColor(element)} />}
                                                            </View>
                                                            <View style={{ height: CONST.heading6, width: CONST.screenWidth / 2, flexDirection: 'row' }}>
                                                                <View style={{ backgroundColor: whichColor(element), opacity: 1, width: CONST.screenWidth / 2 * (avgPoints[element] / 100) }}></View>
                                                                <View style={{ backgroundColor: whichColor(element), opacity: 0.1, width: CONST.screenWidth / 2 * ((100 - avgPoints[element]) / 100) }}></View>
                                                            </View>
                                                        </View>
                                                        <View style={{ justifyContent: 'flex-end' }}>
                                                            <Text style={[styles.normalText, { marginBottom: 0 }]}>{avgPoints[element]}<Text style={{ fontFamily: 'K2D-Regular', fontSize: CONST.smallText, color: CONST.secondaryGray }}>%</Text></Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                        {inactiveCategories && inactiveCategories.length > 0
                                            && inactiveCategories.map((element, idx) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: CONST.boxCardMargin / 2, justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ width: '10%', alignItems: 'center', marginRight: CONST.iconPadding }}>
                                                                {element === 'energy' ? <FontAwesome name="bolt" size={CONST.heading6} color={CONST.secondaryGray} />
                                                                    : <FontAwesome5 name={element === 'air' ? 'wind' : element === 'water' ? 'faucet' : element === 'movement' ? 'walking' : 'recycle'} size={CONST.heading6} color={whichColor(element)} />}
                                                            </View>
                                                            <View style={{ backgroundColor: CONST.secondaryGray, opacity: 0.1, height: CONST.heading6, width: CONST.screenWidth / 2, flexDirection: 'row' }}>
                                                            </View>
                                                        </View>

                                                    </View>
                                                )
                                            })
                                        }
                                    </View>

                                </View>

                            </ScrollView>
                        </View> : <></>}

                    {authorized && depPointsAvg && depsAvg && Object.keys(userDepScore).length > 0 ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Gráficos estatísticos {'>'} Departamento
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar estatísticas sobre os comportamentos sustentáveis do teu departamento por semana. Verifica a posição do teu departamento no ranking.</Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>Média de pontos totais obtidos por dia nos últimos sete dias: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: depPointsAvg < 25 ? CONST.mainRed : depPointsAvg > 66 ? CONST.mainGreen : CONST.mainBlue }]}>{depPointsAvg} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: CONST.neutralGray, height: 1, opacity: 0.5, marginTop: CONST.boxCardMargin }}>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de <Text style={{ fontFamily: 'K2D-SemiBold' }}>{whichCategory(Object.keys(depSorted)[0])}</Text> foi a área que vos rendeu mais pontos. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Distribuição dos vossos contributos sustentáveis nos últimos sete dias</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        {depSorted && Object.keys(depSorted).length > 0 && depColors && depColors.length > 0 ?
                                            <PieChart
                                                widthAndHeight={CONST.screenWidth / 5 * 2}
                                                series={Object.values(depSorted)}
                                                sliceColor={depColors}
                                                coverRadius={0.65}
                                                coverFill={'#FFF'}
                                            />
                                            :
                                            <></>
                                        }
                                    </View>
                                    <View
                                        style={{ marginTop: CONST.boxCardMargin, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {allCategories && (allCategories).length > 0 &&
                                            (allCategories).sort().map((callback, idx) => {
                                                return (
                                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: CONST.boxCardMargin / 2, width: (CONST.screenWidth) / 5 }}>
                                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, fontSize: CONST.normalText }]}> {(depSorted)[allCategories[idx]]}<Text style={{ fontSize: CONST.smallText, fontFamily: 'K2D-Regular', color: CONST.secondaryGray }}>%</Text></Text>
                                                        <View style={{ backgroundColor: whichColor(allCategories[idx]), borderRadius: 20, height: 4, width: '50%' }} />
                                                        <Text style={[styles.subText, { fontSize: CONST.smallText }]}>{whichCategory(allCategories[idx])}</Text>
                                                    </View>)
                                            })}

                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Ranking de pontuação dos departamentos nos últimos sete dias</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        {userDOC && depsAvg && Object.keys(depsAvg).length > 0 && Object.keys(depsAvg).map((item, index) => {
                                            if (index < 3) {
                                                return (
                                                    <View style={{ margin: CONST.labelPaddingVertical * 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={{ width: '10%' }}>
                                                            <Text style={styles.smallText}>{parseInt(index) + 1}º</Text>
                                                        </View>
                                                        <View style={{ width: '90%', alignItems: 'center', backgroundColor: CONST.fadeBlue, padding: CONST.labelPaddingLateral / 3 * 2, borderRadius: CONST.inputRadius, justifyContent: 'center' }}>
                                                            <Text style={[styles.smallText, { textAlign: 'center', color: CONST.mainGray, fontFamily: 'K2D-SemiBold', flexWrap: 'wrap' }]}>{Object.keys(depsAvg)[index]}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            if (index >= 3 && Object.keys(depsAvg)[index] === userDOC.department_name) {
                                                return (
                                                    <View style={{ margin: CONST.labelPaddingVertical * 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={{ width: '10%' }}>
                                                            <Text style={styles.smallText}>{parseInt(index) + 1}º</Text>
                                                        </View>
                                                        <View style={{ width: '90%', alignItems: 'center', backgroundColor: CONST.neutralGray, padding: CONST.labelPaddingLateral / 3 * 2, borderRadius: CONST.inputRadius, justifyContent: 'center' }}>
                                                            <Text style={[styles.smallText, { textAlign: 'center', color: CONST.mainGray, fontFamily: 'K2D-SemiBold', flexWrap: 'wrap' }]}>{Object.keys(depsAvg)[index]}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        }
                                        )}
                                    </View>

                                </View>

                            </ScrollView>
                        </View> : <></>}

                    {authorized && orgScoreTotal && orgDepsSorted && orgDepsColors && Object.keys(orgDepsSorted).length > 0  && depsScoreCats && orgCats && orgColors && Object.keys(orgCats).length > 0  && depsAvg && Object.keys(depsAvg).length > 0 && Object.keys(depsScoreCats).length > 0 ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Gráficos estatísticos {'>'} Empresa
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar estatísticas sobre os comportamentos sustentáveis da tua empresa por semana. Verifica as percentagens de contribuição de cada departamento.</Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>Média de pontos totais obtidos por dia nos últimos sete dias: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: orgScoreTotal < 25 ? CONST.mainRed : orgScoreTotal > 66 ? CONST.mainGreen : CONST.mainBlue }]}>{orgScoreTotal} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: CONST.neutralGray, height: 1, opacity: 0.5, marginTop: CONST.boxCardMargin }}>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de <Text style={{ fontFamily: 'K2D-SemiBold' }}>{whichCategory(Object.keys(orgCats)[0])}</Text> foi a área rendeu mais pontos. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Distribuição dos vossos contributos sustentáveis por categorias nos últimos sete dias</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        {orgCats && Object.keys(orgCats).length > 0 && orgColors && orgColors.length > 0 ?
                                            <PieChart
                                                widthAndHeight={CONST.screenWidth / 5 * 2}
                                                series={Object.values(orgCats)}
                                                sliceColor={orgColors}
                                                coverRadius={0.65}
                                                coverFill={'#FFF'}
                                            />
                                            :
                                            <></>
                                        }
                                    </View>
                                    <View
                                        style={{ marginTop: CONST.boxCardMargin, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {allCategories && (allCategories).length > 0 &&
                                            (allCategories).sort().map((callback, idx) => {
                                                return (
                                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: CONST.boxCardMargin / 2, width: (CONST.screenWidth) / 5 }}>
                                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, fontSize: CONST.normalText }]}> {(orgCats)[allCategories[idx]]}<Text style={{ fontSize: CONST.smallText, fontFamily: 'K2D-Regular', color: CONST.secondaryGray }}>%</Text></Text>
                                                        <View style={{ backgroundColor: whichColor(allCategories[idx]), borderRadius: 20, height: 4, width: '50%' }} />
                                                        <Text style={[styles.subText, { fontSize: CONST.smallText }]}>{whichCategory(allCategories[idx])}</Text>
                                                    </View>)
                                            })}

                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Distribuição dos vossos contributos sustentáveis por departamentos nos últimos sete dias</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        {orgDepsSorted && Object.keys(orgDepsSorted).length > 0 && orgDepsColors && orgDepsColors.length > 0 ?
                                            <PieChart
                                                widthAndHeight={CONST.screenWidth / 5 * 2}
                                                series={Object.values(orgDepsSorted)}
                                                sliceColor={orgDepsColors}
                                                coverRadius={0.65}
                                                coverFill={'#FFF'}
                                            />
                                            :
                                            <></>
                                        }
                                    </View>
                                    <View
                                        style={{ marginTop: CONST.boxCardMargin, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {orgDepsSorted && (Object.keys(orgDepsSorted)).length > 0 &&
                                            (Object.keys(orgDepsSorted)).sort().map((callback, idx) => {
                                                return (
                                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: CONST.boxCardMargin / 2, width: (CONST.screenWidth) / 5 }}>
                                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, fontSize: CONST.normalText }]}> {(Object.values(orgDepsSorted))[idx]}<Text style={{ fontSize: CONST.smallText, fontFamily: 'K2D-Regular', color: CONST.secondaryGray }}>%</Text></Text>
                                                        <View style={{ backgroundColor: orgDepsColors[idx], borderRadius: 20, height: 4, width: '50%' }} />
                                                        <Text style={[styles.subText, { fontSize: CONST.smallText }]}>{(Object.keys(orgDepsSorted))[idx]}</Text>
                                                    </View>)
                                            })}

                                    </View>
                                </View>

                            </ScrollView>
                        </View> : <></>}

                </ScrollView>

            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.dotsMargin, marginBottom: CONST.dotsMargin }}>
                <View style={{ backgroundColor: CONST.secondaryGray, opacity: (area === 'personal') ? 1 : 0.5, width: (area === 'personal') ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
                <View style={{ backgroundColor: CONST.secondaryGray, opacity: (area === 'departmental') ? 1 : 0.5, width: (area === 'departmental') ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
                <View style={{ backgroundColor: CONST.secondaryGray, opacity: (area === 'organizational') ? 1 : 0.5, width: (area === 'organizational') ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
            </View>


        </SafeAreaProvider>
    )
}