import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
    ProfileScreen,
} from 'screens'

import {
    ProfileOptions,

} from 'navigation/options'
import { screens } from 'navigation'

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            options={ProfileOptions}
            name={screens.profile}
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>
)

