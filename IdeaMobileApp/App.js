import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useFonts } from "expo-font";

import * as CONST from "./src/assets/constants/constants.js"

import { RecycleIcon, AirIcon, WaterIcon, EnergyIcon } from './src/components/icons';
import { AirLabel, RecycleLabel, WaterLabel, EnergyLabel } from './src/components/labels';
import { PrimaryButton_v1, PrimaryButton_v2, PrimaryButton_v3, SecondaryButton_v1, SecondaryButton_v2, SecondaryButton_v3} from './src/components/buttons';

export default function App() {

  const [fontsLoaded] = useFonts({
    'K2D-Regular': require("./src/assets/fonts/K2D-Regular.ttf"),
    'K2D-SemiBold': require("./src/assets/fonts/K2D-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <PrimaryButton_v1 text="Próxima etapa" />
      <PrimaryButton_v2 text="Próxima etapa" />
      <PrimaryButton_v3 text="Próxima etapa" /> */}
      <SecondaryButton_v1 text="Próxima etapa" color={CONST.mainGreen} />
      <SecondaryButton_v2 text="Próxima etapa" color={CONST.mainBlue}/>
      <SecondaryButton_v3 text="Próxima etapa" color={CONST.mainRed}/>
      <AirIcon color={CONST.purple} /> 
      <AirLabel color={CONST.purple}/>
      <RecycleIcon color={CONST.green}/>
      <RecycleLabel color={CONST.green}/>
      <WaterIcon color={CONST.blue}/>
      <WaterLabel color={CONST.blue}/>
      <EnergyIcon color={CONST.yellow}/>
      <EnergyLabel color={CONST.yellow}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
