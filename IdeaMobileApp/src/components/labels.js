import React from 'react';
import { View, Text } from "react-native";

import { styles } from "./../assets/styles/css.js"

export const AirLabel = () => {
    return(
        <View style={styles.airLabel}>
            <Text style={styles.labelText}>Climatização</Text>
        </View>
    )
}

export const RecycleLabel = () => {
    return(
        <View style={styles.recycleLabel}>
            <Text style={styles.labelText}>Reciclagem</Text>
        </View>
    )
}

export const WaterLabel = () => {
    return(
        <View style={styles.waterLabel}>
            <Text style={styles.labelText}>Recursos Hídricos</Text>
        </View>
    )
}

export const EnergyLabel = () => {
    return(
        <View style={styles.energyLabel}>
            <Text style={styles.labelText}>Energia Elétrica</Text>
        </View>
    )
}
