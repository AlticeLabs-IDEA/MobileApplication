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
    addButton: {
        padding: CONST.addButtonPadding,
        borderRadius: CONST.buttonBorderRadius,
        aspectRatio: 1,
        alignItems: 'center',  
    },

    // ---- area boxes ----
    areaBox: {
        backgroundColor: CONST.pureWhite,
        borderRadius: CONST.boxBorderRadius,
        shadowColor: CONST.mainGray,
        shadowRadius: CONST.shadowRadius,
        shadowOpacity: 0.2,
        elevation: 3,
        overflow: "hidden",
        width: CONST.screenWidth/5*2,
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10 //TODO: to remove after
    },
    areaBoxIcon: {
        position: 'absolute',
        opacity: 0.1,
    },
    areaBoxPoints: {
        fontSize: CONST.heading3,
        color: CONST.mainGray,
        fontFamily: 'K2D-Bold',
        marginTop: CONST.boxPadding,
    },
    areaBoxText: {
        fontSize: CONST.normalText,
        color: CONST.mainGray,
        fontFamily: 'K2D-Regular',
        position: 'relative',
        top: -CONST.boxPadding,
    },
    areaBoxSubText: {
        fontSize: CONST.subText,
        color: CONST.secondaryGray,
        fontFamily: 'K2D-Regular',
        marginTop: CONST.boxPadding,
        marginBottom: CONST.boxPadding,
    },
    
    // ---- icons ----
    areaIcon : {
        padding: CONST.iconPadding,
        borderRadius: CONST.iconBorderRadius,
        aspectRatio: 1,
        alignItems: 'center',
    },

    // ---- labels ----
    areaLabel: {
        borderRadius: CONST.labelBorderRadius,
        paddingLeft: CONST.labelPaddingLateral,
        paddingRight: CONST.labelPaddingLateral,
        paddingTop: CONST.labelPaddingVertical,
        paddingBottom: CONST.labelPaddingVertical,

    },
    labelText: {
        color: CONST.pureWhite,
        fontSize: CONST.smallText,
        fontFamily: "K2D-Regular",
        letterSpacing: 0.5,
    },

    // ---- inputs ----
    inputField: {
        borderRadius: CONST.inputRadius,
        borderWidth: 1,
        borderColor: CONST.neutralGray,
        borderStyle: 'solid',
        paddingTop: CONST.inputPaddingVertical,
        paddingBottom: CONST.inputPaddingVertical,
        paddingLeft: CONST.inputPaddingLateral,
        paddingRight: CONST.inputPaddingLateral,
        color: CONST.mainGray,
        fontFamily: "K2D-Regular",
        fontSize: CONST.normalText,
        letterSpacing: 0.5,
    },
    
    feedbackMessage: {
        fontFamily: "K2D-Regular",
        fontSize: CONST.smallText,
        letterSpacing: 0.5,
    }
})