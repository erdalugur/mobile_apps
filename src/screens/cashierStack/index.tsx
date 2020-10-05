import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
    CashierScreen,
    TablesScreen,
    PaymentScreen,
    AdditionScreen,
    CartQRScreen,
    CartResultScreen
} from 'screens'
import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'
import { TableOptionScreen } from 'screens/sharedStack/TableOptionScreen';



export const CachierStack = createStackNavigator();
export const CachierStackScreen = () => (
    <CachierStack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.colors.text },
            headerBackImage: ({ tintColor }) => <HeaderBack />
        }}
    >
        <CachierStack.Screen
            options={{
                title: 'Masalar'
            }}
            name={screens.tables}
            component={TablesScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Kasiyer'
            }}
            name={screens.cashier}
            component={CashierScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Adisyon'
            }}
            name={screens.addition}
            component={AdditionScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Ödeme Al'
            }}
            name={screens.payment}
            component={PaymentScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'QR'
            }}
            name={screens.cartQR}
            component={CartQRScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Sonuç',
                gestureEnabled: false
            }}
            name={screens.cartResult}
            component={CartResultScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Opsiyonlar',
                gestureEnabled: false
            }}
            name={screens.tableOptionScreen}
            component={TableOptionScreen}
        />
    </CachierStack.Navigator>
)


