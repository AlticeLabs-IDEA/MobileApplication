// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Image, Modal, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { BarChart } from "react-native-chart-kit";

// IMPORT COMPONENTS
import { AirBox, EnergyBox, MovementBox, RecycleBox, WaterBox } from "../../components/areaBoxes.js";
import { AddButton } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function DetailsScreen({ route, navigation }) {
    const { category, activeCategories, userDOC } = route.params;
    const [loadingBolt, setLoadingBolt] = useState(true);
    const [area, setCategory] = useState("")
    const [days, setDays] = useState([])
    const [daysLabel, setDaysLabel] = useState([])
    const scrollViewRef = useRef(null);
    const [airData, setAirData] = useState()
    const [energyData, setEnergyData] = useState()
    const [movementData, setMovementData] = useState()
    const [recycleData, setRecycleData] = useState()
    const [waterData, setWaterData] = useState()
    const [avgPoints, setAvgPoints] = useState({})

    const getData = (daysArray, daysLabel) => {
        const avgTemp = { ...avgPoints };
        for (const element of activeCategories) {
            const tempArray = []
            let tempScore = 0
            for (const d of daysArray) {
                tempArray.push(d in userDOC.points_categories[element] ? userDOC.points_categories[element][d] : 0)
                tempScore += d in userDOC.points_categories[element] ? userDOC.points_categories[element][d] : 0
            }
            if (element === 'air') {
                setAirData({labels: daysLabel, datasets: [{data: tempArray}]})
                avgTemp['air'] = Math.round(tempScore/daysArray.length)
            } else if (element === 'energy') {
                setEnergyData({labels: daysLabel, datasets: [{data: tempArray}]})
                avgTemp['energy'] = Math.round(tempScore/daysArray.length)
            } else if (element === 'movement') {
                setMovementData({labels: daysLabel, datasets: [{data: tempArray}]})
                avgTemp['movement'] = Math.round(tempScore/daysArray.length)
            } else if (element === 'recycle') {
                setRecycleData({labels: daysLabel, datasets: [{data: tempArray}]})
                avgTemp['recycle'] = Math.round(tempScore/daysArray.length)
            } else {
                setWaterData({labels: daysLabel, datasets: [{data: tempArray}]})
                avgTemp['water'] = Math.round(tempScore/daysArray.length)
            }

            const sortAvgArray = Object.entries(avgTemp);
            sortAvgArray.sort((a, b) => b[1] - a[1]);
            const sortedObj = Object.fromEntries(sortAvgArray);
            setAvgPoints(sortedObj)
            setLoadingBolt(false)
        }
    }

    const whichCategory = (value) => {
        switch (value) {
            case "air":
                scrollViewRef.current.scrollTo({ x: CONST.screenWidth * activeCategories.indexOf('air'), y: 0, animated: true });
                setCategory('air')
                return ("Climatização");
            case "water":
                scrollViewRef.current.scrollTo({ x: CONST.screenWidth * activeCategories.indexOf('water'), y: 0, animated: true })
                setCategory('water')
                return ("Recursos Hídricos");
            case "energy":
                setCategory('energy')
                scrollViewRef.current.scrollTo({ x: CONST.screenWidth * activeCategories.indexOf('energy'), y: 0, animated: true })
                return ("Energia elétrica");
            case "movement":
                setCategory('movement')
                scrollViewRef.current.scrollTo({ x: CONST.screenWidth * activeCategories.indexOf('movement'), y: 0, animated: true })
                return ("Mobilidade");
            case "recycle":
                setCategory('recycle')
                scrollViewRef.current.scrollTo({ x: CONST.screenWidth * activeCategories.indexOf('recycle'), y: 0, animated: true })
                return ("Reciclagem");
            default:
                return ("")
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
        setDays(daysArray)
        setDaysLabel(daysArray2)
        getData(daysArray, daysArray2)
    }


    useEffect(() => {
        whichCategory(category)
        getDays();
    }, [])

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
                        setCategory(activeCategories[Math.round(x/CONST.screenWidth)])
                    }}>

                    {airData && avgPoints && Object.keys(avgPoints).length > 0 && daysLabel && activeCategories.includes('air') ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Área de Climatização
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar de que forma é que os teus comportamentos sustentáveis te ajudaram a progredir na área da Climatização!
                                </Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.purple }]}>{avgPoints['air']} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de climatização está na <Text style={{color: CONST.purple, fontFamily: 'K2D-SemiBold'}}>{Object.keys(avgPoints).indexOf('air') + 1}ª</Text> posição das tuas áreas. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Pontos na área de Climatização durante os últimos sete dias</Text>
                                    </View>
                                    <View style={CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : { left: -CONST.screenWidth / 5, position: 'relative' }}>
                                        <BarChart
                                            style={{}}
                                            data={airData}
                                            width={CONST.screenWidth}
                                            height={220}
                                            yAxisInterval={1}
                                            yAxisSuffix={""}
                                            withVerticalLabels={true}
                                            withHorizontalLabels={false}
                                            showValuesOnTopOfBars={true}
                                            withInnerLines={false}
                                            fromZero={true}
                                            xLabelsOffset={0}
                                            showBarTops={true}
                                            yLabelsOffset={0}
                                            chartConfig={{
                                                backgroundGradientFrom: CONST.pureWhite,
                                                backgroundGradientTo: CONST.pureWhite,
                                                color: () => CONST.purple,
                                                labelColor: () => CONST.mainGray,
                                                horizontalOffset: 0,
                                                barPercentage: 0.7,
                                                strokeWidth: 2,
                                                decimalPlaces: 0,
                                            }}
                                            verticalLabelRotation={0}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View> : <></>}

                    {energyData &&  avgPoints &&  Object.keys(avgPoints).length > 0 &&  daysLabel && activeCategories.includes('energy') ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Área de Energia Elétrica
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar de que forma é que os teus comportamentos sustentáveis te ajudaram a progredir na área da Energia Elétrica!
                                </Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.yellow }]}>{avgPoints['energy']} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin,marginBottom: 0, textAlign: 'left' }]}>A área de energia elétrica está na <Text style={{color: CONST.yellow, fontFamily: 'K2D-SemiBold'}}>{Object.keys(avgPoints).indexOf('energy') + 1}ª</Text> posição das tuas áreas. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Pontos na área de Energia Elétrica durante os últimos sete dias</Text>
                                    </View>
                                    <View style={CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : { left: -CONST.screenWidth / 5, position: 'relative' }}>
                                        <BarChart
                                            style={{}}
                                            data={energyData}
                                            width={CONST.screenWidth}
                                            height={220}
                                            yAxisInterval={1}
                                            yAxisSuffix={""}
                                            withVerticalLabels={true}
                                            withHorizontalLabels={false}
                                            showValuesOnTopOfBars={true}
                                            withInnerLines={false}
                                            fromZero={true}
                                            xLabelsOffset={0}
                                            showBarTops={true}
                                            yLabelsOffset={0}
                                            chartConfig={{
                                                backgroundGradientFrom: CONST.pureWhite,
                                                backgroundGradientTo: CONST.pureWhite,
                                                color: () => CONST.yellow,
                                                labelColor: () => CONST.mainGray,
                                                horizontalOffset: 0,
                                                barPercentage: 0.7,
                                                strokeWidth: 2,
                                                decimalPlaces: 0,
                                            }}
                                            verticalLabelRotation={0}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View> : <></>}

                    {movementData && Object.keys(avgPoints).length > 0 && avgPoints &&  daysLabel && activeCategories.includes('movement') ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Área de Mobilidade
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar de que forma é que os teus comportamentos sustentáveis te ajudaram a progredir na área da Mobilidade!
                                </Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.pink }]}>{avgPoints['movement']} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de mobilidade está na <Text style={{color: CONST.pink, fontFamily: 'K2D-SemiBold'}}>{Object.keys(avgPoints).indexOf('movement') +1}ª </Text>posição das tuas áreas. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Pontos na área de Mobilidade durante os últimos sete dias</Text>
                                    </View>
                                    <View style={CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : { left: -CONST.screenWidth / 5, position: 'relative' }}>
                                        <BarChart
                                            style={{}}
                                            data={movementData}
                                            width={CONST.screenWidth}
                                            height={220}
                                            yAxisInterval={1}
                                            yAxisSuffix={""}
                                            withVerticalLabels={true}
                                            withHorizontalLabels={false}
                                            showValuesOnTopOfBars={true}
                                            withInnerLines={false}
                                            fromZero={true}
                                            xLabelsOffset={0}
                                            showBarTops={true}
                                            yLabelsOffset={0}
                                            chartConfig={{
                                                backgroundGradientFrom: CONST.pureWhite,
                                                backgroundGradientTo: CONST.pureWhite,
                                                color: () => CONST.pink,
                                                labelColor: () => CONST.mainGray,
                                                horizontalOffset: 0,
                                                barPercentage: 0.7,
                                                strokeWidth: 2,
                                                decimalPlaces: 0,
                                            }}
                                            verticalLabelRotation={0}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View> : <></>}

                    {recycleData && Object.keys(avgPoints).length > 0 && avgPoints &&  daysLabel && activeCategories.includes('recycle') ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Área de Reciclagem
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar de que forma é que os teus comportamentos sustentáveis te ajudaram a progredir na área da Reciclagem!
                                </Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.green }]}>{avgPoints['recycle']} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de reciclagem está na <Text style={{color: CONST.green, fontFamily: 'K2D-SemiBold'}}>{Object.keys(avgPoints).indexOf('recycle') +1 }ª</Text> posição das tuas áreas. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Pontos na área de Reciclagem durante os últimos sete dias</Text>
                                    </View>
                                    <View style={CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : { left: -CONST.screenWidth / 5, position: 'relative' }}>
                                        <BarChart
                                            style={{}}
                                            data={recycleData}
                                            width={CONST.screenWidth}
                                            height={220}
                                            yAxisInterval={1}
                                            yAxisSuffix={""}
                                            withVerticalLabels={true}
                                            withHorizontalLabels={false}
                                            showValuesOnTopOfBars={true}
                                            withInnerLines={false}
                                            fromZero={true}
                                            xLabelsOffset={0}
                                            showBarTops={true}
                                            yLabelsOffset={0}
                                            chartConfig={{
                                                backgroundGradientFrom: CONST.pureWhite,
                                                backgroundGradientTo: CONST.pureWhite,
                                                color: () => CONST.green,
                                                labelColor: () => CONST.mainGray,
                                                horizontalOffset: 0,
                                                barPercentage: 0.7,
                                                strokeWidth: 2,
                                                decimalPlaces: 0,
                                            }}
                                            verticalLabelRotation={0}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View> : <></>}

                    {waterData && Object.keys(avgPoints).length > 0 && avgPoints &&  daysLabel && activeCategories.includes('water') ?
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={styles.indicatorTitle}>
                                    Área de Recursos Hídricos
                                </Text>
                            </View>
                            <ScrollView
                                style={{ width: CONST.screenWidth }}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.descriptionText}>
                                    Aqui podes visualizar de que forma é que os teus comportamentos sustentáveis te ajudaram a progredir na área da Recursos Hídricos!
                                </Text>
                                <View style={styles.cardBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                        </View>
                                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.blue }]}>{avgPoints['water']} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.normalText, { marginTop: CONST.boxCardMargin, marginBottom: 0, textAlign: 'left' }]}>A área de recursos hídricos está na <Text style={{color: CONST.blue, fontFamily: 'K2D-SemiBold'}}>{Object.keys(avgPoints).indexOf('water') +1}ª</Text> posição das tuas áreas. </Text>
                                    </View>
                                </View>
                                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                                        <Text style={styles.subText}>Pontos na área de Recursos Hídricos durante os últimos sete dias</Text>
                                    </View>
                                    <View style={CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : { left: -CONST.screenWidth / 5, position: 'relative' }}>
                                        <BarChart
                                            style={{}}
                                            data={waterData}
                                            width={CONST.screenWidth}
                                            height={220}
                                            yAxisInterval={1}
                                            yAxisSuffix={""}
                                            withVerticalLabels={true}
                                            withHorizontalLabels={false}
                                            showValuesOnTopOfBars={true}
                                            withInnerLines={false}
                                            fromZero={true}
                                            xLabelsOffset={0}
                                            showBarTops={true}
                                            yLabelsOffset={0}
                                            chartConfig={{
                                                backgroundGradientFrom: CONST.pureWhite,
                                                backgroundGradientTo: CONST.pureWhite,
                                                color: () => CONST.blue,
                                                labelColor: () => CONST.mainGray,
                                                horizontalOffset: 0,
                                                barPercentage: 0.7,
                                                strokeWidth: 2,
                                                decimalPlaces: 0,
                                            }}
                                            verticalLabelRotation={0}
                                        />
                                    </View>
                                </View>

                            </ScrollView>
                        </View> : <></>}

                </ScrollView>

            </View>
            <View
                style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.dotsMargin, marginBottom: CONST.dotsMargin }}>
                {activeCategories.map((value, idx) => (
                    <View key={idx} style={{ backgroundColor: CONST.secondaryGray, opacity: (idx === activeCategories.indexOf(area)) ? 1 : 0.5, width: (idx === activeCategories.indexOf(area)) ? 20 : 8, height: 8, margin: 5, borderRadius: 10}}>
                    </View>
                ))}
            </View>
        </SafeAreaProvider>
    )
}