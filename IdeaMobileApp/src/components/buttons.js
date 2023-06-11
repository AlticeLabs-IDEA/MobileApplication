import React from 'react';
import { View, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from "./../assets/styles/css.js"

// ---- PRIMARY BUTTONS ----
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

// ---- SECONDARY BUTTONS ----
export const SecondaryButton_v1 = ({text, color}) => {
    return(
        <View style={[styles.secondaryButton_v1, {backgroundColor: color, borderColor: color}]}>
            <Text style={styles.secondaryButtonText_v1}>{text}</Text>
        </View>
    )
}
export const SecondaryButton_v2 = ({text, color}) => {
    return(
        <View style={[styles.secondaryButton_v2, {borderColor: color}]}>
            <Text style={[styles.secondaryButtonText_v2, {color: color}]}>{text}</Text>
        </View>
    )
}
export const SecondaryButton_v3 = ({text, color}) => {
    return(
        <View style={styles.secondaryButton_v3}>
            <Text style={[styles.secondaryButtonText_v3, {color: color}]}>{text}</Text>
        </View>
    )
}

// ---- ADD BUTTON ----
export const AddButton = ({color}) => {
    return(
        <View style={[styles.addButton, {backgroundColor: color}]}>
            <FontAwesome5 name="plus" size={24} color="white" />
        </View>
    )
}