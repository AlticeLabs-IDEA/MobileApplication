// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
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
    const { category, activeCategories } = route.params;
    console.log(activeCategories.length)
    const [area, setCategory] = useState("")
    const [points, setPoints] = useState(60)
    const [days, setDays] = useState([])
    const [page, setPage] = useState()
    const scrollViewRef = useRef(null);

    const whichCategory = (value) => {
        switch (value) {
            case "air":
                scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
                setPage(1)
                return ("Climatização");
            case "water":
                scrollViewRef.current.scrollTo({x: CONST.screenWidth*4, y: 0, animated: true})
                setPage(5)
                return ("Recursos Hídricos");
            case "energy":
                scrollViewRef.current.scrollTo({x:  CONST.screenWidth, y: 0, animated: true})
                setPage(2)
                return ("Energia elétrica");
            case "movement":
                scrollViewRef.current.scrollTo({x:  CONST.screenWidth*2, y: 0, animated: true})
                setPage(3)
                return ("Mobilidade");
            case "recycle":
                scrollViewRef.current.scrollTo({x:  CONST.screenWidth*3, y: 0, animated: true})
                setPage(4)
                return ("Reciclagem");
            default:
                return ("")
        }
    }

    function getDays() {
        const currentDate = new Date();
        const daysBefore = 6;
        const daysArray = [];

        for (let i = daysBefore; i >= 0; i--) {
            const d = new Date();
            d.setDate(currentDate.getDate() - i);
            const day = d.getDate();
            const month = d.getMonth() + 1; // Adding 1 to zero-based month
            const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
            daysArray.push(formattedDate);
        }

        console.log(daysArray)
        return daysArray;
    }

    const data = {
        labels: days,
        datasets: [
            {
                data: [20, 40, 30, 20, 74, 30, 20]
            }
        ]
    };


    useEffect(() => {
        whichCategory(category)
        setDays(getDays());
    }, [])

    return (
        <SafeAreaProvider style={[styles.mainContainer]}>
            <StatusBar style={"dark"} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                ref={scrollViewRef}
                pagingEnabled={true}
                onMomentumScrollEnd={(e) => {
                    var x = e.nativeEvent.contentOffset.x;
                    if (x == 0) {
                        setPage(1);
                    } else if (x < CONST.screenWidth) {
                        setPage(2);
                    } else if (x < CONST.screenWidth) {
                        setPage(3);
                    } else if (x < CONST.screenWidth) {
                        setPage(4);
                    } else {
                        setPage(5);
                    }
                }}>

                {activeCategories.includes('air') ?
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
                                <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                                    <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua última atividade registada na área de Climatização foi: </Text>
                                    <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Texto retirado da DB para a última atividade da área de Climatização. </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                    </View>
                                    <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                        <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.purple }]}>{points} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                <View style={{ marginBottom: CONST.boxCardMargin }}>
                                    <Text style={styles.subText}>Pontos na área de {area} durante os últimos sete dias</Text>
                                </View>
                                <View style={ CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : {left:  -CONST.screenWidth / 5, position: 'relative' }}>
                                    <BarChart
                                        style={{}}
                                        data={data}
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
                            <View
                                style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }}>
                                {activeCategories.map((value, idx) => (
                                    <View key={idx} style={value == 'air' ? { backgroundColor: CONST.purple, width: 20, height: 8, margin: 5, borderRadius: 10 } : { backgroundColor: CONST.secondaryGray, width: 8, height: 8, margin: 5, borderRadius: 50 }}>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View> : <></>}

                {activeCategories.includes('energy') ?
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
                                <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                                    <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua última atividade registada na área de Energia Elétrica foi: </Text>
                                    <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Texto retirado da DB para a última atividade da área de Energia Elétrica. </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                    </View>
                                    <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                        <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.yellow }]}>{points} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                <View style={{ marginBottom: CONST.boxCardMargin }}>
                                    <Text style={styles.subText}>Pontos na área de Energia Elétrica durante os últimos sete dias</Text>
                                </View>
                                <View style={ CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : {left:  -CONST.screenWidth / 5, position: 'relative' }}>
                                    <BarChart
                                        style={{}}
                                        data={data}
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
                            <View
                                style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }}>
                                {activeCategories.map((value, idx) => (
                                    <View key={idx} style={value == 'energy' ? { backgroundColor: CONST.yellow, width: 20, height: 8, margin: 5, borderRadius: 10 } : { backgroundColor: CONST.secondaryGray, width: 8, height: 8, margin: 5, borderRadius: 50 }}>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View> : <></>}

                {activeCategories.includes('movement') ?
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
                                <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                                    <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua última atividade registada na área de Mobilidade foi: </Text>
                                    <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Texto retirado da DB para a última atividade da área de Mobilidade. </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                    </View>
                                    <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                        <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.pink }]}>{points} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                <View style={{ marginBottom: CONST.boxCardMargin }}>
                                    <Text style={styles.subText}>Pontos na área de Mobilidade durante os últimos sete dias</Text>
                                </View>
                                <View style={ CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : {left:  -CONST.screenWidth / 5, position: 'relative' }}>
                                    <BarChart
                                        style={{}}
                                        data={data}
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
                            <View
                                style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }}>
                                {activeCategories.map((value, idx) => (
                                    <View key={idx} style={value == 'movement' ? { backgroundColor: CONST.pink, width: 20, height: 8, margin: 5, borderRadius: 10 } : { backgroundColor: CONST.secondaryGray, width: 8, height: 8, margin: 5, borderRadius: 50 }}>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View> : <></>}

                {activeCategories.includes('recycle') ?
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
                                <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                                    <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua última atividade registada na área de Reciclagem foi: </Text>
                                    <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Texto retirado da DB para a última atividade da área de Reciclagem. </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                    </View>
                                    <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                        <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.green }]}>{points} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                <View style={{ marginBottom: CONST.boxCardMargin }}>
                                    <Text style={styles.subText}>Pontos na área de Reciclagem durante os últimos sete dias</Text>
                                </View>
                                <View style={ CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : {left:  -CONST.screenWidth / 5, position: 'relative' }}>
                                    <BarChart
                                        style={{}}
                                        data={data}
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
                            <View
                                style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }}>
                                {activeCategories.map((value, idx) => (
                                    <View key={idx} style={value == 'recycle' ? { backgroundColor: CONST.green, width: 20, height: 8, margin: 5, borderRadius: 10 } : { backgroundColor: CONST.secondaryGray, width: 8, height: 8, margin: 5, borderRadius: 50 }}>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View> : <></>}

                {activeCategories.includes('water') ?
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
                                <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                                    <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua última atividade registada na área de Recursos Hídricos foi: </Text>
                                    <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Texto retirado da DB para a última atividade da área de Recursos Hídricos. </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                                    </View>
                                    <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                                        <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: CONST.blue }]}>{points} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                                <View style={{ marginBottom: CONST.boxCardMargin }}>
                                    <Text style={styles.subText}>Pontos na área de Recursos Hídricos durante os últimos sete dias</Text>
                                </View>
                                <View style={ CONST.screenWidth > 400 ? { left: - CONST.screenWidth / 6, position: 'relative' } : {left:  -CONST.screenWidth / 5, position: 'relative' }}>
                                    <BarChart
                                        style={{}}
                                        data={data}
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
                            <View
                                style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }}>
                                {activeCategories.map((value, idx) => (
                                    <View key={idx} style={value == 'water' ? { backgroundColor: CONST.blue, width: 20, height: 8, margin: 5, borderRadius: 10 } : { backgroundColor: CONST.secondaryGray, width: 8, height: 8, margin: 5, borderRadius: 50 }}>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View> : <></>}

            </ScrollView>


        </SafeAreaProvider>
    )
}