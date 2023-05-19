import React from 'react';
import { View, Text } from "react-native";

import { styles } from "./../assets/styles/css.js"

export const PrimaryButton_v1 = ({text}) => {
    return(
        <View style={styles.primaryButton_v1}>
            <Text style={styles.primaryButtonText_v1}>{text}</Text>
        </View>
    )
}
export const PrimaryButton_v2 = ({text}) => {
    return(
        <View style={styles.primaryButton_v2}>
            <Text style={styles.primaryButtonText_v2}>{text}</Text>
        </View>
    )
}
export const PrimaryButton_v3 = ({text}) => {
    return(
        <View style={styles.primaryButton_v3}>
            <Text style={styles.primaryButtonText_v3}>{text}</Text>
        </View>
    )
}

export const SecondaryButton_v1 = ({text, color}) => {
    const colorCode = "CONST." + color; 
    return(
        <View style={[styles.secondaryButton_v1, {backgroundColor: colorCode, borderColor: colorCode}]}>
            <Text style={styles.secondaryButtonText_v1}>{text}</Text>
        </View>
    )
}
export const SecondaryButton_v2 = ({text, color}) => {
    const colorCode = "CONST." + color; 
    return(
        <View style={[styles.secondaryButton_v2, {borderColor: colorCode}]}>
            <Text style={[styles.secondaryButtonText_v2, {color: colorCode}]}>{text}</Text>
        </View>
    )
}
export const SecondaryButton_v3 = ({text, color}) => {
    const colorCode = "CONST." + color; 
    return(
        <View style={styles.secondaryButton_v3}>
            <Text style={[styles.secondaryButtonText_v2, {color: colorCode}]}>{text}</Text>
        </View>
    )
}
