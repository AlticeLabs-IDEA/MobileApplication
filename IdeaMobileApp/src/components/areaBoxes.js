import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text } from "react-native";

import { styles } from "./../assets/styles/css.js"
import { AirLabel, RecycleLabel, EnergyLabel, WaterLabel, MovementLabel } from './labels.js';


export const MovementBox = ({ color, points, userCategory }) => {
    return (
        <View style={[userCategory ? styles.areaBox : styles.areaBoxDisable]}>
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

export const AirBox = ({ color, points, userCategory }) => {
    return (
        <View style={[userCategory ? styles.areaBox : styles.areaBoxDisable]}>
            <FontAwesome5 name="wind" size={150} color={color} style={[styles.areaBoxIcon, { top: -20, left: -30 }]} />
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxPoints}>{points}</Text>
                <Text style={styles.areaBoxText}>pontos</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <AirLabel color={color} />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxSubText}>Ver mais &#x2192;</Text>
            </View>
        </View>
    )
}

export const RecycleBox = ({ color, points, userCategory }) => {
    return (
        <View style={[userCategory ? styles.areaBox : styles.areaBoxDisable]}>
            <FontAwesome5 name="recycle" size={150} color={color} style={[styles.areaBoxIcon, { top: -20, left: -30 }]} />
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxPoints}>{points}</Text>
                <Text style={styles.areaBoxText}>pontos</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <RecycleLabel color={color} />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxSubText}>Ver mais &#x2192;</Text>
            </View>
        </View>
    )
}
export const EnergyBox = ({ color, points, userCategory }) => {
    return (
        <View style={[userCategory ? styles.areaBox : styles.areaBoxDisable]}>
            <FontAwesome5 name="bolt" size={160} color={color} style={[styles.areaBoxIcon, { top: -30, left: -5 }]} />
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxPoints}>{points}</Text>
                <Text style={styles.areaBoxText}>pontos</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <EnergyLabel color={color} />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxSubText}>Ver mais &#x2192;</Text>
            </View>
        </View>
    )
}
export const WaterBox = ({ color, points, userCategory }) => {
    return (
        <View style={[userCategory ? styles.areaBox : styles.areaBoxDisable]}>
            <FontAwesome5 name="faucet" size={160} color={color} style={[styles.areaBoxIcon, { top: -20, left: -50 }]} />
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxPoints}>{points}</Text>
                <Text style={styles.areaBoxText}>pontos</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <WaterLabel color={color} />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.areaBoxSubText}>Ver mais &#x2192;</Text>
            </View>
        </View>
    )
}
