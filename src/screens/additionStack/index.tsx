import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native'
import {
    TablesScreen,
    PaymentScreen,
    AdditionScreen,
    ReadQRTableScreen,
} from 'screens'

import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'
import { TableOptionScreen } from 'screens/sharedStack/TableOptionScreen';


export const AdditionStack = createStackNavigator();
export const AdditionStackScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    let parentOptions: any = {}
    if (route.state) {
        parentOptions.tabBarVisible = route.state.index > 0 ? false : true
    }

    navigation.setOptions({ ...parentOptions })

    return (
        <AdditionStack.Navigator
            // mode="modal"
            headerMode="screen"
            screenOptions={{
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }: any) => <HeaderBack />
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
                    title: 'Adisyon',
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
            <AdditionStack.Screen
                options={{
                    title: 'Opsiyonlar'
                }}
                component={TableOptionScreen}
                name={screens.tableOptionScreen}
            />
        </AdditionStack.Navigator>
    )
}

