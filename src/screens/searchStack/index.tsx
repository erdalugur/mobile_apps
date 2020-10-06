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
    CartResultScreen, ProductNoteScreen
} from 'screens'

import {
    CartOptions, ProductNoteOptions
} from 'navigation/options'
import { CartButton } from 'components'
import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'
import { TableOptionScreen } from 'screens/sharedStack/TableOptionScreen';

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
                    title: 'Ürün',
                    header: () => null
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
                    title: 'Masalar',
                    headerRight: () => null
                }}
                name={screens.tables}
                component={TablesScreen} />
            <SearchStack.Screen
                options={{
                    title: 'Adisyon',
                    headerRight: () => null
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
            <SearchStack.Screen
                options={ProductNoteOptions}
                name={screens.noteScreen}
                component={ProductNoteScreen}
            />
            <SearchStack.Screen
                options={{
                    title: 'Opsiyonlar',
                    gestureEnabled: false,
                    headerRight: () => null
                }}
                name={screens.tableOptionScreen}
                component={TableOptionScreen}
            />
        </SearchStack.Navigator>
    )
}