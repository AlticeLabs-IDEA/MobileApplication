import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from "react-native";

import { styles } from "./../assets/styles/css.js"

export const AirIcon = () => {
    return(
        <View style={styles.airIcon}>
            <FontAwesome5 name="wind" size={20} color="white" />
        </View>
    )
}

export const RecycleIcon = () => {
    return(
        <View style={styles.recycleIcon}>
            <FontAwesome5 name="recycle" size={20} color="white" />
        </View>
    )
}

export const WaterIcon = () => {
    return(
        <View style={styles.waterIcon}>
            <FontAwesome5 name="faucet" size={20} color="white" />
        </View>
    )
}

export const EnergyIcon = () => {
    return(
        <View style={styles.energyIcon}>
            <FontAwesome name="bolt" size={20} color="white" />
        </View>
    )
}
