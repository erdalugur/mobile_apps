import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
    SigninScreen,
    QRScreen,
    AuthScreen,
} from 'screens'

import { screens } from 'navigation'


export const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name={screens.auth} component={AuthScreen}
        />
        <AuthStack.Screen
            name={screens.signin} component={SigninScreen}
        />
        <AuthStack.Screen
            name={screens.loginQR} component={QRScreen}
        />


    </AuthStack.Navigator>
)

