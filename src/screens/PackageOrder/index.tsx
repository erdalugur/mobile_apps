import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'
import PackageOrderScreen from './PackageOrderScreen';
import { TableOptionScreen } from 'screens/sharedStack/TableOptionScreen';
import { PaymentScreen } from 'screens';




export const PackageStack = createStackNavigator();
export const PackageStackScreen = () => (
    <PackageStack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.colors.text },
            headerBackImage: ({ tintColor }) => <HeaderBack />,
            title: 'Paket Servis'
        }}
    >
        <PackageStack.Screen
            name={screens.packageOrderScreen}
            component={PackageOrderScreen}
        />
        <PackageStack.Screen
            name={screens.tableOptionScreen}
            component={TableOptionScreen}
        />
        <PackageStack.Screen
            name={screens.payment}
            component={PaymentScreen}
        />
    </PackageStack.Navigator>
)

