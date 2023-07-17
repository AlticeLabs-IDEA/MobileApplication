// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
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
    const [colorArea, setColorArea] = useState()
    const [days, setDays] = useState([])

    const whichCategory = (value) => {
        switch (value) {
            case "air":
                setColorArea(CONST.purple) //TODO get from db
                return ("Climatização");
            case "water":
                setColorArea(CONST.blue)
                return ("Recursos Hídricos");
            case "energy":
                setColorArea(CONST.softYellow)
                return ("Energia elétrica");
            case "movement":
                setColorArea(CONST.pink)
                return ("Mobilidade");
            case "recycle":
                setColorArea(CONST.green)
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
        setCategory(whichCategory(category))
        setDays(getDays());
    }, [category])

    return (
        <SafeAreaProvider style={[styles.mainContainer]}>
            <StatusBar style={"dark"} />
            <View>
                <Text style={styles.indicatorTitle}>
                    Detalhes {"\>"} {area}
                </Text>
            </View>
           
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.descriptionText}>
                Aqui podes visualizar de que forma é que os teus comportamentos sustentáveis te ajudaram a progredir na área da {area}!
            </Text>
                <View style={styles.cardBox}>
                    <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                        <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua última atividade registada na área de {area} foi: </Text>
                        <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Texto retirado da DB para a última atividade da área de {area}. </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '70%', justifyContent: 'flex-start' }}>
                            <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0, textAlign: 'left' }]}>A tua média de pontos nos últimos sete dias foi: </Text>
                        </View>
                        <View style={{ width: '30%', justifyContent: 'flex-end' }}>
                            <Text style={[styles.normalText, { fontSize: CONST.heading5, marginBottom: 0, textAlign: 'center', color: colorArea }]}>{points} <FontAwesome5 name="seedling" size={CONST.heading6} color={CONST.mainGray} /></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                        <Text style={styles.subText}>Pontos na área de {area} durante os últimos sete dias</Text>
                    </View>
                    <View style={{ position: 'relative', left: -CONST.screenWidth / 6 }}>
                        <BarChart
                            style={{}}
                            data={data}
                            width={CONST.screenWidth}
                            height={300}
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
                                color: () => category=='air' ? CONST.purple : category=='energy' ? CONST.yellow : category=='movement' ? CONST.pink : category=='recycle' ? CONST.green : CONST.blue,
                                labelColor: () => CONST.mainGray,
                                horizontalOffset: 0,
                                barPercentage: 0.7,
                                strokeWidth: 2,
                                decimalPlaces: 0,
                            }}
                            verticalLabelRotation={90}
                        />
                    </View>
                </View>
                <View>
                    {/* {activeCategories.map(value, idx) => (

                    )} */}

                    
                </View>
                
                <Pressable  onPress={() =>
                navigation.navigate("Details", {category: 'energy', activeCategories: ["air", "energy", "movement"]})
}>
                            <Text> CLICK ME</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaProvider>
    )
}