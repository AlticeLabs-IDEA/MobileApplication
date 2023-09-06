import React from 'react';
import { View, Text } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { styles } from "./../assets/styles/css.js"
import * as CONST from "./../assets/constants/constants.js"

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

// ---- OPTION BUTTON ----
export const OptionButton_v1 = ({text, color}) => {
    return(
        <View style={[styles.optionButton_v1, {borderColor: color}]}>
            <Text style={[styles.optionButtonText_v1, {color: color}]}>{text}</Text>
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
            <FontAwesome5 name="plus" size={CONST.normalText} color="white" />
        </View>
    )
}

// ---- CATEGORIES BUTTONS ----
export const CategoryIcon = ({label}) => {
    switch (label){
        case "air":
            return (<FontAwesome5 name="wind" size={24} color="white" style={{paddingRight: CONST.iconPadding}}/>)
        case "movement":
            return (<FontAwesome5 name="walking" size={24} color="white" style={{paddingRight: CONST.iconPadding}}/>)
        case "recycle":
            return (<FontAwesome5 name="recycle" size={24} color="white" style={{paddingRight: CONST.iconPadding}}/>)
        case "energy":
            return (<FontAwesome name="bolt" size={24} color="white" style={{paddingRight: CONST.iconPadding}}/>)
        case "water":
            return (<FontAwesome5 name="faucet" size={24} color="white" style={{paddingRight: CONST.iconPadding}}/>)
    }
}

export const CategoryButton = ({text, color, icon}) => {
    return(
        <View style={[styles.secondaryButton_v1, {backgroundColor: color, borderColor: color, flexDirection: 'row'}]}>
            <CategoryIcon label={icon}/>
            <Text style={styles.secondaryButtonText_v1}>{text}</Text>
        </View>
    )
}