import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import {
    ProfileScreen,
} from 'screens'

import { screens } from 'navigation'

export const SettingStack = createStackNavigator();
export const SettingStackScreen = () => (
    <SettingStack.Navigator>
        <SettingStack.Screen
            name={screens.settings}
            component={ProfileScreen}
        />
    </SettingStack.Navigator>
)

