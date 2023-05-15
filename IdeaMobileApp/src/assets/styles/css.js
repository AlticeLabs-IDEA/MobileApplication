import { StyleSheet } from "react-native";

// IMPORT CONSTANTS
import * as CONST from "../constants/constants.js"



export const styles = StyleSheet.create({

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
        paddingBottom: CONST.labelPaddingVertical
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