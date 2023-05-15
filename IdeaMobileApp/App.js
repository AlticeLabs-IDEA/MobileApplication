import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";


import { RecycleIcon, AirIcon, WaterIcon, EnergyIcon } from './src/components/icons';
import { AirLabel, RecycleLabel, WaterLabel, EnergyLabel } from './src/components/labels';

export default function App() {

  const [loaded] = useFonts({
    'K2D-Regular': require("./src/assets/fonts/K2D-Regular.ttf"),
    'K2D-SemiBold': require("./src/assets/fonts/K2D-SemiBold.ttf"),
  });

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AirIcon/> 
      <AirLabel/>
      <RecycleIcon/>
      <RecycleLabel/>
      <WaterIcon />
      <WaterLabel/>
      <EnergyIcon />
      <EnergyLabel />
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
