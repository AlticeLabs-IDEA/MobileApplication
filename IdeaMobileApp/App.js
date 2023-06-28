import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./src/routes/routes";
import { createStackNavigator } from "@react-navigation/stack";

import * as CONST from "./src/assets/constants/constants.js"

import { RecycleIcon, AirIcon, WaterIcon, EnergyIcon, MovementIcon } from './src/components/icons';
import { AirLabel, RecycleLabel, WaterLabel, EnergyLabel, MovementLabel } from './src/components/labels';
import { AddButton, PrimaryButton_v1, PrimaryButton_v2, PrimaryButton_v3, SecondaryButton_v1, SecondaryButton_v2, SecondaryButton_v3 } from './src/components/buttons';
import { AirBox, RecycleBox, EnergyBox, WaterBox, MovementBox } from './src/components/areaBoxes';
import { EmailInputLogin, EmailInputRegister, PasswordInputLogin, PasswordInputRegister } from './src/components/inputs';

export default function App() {
  const Stack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    'K2D-Regular': require("./src/assets/fonts/K2D-Regular.ttf"),
    'K2D-SemiBold': require("./src/assets/fonts/K2D-SemiBold.ttf"),
    'K2D-Bold': require("./src/assets/fonts/K2D-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainStackNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

