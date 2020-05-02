import React from 'react';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from 'screens/NotificationScreen';
import SearchScreen from 'screens/SearchScreen';
import CartScreen from 'screens/CartScreen'
import ProfileScreen from 'screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { HomeOptions, ProfileOptions, CartOptions, NotificationOptions, } from './options'
export const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            options={HomeOptions}
            name="Home"
            component={HomeScreen} />
        <HomeStack.Screen
            options={CartOptions}
            name="Cart"
            component={CartScreen} />
        <HomeStack.Screen
            options={{
                header: () => null
            }}
            name="Presentation"
            component={PresentationScreen}
        />
    </HomeStack.Navigator>
)

const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
    <SearchStack.Navigator>
        <SearchStack.Screen
            options={{ header: () => null }}
            name="Search"
            component={SearchScreen}
        />
        <SearchStack.Screen
            options={CartOptions}
            name="Cart"
            component={CartScreen}
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

interface RootProps {
    isAuthenticated: boolean
}
export const RootStack = (props: RootProps) => {
    return (
        <Tab.Navigator
            tabBarOptions={{}}>
            <Tab.Screen
                options={{
                    title: "Anasayfa",
                    tabBarIcon: ({ color }) => <AntDesign color={color} size={20} name="appstore1" />
                }}
                component={HomeStackScreen}
                name="Home" />
            <Tab.Screen
                options={{
                    title: "Kampanyalar",
                    tabBarIcon: ({ color }) => <AntDesign color={color} size={20} name="notification" />
                }}
                component={NotificationStackScreen}
                name="Notification" />
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
}
