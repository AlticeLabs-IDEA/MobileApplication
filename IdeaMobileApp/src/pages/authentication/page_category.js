// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { Svg, Path } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// IMPORT COMPONENTS
import { PrimaryButton_v1, PrimaryButton_v2 } from "../../components/buttons.js";

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function CategoryScreen({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { categories, categoriesColors, toShow, colorToShow } = route.params;
    const [category, setCategory] = useState("")
    const [colorCategory, setColorCategory] = useState()
    const [nextCategory, setNextCategory] = useState("")
    const [previousCategory, setPreviousCategory] = useState("")
    const [previousColor, setPreviousColor] = useState()
    const [nextColor, setNextColor] = useState()

    const heightAnimated = useSharedValue(300);

    const AnimatedPath = Animated.createAnimatedComponent(Path);
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);

    const firstWaveProps = useAnimatedProps(() => {
        return {
            d: `
            M -50 ${heightAnimated.value / 10 * 9 - 10}
            Q ${CONST.screenWidth / 4} ${heightAnimated.value / 5 * 4 - 10} ${CONST.screenWidth / 2} ${heightAnimated.value / 5 * 4}
            Q ${CONST.screenWidth / 4 * 3 + 25} ${heightAnimated.value / 10 * 9} ${CONST.screenWidth + 50} ${heightAnimated.value / 10 * 7}
            T ${CONST.screenWidth} 0
            T 0 0
            Z
        `,
        };
    });

    const secondWaveProps = useAnimatedProps(() => {
        return {
            d: `
                M 0 ${heightAnimated.value / 10 * 7.5}
                Q ${CONST.screenWidth / 4} ${heightAnimated.value / 10 * 9 + 10} ${CONST.screenWidth / 2} ${heightAnimated.value / 5 * 4}
                Q ${CONST.screenWidth / 4 * 3} ${heightAnimated.value / 5 * 3} ${CONST.screenWidth + 10} ${heightAnimated.value / 10 * 8}
                T ${CONST.screenWidth} 0
                T 0 0
                Z
            `,
        };
    });

    const findNext = (nowIndex, all) => {
        const nextTrueIndex = all.findIndex((value, index) => index > nowIndex && value === true);
        if (nextTrueIndex !== -1) {
            console.log("Index of next true:", nextTrueIndex);
            if (nextTrueIndex == 1) {
                setNextColor(categoriesColors[1])
                return "energy"
            }
            if (nextTrueIndex == 2) {
                setNextColor(categoriesColors[2])
                return "movement"
            }
            if (nextTrueIndex == 3) {
                setNextColor(categoriesColors[3])
                return "recycle"
            }
            setNextColor(categoriesColors[4])
            return "water"
        } else {
            console.log("No more true values after the first occurrence.");
            return "None"
        }
    }

    const findPrevious = (nowIndex, all) => {
        const previousTrueIndex = all.slice(0, nowIndex).lastIndexOf(true);
        if (previousTrueIndex !== -1) {
            console.log("Index of previous true:", previousTrueIndex);
            if (previousTrueIndex === 1) {
                setPreviousColor(categoriesColors[1]);
                return "energy";
            }
            if (previousTrueIndex === 2) {
                setPreviousColor(categoriesColors[2]);
                return "movement";
            }
            if (previousTrueIndex === 3) {
                setPreviousColor(categoriesColors[3]);
                return "recycle";
            }
            setPreviousColor(categoriesColors[0]);
            return "air";
        } else {
            console.log("No previous true values before the current index.");
            return "None";
        }
    }

    const previousToShow = (now, all) => {
        switch (now) {
            case "air":
                return findPrevious(0, all)
            case "energy":
                return findPrevious(1, all)
            case "movement":
                return findPrevious(2, all)
            case "recycle":
                return findPrevious(3, all)
            case "water":
                return findPrevious(4, all)
        }
    }

    const nextToShow = (now, all) => {
        switch (now) {
            case "air":
                return findNext(0, all)
            case "energy":
                return findNext(1, all)
            case "movement":
                return findNext(2, all)
            case "recycle":
                return findNext(3, all)
            case "water":
                return findNext(4, all)
        }
    }

    const whichColor = (color, category) => {
        switch (category) {
            case "air":
                switch (color) {
                    case 2:
                        return CONST.purple
                    case 3:
                        return CONST.grayishPurple
                    case 4:
                        return CONST.darkPurple
                    default:
                        return CONST.softPurple
                }
            case "energy":
                switch (color) {
                    case 2:
                        return CONST.yellow
                    case 3:
                        return CONST.grayishYellow
                    case 4:
                        return CONST.darkYellow
                    default:
                        return CONST.softYellow
                }
            case "movement":
                switch (color) {
                    case 2:
                        return CONST.pink
                    case 3:
                        return CONST.grayishPink
                    case 4:
                        return CONST.darkPink
                    default:
                        return CONST.softPink
                }
            case "recycle":
                switch (color) {
                    case 2:
                        return CONST.green
                    case 3:
                        return CONST.grayishGreen
                    case 4:
                        return CONST.darkGreen
                    default:
                        return CONST.softGreen
                }
            case "water":
                switch (color) {
                    case 2:
                        return CONST.blue
                    case 3:
                        return CONST.grayishBlue
                    case 4:
                        return CONST.darkBlue
                    default:
                        return CONST.softBlue
                }
            default:
                return CONST.secondaryGray
        }
    }

    const whichCategory = (value) => {
        switch (value) {
            case "air":
                return ("Climatização");
            case "water":
                return ("Recursos Hídricos");
            case "energy":
                return ("Energia elétrica");
            case "movement":
                return ("Mobilidade");
            case "recycle":
                return ("Reciclagem");
            default:
                return ("")
        }
    }

    useEffect(() => {
        setCategory(whichCategory(toShow))
        setColorCategory(whichColor(colorToShow, toShow))
        setNextCategory(nextToShow(toShow, categories))
        setPreviousCategory(previousToShow(toShow, categories))
        console.log(nextCategory)
    }, [toShow, colorToShow, nextCategory])


    return (
        <SafeAreaProvider style={{ backgroundColor: CONST.lightWhite }}>
            <StatusBar style={"dark"} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={styles.normalText}>
                                    <Text style={{ fontFamily: 'K2D-SemiBold', color: CONST.mainGreen }}>Parabéns!</Text>
                                    {"\n"} {"\n"}Configuraste com sucesso esta área!
                                </Text>
                            </View>
                            <View style={{ width: '30%', alignItems: 'center' }}>
                                <FontAwesome5 name="seedling" size={CONST.heading4} color={CONST.mainGreen} />
                            </View>
                        </View>
                        <Pressable
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                {
                                    nextCategory !== "None" ?
                                    navigation.navigate("Category", {
                                        "categories": categories,
                                        "categoriesColors": categoriesColors,
                                        "colorToShow": nextColor,
                                        "toShow": nextCategory
                                    })
                                    :
                                    navigation.navigate("Tabbar", { screen: "Dashboard" })

                                }
                            }} >
                            <PrimaryButton_v1 text={"Continuar"} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <AnimatedSvg
                width={CONST.screenWidth}
                height={heightAnimated.value}
                viewBox={`0 0 ${CONST.screenWidth} ${heightAnimated.value}`}
            >
                <AnimatedPath
                    animatedProps={firstWaveProps}
                    fill={colorCategory}
                    style={{ opacity: 0.5 }}
                    transform="translate(0, 0)"
                />
                <AnimatedPath
                    animatedProps={secondWaveProps}
                    fill={colorCategory}
                    transform="translate(0, 0)"
                />
                <Text style={[styles.indicatorTitle, { color: CONST.lightWhite, paddingTop: CONST.layoutPaddingVertical, paddingLeft: CONST.layoutPaddingLateral, paddingRight: CONST.layoutPaddingLateral }]}>
                    Configuração de perfil {">"} {category}
                </Text>
                <Text style={[styles.descriptionText, { color: CONST.lightWhite }]}>
                    {toShow == "air" ? "Esta área é diretamente afetada pelo uso de equipamentos de climatização e o impacto que isto tem na tua pegada ecológica."
                        : toShow == "energy" ? "Esta área é diretamente afetada por atitudes relacionadas com o consumo excessivo e o desperdício energético."
                            : toShow == "movement" ? "Esta área é diretamente afetada por atitudes relacionadas com as deslocações que fazes durante um dia de trabalho."
                                : toShow == "recycle" ? "Esta área é diretamente afetada por atitudes de manipulação de resíduos, para ter ou não, um comportamento sustentável."
                                    : "Esta área é diretamente afetada por atitudes relacionadas com os teus consumos de água ao longo do dia."
                    }
                </Text>
            </AnimatedSvg>
            <ScrollView
                showsVerticalScrollIndicator={false}>
            </ScrollView>
            <View style={[styles.doubleButtonsView, {paddingBottom: CONST.layoutPaddingVertical}]}>
                <Pressable
                    onPress={() => {
                        {
                            previousCategory !== "None" ?
                            navigation.navigate("Category", {
                                "categories": categories,
                                "categoriesColors": categoriesColors,
                                "colorToShow": previousColor,
                                "toShow": previousCategory
                            })
                            :
                            navigation.navigate("Configuration")
                        }
                    }}
                    style={{ right: 'auto', left: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v2 text={"\u0020\u0020Voltar\u0020\u0020"} />
                </Pressable>
                <Pressable
                    onPress={() => {
                        setModalVisible(true)
                    }}
                    style={{ left: 'auto', right: CONST.layoutPaddingLateral }}>
                    <PrimaryButton_v1 text={"Submeter"} />
                </Pressable>
            </View>
        </SafeAreaProvider>
    )
}