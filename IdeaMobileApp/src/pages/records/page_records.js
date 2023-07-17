import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from "expo-font";

import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

import { AirBox, EnergyBox, MovementBox, RecycleBox, WaterBox } from "../../components/areaBoxes.js";
import { AddButton } from "../../components/buttons.js";

export default function Records({ route, navigation }) {

    //const { category, activeCategories } = route.params;
    //console.log(activeCategories.length)
    const [area, setArea] = useState("")
    const [points, setPoints] = useState(60)
    const [colorArea, setColorArea] = useState()
    const [days, setDays] = useState([])


    return(
       <SafeAreaProvider style={[styles.mainContainer]}>
            <StatusBar style={"dark"} />
            <View>
                <Text style={styles.indicatorTitle}>
                    Histórico de Atividades
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.descriptionText}>
                Aqui podes visualizar o histórico dos teus comportamentos sustentáveis!
            </Text>
                <View style={styles.cardBox}>
                    <View style={{ flexDirection: 'column', marginBottom: CONST.inputFieldMargin }}>
                        <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'left' }]}>Para editar ou remover uma atividade basta pressionar continuamente alguns segundos.</Text>
                    </View>
                    <View style={{ 
                        flexDirection: 'row',
                        borderTopWidth: 1,
                        borderColor: "#DDD",
                        justifyContent: 'space-between',
                        alignItems: 'center', alignContent: 'center', alignSelf: 'center',
                        width: '100%'
                        }}>
                        <View >
                            <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>Escolhe o dia a ser apresentado. </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>14/07</Text>
                         <FontAwesome5 name="calendar-alt" size={CONST.heading5} color={CONST.mainGray}/>
                        </View>
                    </View>
                </View>
                <View style={[styles.cardBox, { marginTop: CONST.boxCardMargin }]}>
                    <View style={{ marginBottom: CONST.boxCardMargin }}>
                        <Text style={[styles.subText, { marginBottom: 0, textAlign: 'left' }]}>Label Climatização</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    
    )
}