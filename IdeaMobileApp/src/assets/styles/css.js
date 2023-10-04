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
        justifyContent: 'center',
        flexDirection: 'row',
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
        justifyContent: 'center',
        flexDirection: 'row',
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
        paddingBottom: CONST.buttonPaddingVertical,
        justifyContent: 'center',
        flexDirection: 'row',
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
        justifyContent: 'center',
        flexDirection: 'row',
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
        justifyContent: 'center',
        flexDirection: 'row',
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
        paddingBottom: CONST.buttonPaddingVertical,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    secondaryButtonText_v3: {
        fontSize: CONST.normalText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
        textDecorationLine: 'underline',
    },
    optionButton_v1: {
        backgroundColor: 'transparent',
        borderRadius: CONST.buttonBorderRadius,
        paddingLeft: CONST.buttonPaddingLateral - 6,
        paddingRight: CONST.buttonPaddingLateral - 6,
        paddingTop: CONST.buttonPaddingVertical - 3,
        paddingBottom: CONST.buttonPaddingVertical - 3,
        borderWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderStyle: 'solid',
        flexWrap: 'wrap'

    },
    optionButtonText_v1: {
        fontSize: CONST.subText,
        fontFamily: "K2D-SemiBold",
        letterSpacing: 0.5,
        flexWrap: 'wrap'
    },
   
    addButton: {
        paddingTop: CONST.addButtonPadding,
        paddingBottom: CONST.addButtonPadding,
        paddingLeft: CONST.addButtonPadding + 2,
        paddingRight: CONST.addButtonPadding + 2,
        borderRadius: CONST.buttonBorderRadius,
        // marginTop: CONST.labelTabPadding,
        alignItems: 'center',  
    },

    // ---- area boxes ----
    areaBox: {
        backgroundColor: CONST.pureWhite,
        borderRadius: CONST.boxBorderRadius,
        shadowColor: CONST.mainGray,
        shadowRadius: CONST.shadowRadius,
        shadowOpacity: 0.2,
        elevation: 2,
        overflow: "hidden",
        margin: 3,
        width: CONST.screenWidth/5*2,
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
    },
    areaBoxDisable: {
        backgroundColor: CONST.pureWhite,
        borderRadius: CONST.boxBorderRadius,
        borderColor: "#DDD",
        borderWidth: 1,
        opacity: 0.5,
        overflow: "hidden",
        width: CONST.screenWidth/5*2,
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
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
        height: CONST.normalText*3,
        letterSpacing: 0.5,
        backgroundColor: CONST.pureWhite,
    },
    
    feedbackMessage: {
        fontFamily: "K2D-Regular",
        fontSize: CONST.smallText,
        letterSpacing: 0.5,
    },

    // ---- tabbar ----
    tabbar: {
        backgroundColor: CONST.lightWhite,
        shadowColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: "#DDD",
        marginLeft: CONST.layoutPaddingLateral,
        marginRight: CONST.layoutPaddingLateral,
        height: CONST.navbarHeight,
        paddingTop: CONST.labelTabPadding ,
        position: "absolute",
        paddingBottom: CONST.labelTabPadding,
    },

    // --- texts ----
    descriptionText: {
        fontFamily: 'K2D-Regular',
        fontSize: CONST.normalText,
        color: CONST.secondaryGray,
        paddingLeft: CONST.layoutPaddingLateral,
        paddingRight: CONST.layoutPaddingLateral,
        marginBottom: CONST.descriptionTextMargin,
    },

    toastText: {
        fontFamily: 'K2D-Regular',
        fontSize: CONST.smallText,
        color: CONST.secondaryGray,
        paddingLeft: CONST.layoutPaddingLateral,
        paddingRight: CONST.layoutPaddingLateral,
        textAlign: 'center',
        marginTop: CONST.inputFieldMargin
    },

    welcomeProfileText: {
        fontFamily: 'K2D-SemiBold',
        fontSize: CONST.heading6,
        color: CONST.mainGray,
        marginBottom: CONST.normalTextMargin,
        textAlign: 'center',
    },

    normalText: {
        fontFamily: 'K2D-Regular',
        fontSize: CONST.normalText,
        color: CONST.mainGray,
        marginBottom: CONST.normalTextMargin,
        textShadowColor: CONST.pureWhite, 
        textShadowRadius: 3, 
    },

    subText: {
        fontFamily: 'K2D-Regular',
        fontSize: CONST.subText,
        color: CONST.secondaryGray,
        textAlign: 'center'
    },

    recoverPassword: {
        fontFamily: 'K2D-Regular',
        fontSize: CONST.normalText,
        color: CONST.mainBlue,
        textAlign: 'right',
        marginTop: CONST.textRecoverPasswordMargin,
    },

    // ---- cardBox ----
    cardBox: {
        marginLeft: CONST.layoutPaddingLateral,
        marginRight: CONST.layoutPaddingLateral,
        backgroundColor: CONST.pureWhite,
        paddingLeft: CONST.cardBoxPaddingLateral,
        paddingRight: CONST.cardBoxPaddingLateral,
        paddingTop: CONST.cardBoxPaddingVertical,
        paddingBottom: CONST.cardBoxPaddingVertical,
        borderRadius: CONST.boxBorderRadius,
        shadowColor: CONST.mainGray,
        shadowRadius: CONST.shadowRadius,
        shadowOpacity: 0.2,
        elevation: 2,
        overflow: "hidden",
        margin: 3,
    },

    // ---- modal ----
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      centeredViewDarker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.8)"
      },
      modalView: {
        backgroundColor: CONST.lightWhite,
        borderRadius: CONST.modalRadius,
        padding: CONST.boxPadding,
        alignItems: 'center',
        shadowColor: CONST.pureBlack,
        shadowRadius: CONST.shadowRadius,
        width: CONST.screenWidth < 400 ? (CONST.screenWidth / 5) * 4 : (CONST.screenWidth / 3) * 2,
        shadowOpacity: 0.5,   
        elevation: 3,
        overflow: "hidden",
      },
    // ---- page layout ----
    indicatorTitle: {
        fontFamily: 'K2D-SemiBold',
        fontSize: CONST.normalText,
        color: CONST.mainGray,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        paddingLeft: CONST.layoutPaddingLateral,
        paddingRight: CONST.layoutPaddingLateral,
        marginBottom: CONST.titlePageMargin
    },

    indicatorTitle_v2: {
        fontFamily: 'K2D-SemiBold',
        fontSize: CONST.normalText,
        color: CONST.mainGray,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        paddingLeft: CONST.layoutPaddingLateral,
        paddingRight: CONST.layoutPaddingLateral,
        marginBottom: CONST.titlePageMargin_v2
    },

    mainContainer: {
        backgroundColor: CONST.lightWhite,
        paddingBottom: CONST.navbarHeight,
        paddingTop: CONST.layoutPaddingVertical,
    },

    
    doubleButtonsView: {
        width: CONST.screenWidth,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    }, //* probably to change after to implement align-content space between the buttons and other elements

    // ---- Progress Bar ----
    mainProgressBarText: {
        fontFamily: 'K2D-SemiBold',
        fontSize: CONST.heading4,
        color: CONST.mainGray
    },

    mainProgressBarSubText: {
        fontFamily: 'K2D-Regular',
        fontSize: CONST.normalText,
        color: CONST.mainGray,
        position: 'relative',
        top: -10
    },

    progressBarText: {
        fontFamily: 'K2D-SemiBold',
        fontSize: CONST.normalText,
        color: CONST.mainGray
    },

    // ---- Sections ----
    sectionRedirect: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: CONST.labelPaddingLateral,
        paddingTop: CONST.inputPaddingLateral,
        paddingRight: CONST.labelPaddingLateral,
        paddingBottom: CONST.inputPaddingLateral,
    }


})