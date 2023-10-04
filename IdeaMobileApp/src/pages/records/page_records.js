//IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View, Modal, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "../../../config/firebase.js";
import { useFocusEffect } from '@react-navigation/native';


// IMPORT COMPONENTS
import { AirLabel, EnergyLabel, MovementLabel, RecycleLabel, WaterLabel } from "../../components/labels.js";
import { PrimaryButton_v1, PrimaryButton_v2, SecondaryButton_v1 } from "../../components/buttons.js";
// IMPORT STYLES
import { styles } from "../../assets/styles/css.js";
import * as CONST from "../../assets/constants/constants.js";

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr.', 'Mai.', 'Jun.', 'Jul..', 'Ago.', 'Set.', 'Otu.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dog.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt';

export default function RecordsScreen({ navigation }) {
  const [activeCategories, setActiveCategories] = useState(null)
  const [answersAir, setAnswersAir] = useState(null)
  const [answersMovement, setAnswersMovement] = useState(null)
  const [answersEnergy, setAnswersEnergy] = useState(null)
  const [answersWater, setAnswersWater] = useState(null)
  const [answersRecycle, setAnswersRecycle] = useState(null)
  const [selected, setSelected] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarDate, setCalendarDate] = useState();
  const [minDate, setMinDate] = useState();
  const [userID, setUserID] = useState()
  const [userDOC, setUserDOC] = useState()
  const [loading, setLoading] = useState(true);
  const [noActivity, setNoActivity] = useState({ "Sem atividade!": "Não houve registo de atividades nesta área no dia selecionado" })


  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedDate = `${day}/${month}/${year}`;
    setCalendarDate(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
    setSelected(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
    const sevenDaysBefore = new Date();
    sevenDaysBefore.setDate(date.getDate() - 7);
    const sevenDaysBeforeDay = sevenDaysBefore.getDate();
    const sevenDaysBeforeMonth = sevenDaysBefore.getMonth() + 1;
    const sevenDaysBeforeYear = sevenDaysBefore.getFullYear()
    setMinDate(`${sevenDaysBeforeYear}-${sevenDaysBeforeMonth < 10 ? '0' + sevenDaysBeforeMonth : sevenDaysBeforeMonth}-${sevenDaysBeforeDay < 10 ? '0' + sevenDaysBeforeDay : sevenDaysBeforeDay}`)
    return (formattedDate);
  };

  const translateEnergyDevices = (nameDevice) => {
    switch (nameDevice) {
      case "fan":
        return "Ventoinha"
      case "hand_dryer":
        return "Secador de mãos"
      case "computer":
        return "Computador"
      case "monitor":
        return "Monitor"
      case "projector":
        return "Projetor"
      case "printer":
        return "Impressora"
      case "lamp":
        return "Candeeiro"
      case "fridge":
        return "Frigorífico"
      case "microwave":
        return "Microondas"
      case "coffee_machine":
        return "Máquina de Café"
      case "geral":
        return "Geral"
      case "television":
        return "Televisão"
      case "heater":
        return "Aquecedor"
      default:
        return "Sem dispositivo"
    }
  }

  const getData = async () => {
    try {
      const jsonDoc = await AsyncStorage.getItem('userDoc');
      const id = await AsyncStorage.getItem('userID');
      setUserDOC(jsonDoc != null ? JSON.parse(jsonDoc) : null);
      setUserID(id != null ? id : null)
      getFirebaseInfo(JSON.parse(jsonDoc), id)
    } catch (e) {
      console.log(e.message)
    }
  };

  const getFirebaseInfo = async (doc, uid) => {
    try {
      setActiveCategories(doc.active_categories)
      let idDoc = uid.concat(currentDate).replace(/\//g, "-");
      const firestore_answers_doc = firebase.firestore().collection("answers").doc(idDoc);
      const answers_doc = await firestore_answers_doc.get();
      if (answers_doc.exists) {
        const data = answers_doc.data()
        getRecords(answers_doc.data())
      } else {
        setAnswersAir(noActivity)
        setAnswersEnergy(noActivity)
        setAnswersWater(noActivity)
        setAnswersMovement(noActivity)
        setAnswersRecycle(noActivity)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getRecords = (data) => {
    if (Object.keys(data.air).length > 0) {
      setAnswersAir(data.air)
    } else {
      setAnswersAir(noActivity)
    }
    if (Object.keys(data.energy).length > 0) {
      setAnswersEnergy(data.energy)
    } else {
      setAnswersEnergy(noActivity)
    }
    if (Object.keys(data.movement).length > 0) {
      setAnswersMovement(data.movement)
    } else {
      setAnswersMovement(noActivity)
    }
    if (Object.keys(data.recycle).length > 0) {
      setAnswersRecycle(data.recycle)
    } else {
      setAnswersRecycle(noActivity)
    }
    if (Object.keys(data.water).length > 0) {
      setAnswersWater(data.water)
    } else {
      setAnswersWater(noActivity)
    }
  }

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
      setLoading(true)
      getData()
      console.log(currentDate)
    }, [currentDate])
  );

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, [])

  return (
    <SafeAreaProvider style={[styles.mainContainer]}>
      <StatusBar style={"dark"} />
      <View>
        <Text style={styles.indicatorTitle}>Histórico de Atividades</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar
              current={calendarDate}
              minDate={minDate}
              maxDate={calendarDate}
              onDayPress={day => {
                let daySelected = day.day
                let yearSelected = day.year
                let monthSelected = day.month
                let formattedDate = `${daySelected}/${monthSelected}/${yearSelected}`;
                setSelected(`${yearSelected}-${monthSelected < 10 ? '0' + monthSelected : monthSelected}-${daySelected < 10 ? '0' + daySelected : daySelected}`)
                setCurrentDate(formattedDate);
                getFirebaseInfo(userDOC, userID)
              }}
              markedDates={{
                [selected]: { selected: true, disableTouchEvent: true }
              }}
              style={{
                borderWidth: 0,
                height: 350
              }}
              theme={{
                backgroundColor: CONST.lightWhite,
                calendarBackground: CONST.lightWhite,
                textSectionTitleColor: CONST.mainGray,
                selectedDayBackgroundColor: CONST.mainBlue,
                selectedDayTextColor: CONST.pureWhite,
                todayTextColor: CONST.mainBlue,
                dayTextColor: CONST.secondaryGray,
                textDisabledColor: CONST.neutralGray,
                arrowColor: CONST.mainBlue,
                monthTextColor: CONST.mainGray,
                agendaDayTextColor: CONST.mainGray,
                textMonthFontFamily: 'K2D-Regular',
                textDayFontFamily: 'K2D-Regular',
                textDayHeaderFontFamily: 'K2D-Regular',
              }}
            />
            <Pressable onPress={() => { setModalVisible(false) }}>
              <SecondaryButton_v1 text={"Fechar"} color={CONST.mainBlue} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
        <View style={styles.centeredViewDarker}>
          <View style={{ bottom: CONST.screenHeight / 2, zIndex: 1000, left: CONST.screenWidth / 2.5, position: 'absolute' }}>
            <Image source={require('../../assets/images/loading_bolt_blue.gif')} resizeMode="contain" style={{ tintColor: 'white', height: 80, width: 80 }} />
          </View>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Text style={styles.descriptionText}>
          Aqui podes visualizar o histórico dos teus comportamentos sustentáveis!
        </Text>
        <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
          <View style={{ flexDirection: "column", marginBottom: CONST.inputFieldMargin }} >
            <Text style={[styles.normalText, { marginBottom: 0 }]}>
              És livre de escolher o dia que pretendes visualizar utilizando o calendário abaixo.
            </Text>
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              paddingTop: CONST.inputFieldMargin,
              flexDirection: "row",
              borderTopWidth: 1,
              borderColor: "#DDD",
              justifyContent: "center",
            }} >
            <Text style={[styles.normalText, { marginBottom: 0 }]}>
              {currentDate}  {" "}
              <FontAwesome5 name="calendar-alt" size={CONST.heading5} color={CONST.mainGray}
              />
            </Text>
          </Pressable>
        </View>

        {activeCategories && Object.keys(activeCategories).length > 0 && activeCategories.air !== 0 ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View style={{ flexDirection: 'row' }}>
              <AirLabel color={whichColor(activeCategories['air'], 'air')} />
            </View>
            {answersAir && Object.keys(answersAir).length > 0 && Object.keys(answersAir).sort().map((question, index) => (
              <View key={index} >
                <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>
                  {question}
                </Text>
                <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0 }]}>
                  {answersAir[question]}.
                </Text>
              </View>
            ))}
          </View>
          :
          <></>
        }

        {activeCategories && Object.keys(activeCategories).length > 0 && activeCategories.energy !== 0 ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View style={{ flexDirection: 'row' }}>
              <EnergyLabel color={whichColor(activeCategories['energy'], 'energy')} />
            </View>
            {answersEnergy && Object.keys(answersEnergy).length > 0 && Object.keys(answersEnergy).sort().map((question, index) => {
              const q = question.split(":")
              return (
                <View key={index}>
                  <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>
                    {translateEnergyDevices(q[0])}: {q[1]}
                  </Text>
                  <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0 }]}>
                    {answersEnergy[question]}.
                  </Text>
                </View>
              )
            })}
          </View>
          :
          <></>
        }

        {activeCategories && Object.keys(activeCategories).length > 0 && activeCategories.movement !== 0 ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View style={{ flexDirection: 'row' }}>
              <MovementLabel color={whichColor(activeCategories['movement'], 'movement')} />
            </View>
            {answersMovement && Object.keys(answersMovement).length > 0 && Object.keys(answersMovement).sort().map((question, index) => (
              <View key={index} >
                <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>
                  {question}
                </Text>
                <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0 }]}>
                  {answersMovement[question]}.
                </Text>
              </View>
            ))}
          </View>
          :
          <></>
        }

        {activeCategories && Object.keys(activeCategories).length > 0 && activeCategories.recycle !== 0 ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View style={{ flexDirection: 'row' }}>
              <RecycleLabel color={whichColor(activeCategories['recycle'], 'recycle')} />
            </View>
            {answersRecycle && Object.keys(answersRecycle).length > 0 && Object.keys(answersRecycle).sort().map((question, index) => (
              <View key={index} >
                <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>
                  {question}
                </Text>
                <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0 }]}>
                  {answersRecycle[question]}.
                </Text>
              </View>
            ))}
          </View>
          :
          <></>
        }

        {activeCategories && Object.keys(activeCategories).length > 0 && activeCategories.water !== 0 ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View style={{ flexDirection: 'row' }}>
              <WaterLabel color={whichColor(activeCategories['water'], 'water')} />
            </View>
            {answersWater && Object.keys(answersWater).length > 0 && Object.keys(answersWater).sort().map((question, index) => (
              <View key={index} >
                <Text style={[styles.normalText, { marginTop: CONST.normalTextMargin, marginBottom: 0 }]}>
                  {question}
                </Text>
                <Text style={[styles.normalText, { fontFamily: 'K2D-SemiBold', marginBottom: 0 }]}>
                  {answersWater[question]}.
                </Text>
              </View>
            ))}
          </View>
          :
          <></>
        }

      </ScrollView>
    </SafeAreaProvider>
  );
}
