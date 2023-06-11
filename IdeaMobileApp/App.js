import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as CONST from "./src/assets/constants/constants.js"

import { RecycleIcon, AirIcon, WaterIcon, EnergyIcon, MovementIcon } from './src/components/icons';
import { AirLabel, RecycleLabel, WaterLabel, EnergyLabel, MovementLabel } from './src/components/labels';
import { AddButton, PrimaryButton_v1, PrimaryButton_v2, PrimaryButton_v3, SecondaryButton_v1, SecondaryButton_v2, SecondaryButton_v3 } from './src/components/buttons';
import { AirBox, RecycleBox, EnergyBox, WaterBox, MovementBox } from './src/components/areaBoxes';
import { EmailInput, EmailInputRegister, PasswordInputRegister } from './src/components/inputs';

export default function App() {

  const [fontsLoaded] = useFonts({
    'K2D-Regular': require("./src/assets/fonts/K2D-Regular.ttf"),
    'K2D-SemiBold': require("./src/assets/fonts/K2D-SemiBold.ttf"),
    'K2D-Bold': require("./src/assets/fonts/K2D-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <PrimaryButton_v1 text="Próxima etapa" />
            <PrimaryButton_v2 text="Próxima etapa" />
            <PrimaryButton_v3 text="Próxima etapa" />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <SecondaryButton_v1 text="Próxima etapa" color={CONST.mainGreen} />
            <SecondaryButton_v2 text="Próxima etapa" color={CONST.mainBlue} />
            <SecondaryButton_v3 text="Próxima etapa" color={CONST.mainRed} />
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <MovementIcon color={CONST.softPink} />
            <AirIcon color={CONST.softPurple} />
            <RecycleIcon color={CONST.softGreen} />
            <EnergyIcon color={CONST.softYellow} />
            <WaterIcon color={CONST.softBlue} />
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <MovementLabel color={CONST.pink} />
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <AirLabel color={CONST.purple} />
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <RecycleLabel color={CONST.green} />
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <EnergyLabel color={CONST.yellow} />
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>

            <WaterLabel color={CONST.blue} />
          </View>


        </View>
        <ScrollView
          horizontal={true}
        >
          <MovementBox color={CONST.pink} points={67} />
          <AirBox color={CONST.purple} points={90} />
          <RecycleBox color={CONST.green} points={76} />
          <EnergyBox color={CONST.yellow} points={34} />
          <WaterBox color={CONST.blue} points={10} />
        </ScrollView> */}
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <EmailInputRegister />
          <PasswordInputRegister />

        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'column'
  },
});
