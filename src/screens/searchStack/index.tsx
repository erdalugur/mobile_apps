import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import {
    SearchScreen,
    CartScreen,
    ProductScreen,
    TablesScreen,
    PaymentScreen,
    AdditionScreen,
    CartQRScreen,
    CartResultScreen
} from 'screens'

import {
    CartOptions
} from 'navigation/options'
import { CartButton } from 'components'
import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'

export const SearchStack = createStackNavigator();

export const SearchStackScreen = ({ navigation, route }: any) => {
    let options: any = {}
    if (route.state) {
        options.tabBarVisible = route.state.index > 0 ? false : true
    }
    navigation.setOptions({
        ...options
    })
    return (
        <SearchStack.Navigator headerMode="screen"
            screenOptions={{
                headerRight: ({ tintColor }: any) => <CartButton />,
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }: any) => <HeaderBack />
            }}
        >
            <SearchStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.search}
                component={SearchScreen}
            />
            <SearchStack.Screen
                options={{
                    title: 'Ürün'
                }}
                name={screens.product}
                component={ProductScreen} />
            <SearchStack.Screen
                options={CartOptions}
                name={screens.cart}
                component={CartScreen} />
            <SearchStack.Screen
                options={{
                    title: 'QR'
                }}
                name={screens.cartQR}
                component={CartQRScreen} />
            <SearchStack.Screen
                options={{
                    title: 'Masalar'
                }}
                name={screens.tables}
                component={TablesScreen} />
            <SearchStack.Screen
                options={{
                    title: 'Adisyon'
                }}
                component={AdditionScreen}
                name={screens.addition}
            />
            <SearchStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                component={PaymentScreen}
                name={screens.payment}
            />
            <SearchStack.Screen
                options={{
                    title: 'Sonuç',
                    gestureEnabled: false,

                }}
                name={screens.cartResult}
                component={CartResultScreen} />
        </SearchStack.Navigator>
    )
}