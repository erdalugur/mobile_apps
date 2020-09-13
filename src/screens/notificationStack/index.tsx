import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import {
    NotificationScreen,
} from 'screens'
import {
    NotificationOptions
} from 'navigation/options'

import { screens } from 'navigation'

const NotificationStack = createStackNavigator();
export const NotificationStackScreen = () => (
    <NotificationStack.Navigator>
        <NotificationStack.Screen
            options={NotificationOptions}
            name={screens.notification}
            component={NotificationScreen}
        />
    </NotificationStack.Navigator>
)
