import { StyleSheet } from "react-native";

// IMPORT CONSTANTS
import * as CONST from "../constants/constants.js"



export const styles = StyleSheet.create({
    // ---- buttons ----
    primaryButton_v1: {
        backgroundColor: CONST.mainGray,
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral,
        paddingRight: CONST.buttonPaddingLateral,
        paddingTop: CONST.buttonPaddingVertical,
        paddingBottom: CONST.buttonPaddingVertical,
        borderWidth: 1,
        borderColor: CONST.mainGray,
        borderStyle: 'solid',
    },
    primaryButtonText_v1: {
        color: CONST.pureWhite,
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
    },
    primaryButton_v2: {
        backgroundColor: 'transparent',
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral,
        paddingRight: CONST.buttonPaddingLateral,
        paddingTop: CONST.buttonPaddingVertical,
        paddingBottom: CONST.buttonPaddingVertical,
        borderWidth: 1,
        borderColor: CONST.mainGray,
        borderStyle: 'solid',
    },
    primaryButtonText_v2: {
        color: CONST.mainGray,
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
    },
    primaryButton_v3: {
        backgroundColor: 'transparent',
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral,
        paddingRight: CONST.buttonPaddingLateral,
        paddingTop: CONST.buttonPaddingVertical,
        paddingBottom: CONST.buttonPaddingVertical
    },
    primaryButtonText_v3: {
        color: CONST.mainGray,
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
        textDecorationLine: 'underline',
    },
    secondaryButton_v1: {
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral,
        paddingRight: CONST.buttonPaddingLateral,
        paddingTop: CONST.buttonPaddingVertical,
        paddingBottom: CONST.buttonPaddingVertical,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    secondaryButtonText_v1: {
        color: CONST.pureWhite,
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
    },
    secondaryButton_v2: {
        backgroundColor: 'transparent',
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral,
        paddingRight: CONST.buttonPaddingLateral,
        paddingTop: CONST.buttonPaddingVertical,
        paddingBottom: CONST.buttonPaddingVertical,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    secondaryButtonText_v2: {
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
    },
    secondaryButton_v3: {
        backgroundColor: 'transparent',
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral,
        paddingRight: CONST.buttonPaddingLateral,
        paddingTop: CONST.buttonPaddingVertical,
        paddingBottom: CONST.buttonPaddingVertical
    },
    secondaryButtonText_v3: {
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
        textDecorationLine: 'underline',
    },
    

    // ---- icons ----
    //TODO: CHANGE TO DYNAMIC COLOR TO BACKGROUND
    airIcon : {
        backgroundColor: CONST.purple,
        padding: CONST.iconPadding,
        borderRadius: CONST.iconBorderRadius,
        aspectRatio: 1,
        alignItems: 'center',
    },
    recycleIcon : {
        backgroundColor: CONST.green,
        padding: CONST.iconPadding,
        borderRadius: CONST.iconBorderRadius,
        aspectRatio: 1,
        alignItems: 'center',
    },
    waterIcon : {
        backgroundColor: CONST.blue,
        padding: CONST.iconPadding,
        borderRadius: CONST.iconBorderRadius,
        aspectRatio: 1,
        alignItems: 'center',
    },
    energyIcon : {
        backgroundColor: CONST.yellow,
        padding: CONST.iconPadding,
        borderRadius: CONST.iconBorderRadius,
        aspectRatio: 1,
        alignItems: 'center',
    },

    // ---- labels ----
    airLabel: {
        backgroundColor: CONST.purple,
        borderRadius: CONST.labelBorderRadius,
        paddingLeft: CONST.labelPaddingLateral,
        paddingRight: CONST.labelPaddingLateral,
        paddingTop: CONST.labelPaddingVertical,
        paddingBottom: CONST.labelPaddingVertical,

    },
    recycleLabel: {
        backgroundColor: CONST.green,
        borderRadius: CONST.labelBorderRadius,
        paddingLeft: CONST.labelPaddingLateral,
        paddingRight: CONST.labelPaddingLateral,
        paddingTop: CONST.labelPaddingVertical,
        paddingBottom: CONST.labelPaddingVertical
    },
    waterLabel: {
        backgroundColor: CONST.blue,
        borderRadius: CONST.labelBorderRadius,
        paddingLeft: CONST.labelPaddingLateral,
        paddingRight: CONST.labelPaddingLateral,
        paddingTop: CONST.labelPaddingVertical,
        paddingBottom: CONST.labelPaddingVertical
    },
    energyLabel: {
        backgroundColor: CONST.yellow,
        borderRadius: CONST.labelBorderRadius,
        paddingLeft: CONST.labelPaddingLateral,
        paddingRight: CONST.labelPaddingLateral,
        paddingTop: CONST.labelPaddingVertical,
        paddingBottom: CONST.labelPaddingVertical
    },
    labelText: {
        color: CONST.pureWhite,
        fontSize: CONST.smallText,
        fontFamily: "K2D-Regular",
        letterSpacing: 0.5,
    }
})