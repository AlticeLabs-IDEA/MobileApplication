import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { View } from "react-native";

// IMPORT PAGES
import DashboardScreen from "../pages/dashboard/page_dashboard"
import DetailsScreen from "../pages/dashboard/page_details"
import ProfileScreen from "../pages/profile/page_profile"
import SettingsScreen from "../pages/profile/page_settings"
import Records from "../pages/records/page_records"
import Stats from "../pages/stats/page_stats"
import Onboarding from "../pages/onboarding/page_onboarding"
import CategoryScreen from "../pages/authentication/page_category"
import ConfigurationScreen from "../pages/authentication/page_configuration"
import LoginScreen from "../pages/authentication/page_login"
import RegisterScreen from "../pages/authentication/page_register"
import WelcomeScreen from "../pages/authentication/page_welcome"
import PasswordScreen from '../pages/authentication/page_password';

// IMPORT STYLE
import * as CONST from "../assets/constants/constants.js"
import { styles } from "../assets/styles/css.js"

const Tab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();
const MainStack = createStackNavigator();

export const DashboardStackNavigation = ({ navigation }) => {
    return (
        <DashboardStack.Navigator
            initialRouteName='Dashboard'>
            <DashboardStack.Screen
                name="Dashboard"
                options={{ headerShown: false }}
                component={DashboardScreen}>
            </DashboardStack.Screen>
            <DashboardStack.Screen
                name="Details"
                options={{ headerShown: false }}
                component={DetailsScreen}>
            </DashboardStack.Screen>
        </DashboardStack.Navigator>
    )
}

export const ProfileStackNavigation = ({ navigation }) => {
    return (
        <ProfileStack.Navigator
            initialRouteName='Profile'>
            <ProfileStack.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={ProfileScreen}>
            </ProfileStack.Screen>
            <ProfileStack.Screen
                name="Settings"
                options={{ headerShown: false }}
                component={SettingsScreen}>
            </ProfileStack.Screen>
        </ProfileStack.Navigator>
    )
}

export const AuthenticationStackNavigation = ({ navigation }) => {
    return (
        <AuthenticationStack.Navigator
            initialRouteName='Welcome'>
            <AuthenticationStack.Screen
                name="Welcome"
                options={{ headerShown: false }}
                component={WelcomeScreen}>
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}>
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="Password"
                options={{ headerShown: false }}
                component={PasswordScreen}>
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="Register"
                options={{ headerShown: false }}
                component={RegisterScreen}>
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="Configuration"
                options={{ headerShown: false }}
                component={ConfigurationScreen}>
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="Category"
                options={{ headerShown: false }}
                component={CategoryScreen}>
            </AuthenticationStack.Screen>
        </AuthenticationStack.Navigator>
    )
}


export const Tabbar = () => {
    return (
        <Tab.Navigator
            initialRouteName='DashboardRoute'
            screenOptions={{
                headerShown: false,
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: {
                    fontSize: CONST.smallText,
                    paddingBottom: CONST.labelTabPadding,
                    fontFamily: 'K2D-Regular'
                },
                tabBarIconStyle: {
                },
                tabBarStyle: styles.tabbar
            }}>
            <Tab.Screen
                name="DashboardTab"
                component={DashboardStackNavigation}
                options={{
                    tabBarLabel: "Painel",
                    tabBarActiveTintColor: CONST.mainGray,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="home" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="StatsTab"
                component={Stats}
                options={{
                    tabBarLabel: "Estatísticas",
                    tabBarActiveTintColor: CONST.mainGray,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="pie-chart" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="AddTab"
                component={Stats}
                options={{
                    tabBarLabel: "",
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: CONST.mainGray,
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.addButton, { backgroundColor: CONST.mainGray }]}>
                            <FontAwesome5 name="plus" size={16} color={CONST.pureWhite} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="RecordsTab"
                component={Records}
                options={{
                    tabBarLabel: "Registos",
                    tabBarActiveTintColor: CONST.mainGray,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="clipboard-list" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStackNavigation}
                options={{
                    tabBarLabel: "Perfil",
                    tabBarActiveTintColor: CONST.mainGray,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-alt" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export const MainStackNavigation = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="AuthenticationStack"
                component={AuthenticationStackNavigation}
                options={{ headerShown: false }} />
            <MainStack.Screen
                name='Tabbar'
                component={Tabbar}
                options={{ headerShown: false }} />
        </MainStack.Navigator>
    )
}

export default MainStackNavigation;