import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import LoginGuestScreen from "./LoginGuestScreen";
import RegisterGuestScreen from './RegisterGuestScreen'

const AuthStack = createStackNavigator();

export const AuthStackScreen = (props: any) => {
    return (
        <AuthStack.Navigator screenOptions={{
            header: () => null,
            headerBackTitleVisible: false,
        }}>
            <AuthStack.Screen
                component={LoginGuestScreen} name={screens.loginGuest} />
            <AuthStack.Screen
                component={RegisterGuestScreen} name={screens.registerGuest} />
        </AuthStack.Navigator>
    )
}
