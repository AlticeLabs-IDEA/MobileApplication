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
import { GeralLabel } from "../../components/labels.js";

export default function StatsScreen({ navigation }) {
    const [loadingBolt, setLoadingBolt] = useState(true);
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


    const getDocumentInfo = (doc, daysArray) => {
        const avgTemp = { ...avgPoints };
        let totalPoints = 0
        setActiveCategories(Object.keys(doc.active_categories).filter(key => doc.active_categories[key] > 0))
        for (const element of Object.keys(doc.active_categories).filter(key => doc.active_categories[key] > 0)) {
            const tempArray = []
            for (const d of daysArray) {
                tempArray.push(d in doc.points_categories[element] ? doc.points_categories[element][d] : 0)
            }
            avgTemp[element] = Math.round(tempArray.reduce((a, b) => a + b, 0) / daysArray.length)
            totalPoints += Math.round(tempArray.reduce((a, b) => a + b, 0) / daysArray.length)
        }
        const sortedObj = Object.fromEntries(Object.entries(avgTemp).sort((a, b) => b[1] - a[1]));
        setAvgTotal(Math.round(totalPoints / Object.keys(doc.active_categories).filter(key => doc.active_categories[key] > 0).length))
        setAvgPoints(sortedObj)
        calculateTheStatsMap(sortedObj)
        setLoadingBolt(false)
    }

    const whichCategory = (value) => {
        switch (value) {
            case "air":
                return ("climatização");
            case "water":
                return ("recursos hídricos");
            case "energy":
                return ("energia elétrica");
            case "movement":
                return ("mobilidade");
            case "recycle":
                return ("reciclagem");
            default:
                return ("")
        }
    }

    const whichColor = (value) => {
        switch (value) {
            case "air":
                return CONST.softPurple
            case "energy":
                return CONST.softYellow
            case "movement":
                return CONST.softPink
            case "recycle":
                return CONST.softGreen
            case "water":
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
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>Média de sustentabilidade para nos últimos sete dias: </Text>
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
                                    </View>

                                </View>

                            </ScrollView>
                        </View> : <></>}

                    {/* {avgTotal && statsMap && Object.keys(statsMap).length > 0 && avgPoints && Object.keys(avgPoints).length > 0 && activeCategories ?
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
                                    Aqui podes visualizar estatísticas sobre os teus comportamentos sustentáveis por semana. Verifica a área em que realizaste mais desafios.</Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>Média de sustentabilidade para nos últimos sete dias: </Text>
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
                                    </View>

                                </View>

                            </ScrollView>
                        </View> : <></>}

                    {avgTotal && statsMap && Object.keys(statsMap).length > 0 && avgPoints && Object.keys(avgPoints).length > 0 && activeCategories ?
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
                                    Aqui podes visualizar estatísticas sobre os teus comportamentos sustentáveis por semana. Verifica a área em que realizaste mais desafios.</Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>Média de sustentabilidade para nos últimos sete dias: </Text>
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
                                    </View>

                                </View>

                            </ScrollView>
                        </View> : <></>} */}

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