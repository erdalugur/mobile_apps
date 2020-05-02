import React from 'react';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import { SignUpScreen } from 'screens/SignupScreen'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from 'screens/NotificationScreen';
import SearchScreen from 'screens/SearchScreen';
import CartScreen from 'screens/CartScreen'
import ProfileScreen from 'screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { HomeOptions, ProfileOptions, NotificationOptions, SearchOptions } from './options'
import { CartButton } from 'components'
import theme from 'theme';
export const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={{
        headerRight: ({ tintColor }) => <CartButton />
    }}>
        <HomeStack.Screen
            options={HomeOptions}
            name="Home"
            component={HomeScreen} />

    </HomeStack.Navigator>
)

const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
    <SearchStack.Navigator>
        <SearchStack.Screen
            options={SearchOptions}
            name="Search"
            component={SearchScreen}
        />

    </SearchStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            options={ProfileOptions}
            name="Profile"
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>
)

const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => (
    <NotificationStack.Navigator>
        <NotificationStack.Screen
            options={NotificationOptions}
            name="Notification"
            component={NotificationScreen}
        />
    </NotificationStack.Navigator>
)

const Tab = createBottomTabNavigator();



export const HomeTabs = () => (
    <Tab.Navigator tabBarOptions={{ activeTintColor: theme.colors.text }}>
        <Tab.Screen
            options={{
                title: "Anasayfa",
                tabBarIcon: ({ color }) => <AntDesign color={color} size={20} name="appstore1" />
            }}
            component={HomeStackScreen}
            name="Home" />

        <Tab.Screen
            options={{
                title: "Ürün Ara",
                tabBarIcon: ({ color }) => <AntDesign color={color} size={20} name="search1" />
            }}
            component={SearchStackScreen}
            name="Search" />
        <Tab.Screen
            options={{
                title: "Hesabım",
                tabBarIcon: ({ color }) => <AntDesign color={color} size={20} name="user" />
            }}
            component={ProfileStackScreen}
            name="Profile" />
    </Tab.Navigator>
)
const CartStack = createStackNavigator();
const CartStackScreen = () => (
    <CartStack.Navigator>
        <CartStack.Screen
            name="Cart"
            component={CartScreen}
        />
    </CartStack.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name="Signin" component={SigninScreen}
        />
        <AuthStack.Screen
            name="Signup" component={SignUpScreen}
        />
    </AuthStack.Navigator>
)

const RootStack = createStackNavigator();
interface Props {
    isAuthenticated: boolean
}
export const App = (props: Props) => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen
            options={{
                header: () => null
            }}
            name="Presentation"
            component={PresentationScreen}
        />
        <RootStack.Screen name="Home" component={HomeTabs} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen
            name="Cart"
            component={CartStackScreen}
        />
        <RootStack.Screen
            options={{
                title: "Kampanyalar",
            }}
            component={NotificationStackScreen}
            name="Notification" />
        <RootStack.Screen
            options={{
                title: "Kampanyalar",
            }}
            component={AuthStackScreen}
            name="Signin" />

    </RootStack.Navigator>
)

