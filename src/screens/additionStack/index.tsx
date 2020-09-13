import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    TablesScreen,
    PaymentScreen,
    AdditionScreen,
    ReadQRTableScreen,
} from 'screens'

import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'


export const AdditionStack = createStackNavigator();
export const AdditionStackScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    if (route.state) {
        navigation.setOptions({
            tabBarVisible: route.state.index > 0 ? false : true
        })
    }
    return (
        <AdditionStack.Navigator
            // mode="modal"
            headerMode="screen"
            screenOptions={{
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }) => <HeaderBack />
            }}
        >
            <AdditionStack.Screen
                options={{
                    title: 'Masalar'
                }}
                component={TablesScreen}
                name={screens.tables}
            />
            <AdditionStack.Screen
                options={{
                    title: 'Adisyon'
                }}
                component={AdditionScreen}
                name={screens.addition}
            />
            <AdditionStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                component={PaymentScreen}
                name={screens.payment}
            />
            <AdditionStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                component={ReadQRTableScreen}
                name={screens.tableQR}
            />

        </AdditionStack.Navigator>
    )
}

