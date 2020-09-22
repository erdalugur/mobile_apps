import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    PresentationScreen,
    HomeScreen,
    SigninScreen,
    QRScreen,
    NotificationScreen,
    SearchScreen,
    CartScreen,
    CategoryScreen,
    ProductScreen,
    KitchenScreen,
    CashierScreen,
    ReportScreen,
    TablesScreen,
    PaymentScreen,
    ReportDetail,
    AuthScreen,
    ProfileScreen,
    RootingScreen,
    AdditionScreen,
    CartQRScreen,
    ReadQRTableScreen,
    CartResultScreen,
    ProductNoteScreen
} from 'screens'

import { AntDesign } from '@expo/vector-icons';
import {
    CartOptions
} from 'navigation/options'
import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'

export const CartStack = createStackNavigator();

export const CartStackScreen = () => (
    <CartStack.Navigator>
        <CartStack.Screen
            options={CartOptions}
            name={screens.cart}
            component={CartScreen}
        />
        <CartStack.Screen
            options={CartOptions}
            name={screens.noteScreen}
            component={ProductNoteScreen}
        />
    </CartStack.Navigator>
)



