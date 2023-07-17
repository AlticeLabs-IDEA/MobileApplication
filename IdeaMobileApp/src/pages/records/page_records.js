//IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View, Modal, Pressable} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Calendar, LocaleConfig } from 'react-native-calendars';

// IMPORT COMPONENTS
import { AirLabel, EnergyLabel, MovementLabel, RecycleLabel, WaterLabel } from "../../components/labels.js";
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";
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

export default function Records({ navigation }) {
  const [colors, setColors] = useState([CONST.purple, CONST.yellow, CONST.pink, CONST.green, CONST.blue])
  const activeCategories = ["air", "energy", "movement"]; // after, get from db
  const [selected, setSelected] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarDate, setCalendarDate] = useState();
  const [minDate, setMinDate] = useState();


  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
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

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

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
                let formattedDate = `${daySelected < 10 ? '0' + daySelected : daySelected}/${monthSelected < 10 ? '0' + monthSelected : monthSelected}`;
                setSelected(`${yearSelected}-${monthSelected < 10 ? '0' + monthSelected : monthSelected}-${daySelected < 10 ? '0' + daySelected : daySelected}`)
                setCurrentDate(formattedDate);
                setModalVisible(false)
              }}
              markedDates={{
                [selected]: { selected: true, disableTouchEvent: true }
              }}
              style={{
                borderWidth: 0,
                height: 350,
                marginBottom: CONST.boxCardMargin,
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
              Para editar ou remover uma atividade basta pressionar
              continuamente alguns segundos.
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

        {activeCategories.includes("air") ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <AirLabel color={colors[0]} />
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                  ]}
                >
                  O  ar condicionado esteve ligado?
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                  ]}
                >
                  Nunca.
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                  ]}
                >
                  As janelas do departamento estiveram abertas?
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                  ]}
                >
                  1 ou 2 vezes.
                </Text>
              </View>
            </View>
          </View>
          :
          <></>
        }
        {activeCategories.includes("energy") ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <EnergyLabel color={colors[1]} />
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                  ]}
                >
                  Aproveitaste a iluminação natural durante o dia?
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                  ]}
                >
                  Sim.
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                  ]}
                >
                  Ao fim do dia, desligaste o teu monitor, onde?
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                  ]}
                >
                  Não desliguei.
                </Text>
              </View>
            </View>
          </View>
          :
          <>
          </>
        }
        {activeCategories.includes("movement") ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <MovementLabel color={colors[2]} />
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                  ]}
                >
                  A tua deslocação para o trabalho foi como?
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                  ]}
                >
                  Viatura Partilhada.
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { marginTop: CONST.normalTextMargin, marginBottom: 0 },
                  ]}
                >
                  A tua deslocação dentro do teu local de trabalho fez uso do elevador quantas vezes?
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    { fontFamily: 'K2D-SemiBold', marginBottom: 0 },
                  ]}
                >
                  1 ou 2 vezes.
                </Text>
              </View>
            </View>
          </View>
          :
          <></>
        }
        {activeCategories.includes("recycle") ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <RecycleLabel color={colors[3]} />
              </View>
            </View>
          </View>
          :
          <></>
        }
        {activeCategories.includes("water") ?
          <View style={[styles.cardBox, { marginBottom: CONST.boxCardMargin }]}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <WaterLabel color={colors[4]} />
              </View>
            </View>
          </View>
          :
          <></>
        }
      </ScrollView>
    </SafeAreaProvider>
  );
}
