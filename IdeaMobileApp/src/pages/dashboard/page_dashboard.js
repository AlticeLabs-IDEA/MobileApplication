// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from "expo-font";


// IMPORT COMPONENTS
import { AirBox, EnergyBox, MovementBox, RecycleBox, WaterBox } from "../../components/areaBoxes.js";
import { AddButton } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"


export default function DashboardScreen({ navigation }) {
    const [valueDep, setValueDep] = useState(90)
    const [valueOrg, setValueOrg] = useState(20)
    const [valuePer, setValuePer] = useState(60)
    const [values, setValues] = useState([]) // default is departamental, individual, empresarial
    const [selected, setSelected] = useState("personal")

    useEffect(() => {
        if (selected === 'personal') {
            setValues([valueDep, valuePer, valueOrg])
        } else if (selected === 'departmental') {
            setValues([valueOrg, valueDep, valuePer])
        } else if (selected === 'organizational') {
            setValues([valuePer, valueOrg, valueDep])
        }

    }, [selected])

    return (
        <SafeAreaProvider style={styles.mainContainer}>
            <StatusBar style={"dark"} />

            {/* <Text style={styles.indicatorTitle_v2}>
                Painel
            </Text> */}

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
                                } else if (selected === 'departmental') {
                                    setSelected("organizational")
                                } else if (selected === "organizational") {
                                    setSelected("personal")
                                }
                            }}
                            style={{ padding: CONST.iconPadding }}>
                            <FontAwesome name="angle-right" size={CONST.heading6} color="black" />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: CONST.iconPadding }}>
                        <Pressable
                            onPress={() => {
                                if (selected === 'personal') {
                                    setSelected("departmental")
                                } else if (selected === 'departmental') {
                                    setSelected("organizational")
                                } else if (selected === "organizational") {
                                    setSelected("personal")
                                }
                            }}>
                            <CircularProgress
                                value={values[0]}
                                maxValue={100}
                                progressValueStyle={{ display: 'none' }}
                                radius={CONST.screenWidth / 12}
                                progressValueColor={CONST.mainGray}
                                activeStrokeSecondaryColor={(values[0] < 25) ? CONST.secondaryRed : (values[0] > 66) ? CONST.secondaryGreen : CONST.secondaryBlue}
                                activeStrokeColor={(values[0] < 25) ? CONST.mainRed : (values[0] > 66) ? CONST.mainGreen : CONST.mainBlue}
                                inActiveStrokeColor={CONST.neutralGray}
                                inActiveStrokeOpacity={0.5}
                                inActiveStrokeWidth={2}
                                activeStrokeWidth={8}
                                title={<><Text>{values[0]} </Text><FontAwesome5 name="seedling" size={CONST.smallText} color={(values[0] < 25) ? CONST.mainRed : (values[0] > 66) ? CONST.mainGreen : CONST.mainBlue} />
                                </>}
                                titleStyle={styles.progressBarText}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                if (selected === 'personal') {
                                    setSelected("personal")
                                } else if (selected === 'departmental') {
                                    setSelected("departmental")
                                } else if (selected === "organizational") {
                                    setSelected("organizational")
                                }
                            }}>
                            <CircularProgress
                                value={values[1]}
                                maxValue={100}
                                progressValueStyle={{ display: 'none' }}
                                radius={CONST.screenWidth / 5}
                                progressValueColor={CONST.mainGray}
                                activeStrokeColor={(values[1] < 25) ? CONST.mainRed : (values[1] > 66) ? CONST.mainGreen : CONST.mainBlue}
                                activeStrokeSecondaryColor={(values[1] < 25) ? CONST.secondaryRed : (values[1] > 66) ? CONST.secondaryGreen : CONST.secondaryBlue}
                                inActiveStrokeColor={CONST.neutralGray}
                                inActiveStrokeOpacity={0.5}
                                inActiveStrokeWidth={4}
                                activeStrokeWidth={12}
                                title={<><Text>{values[1]} </Text><FontAwesome5 name="seedling" size={CONST.heading6} color={(values[1] < 25) ? CONST.mainRed : (values[1] > 66) ? CONST.mainGreen : CONST.mainBlue} />
                                </>}
                                titleStyle={styles.mainProgressBarText}
                                subtitle={'pontos'}
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
                                value={values[2]}
                                maxValue={100}
                                progressValueStyle={{ display: 'none' }}
                                radius={CONST.screenWidth / 12}
                                progressValueColor={CONST.mainGray}
                                activeStrokeColor={(values[2] < 25) ? CONST.mainRed : (values[2] > 66) ? CONST.mainGreen : CONST.mainBlue}
                                activeStrokeSecondaryColor={(values[2] < 25) ? CONST.secondaryRed : (values[2] > 66) ? CONST.secondaryGreen : CONST.secondaryBlue}
                                inActiveStrokeColor={CONST.neutralGray}
                                inActiveStrokeOpacity={0.5}
                                inActiveStrokeWidth={2}
                                activeStrokeWidth={8}
                                title={<><Text>{values[2]} </Text><FontAwesome5 name="seedling" size={CONST.smallText} color={(values[2] < 25) ? CONST.mainRed : (values[2] > 66) ? CONST.mainGreen : CONST.mainBlue} />
                                </>}
                                titleStyle={styles.progressBarText}
                            />
                        </Pressable>
                    </View>
                    <View style={{
                        marginTop: CONST.normalTextMargin,
                        marginLeft: CONST.layoutPaddingLateral,
                        marginRight: CONST.layoutPaddingLateral,
                        borderTopWidth: 1,
                        borderColor: "#DDD",
                    }}>
                        {selected === "personal" ?
                            <Text style={[styles.subText, { paddingTop: CONST.cardBoxPaddingVertical }]}>Os teus resultados estão estáveis. {"\n"}Estás num bom caminho, continua assim!</Text>
                            : selected === 'departmental' ?
                                <Text style={[styles.subText, { paddingTop: CONST.cardBoxPaddingVertical }]}>O teu departamento está na posição 2, parabéns pelos hábitos sustentáveis!</Text>
                                :
                                <Text style={[styles.subText, { paddingTop: CONST.cardBoxPaddingVertical }]}>Parece que os resultados não estão muito positivos, vamos mudar alguns hábitos?</Text>
                        }
                    </View>
                </View>

                <Pressable
                    style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.boxCardMargin }}
                    onPress={() => {
                        console.log("")
                    }}>
                    <AddButton color={CONST.mainGray} />
                </Pressable>
                {/* <View style={[styles.cardBox, {marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin,
                    // backgroundColor: selected==='personal' ? valuePer < 25 ? CONST.secondaryRed : valuePer > 66 ? CONST.secondaryGreen : CONST.secondaryBlue
                    // : selected==='departmental' ? valueDep < 25 ? CONST.secondaryRed : valueDep > 66 ? CONST.secondaryGreen : CONST.secondaryBlue
                    // : valueOrg < 25 ? CONST.secondaryRed : valueOrg > 66 ? CONST.secondaryGreen : CONST.secondaryBlue
                    }]}>
                    {selected === "personal" ?
                    <Text style={[styles.normalText, {marginBottom: 0}]}>A sua última ação foi <Text style={{fontFamily: 'K2D-SemiBold'}}>desligar as luzes.</Text>{"\n"}
                    O aproveitamento da luz solar é uma ótima decisão para a sustentabilidade.{"\n"}
                    <Text style={{fontFamily: 'K2D-SemiBold'}}>Parabéns</Text>, continua assim!</Text> : 
                    selected==="departmental" ? 
                    <Text style={[styles.normalText, {marginBottom: 0}]}>O teu departamento está na posição 2.{"\n"}
                    A categoria com uma maior pontuação é <Text style={{fontFamily: 'K2D-SemiBold'}}>Recursos Hídricos.</Text>{"\n"}
                    <Text style={{fontFamily: 'K2D-SemiBold'}}>Parabéns</Text>, continuem assim!</Text> 
                    : 
                    <Text style={[styles.normalText, {marginBottom: 0}]}>A empresa não apresenta resultados positivos.{"\n"}
                    A categoria com uma pior pontuação é <Text style={{fontFamily: 'K2D-SemiBold'}}>Mobilidade.</Text>{"\n"}
                    Vamos <Text style={{fontFamily: 'K2D-SemiBold'}}>melhorar</Text> alguns hábitos?</Text>  
                }
                    
                </View> */}

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: CONST.boxCardMargin/2, marginTop: CONST.boxCardMargin }}>
                    <View style={{ marginRight: CONST.layoutPaddingLateral - 3, marginLeft: CONST.layoutPaddingLateral - 3 }}>
                        <AirBox color={CONST.purple} points={45} userCategory={true} />
                    </View>
                    <View style={{ marginRight: CONST.layoutPaddingLateral - 3, marginLeft: 0 }}>
                        <EnergyBox color={CONST.softYellow} points={70} userCategory={true} />
                    </View>
                    <View style={{ marginRight: CONST.layoutPaddingLateral - 3, marginLeft: 0 }}>
                        <MovementBox color={CONST.pink} points={89} userCategory={true} />
                    </View>
                    <View style={{ marginRight: CONST.layoutPaddingLateral - 3, marginLeft: 0 }}>
                        <RecycleBox color={CONST.green} points={6} />
                    </View>
                    <View style={{ marginRight: CONST.layoutPaddingLateral - 3, marginLeft: 0 }}>
                        <WaterBox color={CONST.blue} points={11} />
                    </View>

                </ScrollView>
            </ScrollView>


        </SafeAreaProvider>
    )
}