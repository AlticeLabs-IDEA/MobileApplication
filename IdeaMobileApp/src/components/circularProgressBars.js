import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text } from "react-native";

import { styles } from "./../assets/styles/css.js"
import { AirLabel, RecycleLabel, EnergyLabel, WaterLabel, MovementLabel } from './labels.js';


export const CircularProgressBar = ({ color, points }) => {
    return (
        <View style={[styles.areaBox ]}>
            <FontAwesome5 name="walking" size={150} color={color} style={[styles.areaBoxIcon, { top: -30, left: -5 }]} />
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxPoints}>{points}</Text>
                <Text style={styles.areaBoxText}>pontos</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <MovementLabel color={color} />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxSubText}>Ver mais &#x2192;</Text>
            </View>
        </View>
    )
}