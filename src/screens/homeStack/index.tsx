import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native'
import {
    HomeScreen,
    CartScreen,
    CategoryScreen,
    ProductScreen,
    TablesScreen,
    PaymentScreen,
    AdditionScreen,
    CartQRScreen,
    CartResultScreen
} from 'screens'

import {
    HomeOptions,
    CartOptions
} from '../../navigation/options'
import { CartButton } from 'components'
import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'


export const HomeStack = createStackNavigator();

export const HomeStackScreen = ({ navigation, route }: any) => {
    let options: any = {}
    if (route.state) {
        options.tabBarVisible = route.state.index > 0 ? false : true
    }

    let stackOptions: any = {
        headerRight: ({ tintColor }: any) => <CartButton />,
        headerBackTitleVisible: false,
        headerBackTitleStyle: { color: theme.colors.text },
        headerBackImage: ({ tintColor }: any) => <HeaderBack />
    }
    if (Platform.OS === "web") {
        options.headerBackImage = (props: any) => (
            <HeaderBack onPress={() => {
                navigation.goBack(null)
            }} />
        )
        delete stackOptions.headerBackImage
    }

    navigation.setOptions({
        ...options
    })

    return (
        <HomeStack.Navigator screenOptions={{ ...stackOptions }}>
            <HomeStack.Screen
                options={HomeOptions}
                name={screens.home}
                component={HomeScreen} />
            <HomeStack.Screen
                options={CartOptions}
                name={screens.cart}
                component={CartScreen}
            />
            <HomeStack.Screen
                options={{
                    gestureEnabled: false,
                    headerBackImage: () => null,
                    title: 'Sonuç'
                }}
                name={screens.cartResult}
                component={CartResultScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Kategoriler'
                }}
                name={screens.category}
                component={CategoryScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Ürünler',

                }}
                name={screens.product}
                component={ProductScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Qr',

                }}
                name={screens.cartQR}
                component={CartQRScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Masalar'
                }}
                name={screens.tables}
                component={TablesScreen}
            />

            <HomeStack.Screen
                options={{
                    title: 'Adisyon'
                }}
                name={screens.addition}
                component={AdditionScreen}
            />

            <HomeStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                name={screens.payment}
                component={PaymentScreen}
            />

        </HomeStack.Navigator>
    )
}