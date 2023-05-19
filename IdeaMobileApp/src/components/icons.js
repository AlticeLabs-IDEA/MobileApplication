import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from "react-native";

import { styles } from "./../assets/styles/css.js"

export const AirIcon = ({color}) => {
    return(
        <View style={[styles.areaIcon, {backgroundColor: color}]}>
            <FontAwesome5 name="wind" size={24} color="white" />
        </View>
    )
}

export const RecycleIcon = ({color}) => {
    return(
        <View style={[styles.areaIcon, {backgroundColor: color}]}>
            <FontAwesome5 name="recycle" size={24} color="white" />
        </View>
    )
}

export const WaterIcon = ({color}) => {
    return(
        <View style={[styles.areaIcon, {backgroundColor: color}]}>
            <FontAwesome5 name="faucet" size={24} color="white" />
        </View>
    )
}

export const EnergyIcon = ({color}) => {
    return(
        <View style={[styles.areaIcon, {backgroundColor: color}]}>
            <FontAwesome name="bolt" size={24} color="white" />
        </View>
    )
}
