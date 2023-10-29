// IMPORT LIBRARIES
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, Image, ImageBackground, ScrollView, Text, View, TextInput } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { useFocusEffect } from '@react-navigation/native';
import firebase from "../../../config/firebase.js";
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

// IMPORT STYLES
import { styles } from "../../assets/styles/css.js"
import * as CONST from "../../assets/constants/constants.js"
import { PrimaryButton_v1 } from "../../components/buttons.js";

export default function OnboardingScreen({ navigation }) {
    const scrollViewRef = useRef(null);
    const [page, setPage] = useState(0);
    const [image_1, setImage_1] = useState();
    const [image_2, setImage_2] = useState();
    const [image_3, setImage_3] = useState();
    const [image_4, setImage_4] = useState();

    useEffect(() => {
        const getUrlImage = async () => {
            const storage = firebase.storage()
            const reference = storage.ref('/onboarding_1.png')
            reference.getDownloadURL(reference).then((x) => {
                setImage_1(x)
            })
        }
        getUrlImage()
        console.log(image_1)
    }, [])

    useEffect(() => {

    }, [image_1])

    return (
        <SafeAreaProvider style={[styles.mainContainer, { paddingTop: 0, paddingBottom: 0 }]}>
            <StatusBar style={"dark"} />
            <ImageBackground source={require('../../assets/images/background_image.png')} style={{ width: '100%', height: '100%' }} resizeMode="repeat">
                <ScrollView style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: '100%', height: '100%', flex: 1, flexDirection: 'column' }}>
                    <Pressable
                        onPress={() => { navigation.navigate("Register") }}
                        style={{ width: '100%', paddingTop: CONST.layoutPaddingVertical, paddingRight: CONST.layoutPaddingLateral, marginBottom: 0 }}>
                        <Text style={[styles.subText, { textAlign: 'right' }]}>Avançar</Text>
                    </Pressable>
                    <View style={{ height: CONST.screenHeight - 170 }}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            ref={scrollViewRef}
                            pagingEnabled={true}
                            onMomentumScrollEnd={(e) => {
                                var x = e.nativeEvent.contentOffset.x;
                                if (x == 0) {
                                    setPage(0)
                                } else if (x < CONST.screenWidth + 1) {
                                    setPage(1)
                                } else if (x < CONST.screenWidth * 2 + 1) {
                                    setPage(2)
                                } else {
                                    setPage(3)
                                }
                            }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ width: CONST.screenWidth }}>
                                    <View style={styles.cardBox}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Podes fazer a diferença e cuidar do <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>nosso planeta</Text>, com as <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>ações</Text> do teu dia-a-dia.
                                            </Text>
                                            <Image source={require('../../assets/images/onboarding_1.jpg')} resizeMode="contain" style={{ height: '60%', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }} />
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Reduzir a tua <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>pegada ecológica</Text> vai contribuir para um futuro <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>mais verde.</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ width: CONST.screenWidth }}>
                                    <View style={styles.cardBox}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Cada <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>ação sustentável</Text> que registes na plataforma IDEA vai <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>dar-te pontos</Text>.
                                            </Text>
                                            <Image source={require('../../assets/images/onboarding_2.jpg')} resizeMode="contain" style={{ height: '60%', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }} />
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Os pontos obtidos traduzem <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>o teu impacto</Text>, quantos mais pontos obteres <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>maior ele será</Text>.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ width: CONST.screenWidth }}>
                                    <View style={styles.cardBox}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Ajuda <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>o teu departamento</Text> a ser o melhor da empresa em <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>práticas sustentáveis</Text>.
                                            </Text>
                                            <Image source={require('../../assets/images/onboarding_3.jpg')} resizeMode="contain" style={{ height: '60%', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }} />
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Faz a <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>diferença</Text> e contribui para uma <Text style={{ color: CONST.mainGreen, fontFamily: 'K2D-SemiBold' }}>imagem corporativa</Text> mais sustentável.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ width: CONST.screenWidth }}>
                                    <View style={styles.cardBox}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Vem descobrir os <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>benefícios</Text> enquanto contribuis para a <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>mudança ambiental</Text>.
                                            </Text>
                                            <Image source={require('../../assets/images/onboarding_4.jpg')} resizeMode="contain" style={{ height: '60%', marginTop: CONST.boxCardMargin, marginBottom: CONST.boxCardMargin }} />
                                            <Text style={[styles.normalText, { marginBottom: 0, textAlign: 'center' }]}>
                                                Junta-te à <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>comunidade</Text> e juntos vamos <Text style={{ color: CONST.mainBlue, fontFamily: 'K2D-SemiBold' }}>semear</Text> um mundo mais sustentável.
                                            </Text>
                                        </View>
                                        <Pressable style={{ alignItems: 'center', width: '100%' }}
                                            onPress={() => {
                                                navigation.navigate("Register")
                                            }}>
                                            <PrimaryButton_v1 color={CONST.mainGray} text={"Juntar-me"} />
                                        </Pressable>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    <View
                        style={{ justifyContent: 'center', flexDirection: 'row', marginTop: CONST.navbarHeight / 2 }}>
                        <View style={{ backgroundColor: page === 0 ? CONST.secondaryGray : CONST.neutralGray, width: page === 0 ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
                        <View style={{ backgroundColor: page === 1 ? CONST.secondaryGray : CONST.neutralGray, width: page === 1 ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
                        <View style={{ backgroundColor: page === 2 ? CONST.secondaryGray : CONST.neutralGray, width: page === 2 ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
                        <View style={{ backgroundColor: page === 3 ? CONST.secondaryGray : CONST.neutralGray, width: page === 3 ? 20 : 8, height: 8, margin: 5, borderRadius: 10 }} />
                    </View>
                </ScrollView>

            </ImageBackground>
        </SafeAreaProvider>
    )
}