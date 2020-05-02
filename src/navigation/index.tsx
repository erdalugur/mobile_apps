import React from 'react';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchScreen from 'screens/SearchScreen';
import CartScreen from 'screens/CartScreen'
import ProfileScreen from 'screens/ProfileScreen';

export const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="Home"
            component={HomeScreen} />
        <HomeStack.Screen
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
        <SearchStack.Screen name="Search" component={SearchScreen} />
        <SearchStack.Screen name="Cart" component={CartScreen} />

    </SearchStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            name="Profile"
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>
)

const Tab = createBottomTabNavigator();

interface RootProps {
    isAuthenticated: boolean
}
export const RootStack = (props: RootProps) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                component={HomeStackScreen}
                name="Home" />
            <Tab.Screen
                component={SearchStackScreen}
                name="Search" />
            <Tab.Screen
                component={ProfileStackScreen}
                name="Profile" />
        </Tab.Navigator>
    )
}
