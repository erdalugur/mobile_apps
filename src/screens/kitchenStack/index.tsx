import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import {
    KitchenScreen,
} from 'screens'

import { screens } from 'navigation'

export const KitchenStack = createStackNavigator();
export const KitchenStackScreen = () => (
    <KitchenStack.Navigator>
        <KitchenStack.Screen
            options={{
                title: 'Mutfak'
            }}
            name={screens.kitchen}
            component={KitchenScreen}
        />
    </KitchenStack.Navigator>
)

