// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View, Modal, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { Svg, Path } from "react-native-svg";
import Animated, {
    useAnimatedProps,
    useSharedValue,
} from "react-native-reanimated";

// IMPORT COMPONENTS
// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"

export default function CategoryScreen({ route, navigation }) {
    const { categories, toShow, colorToShow } = route.params;
    const [category, setCategory] = useState("")
    const [colorCategory, setColorCategory] = useState()
    console.log(colorToShow)

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

    useEffect(() => {
        function whichColor(color, category) {
            console.log("SOU A CATEGORY:", category)
            console.log("SOU A COR: ", color)
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
        function whichCategory(value) {
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
        setCategory(whichCategory(toShow))
        console.log("SOU O RETORNO:", (whichColor(colorToShow, toShow)) )
        setColorCategory(whichColor(colorToShow, toShow))
    }, [toShow, colorToShow])


    return (
        <SafeAreaProvider style={{ backgroundColor: CONST.lightWhite }}>
            <StatusBar style={"dark"} />
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
                                    : toShow == "water" ? "Esta área é diretamente afetada por atitudes relacionadas com os teus consumos de água ao longo do dia."
                                        : "Não tens nenhuma área desafiada."}
                </Text>
            </AnimatedSvg>
            <ScrollView
                showsVerticalScrollIndicator={false}>
            </ScrollView>
        </SafeAreaProvider>
    )
}