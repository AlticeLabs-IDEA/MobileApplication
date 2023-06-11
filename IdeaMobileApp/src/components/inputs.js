import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { styles } from "./../assets/styles/css.js"
import * as CONST from "./../assets/constants/constants.js"

// ---- REGISTER INPUTS ----

export const EmailInputRegister = () => {
    const [email, setEmail] = useState('');
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const [emailFlag, setEmailFlag] = useState(true);

    const handleInputChange = (text) => {
        setEmail(text);
        if (emailRegex.test(text)) {
            setEmailFlag(false);
        } else {
            setEmailFlag(true);
        }
    };

    return (
        <View style={{ flexDirection: 'column', marginBottom: 10}}>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={[styles.inputField, { width: '100%' }]}
                    value={email}
                    onChangeText={handleInputChange}
                    placeholder={'E-mail'}
                    placeholderTextColor={CONST.neutralGray}
                />
            </View>
            {email.length > 0 && (emailFlag ? 
            <Text style={[styles.feedbackMessage, {color: CONST.mainRed}]} >Formato de e-mail inválido.</Text>
            :
            <Text style={[styles.feedbackMessage, {color: CONST.mainGreen}]}>Formato de e-mail válido.</Text>
            )}
        </View>
    )
}

export const PasswordInputRegister = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordFlag, setPasswordFlag] = useState(true);
    const [matching, setMatching] = useState (false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordInputChange = (text) => {
        setPassword(text);
        if (text.length >= 6) {
            setPasswordFlag(false);
        } else {
            setPasswordFlag(true);
        }
    };

    const handleConfirmPasswordInputChange = (text) => {
        setConfirmPassword(text);
        if (password == text) {
            setMatching(false);
        } else {
            setMatching(true);
        }
    };


    return (
        <View style={{ flexDirection: 'column', marginBottom: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                    style={[styles.inputField, { width: '100%'}]}
                    value={password}
                    onChangeText={handlePasswordInputChange}
                    placeholder={'Palavra-passe'}
                    placeholderTextColor={CONST.neutralGray}
                    secureTextEntry={!showPassword}
                />
                <Pressable 
                    style={{position: 'absolute', right: 0, padding: 18, zIndex: 100}}
                    onPress={() => {
                        setShowPassword(!showPassword)
                    }}>
                    {showPassword ? 
                    <FontAwesome name="eye-slash" size={18} color={CONST.mainGray} />
                    :
                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />}
                </Pressable>
            </View>
            {password.length > 0 && (passwordFlag ? 
            <Text style={[styles.feedbackMessage, {color: CONST.mainRed}]} >A palavra-passe deverá ter no mínimo 6 caracteres.</Text>
            :
            <Text style={[styles.feedbackMessage, {color: CONST.mainGreen}]}>Palavra-passe válida.</Text>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <TextInput
                    style={[styles.inputField, {width: '100%'}]}
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordInputChange}
                    placeholder={'Confirmar palavra-passe'}
                    placeholderTextColor={CONST.neutralGray}
                    secureTextEntry={!showConfirmPassword}
                />
                <Pressable 
                    style={{position: 'absolute', right: 0, zIndex: 100, padding: 18}}
                    onPress={() => {
                        setShowConfirmPassword(!showConfirmPassword)
                    }}>
                    {showConfirmPassword ? 
                    <FontAwesome name="eye-slash" size={18} color={CONST.mainGray} />
                    :
                    <FontAwesome name="eye" size={18} color={CONST.mainGray} />}
                </Pressable>
            </View>
            {confirmPassword.length > 0 && (matching ? 
            <Text style={[styles.feedbackMessage, {color: CONST.mainRed}]} >As palavras-passes não coincidem.</Text>
            :
            <Text style={[styles.feedbackMessage, {color: CONST.mainGreen}]}>Palavra-passe válida.</Text>
            )}
        </View>
    )
}

// ---- LOGIN INPUTS ----