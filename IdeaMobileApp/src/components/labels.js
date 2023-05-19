import React from 'react';
import { View, Text } from "react-native";

import { styles } from "./../assets/styles/css.js"

export const AirLabel = ({color}) => {
    return(
        <View style={[styles.areaLabel, {backgroundColor: color}]}>
            <Text style={styles.labelText}>Climatização</Text>
        </View>
    )
}

export const RecycleLabel = ({color}) => {
    return(
        <View style={[styles.areaLabel, {backgroundColor: color}]}>
            <Text style={styles.labelText}>Reciclagem</Text>
        </View>
    )
}

export const WaterLabel = ({color}) => {
    return(
        <View style={[styles.areaLabel, {backgroundColor: color}]}>
            <Text style={styles.labelText}>Recursos Hídricos</Text>
        </View>
    )
}

export const EnergyLabel = ({color}) => {
    return(
        <View style={[styles.areaLabel, {backgroundColor: color}]}>
            <Text style={styles.labelText}>Energia Elétrica</Text>
        </View>
    )
}
